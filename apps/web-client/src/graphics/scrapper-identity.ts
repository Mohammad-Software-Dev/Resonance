export interface ScrapperV3IdentityProfile {
  readonly bodyScaleX: number;
  readonly bodyScaleY: number;
  readonly bodyScaleZ: number;
  readonly sensorHood: readonly [number, number, number];
  readonly locomotionPod: readonly [number, number, number];
  readonly intactToolArm: readonly [number, number, number];
  readonly damagedToolArm: readonly [number, number, number];
  readonly hostileSensorScaleX: number;
  readonly hostileSensorScaleY: number;
  readonly bracketHalfWidth: number;
  readonly bracketHalfHeight: number;
}

export function scrapperV3IdentityProfile(): ScrapperV3IdentityProfile {
  return {
    bodyScaleX: 1.08,
    bodyScaleY: 0.96,
    bodyScaleZ: 1.02,
    sensorHood: [0.76, 0.22, 0.44],
    locomotionPod: [0.32, 0.52, 0.28],
    intactToolArm: [0.22, 0.78, 0.24],
    damagedToolArm: [0.24, 0.64, 0.26],
    hostileSensorScaleX: 1.62,
    hostileSensorScaleY: 0.72,
    bracketHalfWidth: 1.18,
    bracketHalfHeight: 0.78,
  };
}

export function scrapperV3RequiredParts(): readonly string[] {
  return [
    "ScrapperV3_SensorHood",
    "ScrapperV3_LeftLocomotionPod",
    "ScrapperV3_RightLocomotionPod",
    "ScrapperV3_IntactToolArm",
    "ScrapperV3_IntactToolHead",
    "ScrapperV3_DamagedToolArm",
    "ScrapperV3_DamageFork",
  ];
}
