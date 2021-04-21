import { Router } from "express";
import { addTodo, deleteTodo, getTodos, updateTodo } from "../todos/todos";

const router: Router = Router()

// Routes to get, add, update, and delete todos from the database
// All needed functions are in ../todos/todos.ts,
// so the methods need to be imported and passed as parameters to handle the requests
router.get("/todos", getTodos)
router.post("/add-todo", addTodo)
router.post("edit-todo/:id", updateTodo)
router.delete("delete-todo/:id", deleteTodo)

export default router