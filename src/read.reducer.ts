import { v4 as uuidv4 } from "uuid"
import { State, StateItem } from "./reducer.types"

const READ_ONE_EVENTS = {
  START: "READ_ONE_START",
  END: "READ_ONE_END",
  ERROR: "READ_ONE_ERROR",
} as const

type ReadOneActionStart = {
  type: typeof READ_ONE_EVENTS.START
  payload: {
    id: string
  }
}

type ReadOneActionEnd<T extends StateItem> = {
  type: typeof READ_ONE_EVENTS.END
  payload: {
    id: string
    data: T
  }
}

type ReadOneActionError = {
  type: typeof READ_ONE_EVENTS.ERROR
  payload: {
    id: string
    message: string
  }
}

type ReadOneActions<T extends StateItem> =
  | ReadOneActionStart
  | ReadOneActionEnd<T>
  | ReadOneActionError

const readOneStart = <T extends StateItem>(
  state: State<T>,
  { id }: ReadOneActionStart["payload"]
): State<T> => {
  return {
    ...state,
    events: [
      {
        id: uuidv4(),
        type: READ_ONE_EVENTS.START,
        payload: { id },
        createdAt: new Date().toISOString(),
      },
      ...state.events,
    ],
  }
}

const readOneEnd = <T extends StateItem>(
  state: State<T>,
  { id, data }: ReadOneActionEnd<T>["payload"]
): State<T> => {
  const hasItem = state.items.find(item => item.id === id)

  return {
    ...state,
    items: hasItem
      ? state.items.map(item => (item.id === id ? { ...item, ...data } : item))
      : [data, ...state.items],
    events: [
      {
        id: uuidv4(),
        type: READ_ONE_EVENTS.END,
        payload: { id, data },
        createdAt: new Date().toISOString(),
      },
      ...state.events,
    ],
  }
}

const readOneError = <T extends StateItem>(
  state: State<T>,
  { id, message }: ReadOneActionError["payload"]
): State<T> => {
  return {
    ...state,
    events: [
      {
        id: uuidv4(),
        type: READ_ONE_EVENTS.ERROR,
        payload: { id },
        error: {
          message,
        },
        createdAt: new Date().toISOString(),
      },
      ...state.events,
    ],
  }
}

export type { ReadOneActions }
export { READ_ONE_EVENTS, readOneStart, readOneEnd, readOneError }
