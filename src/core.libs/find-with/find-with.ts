import {
  checkObjectsMatch,
  Matcher,
} from "../check-objects-match/check-objects-match"

/**
 * Returns the first object in the array with matching fields, or `undefined`
 * if no such object is found.
 *
 * @name findWith
 * @tag Array
 *
 * @template {Record<string, unknown>} T
 * @param {Matcher<T>} matcher - The fields to match against.
 * @param {T[]}        input   - The array of objects to search.
 *
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
