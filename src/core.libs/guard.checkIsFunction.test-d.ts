import { expectType } from "tsd"

import { checkIsFunction } from "./guard"
import { UnknownMorphism } from "./types"

// eslint-disable-next-line @typescript-eslint/no-empty-function
const input: unknown = (): void => {}

if (checkIsFunction(input)) {
  expectType<UnknownMorphism>(input)
} else {
  expectType<unknown>(input)
}
