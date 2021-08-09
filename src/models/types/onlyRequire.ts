/**
 * Given a type T, make a new type that only requires the provided keys K.
 *
 * @typedef T The type to to base the OnlyRequire on.
 * @typedef K A list of keys of T which are the only ones required.
 */
export type OnlyRequire<T, K extends keyof T> = Pick<T, K> & Partial<T>;
