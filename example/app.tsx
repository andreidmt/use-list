import React, { FormEvent, FormEventHandler, useState } from "react"

import { useTodos } from "./app.data"

export const App = () => {
  const [selectors, setters] = useTodos()
  const [newTodoText, setNewTodoText] = useState("")

  const handleCreateTodo = (event: FormEvent) => {
    event.preventDefault()

    setters.read("createTodo", newTodoText)

    setters.create(
      {
        id: Math.random().toString().slice(2).slice(0, 5),
        text: newTodoText,
        completed: false,
      },
      true
    )
  }

  const handleChangeNewTodoText: FormEventHandler<HTMLInputElement> = event => {
    setNewTodoText(event.currentTarget.value)
  }

  return (
    <div>
      <h2>Todos</h2>
      <form onSubmit={handleCreateTodo}>
        <input
          type="text"
          value={newTodoText}
          onChange={handleChangeNewTodoText}
        />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {selectors.getAll().map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed ?? false}
              onChange={() => {
                setters.update(todo.id, {
                  completed: !todo.completed,
                })
              }}
            />
            {todo.text}
            <button
              type="button"
              onClick={() => {
                setters.remove(todo.id)
              }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
