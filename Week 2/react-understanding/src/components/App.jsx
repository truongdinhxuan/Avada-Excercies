import { useState } from 'react';
import './App.css';
import Todo from './todo/Todo';
import TodoForm from './todo/TodoForm';

function App() {
  const todoList = [
    { text: "Todo 1", isCompleted: false, isRemoved: false },
    { text: "Todo 2", isCompleted: false, isRemoved: false },
    { text: "Todo 3", isCompleted: false, isRemoved: false },
  ]
  const [todos, setTodos] = useState(todoList)

  const addTodo = text => {
    const newTodos = [...todos, { text, isCompleted: false }]
    setTodos(newTodos)
  }
  const completeTodo = index => {
    const newTodos = [...todos]
    newTodos[index].isCompleted = true
    setTodos(newTodos)
  }
  // filter không làm thay đổi mảng gốc, tuân theo quy tắc immutability của React
  const removeTodo = (indexToRemove) => {
    setTodos(todos => todos.filter((_, index) => index !== indexToRemove))
  }

  return (
    <div className="app">
      <div className='todo-list'>
        {todos.map((todoList, index) => 
          !todoList.isRemoved && (
            <Todo
              key={index}
              index={index}
              todo={todoList}
              completeTodo={completeTodo}
              removeTodo={removeTodo}
            />
          )
        )}
        <TodoForm
          addTodo={addTodo}
        />
      </div>
    </div>
  )
}

export default App;
