import { checkObjectsMatch } from "./object"

describe("checkObjectsMatch", () => {
  test("given [an empty matcher and an empty input object] should [return true]", () => {
    const matcher = {}
    const input = {}

    expect(checkObjectsMatch(matcher, input)).toBe(true)
  })

  test("given [a matcher with a single key-value pair and an input object with the same key-value pair] should [return true]", () => {
    const matcher = {
      key: "value",
    }
    const input = {
      key: "value",
    }

    expect(checkObjectsMatch(matcher, input)).toBe(true)
  })

  test("given [a matcher with a single key-value pair and an input object with a different key-value pair] should [return false]", () => {
    const matcher = {
      key: "value",
    }
    const input = {
      key: "different value",
    }

    expect(checkObjectsMatch(matcher, input)).toBe(false)
  })

  test("given [a matcher with multiple key-value pairs and an input object with all the same key-value pairs] should [return true]", () => {
    const matcher = {
      key1: "value1",
      key2: "value2",
    }
    const input = {
      key1: "value1",
      key2: "value2",
    }

    expect(checkObjectsMatch(matcher, input)).toBe(true)
  })

  test("given [a matcher with multiple key-value pairs and an input object with only some of the same key-value pairs] should [return false]", () => {
    const matcher = {
      key1: "value1",
      key2: "value2",
    }
    const input = {
      key1: "value1",
      key2: "different value",
    }

    expect(checkObjectsMatch(matcher, input)).toBe(false)
  })

  test("given [a matcher with a nested object and an input object with the same nested object] should [return true]", () => {
    const matcher = {
      key1: "value1",
      key2: {
        nestedKey: "nested value",
      },
    }
    const input = {
      key1: "value1",
      key2: {
        nestedKey: "nested value",
      },
    }

    expect(checkObjectsMatch(matcher, input)).toBe(true)
  })

  test("given [a matcher with a nested object and an input object with a different nested object] should [return false]", () => {
    const matcher = {
      key1: "value1",
      key2: {
        nestedKey: "nested value",
      },
    }
    const input = {
      key1: "value1",
      key2: {
        nestedKey: "different nested value",
      },
    }

    expect(checkObjectsMatch(matcher, input)).toBe(false)
  })

  test("given [a matcher object with functions as values and input value passes the matcher function] should [return true]", () => {
    const matcher = { a: (input: number) => input > 0 }
    const input = { a: 1 }

    expect(checkObjectsMatch(matcher, input)).toBe(true)
  })

  test("given [a matcher object with functions as values and input value does not pass the matcher function] should [return false]", () => {
    const matcher = { a: (input: number) => input > 0 }
    const input = { a: -1 }

    expect(checkObjectsMatch(matcher, input)).toBe(false)
  })
})
