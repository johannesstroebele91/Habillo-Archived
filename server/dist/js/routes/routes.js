"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todos_1 = require("../controllers/todos");
const router = express_1.Router();
// Routes to get, add, update, and delete todos from the database
// All needed functions are in ../todos/todos.ts,
// so the methods need to be imported and passed as parameters to handle the requests
router.get("/todos", todos_1.getTodos);
router.post("/add-todo", todos_1.addTodo);
router.post("edit-todo/:id", todos_1.updateTodo);
router.delete("delete-todo/:id", todos_1.deleteTodo);
exports.default = router;
