import { checkIsFunction } from "./check-is-function"

describe("checkIsFunction", () => {
  test("given [a function] should [return true]", () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const input = (): void => {}

    expect(checkIsFunction(input)).toBe(true)
  })

  test("given [a non function] should [return false]", () => {
    // eslint-disable-next-line unicorn/no-null
    const inputs = [1, "string", {}, [], true, false, null, undefined]

    for (const input of inputs) {
      expect(checkIsFunction(input)).toBe(false)
    }
  })
})
