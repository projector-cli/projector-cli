import { randomInt } from "crypto";

export class Utils {
  public static randomColor(): string {
    const randomBetween0and1 = randomInt(100) / 100;
    return ((randomBetween0and1 * 0xffffff) << 0).toString(16).padStart(6, "0");
  }
}
