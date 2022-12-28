import { WithId } from "./types";

type Action<T extends WithId<T>> =
  | {
      type: "CREATE";
      payload: {
        data: T;
      };
    }
  | {
      type: "REMOVE";
      payload: {
        id: string;
      };
    }
  | {
      type: "UPDATE";
      payload: {
        id: string;
        data: Partial<Omit<T, "id">>;
      };
    };

const reducer = <T extends WithId<T>>(
  state: T[],
  { type, payload }: Action<T>
): T[] => {
  switch (type) {
    case "CREATE": {
      if (state.some((item) => item.id === payload.data.id)) {
        throw new Error(`Item with id ${payload.data.id} already exists`);
      }

      return [...state, payload.data];
    }
    case "REMOVE": {
      if (!state.some((item) => item.id === payload.id)) {
        throw new Error(`Item with id ${payload.id} not found`);
      }

      return state.filter((item) => item.id !== payload.id);
    }
    case "UPDATE": {
      if (!state.some((item) => item.id === payload.id)) {
        throw new Error(`Item with id ${payload.id} not found`);
      }

      return state.map((item) =>
        item.id === payload.id ? { ...item, ...payload.data } : item
      );
    }
    default: {
      return state;
    }
  }
};

export { reducer };
