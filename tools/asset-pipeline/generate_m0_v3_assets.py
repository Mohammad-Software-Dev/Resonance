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

# Authoring: X horizontal, Y depth, Z vertical. Runtime Babylon is Y-up.
AUTHORING_TO_RUNTIME = rotation_matrix(-np.pi / 2, [1, 0, 0])


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
    mesh = mesh.copy()
    mesh.apply_transform(AUTHORING_TO_RUNTIME)
    mesh.visual = trimesh.visual.TextureVisuals(material=material)
    scene.add_geometry(mesh, node_name=name, geom_name=name)


def box(extents, pos, rot=None, scale=None):
    return baked(trimesh.creation.box(extents), tf(pos, rot=rot, scale=scale))


def cyl(radius, height, pos, sections=10, rot=None, scale=None):
    return baked(trimesh.creation.cylinder(radius, height, sections=sections), tf(pos, rot=rot, scale=scale))


def sph(radius, pos, subdivisions=2, scale=None):
    mesh = trimesh.creation.icosphere(subdivisions, radius)
    if scale:
        mesh.apply_scale(scale)
    return baked(mesh, tf(pos))


def capsule(radius, height, pos, scale=None, rot=None):
    mesh = trimesh.creation.capsule(height=height, radius=radius, count=[12, 12])
    return baked(mesh, tf(pos, rot=rot, scale=scale))


def wedge_prism(width=1.5, depth=0.62, z_bottom=-0.35, z_back=0.34, z_front=0.14):
    side = np.array([
        [-width * 0.50, z_bottom + 0.07],
        [-width * 0.44, z_back * 0.72],
        [-width * 0.16, z_back],
        [ width * 0.31, z_back * 0.92],
        [ width * 0.50, z_front],
        [ width * 0.43, z_bottom],
        [-width * 0.30, z_bottom],
    ], dtype=float)
    vertices = []
    for y in (-depth / 2, depth / 2):
        for x, z in side:
            vertices.append([x, y, z])
    n = len(side)
    faces = []
    for offset, reverse in ((0, True), (n, False)):
        for i in range(1, n - 1):
            tri = [offset, offset + i, offset + i + 1]
            faces.append(tri[::-1] if reverse else tri)
    for i in range(n):
        j = (i + 1) % n
        faces.extend([[i, j, n + j], [i, n + j, n + i]])
    return trimesh.Trimesh(vertices=np.array(vertices), faces=np.array(faces), process=True)


# Mara Venn v3 — materially improved authored prototype silhouette.
ms = mat("Mara_Suit", [78, 91, 103, 255], 0.18, 0.58)
mc = mat("Mara_Ceramic", [182, 190, 187, 255], 0.06, 0.42)
mr = mat("Mara_Resonance", [28, 214, 228, 255], 0.0, 0.26, [0.07, 0.62, 0.72])
md = mat("Mara_Dark", [25, 31, 37, 255], 0.22, 0.67)
mf = mat("Mara_Fabric", [48, 55, 61, 255], 0.0, 0.92)
scene = trimesh.Scene()
suit, ceramic, resonance, dark, fabric = [], [], [], [], []

suit.extend([
    capsule(0.255, 0.56, (0, 0, 0.56), scale=(1.10, 0.73, 1.0)),
    capsule(0.205, 0.26, (0, 0, 0.08), scale=(1.12, 0.76, 0.90)),
])
dark.extend([
    cyl(0.145, 0.15, (0, 0, 0.98), sections=10),
    box([0.42, 0.28, 0.18], (0, -0.20, 0.45)),
    box([0.30, 0.22, 0.14], (0, -0.24, 0.72)),
])
ceramic.extend([
    box([0.55, 0.15, 0.34], (0, 0.18, 0.72), rot=[(-0.04, [1,0,0])]),
    box([0.43, 0.14, 0.15], (0, 0.175, 0.47)),
    box([0.14, 0.13, 0.26], (-0.28, 0.13, 0.60), rot=[(0.12,[0,1,0])]),
    box([0.14, 0.13, 0.26], ( 0.28, 0.13, 0.60), rot=[(-0.12,[0,1,0])]),
])
dark.extend([
    box([0.46, 0.16, 0.56], (0, -0.26, 0.50)),
    cyl(0.105, 0.46, (-0.31, -0.31, 0.43), sections=10),
    box([0.16, 0.13, 0.28], (0.31, -0.30, 0.66)),
])
resonance.extend([
    box([0.10, 0.045, 0.42], (0.11, -0.355, 0.53)),
    cyl(0.095, 0.08, (-0.31, -0.365, 0.55), sections=12),
])

