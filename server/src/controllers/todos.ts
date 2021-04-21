import { Response, Request } from "express";
import { ITodo } from "../types/todo";
import Todo from "../models/todo";

/* Get, Add, Update and Delete Todos
    1) Get
    2) Add
    3) Update
    4) Delete
*/

// 1) GET
// Function receives a req and res parameter and returns a promise
// Gets the data from MongoDB and return a response with the array of todos
const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos: ITodo[] = await Todo.find();
    res.status(200).json({ todos });
  } catch (error) {
    throw error;
  }
};

// 3) ADD
// receives the body object that contains data entered by the user
const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    // Typecasting is used to avoid typos and restrict the body variable to match ITodo
    const body = req.body as Pick<ITodo, "name" | "description" | "status">;

    // create a new Todo based on the model
    const todo: ITodo = new Todo({
      name: body.name,
      description: body.description,
      status: body.status,
    });

    const newTodo: ITodo = await todo.save();
    const allTodos: ITodo[] = await Todo.find();

    // save the Todo in the DB by returning a response that contains the todo created and the updated todos array
    res
      .status(201)
      .json({ message: "Todo added", todo: newTodo, todos: allTodos });
  } catch (error) {
    throw error;
  }
};

// 3) UPDATE
const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extracts the id and the body from the req object
    const {
      params: { id },
      body,
    } = req;

    // Passes id and the body to findByIdAndUpdate()
    // and finds the Todo on the database and update it@
    const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
      { _id: id },
      body
    );

    const allTodos: ITodo[] = await Todo.find();

    // Returns the updated data to the user
    res.status(200).json({
      message: "Todo updated",
      todo: updateTodo,
      todos: allTodos,
    });
  } catch (error) {
    throw error;
  }
};

// 4) Delete
// allows to delete a Todo from the database
const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    // pull out the id from req and pass it as an argument to findByIdAndRemove()
    // corresponding Todo and delete it from the DB
    const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(
      req.params.id
    );

    const allTodos: ITodo[] = await Todo.find();

    res.status(200).json({
      message: "Todo deleted",
      todo: deletedTodo,
      todos: allTodos,
    });
  } catch (error) {
    throw error;
  }
};

// export the functions to be able to use them in other files
export { getTodos, addTodo, updateTodo, deleteTodo }
