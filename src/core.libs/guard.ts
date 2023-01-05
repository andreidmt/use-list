import { AnyMorphism } from "./types"

export const checkIsSomething = <T>(input: T): input is NonNullable<T> =>
  input !== null && input !== undefined

/**
 * Check if a value is a function.
 *
 * @name checkIsFunction
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

/**
 * Check if a value is an object (not including `null`).
 * This function can be used as a type guard in TypeScript.
 *
 * @param {unknown} input The value to check.
 * @returns {boolean} `true` if the value is an object (not including `null`),
 * `false` otherwise.
 *
 * @example
 * const doSomething = (input: unknown) => {
 *   if (checkIsObject(input)) {
 *     // `input` is now inferred to be an object (not including `null`)
 *     // ...
 *   }
 * }
 */
export const checkIsObject = (
  input: unknown
): input is Record<string, unknown> =>
  typeof input === "object" && input !== null && !Array.isArray(input)
