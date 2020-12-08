export type Dictionary<T = string> = { [id: string]: T | Dictionary<T> };
