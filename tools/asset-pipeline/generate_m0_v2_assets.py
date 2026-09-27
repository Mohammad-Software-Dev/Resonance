import os
import sys

import numpy as np
import trimesh
from trimesh.transformations import rotation_matrix, translation_matrix
from trimesh.visual.material import PBRMaterial

ROOT = sys.argv[1] if len(sys.argv) > 1 else "apps/web-client/public/assets/visual"
CHARACTERS = os.path.join(ROOT, "characters")
ENEMIES = os.path.join(ROOT, "enemies")
ENVIRONMENT = os.path.join(ROOT, "environment")
for directory in (CHARACTERS, ENEMIES, ENVIRONMENT):
    os.makedirs(directory, exist_ok=True)


def mat(name, color, metal=0, rough=0.65, em=None):
    material = PBRMaterial(
        name=name,
        baseColorFactor=color,
        metallicFactor=metal,
        roughnessFactor=rough,
    )
    if em is not None:
        material.emissiveFactor = np.array(em, float)
    return material


def tf(pos=(0, 0, 0), rot=None, scale=None):
    matrix = np.eye(4)
    if rot:
        for angle, axis in rot:
            matrix = matrix @ rotation_matrix(angle, axis)
    if scale:
        scaling = np.eye(4)
        scaling[0, 0], scaling[1, 1], scaling[2, 2] = scale
        matrix = matrix @ scaling
    return translation_matrix(pos) @ matrix


def baked(mesh, transform):
    copy = mesh.copy()
    copy.apply_transform(transform)
    return copy


def add(scene, name, parts, material):
    mesh = trimesh.util.concatenate(parts) if len(parts) > 1 else parts[0]
    mesh.visual = trimesh.visual.TextureVisuals(material=material)
    scene.add_geometry(mesh, node_name=name, geom_name=name)


# Mara Venn — human field-rig silhouette with asymmetric utility equipment.
ms = mat("Mara_Suit", [84, 94, 102, 255], 0.15, 0.6)
mc = mat("Mara_Ceramic", [175, 184, 180, 255], 0.05, 0.45)
mr = mat("Mara_Resonance", [30, 210, 225, 255], 0, 0.3, [0.06, 0.55, 0.65])
md = mat("Mara_Dark", [28, 34, 40, 255], 0.2, 0.65)
mf = mat("Mara_Fabric", [45, 52, 57, 255], 0, 0.9)
scene = trimesh.Scene()
suit, ceramic, resonance, dark, fabric = [], [], [], [], []

suit.append(baked(trimesh.creation.cylinder(0.34, 0.74, sections=8), tf((0, 0, 0.55), scale=(1, 0.72, 1))))
dark.extend([
    baked(trimesh.creation.box([0.48, 0.3, 0.34]), tf((0, 0, 0.05))),
    baked(trimesh.creation.cylinder(0.12, 0.16, sections=8), tf((0, 0, 1.0))),
    baked(trimesh.creation.box([0.4, 0.12, 0.08]), tf((0, 0.11, 1.39))),
    baked(trimesh.creation.box([0.07, 0.18, 0.24]), tf((-0.24, -0.04, 1.25))),
    baked(trimesh.creation.box([0.45, 0.18, 0.58]), tf((0, -0.22, 0.55))),
])
ceramic.append(baked(trimesh.creation.box([0.58, 0.16, 0.40]), tf((0, 0.18, 0.67))))
resonance.extend([
    baked(trimesh.creation.cylinder(0.27, 0.12, sections=10), tf((0, 0, 0.23))),
    baked(trimesh.creation.box([0.12, 0.05, 0.38]), tf((0.10, -0.325, 0.56))),
    baked(trimesh.creation.box([0.24, 0.05, 0.10]), tf((-0.43, 0.16, 0.78))),
])

for x in (-0.42, 0.42):
    ceramic.append(baked(trimesh.creation.icosphere(1, 0.18), tf((x, 0, 0.76), scale=(1.18, 0.82, 0.75))))
    suit.append(baked(trimesh.creation.cylinder(0.105, 0.42, sections=7), tf((x * 1.05, 0, 0.48), rot=[((0.12 if x < 0 else -0.12), [0, 1, 0])])))
    dark.extend([
        baked(trimesh.creation.cylinder(0.095, 0.38, sections=7), tf((x * 1.10, 0.035, 0.12))),
        baked(trimesh.creation.icosphere(1, 0.11), tf((x * 1.11, 0.05, -0.10), scale=(0.9, 0.8, 1.05))),
    ])

