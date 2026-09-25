/// <reference types="node" />
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const ENV_URL = new URL(
  "../../public/assets/environment/resonance-m0-orbital.env",
  import.meta.url,
);
const MAGIC = [0x86, 0x16, 0x87, 0x96, 0xf6, 0xd6, 0x96, 0x36];

interface EnvManifest {
  readonly version: number;
  readonly width: number;
  readonly imageType: string;
  readonly specular: {
    readonly lodGenerationScale: number;
    readonly mipmaps: readonly {
      readonly length: number;
      readonly position: number;
    }[];
  };
}

describe("project-owned M0 environment asset", () => {
  it("has a valid Babylon ENV header and complete mip payload", () => {
    const bytes = readFileSync(ENV_URL);
    expect([...bytes.subarray(0, MAGIC.length)]).toEqual(MAGIC);

    const nullIndex = bytes.indexOf(0, MAGIC.length);
    expect(nullIndex).toBeGreaterThan(MAGIC.length);

    const manifest = JSON.parse(
      bytes.subarray(MAGIC.length, nullIndex).toString("ascii"),
    ) as EnvManifest;

    expect(manifest.version).toBe(2);
    expect(manifest.width).toBe(16);
    expect(manifest.imageType).toBe("image/png");
    expect(manifest.specular.lodGenerationScale).toBe(0.8);

    const expectedMipLevels = Math.log2(manifest.width) + 1;
    expect(manifest.specular.mipmaps).toHaveLength(expectedMipLevels * 6);

    const payloadLength = bytes.length - (nullIndex + 1);
    const last = manifest.specular.mipmaps.at(-1);
    expect(last).toBeDefined();
    expect((last?.position ?? 0) + (last?.length ?? 0)).toBe(payloadLength);

    for (let i = 1; i < manifest.specular.mipmaps.length; i += 1) {
      const previous = manifest.specular.mipmaps[i - 1];
      const current = manifest.specular.mipmaps[i];
      expect(previous).toBeDefined();
      expect(current).toBeDefined();
      expect(current?.position).toBe(
        (previous?.position ?? 0) + (previous?.length ?? 0),
      );
    }
  });
});
