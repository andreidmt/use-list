import { checkObjectsMatch, Matcher } from "./object"

/**
 * Returns whether the array contains an object with matching fields.
 *
 * @name hasWith
 *
 * @template {Record<string, unknown>} T
 * @param {Matcher<T>} matcher - The fields to match against.
 * @param {T[]}        input   - The array of objects to search.
 * @returns {boolean} `true` if the array contains an object with matching
 * fields, `false` otherwise.
 *
 * @example
 * const input = [
 *   { a: 1, b: 2 },
 *   { a: 3, b: 4 },
 *   { a: 5, b: 6 },
 * ];
 *
 * hasWith({ a: 1, b: 2 }, input); // true
 * hasWith({ a: 3, b: 4 }, input); // true
 * hasWith({ a: 1, b: 4 }, input); // false
 */
export type HasWith = <T extends Record<string, unknown>>(
  matcher: Matcher<T>,
  input: T[]
) => boolean

export const hasWith: HasWith = (matcher, input) =>
  input.some(item => checkObjectsMatch(matcher, item))

/**
 * Returns the first object in the array with matching fields, or `undefined`
 * if no such object is found.
 *
 * @name findWith
 *
 * @template {Record<string, unknown>} T
 * @param {Matcher<T>} matcher - The fields to match against.
 * @param {T[]}        input   - The array of objects to search.
 * @returns {T | undefined} The first object in the array with matching fields,
 * or `undefined` if no such object is found.
 *
 * @example
 * const input = [
 *   { a: 1, b: 2 },
 *   { a: 3, b: 4 },
 *   { a: 5, b: 6 },
 * ];
 *
 * findWith({ a: 1, b: 2 }, input); // { a: 1, b: 2 }
 * findWith({ a: 3, b: 4 }, input); // { a: 3, b: 4 }
 * findWith({ a: 1, b: 4 }, input); // undefined
 */
export type FindWith = <T extends Record<string, unknown>>(
  matcher: Matcher<T>,
  input: T[]
) => T | undefined

export const findWith: FindWith = (matcher, input) =>
  input.find(item => checkObjectsMatch(matcher, item))
