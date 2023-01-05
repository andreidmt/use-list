import {
  checkObjectsMatch,
  Matcher,
} from "../check-objects-match/check-objects-match"

/**
 * Returns whether the array contains an object with matching fields.
 *
 * @name hasWith
 * @tag Array
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
