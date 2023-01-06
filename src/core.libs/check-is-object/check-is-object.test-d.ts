import { expectType } from "tsd-lite"
import { checkIsObject } from "./check-is-object"

const input = { id: "1" } as Record<string, string> | number

if (checkIsObject(input)) {
  expectType<Record<string, string>>(input)
} else {
  expectType<number>(input)
}