for x, side in [(-0.39, -1), (0.39, 1)]:
    ceramic.append(sph(0.18, (x, 0.01, 0.78), subdivisions=2, scale=(1.18, 0.78, 0.72)))
    upper_x = x * 1.04
    suit.append(cyl(0.095, 0.36, (upper_x, 0.0, 0.51), sections=9, rot=[((0.10 if side < 0 else -0.08), [0,1,0])]))
    dark.append(sph(0.105, (x * 1.07, 0.02, 0.30), subdivisions=1, scale=(1.0,0.82,0.92)))
    dark.append(cyl(0.088, 0.34, (x * 1.10, 0.025, 0.10), sections=9, rot=[((-0.05 if side < 0 else 0.08), [0,1,0])]))
    ceramic.append(box([0.18, 0.16, 0.18], (x * 1.12, 0.05, -0.10)))

ceramic.extend([
    box([0.22, 0.20, 0.25], (0.455, 0.035, 0.015), rot=[(-0.08,[0,1,0])]),
    box([0.17, 0.17, 0.18], (-0.455, 0.035, 0.015)),
])
resonance.extend([
    cyl(0.15, 0.13, (0.48, 0.09, -0.02), sections=12),
    box([0.12, 0.055, 0.30], (0.455, 0.165, 0.03)),
])

for x in (-0.16, 0.16):
    suit.append(cyl(0.115, 0.42, (x, 0, -0.28), sections=9, rot=[((0.025 if x < 0 else -0.025), [0,1,0])]))
    ceramic.append(sph(0.135, (x, 0.07, -0.51), subdivisions=1, scale=(1.05,0.82,0.76)))
    dark.append(cyl(0.10, 0.42, (x, 0, -0.75), sections=9))
    ceramic.append(box([0.21, 0.18, 0.30], (x, 0.075, -0.99)))
    dark.append(box([0.25, 0.34, 0.13], (x, 0.055, -1.16), rot=[(-0.08,[1,0,0])]))

fabric.extend([
    box([0.105, 0.045, 0.63], (-0.29, -0.14, -0.25), rot=[(0.14,[0,1,0])]),
    cyl(0.025, 0.42, (-0.20, -0.28, 0.18), sections=8, rot=[(0.32,[0,1,0])]),
    cyl(0.022, 0.36, (0.21, -0.29, 0.20), sections=8, rot=[(-0.25,[0,1,0])]),
])

add(scene, "Mara_SuitBody", suit, ms)
add(scene, "Mara_CeramicRig", ceramic, mc)
add(scene, "Mara_DarkRig", dark, md)
add(scene, "Mara_ResonanceAccents", resonance, mr)
add(scene, "Mara_FabricTab", fabric, mf)

helmet = trimesh.creation.icosphere(3, 0.265)
helmet.apply_scale([1.0, 0.90, 1.08])
add(scene, "Mara_Helmet", [baked(helmet, tf((0, 0, 1.235)))], mc)
add(scene, "Mara_Visor", [
    box([0.35, 0.055, 0.135], (0, 0.238, 1.255)),
    box([0.27, 0.058, 0.035], (0.02, 0.244, 1.345)),
], mr)
add(scene, "Mara_GauntletEmitter", [
    sph(0.105, (0.50, 0.12, -0.07), subdivisions=2, scale=(1.0,0.72,1.0)),
    cyl(0.125, 0.055, (0.50, 0.165, -0.07), sections=12),
], mr)

mara_path = os.path.join(CHARACTERS, "wayfarer-mara-m0-v3.glb")
with open(mara_path, "wb") as handle:
    handle.write(scene.export(file_type="glb"))


# Damaged Scrapper v3 — wedge chassis with readable supports and directional sensor face.
ss = mat("Scrapper_Shell", [116, 128, 128, 255], 0.38, 0.60)
sj = mat("Scrapper_Joint", [32, 39, 43, 255], 0.42, 0.70)
sh = mat("Scrapper_Hostile", [250, 91, 32, 255], 0.0, 0.30, [0.85, 0.07, 0.005])
sd = mat("Scrapper_Damage", [86, 49, 28, 255], 0.28, 0.86)
scene = trimesh.Scene()
shell, joint, damage = [], [], []

