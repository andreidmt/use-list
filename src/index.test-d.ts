import { expectError, expectType } from "tsd"

import { buildUseCrudState } from "."
import { ReadOneHookSetter } from "./read.setter"

type Todo = {
  id: string
  text: string
  completed?: boolean
  author?: string
}

const useTodo = buildUseCrudState<Todo>({
  name: "todos",
  initialState: [],
})({
  readOne: (id: string, foo: number, bar: string) => {
    return {
      id: "2",
      text: `${id} ${foo} ${bar}`,
    }
  },
})

export const Test = () => {
  const { readOne } = useTodo()

  expectType<
    ReadOneHookSetter<
      (id: string, foo: number, bar: string) => { id: string; text: string }
    >
  >(readOne)

  expectError(readOne())

  expectError(readOne(1, 2, "3"))
}
