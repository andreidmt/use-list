export type StateEvent = {
  id: string
  type: string
  payload?: Record<string, unknown>
  error?: Record<string, unknown>
  createdAt: string
}

export type StateItem = {
  id: string
  [key: string]: unknown
}

export type State<T extends StateItem> = {
  items: T[]
  events: StateEvent[]
}
