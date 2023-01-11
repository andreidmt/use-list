# useCrudState

A state management custom React hook, similar to `useState`, with the
ability to perform CRUD (create, read, update, delete) operations. 

## Table of Contents

<!-- vim-markdown-toc GFM -->

- [Installation](#installation)
- [Example](#example)

<!-- vim-markdown-toc -->

## Installation

## Example

```javascript
import { useCrudState } from '@asd14/use-crud-state'

const TodoList = () => {
  const initialState = [
    { id: 1, text: 'Take out the trash', completed: false },
    { id: 2, text: 'Do the dishes', completed: false },
    { id: 3, text: 'Buy milk', completed: true }
  ];

  const [selectors, setters] = useCrudState(initialState);

  const handleAddTodo = e => {
    e.preventDefault();
    const text = e.target.elements.todoText.value;
    setters.create({ id: Date.now(), text, completed: false });
  };

  const handleDeleteTodo = id => {
    setters.remove(id);
  };

  const handleToggleTodo = id => {
    const todo = selectors.getById(id);
    setters.update(id, { completed: !todo.completed });
  };

  return (
    <div>
      <form onSubmit={handleAddTodo}>
        <input type="text" name="todoText" />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {selectors.all().map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo.id)}
            />
            {todo.text}
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```
