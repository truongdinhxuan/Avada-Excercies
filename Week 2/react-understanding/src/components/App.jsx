import { useState } from 'react';
import './App.css';
import Todo from './todo/Todo';
import TodoForm from './todo/TodoForm';

function App() {
  const todoList = [
    { text: "Todo 1", isCompleted: false },
    { text: "Todo 2", isCompleted: false },
    { text: "Todo 3", isCompleted: false },
  ]
  const [todos, setTodos] = useState(todoList)
  
  const addTodo = text => {
    const newTodos = [...todoList, {text}]
    setTodos(newTodos)
  }

  const completeTodo = index => {
    const newTodos = [...todos]
    newTodos[index].isCompleted=true
    setTodos(newTodos) 
  }

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }
  return (
    <div className="app">
      <div className='todo-list'>
        {todos.map((todoList, index) => (
          <Todo
            key={index}
            index={index}
            todo={todoList}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm
          addTodo={addTodo}
        />
      </div>
    </div>
  )
}

export default App;
