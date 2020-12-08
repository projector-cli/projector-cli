import { NumberConstants } from "../constants";

export class DateUtils {
  public static toSimpleDateString(date?: Date): string {
    if (!date) {
      return "";
    }

    return date.toLocaleDateString(undefined, {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  public static toNumberDateString(date: Date): string {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }

  public static addDays(date: Date, days: number): Date {
    return new Date(date.getTime() + NumberConstants.millisecondsInADay * days);
  }

  public static nextMonday(): Date {
    const d = new Date();
    d.setDate(d.getDate() + ((1 + 7 - d.getDay()) % 7));
    return d;
  }
}
