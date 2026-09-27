import { describe, expect, it } from "vitest";
import { parseBackendPreference } from "./backend-preference";

describe("parseBackendPreference", () => {
  it("defaults to auto", () => {
    expect(parseBackendPreference("")).toBe("auto");
    expect(parseBackendPreference("?foo=1")).toBe("auto");
    expect(parseBackendPreference("?backend=auto")).toBe("auto");
  });

  it("accepts explicit WebGPU and WebGL2 capture modes", () => {
    expect(parseBackendPreference("?backend=webgpu")).toBe("webgpu");
    expect(parseBackendPreference("?backend=webgl2")).toBe("webgl2");
  });

  it("rejects ambiguous backend values", () => {
    expect(() => parseBackendPreference("?backend=webgl")).toThrow(
      "Expected auto, webgpu or webgl2",
    );
  });
});
