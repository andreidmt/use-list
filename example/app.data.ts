import { buildUseCrudState } from "../src/index"

type Todo = {
  id: string
  text: string
  completed?: boolean
  author?: string
}

const todoMockData: Todo[] = [
  { id: "1", text: "Learn React", author: "John Doe" },
  { id: "2", text: "Learn TypeScript", completed: true },
]

const useTodos = buildUseCrudState<Todo>(todoMockData, {
  create: (todo: Todo, shouldThrow: boolean) => {
    console.log("create", { todo })

    if (shouldThrow) {
      throw new Error("Error creating todo")
    }

    return todo
  },
  // read: (id: string) => {
  //   console.log("read", { id })

  //   const todo = todoMockData.find(item => item.id === id)

  //   if (!todo) {
  //     throw new Error("Todo not found")
  //   }

  //   return todo
  // },
  // update: (id: string, data: Partial<Todo>) => {
  //   console.trace("update", { id, data })

  //   return {
  //     id,
  //     ...data,
  //   }
  // },
  // remove: (id: string) => {
  //   return {
  //     id,
  //   }
  // },
})

export type { Todo }
export { useTodos }
