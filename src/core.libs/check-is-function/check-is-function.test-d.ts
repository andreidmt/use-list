import { expectType } from "tsd-lite"

import { checkIsFunction } from "./check-is-function"
import { AnyMorphism } from "../types"

// eslint-disable-next-line @typescript-eslint/no-empty-function
const input: unknown = (): void => {}

if (checkIsFunction(input)) {
  expectType<AnyMorphism>(input)
}
