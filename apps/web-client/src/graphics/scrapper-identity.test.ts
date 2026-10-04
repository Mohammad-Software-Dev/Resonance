import { describe, expect, it } from "vitest";
import {
  scrapperV3IdentityProfile,
  scrapperV3RequiredParts,
} from "./scrapper-identity";

describe("Scrapper v3 identity", () => {
  it("publishes a wider low-slung maintenance-machine profile", () => {
    const profile = scrapperV3IdentityProfile();
    expect(profile.bodyScaleX).toBeGreaterThan(1);
    expect(profile.bodyScaleY).toBeLessThan(1);
    expect(profile.sensorHood[0]).toBeGreaterThan(profile.sensorHood[1]);
    expect(profile.locomotionPod[1]).toBeGreaterThan(profile.locomotionPod[2]);
    expect(profile.hostileSensorScaleX).toBeGreaterThan(profile.hostileSensorScaleY);
  });

  it("requires articulated locomotion, sensor and asymmetric tool parts", () => {
    expect(scrapperV3RequiredParts()).toEqual([
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
    ]);
  });

  it("keeps the encounter bracket large enough to frame the articulated subject", () => {
    const profile = scrapperV3IdentityProfile();
    expect(profile.bracketHalfWidth).toBeGreaterThanOrEqual(1.3);
    expect(profile.bracketHalfHeight).toBeGreaterThanOrEqual(0.85);
  });
});
