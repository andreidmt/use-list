import { checkIsFunction } from "../check-is-function/check-is-function"
import { checkIsObject } from "../check-is-object/check-is-object"
import { UnaryPredicate } from "../types"

/**
 * Returns whether the first object contains all the fields of the second
 * object.
 *
 * @name checkObjectsMatch
 * @tag Object
 *
 * @template {Record<string, unknown>} T
 * @param {Matcher<T>} matcher - The fields to match against.
 * @param {T}          input   - The object to check.
 * @returns {boolean} `true` if the first object contains all the fields of the
 * second object, `false` otherwise.
 *
 * @example
 * const input = { a: 1, b: 2 };
 *
 * checkObjectsMatch({ a: 1 }, input); // true
 * checkObjectsMatch({ a: 1, b: 2 }, input); // true
 * checkObjectsMatch({ a: 1, b: 3 }, input); // false
 */

export type Matcher<T> = {
  [key in keyof T]?: T[key] | UnaryPredicate<T[key]>
}

export type CheckObjectsMatch = <T extends Record<string, any>>(
  matcher: Matcher<T>,
  input: T
) => boolean

export const checkObjectsMatch: CheckObjectsMatch = (matcher, input) => {
  const matcherKeys = Object.keys(matcher)

  return matcherKeys.every(key => {
    const matcherValue = matcher[key]
    const inputValue = input[key]

    if (checkIsObject(matcherValue) && checkIsObject(inputValue)) {
      return checkObjectsMatch(matcherValue, inputValue)
    }

    if (checkIsFunction(matcherValue)) {
      return matcherValue(inputValue)
    }

    return inputValue === matcherValue
  })
}
