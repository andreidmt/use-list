import { expectType } from "tsd"
import { checkIsSomething } from "./check-is-something"

const input: { id: string } | undefined | null = undefined

if (checkIsSomething(input)) {
  expectType<{ id: string }>(input)
} else {
  expectType<undefined | null>(input)
}
