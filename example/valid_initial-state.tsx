import React from "react";
import { useCrudState } from "../src/use-crud-state";

type Todo = {
  id: string;
  text: string;
  author?: string;
};

const data: Todo[] = [
  { id: "1", text: "Learn React", author: "John Doe" },
  { id: "2", text: "Learn TypeScript" },
];

export const TodoList = () => {
  const [selectors] = useCrudState(data);
  const todos = selectors.getAll();

  return (
    <div>
      <h2>todos</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
};
