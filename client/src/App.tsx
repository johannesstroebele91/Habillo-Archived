// import the components and utility functions held on API.ts
import React, { useEffect } from "react";
import { useState } from "react";
import { ITodo } from "./type";
import { deleteTodo, getTodos, updateTodo, addTodo } from "./API";
import AddTodo from "./components/AddTodo";
import ToDoItem from './components/ToDoItem';

// Fetch and Display data
// pass to useState an array of type ITodo and initialize it with an empty array
const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  // call the function fetchTodos()
  // when the component is successfully mounted
  useEffect(() => {
    fetchTodos();
  }, []);

  // getTodos() returns a promise
  // therefore, the then function can be accessed
  //  and the state updated with the data fetched
  // or throw an error if any occurs.
  const fetchTodos = (): void => {
    getTodos()
      .then(({ data: { todos } }: ITodo[] | any) => setTodos(todos))
      .catch((err: Error) => console.log(err));
  };

  // Once the form is submitted,
  // addTodo() is used to send the request to the server
  // if the Todo has successfully saved,
  // the data is updated
  const handleSaveTodo = (e: React.FormEvent, formData: ITodo): void => {
    e.preventDefault();
    addTodo(formData)
      .then(({ status, data }) => {
        if (status !== 201) {
          throw new Error("Error! Todo not saved");
        }
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  };

  // Update todo
  // receive a parameter, send the request, get back a response,
  // and if the Todo has successfully saved, update it
  const handleUpdateTodo = (todo: ITodo): void => {
    updateTodo(todo)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Todo not updated");
        }
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  };

  // Delete todo
  // receive a parameter, send the request, get back a response,
  // and if the Todo has successfully saved, delete it
  const handleDeleteTodo = (_id: string): void => {
    deleteTodo(_id)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Todo not deleted");
        }
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  };

  // loop through the todos array and then
  // pass to the TodoItem the expected data
  return (
    <main className="App">
      <h1>My Todos</h1>
      <AddTodo saveTodo={handleSaveTodo} />
      {todos.map((todo: ITodo) => (
        <ToDoItem
          key={todo._id}
          updateTodo={handleUpdateTodo}
          deleteTodo={handleDeleteTodo}
          todo={todo}
        />
      ))}
    </main>
  );
};

export default App;
