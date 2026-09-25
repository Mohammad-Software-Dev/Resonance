import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

const assetsDir = new URL("../apps/web-client/dist/assets/", import.meta.url);
const files = readdirSync(assetsDir).filter((name) => name.endsWith(".js"));
if (files.length === 0) throw new Error("No built JavaScript assets found.");

const rows = files.map((name) => {
  const path = join(assetsDir.pathname, name);
  const rawBytes = statSync(path).size;
  const gzipBytes = gzipSync(readFileSync(path), { level: 9 }).byteLength;
  return { name, rawBytes, gzipBytes };
});

const entry = rows.find((row) => row.name.startsWith("index-"));
if (!entry) throw new Error("Could not identify the Vite index entry chunk.");

const largest = [...rows].sort((a, b) => b.rawBytes - a.rawBytes)[0];
if (!largest) throw new Error("No JavaScript chunks available for budget check.");

const ENTRY_RAW_LIMIT = 3_500_000;
const ENTRY_GZIP_LIMIT = 1_300_000;
const CHUNK_RAW_LIMIT = 4_500_000;
const CHUNK_GZIP_LIMIT = 1_600_000;

const failures = [];
if (entry.rawBytes > ENTRY_RAW_LIMIT) {
  failures.push(`entry raw ${entry.rawBytes} > ${ENTRY_RAW_LIMIT}`);
}
if (entry.gzipBytes > ENTRY_GZIP_LIMIT) {
  failures.push(`entry gzip ${entry.gzipBytes} > ${ENTRY_GZIP_LIMIT}`);
}
if (largest.rawBytes > CHUNK_RAW_LIMIT) {
  failures.push(`largest chunk raw ${largest.rawBytes} > ${CHUNK_RAW_LIMIT}`);
}
if (largest.gzipBytes > CHUNK_GZIP_LIMIT) {
  failures.push(`largest chunk gzip ${largest.gzipBytes} > ${CHUNK_GZIP_LIMIT}`);
}

console.log(
  [
    "Resonance M0 web bundle budget",
    `entry: ${entry.name} raw=${entry.rawBytes} gzip=${entry.gzipBytes}`,
    `largest: ${largest.name} raw=${largest.rawBytes} gzip=${largest.gzipBytes}`,
    `chunks: ${rows.length}`,
  ].join("\n"),
);

if (failures.length > 0) {
  throw new Error(`Web bundle budget failed: ${failures.join("; ")}`);
}