chassis = wedge_prism(width=1.55, depth=0.64, z_bottom=-0.32, z_back=0.40, z_front=0.13)
chassis.apply_transform(tf((0, 0, 0.04)))
shell.append(chassis)
shell.extend([
    box([0.78, 0.48, 0.12], (-0.10, -0.01, 0.39), rot=[(0.04,[0,1,0])]),
    box([0.34, 0.55, 0.22], (-0.56, 0.00, -0.03), rot=[(-0.12,[0,1,0])]),
    box([0.28, 0.55, 0.19], (0.57, 0.00, -0.07), rot=[(0.12,[0,1,0])]),
])
joint.extend([
    box([0.92, 0.40, 0.15], (-0.05, -0.02, -0.37)),
    cyl(0.13, 0.20, (-0.06, 0.0, 0.50), sections=10),
])
for x, side, zoff in [(-0.57,-1,0.0),(-0.29,-1,-0.02),(0.30,1,-0.02),(0.57,1,0.0)]:
    joint.append(sph(0.085, (x, 0.0, -0.30+zoff), subdivisions=1, scale=(1,0.9,1)))
    joint.append(cyl(0.060, 0.42, (x + 0.10*side, 0.0, -0.49+zoff), sections=8, rot=[(0.52*side,[0,1,0])]))
    shell.append(box([0.30, 0.24, 0.08], (x + 0.22*side, 0.05, -0.69+zoff), rot=[(0.06*side,[0,1,0])]))
joint.extend([
    sph(0.10, (-0.63, 0.03, 0.08), subdivisions=1),
    cyl(0.075, 0.38, (-0.78, 0.04, -0.02), sections=8, rot=[(0.86,[0,1,0])]),
    sph(0.08, (-0.91, 0.05, -0.18), subdivisions=1),
])
shell.extend([
    box([0.23,0.23,0.10], (-0.98,0.13,-0.24)),
    box([0.10,0.30,0.22], (-1.07,0.10,-0.31), rot=[(0.16,[0,1,0])]),
])
damage.extend([
    sph(0.105, (0.63,0.04,0.06), subdivisions=1),
    cyl(0.082, 0.42, (0.77,0.03,-0.07), sections=8, rot=[(-1.02,[0,1,0])]),
    box([0.27,0.18,0.08], (0.91,0.06,-0.26), rot=[(-0.26,[0,1,0])]),
    box([0.15,0.12,0.10], (0.50,0.19,-0.02), rot=[(0.40,[0,0,1])]),
])
shell.extend([
    box([0.66, 0.14, 0.18], (0.08, 0.31, 0.19), rot=[(-0.04,[1,0,0])]),
    box([0.22, 0.16, 0.10], (-0.31,0.30,0.18)),
])
damage.extend([
    box([0.20,0.10,0.07], (0.48,0.31,0.20), rot=[(0.32,[0,0,1])]),
    box([0.13,0.09,0.06], (0.59,0.28,0.10), rot=[(-0.28,[0,0,1])]),
])

add(scene, "Scrapper_Torso", shell, ss)
add(scene, "Scrapper_JointAssembly", joint, sj)
add(scene, "Scrapper_DamageCore", damage, sd)
add(scene, "Scrapper_HostileEye", [
    box([0.46, 0.065, 0.095], (0.10, 0.395, 0.205)),
    box([0.12, 0.070, 0.055], (-0.23,0.390,0.205)),
], sh)
add(scene, "Scrapper_DamagedArm", [
    cyl(0.078, 0.43, (0.76, 0.035, -0.08), sections=8, rot=[(-1.02,[0,1,0])])
], sd)
add(scene, "Scrapper_LooseForearmPlate", [
    box([0.27,0.18,0.08], (0.91,0.06,-0.26), rot=[(-0.26,[0,1,0])])
], sd)

scrapper_path = os.path.join(ENEMIES, "scrapper-damaged-m0-v3.glb")
with open(scrapper_path, "wb") as handle:
    handle.write(scene.export(file_type="glb"))


# Wayfarer Scar setdress v3 — layered transit profiles, cargo pods and Relay framing.
shell_material = mat("Scar_Shell", [72, 82, 88, 255], 0.36, 0.66)
ceramic_material = mat("Scar_Ceramic", [154, 162, 160, 255], 0.05, 0.58)
resonance_material = mat("Scar_Resonance", [42, 205, 211, 255], 0.0, 0.32, [0.07,0.48,0.55])
damage_material = mat("Scar_Damage", [128, 68, 32, 255], 0.16, 0.84)
scene = trimesh.Scene()
shell, ceramic, resonance, damage = [], [], [], []
transit_bulkhead, cargo_cluster, service_spine = [], [], []

for x in (-7.28, -4.62):
    transit_bulkhead.extend([
        box([0.36,0.58,3.30], (x,1.23,2.04)),
        box([0.55,0.46,0.22], (x + (0.16 if x < -6 else -0.16), 1.12, 0.54)),
        box([0.48,0.46,0.20], (x + (-0.12 if x < -6 else 0.12), 1.12, 3.55)),
    ])
    ceramic.extend([
        box([0.13,0.61,2.55], (x,1.26,2.10)),
        box([0.25,0.62,0.20], (x,1.27,3.28)),
    ])
