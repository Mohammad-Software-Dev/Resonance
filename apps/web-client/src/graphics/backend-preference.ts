export type BackendPreference = "auto" | "webgpu" | "webgl2";

export function parseBackendPreference(search: string): BackendPreference {
  const raw = new URLSearchParams(search).get("backend");
  if (raw === null || raw === "" || raw === "auto") return "auto";
  if (raw === "webgpu" || raw === "webgl2") return raw;
  throw new Error(
    `Unsupported backend query value "${raw}". Expected auto, webgpu or webgl2.`,
  );
}
