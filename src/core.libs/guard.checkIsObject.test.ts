import { checkIsObject } from "./guard"

describe("checkIsObject", () => {
  test("given [an object] should [return true]", () => {
    const input = {}

    expect(checkIsObject(input)).toBe(true)
  })

  test("given [a non object] should [return false]", () => {
    // eslint-disable-next-line unicorn/no-null, @typescript-eslint/no-empty-function
    const inputs = [1, "string", () => {}, [], true, null, undefined]

    for (const input of inputs) {
      expect(checkIsObject(input)).toBe(false)
    }
  })
})
