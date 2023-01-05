import { checkIsSomething } from "./check-is-something"

describe("checkIsSomething", () => {
  test("given [string, number, object, array, symbol and function values] should [return true]", () => {
    expect(checkIsSomething("test")).toBe(true)
    expect(checkIsSomething(123)).toBe(true)
    expect(checkIsSomething({ key: "value" })).toBe(true)
    expect(checkIsSomething([1, 2, 3])).toBe(true)
    expect(checkIsSomething(Symbol("test"))).toBe(true)
    expect(checkIsSomething(() => 1)).toBe(true)
  })

  test("given [null and undefined values] should [return false]", () => {
    // eslint-disable-next-line unicorn/no-null
    expect(checkIsSomething(null)).toBe(false)

    // eslint-disable-next-line unicorn/no-useless-undefined
    expect(checkIsSomething(undefined)).toBe(false)
  })
})