ceramic.extend([
    box([3.20,0.60,0.30], (-5.95,1.23,3.72)),
    box([2.62,0.62,0.12], (-5.95,1.28,3.45)),
])
for x,z,ang in [(-6.72,2.10,0.22),(-5.28,2.03,-0.20)]:
    transit_bulkhead.append(box([0.20,0.40,2.50], (x,1.15,z), rot=[(ang,[0,1,0])]))

for x,z,length in [(-3.6,5.18,3.7),(0.15,5.48,3.45),(3.9,5.08,3.0)]:
    service_spine.extend([
        box([length,0.28,0.16], (x,1.72,z)),
        box([length*0.92,0.16,0.10], (x,1.60,z-0.18)),
    ])
    for dx in (-0.38,0,0.38):
        service_spine.append(box([0.09,0.30,0.55], (x+dx*length/1.2,1.67,z-0.14), rot=[(0.13 if dx<0 else -0.13,[0,1,0])]))
    resonance.append(box([length*0.68,0.045,0.045], (x,1.91,z-0.04)))

for x,z,scale in [(-6.35,0.52,1.0),(-5.58,0.43,0.78),(2.88,0.48,0.92)]:
    cargo_cluster.extend([
        box([0.72*scale,0.66,0.62*scale], (x,1.20,z)),
        cyl(0.18*scale,0.67, (x-0.20*scale,1.20,z+0.02), sections=10, rot=[(np.pi/2,[1,0,0])]),
        cyl(0.18*scale,0.67, (x+0.20*scale,1.20,z+0.02), sections=10, rot=[(np.pi/2,[1,0,0])]),
    ])
    ceramic.extend([
        box([0.78*scale,0.08,0.08], (x,1.56,z+0.22)),
        box([0.78*scale,0.08,0.08], (x,0.84,z-0.22)),
    ])
    damage.append(box([0.55*scale,0.72,0.07], (x,1.22,z+0.12), rot=[(0.08,[0,0,1])]))

for x in (6.52,7.58):
    ceramic.extend([
        box([0.24,0.54,3.18], (x,1.35,2.16)),
        box([0.38,0.48,0.22], (x,1.34,0.64)),
        box([0.36,0.48,0.18], (x,1.34,3.62)),
    ])
ceramic.extend([
    box([1.34,0.56,0.22], (7.05,1.35,3.77)),
    box([0.88,0.50,0.13], (7.05,1.38,3.48)),
])
for side in (-1,1):
    shell.extend([
        box([0.13,0.48,1.25], (7.05+0.72*side,1.28,2.55), rot=[(-0.10*side,[0,1,0])]),
        box([0.09,0.42,0.72], (7.05+0.52*side,1.18,2.54), rot=[(0.18*side,[0,1,0])]),
    ])
    resonance.append(box([0.055,0.045,0.72], (7.05+0.39*side,0.99,2.56)))
resonance.extend([
    cyl(0.38,0.07,(7.05,1.03,2.55),sections=20,rot=[(np.pi/2,[1,0,0])]),
    cyl(0.20,0.08,(7.05,0.98,2.55),sections=16,rot=[(np.pi/2,[1,0,0])]),
])

for x,z,rotation in [(-2.7,3.65,0.12),(-1.1,4.25,-0.20),(2.0,4.15,0.23),(4.8,3.75,-0.15)]:
    damage.extend([
        box([1.15,0.16,0.34], (x,2.10,z), rot=[(rotation,[0,0,1])]),
        box([0.32,0.18,0.12], (x+0.42,2.16,z-0.22), rot=[(-rotation*1.4,[0,0,1])]),
    ])

add(scene, "Scar_TransitBulkhead", transit_bulkhead, shell_material)
add(scene, "Scar_CargoCluster", cargo_cluster, shell_material)
add(scene, "Scar_ServiceSpine", service_spine, shell_material)
add(scene, "Scar_ShellAssembly", shell, shell_material)
add(scene, "Scar_CeramicAssembly", ceramic, ceramic_material)
add(scene, "Scar_ResonanceAssembly", resonance, resonance_material)
add(scene, "Scar_DamageAssembly", damage, damage_material)

scar_path = os.path.join(ENVIRONMENT, "wayfarer-scar-setdress-m0-v3.glb")
with open(scar_path, "wb") as handle:
    handle.write(scene.export(file_type="glb"))

for path in (mara_path, scrapper_path, scar_path):
    loaded = trimesh.load(path, force="scene")
    print(
        os.path.relpath(path, ROOT),
        os.path.getsize(path),
        len(loaded.geometry),
        sum(len(g.vertices) for g in loaded.geometry.values()),
        sorted(loaded.graph.nodes_geometry),
    )
