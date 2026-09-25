import type { AbstractEngine } from "@babylonjs/core/Engines/abstractEngine";
import { EngineInstrumentation } from "@babylonjs/core/Instrumentation/engineInstrumentation";
import { SceneInstrumentation } from "@babylonjs/core/Instrumentation/sceneInstrumentation";
import { Scene } from "@babylonjs/core/scene";

interface ChromiumPerformanceMemory {
  readonly usedJSHeapSize: number;
  readonly totalJSHeapSize: number;
  readonly jsHeapSizeLimit: number;
}

interface PerformanceWithMemory extends Performance {
  readonly memory?: ChromiumPerformanceMemory;
}

export interface PerformanceSnapshot {
  readonly cpuFrameMs: number;
  readonly renderMs: number;
  readonly gpuFrameMs: number | null;
  readonly drawCalls: number;
  readonly runtimeShaderCompilationMs: number;
  readonly activeMeshesEvaluationMs: number;
  readonly particlesRenderMs: number;
  readonly usedHeapMb: number | null;
  readonly totalHeapMb: number | null;
}

export class BrowserPerformanceMonitor {
  private readonly sceneInstrumentation: SceneInstrumentation;
  private readonly engineInstrumentation: EngineInstrumentation;

  public constructor(
    scene: Scene,
    engine: AbstractEngine,
  ) {
    this.sceneInstrumentation = new SceneInstrumentation(scene);
    this.sceneInstrumentation.captureFrameTime = true;
    this.sceneInstrumentation.captureRenderTime = true;
    this.sceneInstrumentation.captureActiveMeshesEvaluationTime = true;
    this.sceneInstrumentation.captureParticlesRenderTime = true;

    this.engineInstrumentation = new EngineInstrumentation(engine);
    this.engineInstrumentation.captureGPUFrameTime = true;
    this.engineInstrumentation.captureShaderCompilationTime = true;
  }

  public snapshot(): PerformanceSnapshot {
    const performanceWithMemory = performance as PerformanceWithMemory;
    const memory = performanceWithMemory.memory;
    const gpuNs = this.engineInstrumentation.gpuFrameTimeCounter.current;
    const gpuFrameMs = Number.isFinite(gpuNs) && gpuNs > 0
      ? gpuNs / 1_000_000
      : null;

    return {
      cpuFrameMs: this.sceneInstrumentation.frameTimeCounter.current,
      renderMs: this.sceneInstrumentation.renderTimeCounter.current,
      gpuFrameMs,
      drawCalls: this.sceneInstrumentation.drawCallsCounter.current,
      runtimeShaderCompilationMs:
        this.engineInstrumentation.shaderCompilationTimeCounter.total,
      activeMeshesEvaluationMs:
        this.sceneInstrumentation.activeMeshesEvaluationTimeCounter.current,
      particlesRenderMs:
        this.sceneInstrumentation.particlesRenderTimeCounter.current,
      usedHeapMb: memory ? memory.usedJSHeapSize / 1_048_576 : null,
      totalHeapMb: memory ? memory.totalJSHeapSize / 1_048_576 : null,
    };
  }

  public dispose(): void {
    this.engineInstrumentation.dispose();
    this.sceneInstrumentation.dispose();
  }
}

export async function warmCriticalShaders(scene: Scene): Promise<number> {
  const compilations: Promise<void>[] = [];
  let warmed = 0;

  for (const mesh of scene.meshes) {
    const material = mesh.material;
    if (!material) continue;
    compilations.push(
      material.forceCompilationAsync(mesh).then(() => {
        warmed += 1;
      }),
    );
  }

  await Promise.all(compilations);
  await scene.whenReadyAsync();

  // Warm shadow/glow/particle render paths that are not covered by material
  // forceCompilationAsync. No simulation tick is advanced during these frames.
  scene.render();
  scene.render();

  return warmed;
}
