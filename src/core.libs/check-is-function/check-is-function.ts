import { AnyMorphism } from "../types"

/**
 * Check if a value is a function.
 *
 * @name checkIsFunction
 * @tag TypeGuards
 *
 * @param {unknown} input - The value to check.
 * @returns {boolean} - `true` if the value is a function, `false` otherwise.
 *
 * @example
 * const doSomething = (input: unknown) => {
 *   if (checkIsFunction(input)) {
 *     // `input` is now inferred to be a function
 *     // ...
 *   }
 * }
 */
export const checkIsFunction = (input: unknown): input is AnyMorphism =>
  typeof input === "function"