for x in (-0.16, 0.16):
    suit.append(baked(trimesh.creation.cylinder(0.12, 0.48, sections=7), tf((x, 0, -0.28))))
    ceramic.extend([
        baked(trimesh.creation.icosphere(1, 0.14), tf((x, 0.08, -0.52), scale=(1, 0.82, 0.78))),
        baked(trimesh.creation.box([0.22, 0.38, 0.18]), tf((x, 0.09, -1.03))),
    ])
    dark.append(baked(trimesh.creation.cylinder(0.10, 0.43, sections=7), tf((x, 0, -0.77))))

ceramic.append(baked(trimesh.creation.cylinder(0.145, 0.24, sections=9), tf((0.465, 0.035, 0.02))))
fabric.append(baked(trimesh.creation.box([0.10, 0.045, 0.62]), tf((-0.29, -0.14, -0.24), rot=[(0.14, [0, 1, 0])])))

add(scene, "Mara_SuitBody", suit, ms)
add(scene, "Mara_CeramicRig", ceramic, mc)
add(scene, "Mara_DarkRig", dark, md)
add(scene, "Mara_ResonanceAccents", resonance, mr)
add(scene, "Mara_FabricTab", fabric, mf)

helmet = trimesh.creation.icosphere(2, 0.27)
helmet.apply_scale([1, 0.9, 1.08])
add(scene, "Mara_Helmet", [baked(helmet, tf((0, 0, 1.23)))], mc)
add(scene, "Mara_Visor", [baked(trimesh.creation.box([0.34, 0.065, 0.13]), tf((0, 0.235, 1.26)))], mr)
emitter = baked(trimesh.creation.icosphere(1, 0.105), tf((0.49, 0.12, -0.08), scale=(1, 0.7, 1)))
add(scene, "Mara_GauntletEmitter", [emitter], mr)

with open(os.path.join(CHARACTERS, "wayfarer-mara-m0-v2.glb"), "wb") as handle:
    handle.write(scene.export(file_type="glb"))


# Damaged Scrapper — low-slung maintenance drone with a broken tool arm.
ss = mat("Scrapper_Shell", [120, 130, 128, 255], 0.35, 0.62)
sj = mat("Scrapper_Joint", [35, 41, 44, 255], 0.4, 0.72)
sh = mat("Scrapper_Hostile", [250, 95, 38, 255], 0, 0.35, [0.8, 0.08, 0.01])
sd = mat("Scrapper_Damage", [82, 48, 30, 255], 0.25, 0.85)
scene = trimesh.Scene()
shell, joint, damage = [], [], []

body = trimesh.creation.icosphere(1, 0.55)
body.apply_scale([1.25, 0.7, 0.62])
shell.extend([body, baked(trimesh.creation.box([0.92, 0.54, 0.20]), tf((0, 0.02, 0.34)))])
joint.extend([
    baked(trimesh.creation.box([0.72, 0.40, 0.18]), tf((0, -0.02, -0.24))),
    baked(trimesh.creation.cylinder(0.16, 0.22, sections=8), tf((0, 0, 0.53))),
])

for x, side in [(-0.48, -1), (0.48, 1), (-0.38, -1), (0.38, 1)]:
    joint.append(baked(trimesh.creation.cylinder(0.07, 0.48, sections=6), tf((x, 0, -0.30), rot=[(0.65 * side, [0, 1, 0])])))
    shell.append(baked(trimesh.creation.box([0.28, 0.24, 0.09]), tf((x + 0.20 * side, 0.07, -0.58))))

joint.append(baked(trimesh.creation.cylinder(0.085, 0.62, sections=7), tf((-0.62, 0.06, 0.02), rot=[(0.82, [0, 1, 0])])))
shell.append(baked(trimesh.creation.box([0.28, 0.22, 0.10]), tf((-0.86, 0.16, -0.12))))
damage.append(baked(trimesh.creation.icosphere(1, 0.12), tf((0.56, 0.18, 0))))

add(scene, "Scrapper_ShellAssembly", shell, ss)
add(scene, "Scrapper_JointAssembly", joint, sj)
add(scene, "Scrapper_DamageCore", damage, sd)
add(scene, "Scrapper_HostileEye", [baked(trimesh.creation.box([0.42, 0.07, 0.10]), tf((0, 0.47, 0.12)))], sh)
add(scene, "Scrapper_DamagedArm", [baked(trimesh.creation.cylinder(0.095, 0.44, sections=7), tf((0.62, 0.03, 0.02), rot=[(-0.95, [0, 1, 0])]))], sd)
add(scene, "Scrapper_LooseForearmPlate", [baked(trimesh.creation.box([0.26, 0.18, 0.09]), tf((0.82, 0.05, -0.18)))], sd)

