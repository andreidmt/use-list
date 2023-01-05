import { useReducer, useRef } from "react"

import { reducer } from "./reducer"
import { buildReadOneHookSetter, ReadOneCRUDAction } from "./read.setter"
import { StateItem } from "./reducer.types"

type CRUDActions<T extends StateItem> = {
  readOne?: ReadOneCRUDAction<T>
}

type BuildUseCrudStateProps<T extends StateItem> = {
  name: string
  initialState: T[]
}

export const buildUseCrudState =
  <T extends StateItem>(props: BuildUseCrudStateProps<T>) =>
  <A extends CRUDActions<T>>(actions: A) => {
    const useHook = () => {
      const [state, dispatch] = useReducer(reducer<T>, {
        items: props.initialState,
        events: [],
      })
      const stateReference = useRef(state)

      stateReference.current = state

      return {
        readOne: buildReadOneHookSetter<T, A["readOne"]>({
          listName: props.name,
          action: actions.readOne,
          dispatch,
        }),
      }
    }

    return useHook
  }
