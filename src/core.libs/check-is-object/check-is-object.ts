/**
 * Check if a value is an object (not including `null`).
 * This function can be used as a type guard in TypeScript.
 *
 * @name checkIsObject
 * @tag TypeGuard
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
