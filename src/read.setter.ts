import { Dispatch } from "react"
import { checkIsFunction } from "./core.libs/check-is-function/check-is-function"
import { AnyMorphism, Morphism } from "./core.libs/types"
import { ReadOneActions, READ_ONE_EVENTS } from "./read.reducer"
import { StateItem } from "./reducer.types"

// The "readOne" fn type if defining the action in "buildUseCRUDState"
// factory call
export type ReadOneCRUDAction<T> = Morphism<
  [id: string, ...rest: any[]],
  T | Promise<T>
>

// The "readOne" fn type returned by the hook build by the factory
export type ReadOneHookSetter<A extends AnyMorphism | undefined> = Morphism<
  A extends AnyMorphism ? Parameters<A> : [],
  Promise<void>
>

export const buildReadOneHookSetter = <
  T extends StateItem,
  A extends AnyMorphism | undefined
>({
  listName,
  action,
  dispatch,
}: {
  listName: string
  action?: A
  dispatch: Dispatch<ReadOneActions<T>>
}): ReadOneHookSetter<A> => {
  if (checkIsFunction(action)) {
    return async (...params) => {
      // TODO: fix params type any[]
      const [id] = params

      try {
        dispatch({
          type: READ_ONE_EVENTS.START,
          payload: {
            id,
          },
        })

        const result = await action(...params)

        dispatch({
          type: READ_ONE_EVENTS.END,
          payload: {
            id,
            data: result,
          },
        })
      } catch (error: any) {
        dispatch({
          type: READ_ONE_EVENTS.ERROR,
          payload: {
            id,
            message: error?.message ?? "Unknown error",
          },
        })
      }
    }
  }

  return async () => {
    throw new Error(`No 'read' action provided when calling the factory function
'buildUseCRUDState' for list '${listName}'`)
  }
}
