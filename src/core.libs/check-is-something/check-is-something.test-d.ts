import { expectType } from "tsd-lite"
import { checkIsSomething } from "./check-is-something"

const input = { id: "1" } as { id: string } | undefined | null

if (checkIsSomething(input)) {
  expectType<{ id: string }>(input)
} else {
  expectType<undefined | null>(input)
}
