import { expectType } from "tsd"
import { checkIsObject } from "./check-is-object"

const input: { id: string } | undefined | null = undefined

if (checkIsObject(input)) {
  expectType<{ id: string }>(input)
} else {
  expectType<undefined | null>(input)
}
