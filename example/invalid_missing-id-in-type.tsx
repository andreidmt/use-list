import React from "react";
import { useCrudState } from "../src/use-crud-state";

type Todo = {
  id?: string;
  text: string;
  author?: string;
};

const data: Todo[] = [
  { text: "Learn React", author: "John Doe" },
  { id: "2", text: "Learn TypeScript" },
];

export const TodoList = () => {
  // Error: Property 'id' is optional in type 'Todo' but required
  // in type '{ id: string; }'.
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
