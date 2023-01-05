import { expectError, expectType } from "tsd"
import { checkObjectsMatch } from "./check-objects-match"

type Todo = {
  id: string
  text: string
}

const todo: Todo = {
  id: "1",
  text: "Buy milk",
}

expectType<boolean>(checkObjectsMatch({}, todo))
expectType<boolean>(checkObjectsMatch({ id: "2" }, todo))
expectType<boolean>(
  checkObjectsMatch(
    {
      id: input => {
        expectType<string>(input)

        return input === "2"
      },
    },
    todo
  )
)

// `id` field has wrong type
expectError(checkObjectsMatch({ id: 2 }, todo))

// `label` field not defined
expectError(checkObjectsMatch({ label: "lorem" }, todo))
