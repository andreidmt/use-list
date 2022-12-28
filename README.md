# useCrudState

A custom React hook that provides state management functionality similar to the
built-in `useState` hook, but with the added ability to perform CRUD (create,
read, update, delete) operations on the state.

It exposes **selectors** for accessing the items in the state and **setters**
for performing CRUD operations. It also includes error handling to ensure that
the setters are used correctly.

- **CRUD operations**: `create`, `remove`, `update` setters for adding, deleting, and updating items in the state
- **Error handling**: checks to ensure that items being added or deleted actually exist, and throws errors if they do not

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
