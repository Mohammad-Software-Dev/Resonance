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
    bodyScaleX: 1.12,
    bodyScaleY: 1.0,
    bodyScaleZ: 1.04,
    sensorHood: [0.62, 0.20, 0.46],
    locomotionPod: [0.34, 0.56, 0.34],
    intactToolArm: [0.20, 0.82, 0.26],
    damagedToolArm: [0.22, 0.70, 0.28],
    hostileSensorScaleX: 1.9,
    hostileSensorScaleY: 0.85,
    bracketHalfWidth: 1.32,
    bracketHalfHeight: 0.86,
  };
}

export function scrapperV3RequiredParts(): readonly string[] {
  return [
    "ScrapperV3_Chassis",
    "ScrapperV3_SensorHead",
    "ScrapperV3_HostileSensor",
    "ScrapperV3_SensorHood",
    "ScrapperV3_LeftLocomotionPod",
    "ScrapperV3_RightLocomotionPod",
    "ScrapperV3_LeftFoot",
    "ScrapperV3_RightFoot",
    "ScrapperV3_IntactToolArm",
    "ScrapperV3_IntactToolHead",
    "ScrapperV3_DamagedToolArm",
    "ScrapperV3_DamageFork",
  ];
}