with open(os.path.join(ENEMIES, "scrapper-damaged-m0-v2.glb"), "wb") as handle:
    handle.write(scene.export(file_type="glb"))


# Wayfarer Scar — layered transit bulkheads, cargo and Relay framing.
shell_material = mat("Scar_Shell", [75, 85, 90, 255], 0.35, 0.67)
ceramic_material = mat("Scar_Ceramic", [150, 158, 156, 255], 0.05, 0.6)
resonance_material = mat("Scar_Resonance", [45, 205, 210, 255], 0, 0.35, [0.08, 0.46, 0.52])
damage_material = mat("Scar_Damage", [125, 68, 34, 255], 0.15, 0.85)
scene = trimesh.Scene()
shell, ceramic, resonance, damage = [], [], [], []

for x in (-7.25, -4.55):
    shell.append(baked(trimesh.creation.box([0.34, 0.56, 3.25]), tf((x, 1.22, 2.05))))
    ceramic.append(baked(trimesh.creation.box([0.14, 0.60, 2.65]), tf((x, 1.25, 2.10))))
ceramic.append(baked(trimesh.creation.box([3.15, 0.60, 0.34]), tf((-5.9, 1.22, 3.68))))

shell.extend([
    baked(trimesh.creation.box([0.24, 0.42, 2.65]), tf((-6.65, 1.15, 2.10), rot=[(0.20, [0, 1, 0])])),
    baked(trimesh.creation.box([0.20, 0.42, 2.45]), tf((-5.30, 1.10, 2.00), rot=[(-0.18, [0, 1, 0])])),
])

for x, z, length in [(-3.7, 5.20, 3.6), (0.2, 5.55, 3.4), (4.0, 5.10, 2.9)]:
    shell.append(baked(trimesh.creation.box([length, 0.32, 0.22]), tf((x, 1.72, z))))
    resonance.append(baked(trimesh.creation.box([length * 0.72, 0.05, 0.05]), tf((x, 1.90, z - 0.04))))

for x, z, scale in [(-6.35, 0.52, 1), (-5.60, 0.42, 0.78), (2.9, 0.48, 0.92)]:
    shell.append(baked(trimesh.creation.box([0.78 * scale, 0.70, 0.72 * scale]), tf((x, 1.20, z))))
    damage.append(baked(trimesh.creation.box([0.62 * scale, 0.74, 0.08]), tf((x, 1.22, z + 0.10))))

for x in (6.55, 7.55):
    ceramic.append(baked(trimesh.creation.box([0.24, 0.54, 3.15]), tf((x, 1.35, 2.15))))
ceramic.append(baked(trimesh.creation.box([1.26, 0.56, 0.22]), tf((7.05, 1.35, 3.72))))

for side in (-1, 1):
    shell.append(baked(trimesh.creation.box([0.13, 0.48, 1.25]), tf((7.05 + 0.72 * side, 1.28, 2.55), rot=[(-0.10 * side, [0, 1, 0])])))

for x, z, rotation in [(-2.7, 3.65, 0.12), (-1.1, 4.25, -0.20), (2.0, 4.15, 0.23), (4.8, 3.75, -0.15)]:
    damage.append(baked(trimesh.creation.box([1.15, 0.16, 0.38]), tf((x, 2.10, z), rot=[(rotation, [0, 0, 1])])))

add(scene, "Scar_ShellAssembly", shell, shell_material)
add(scene, "Scar_CeramicAssembly", ceramic, ceramic_material)
add(scene, "Scar_ResonanceAssembly", resonance, resonance_material)
add(scene, "Scar_DamageAssembly", damage, damage_material)

with open(os.path.join(ENVIRONMENT, "wayfarer-scar-setdress-m0-v2.glb"), "wb") as handle:
    handle.write(scene.export(file_type="glb"))

for path in (
    os.path.join(CHARACTERS, "wayfarer-mara-m0-v2.glb"),
    os.path.join(ENEMIES, "scrapper-damaged-m0-v2.glb"),
    os.path.join(ENVIRONMENT, "wayfarer-scar-setdress-m0-v2.glb"),
):
    loaded = trimesh.load(path, force="scene")
    print(
        os.path.relpath(path, ROOT),
        os.path.getsize(path),
        len(loaded.geometry),
        sorted(loaded.graph.nodes_geometry),
    )
