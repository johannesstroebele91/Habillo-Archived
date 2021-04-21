// extend the TodoProps type
import React from 'react'
import { ITodo, ToDoProps } from '../type'

type Props = ToDoProps & {
    updateTodo: (todo: ITodo) => void
    deleteTodo: (_id: string) => void
}


// append the functions updateTodo and deleteTodo
// to handle appropriately the props received by the component
const Todo: React.FC<Props> = ({ todo, updateTodo, deleteTodo }) => {
  const checkTodo: string = todo.status ? `line-through` : ''

  // once the Todo object passed in,
  // it is possible to display it and add the functions needed
  // to update or delete a Todo
  return (
    <div className='Card'>
      <div className='Card--text'>
        <h1 className={checkTodo}>{todo.name}</h1>
        <span className={checkTodo}>{todo.description}</span>
      </div>
      <div className='Card--button'>
        <button
          onClick={() => updateTodo(todo)}
          className={todo.status ? `hide-button` : 'Card--button__done'}
        >
          Complete
        </button>
        <button
          onClick={() => deleteTodo(todo._id)}
          className='Card--button__delete'
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default Todo
