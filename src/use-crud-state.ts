import { useReducer, useRef, useCallback } from "react";

import { WithId } from "./types";
import { reducer } from "./reducer";

type Selectors<T extends WithId<T>> = {
  getAll: () => T[];
  getById: (id: string) => T | undefined;
  exists: (id: string) => boolean;
};

type Setters<T extends WithId<T>> = {
  create: (item: T) => void;
  remove: (id: string) => void;
  update: (id: string, data: Partial<Omit<T, "id">>) => void;
};

export const useCrudState = <T extends WithId<T>>(
  initialState: T[] = []
): [Selectors<T>, Setters<T>] => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const stateReference = useRef(state);

  stateReference.current = state;

  const selectors: Selectors<T> = {
    getAll: useCallback(() => stateReference.current, []),
    getById: useCallback(
      (id) => stateReference.current.find((item) => item.id === id),
      []
    ),
    exists: useCallback(
      (id) => stateReference.current.some((item) => item.id === id),
      []
    ),
  };

  const setters: Setters<T> = {
    create: useCallback(
      (item) => dispatch({ type: "CREATE", payload: { data: item } }),
      []
    ),
    remove: useCallback(
      (id) => dispatch({ type: "REMOVE", payload: { id } }),
      []
    ),
    update: useCallback(
      (id, data) => dispatch({ type: "UPDATE", payload: { id, data } }),
      []
    ),
  };

  return [selectors, setters];
};
