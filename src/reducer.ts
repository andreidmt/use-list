import {
  ReadOneActions,
  readOneEnd,
  readOneError,
  readOneStart,
  READ_ONE_EVENTS,
} from "./read.reducer"
import { StateItem, State } from "./reducer.types"

export type ReducerActions<T extends StateItem> = ReadOneActions<T>

export const reducer = <T extends StateItem>(
  state: State<T>,
  action: ReducerActions<T>
): State<T> => {
  switch (action.type) {
    case READ_ONE_EVENTS.START: {
      return readOneStart(state, action.payload)
    }
    case READ_ONE_EVENTS.END: {
      return readOneEnd(state, action.payload)
    }
    case READ_ONE_EVENTS.ERROR: {
      return readOneError(state, action.payload)
    }
    default: {
      return state
    }
  }
}
