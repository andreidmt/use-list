import { renderHook } from "@testing-library/react";
import { useCrudState } from "../src/use-crud-state";

const items = [
  { id: "1", name: "Item 1" },
  { id: "2", name: "Item 2" },
  { id: "3", name: "Item 3" },
];

describe("useCrudState - selectors", () => {
  test("given [initial state of 3 items], [calling 'getAll'] should [return all 3 items]", () => {
    const { result } = renderHook(() => useCrudState(items));
    const [selectors] = result.current;

    expect(selectors.getAll()).toEqual(items);
  });

  test("given [initial state of 3 items], [calling 'getById' with the 'id=2'] should [return the correct item]", () => {
    const { result } = renderHook(() => useCrudState(items));
    const [selectors] = result.current;

    expect(selectors.getById("2")).toEqual({ id: "2", name: "Item 2" });
  });

  test("given [initial state of 3 items], [calling 'exists' with an 'id' that does not exist] should [return false]", () => {
    const { result } = renderHook(() => useCrudState(items));
    const [selectors] = result.current;

    expect(selectors.exists("4")).toBe(false);
  });

  test("given [initial state of 3 items], [calling 'exists' with an 'id' that exists] should [return true]", () => {
    const { result } = renderHook(() => useCrudState(items));
    const [selectors] = result.current;

    expect(selectors.exists("2")).toBe(true);
  });
});
