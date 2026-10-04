import json
import os
import sys

import trimesh

ROOT = sys.argv[1] if len(sys.argv) > 1 else "apps/web-client/public/assets/visual"

ASSETS = {
    "characters/wayfarer-mara-m0-v3.glb": {
        "nodes": {
            "Mara_SuitBody",
            "Mara_CeramicRig",
            "Mara_DarkRig",
            "Mara_ResonanceAccents",
            "Mara_FabricTab",
            "Mara_Helmet",
            "Mara_Visor",
            "Mara_GauntletEmitter",
        },
        "materials": {
            "Mara_Suit",
            "Mara_Ceramic",
            "Mara_Resonance",
            "Mara_Dark",
            "Mara_Fabric",
        },
        "min_bytes": 50_000,
        "max_bytes": 250_000,
    },
    "enemies/scrapper-damaged-m0-v3.glb": {
        "nodes": {
            "Scrapper_Torso",
            "Scrapper_JointAssembly",
            "Scrapper_DamageCore",
            "Scrapper_HostileEye",
            "Scrapper_DamagedArm",
            "Scrapper_LooseForearmPlate",
        },
        "materials": {
            "Scrapper_Shell",
            "Scrapper_Joint",
            "Scrapper_Hostile",
            "Scrapper_Damage",
        },
        "min_bytes": 15_000,
        "max_bytes": 150_000,
    },
    "environment/wayfarer-scar-setdress-m0-v3.glb": {
        "nodes": {
            "Scar_TransitBulkhead",
            "Scar_CargoCluster",
            "Scar_ServiceSpine",
            "Scar_ShellAssembly",
            "Scar_CeramicAssembly",
            "Scar_ResonanceAssembly",
            "Scar_DamageAssembly",
        },
        "materials": {
            "Scar_Shell",
            "Scar_Ceramic",
            "Scar_Resonance",
            "Scar_Damage",
        },
        "min_bytes": 15_000,
        "max_bytes": 150_000,
    },
}


def material_names(scene):
    names = set()
    for geometry in scene.geometry.values():
        material = getattr(getattr(geometry, "visual", None), "material", None)
        name = getattr(material, "name", None)
        if name:
            names.add(name)
    return names


def validate():
    failures = []
    report = {}

    for relative_path, contract in ASSETS.items():
        path = os.path.join(ROOT, relative_path)
        if not os.path.isfile(path):
            failures.append(f"{relative_path}: missing")
            continue

        size = os.path.getsize(path)
        scene = trimesh.load(path, force="scene")
        nodes = set(scene.graph.nodes_geometry)
        materials = material_names(scene)

        missing_nodes = sorted(contract["nodes"] - nodes)
        missing_materials = sorted(contract["materials"] - materials)
        if missing_nodes:
            failures.append(f"{relative_path}: missing nodes {missing_nodes}")
        if missing_materials:
            failures.append(f"{relative_path}: missing materials {missing_materials}")
        if not contract["min_bytes"] <= size <= contract["max_bytes"]:
            failures.append(
                f"{relative_path}: size {size} outside "
                f"{contract['min_bytes']}..{contract['max_bytes']}"
            )

        report[relative_path] = {
            "bytes": size,
            "geometryNodes": len(nodes),
            "vertices": sum(len(g.vertices) for g in scene.geometry.values()),
            "nodes": sorted(nodes),
            "materials": sorted(materials),
        }

    print(json.dumps(report, indent=2, sort_keys=True))
    if failures:
        for failure in failures:
            print(f"ERROR: {failure}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(validate())
