"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.addTodo = exports.getTodos = void 0;
const todo_1 = __importDefault(require("../models/todo"));
/* Get, Add, Update and Delete Todos
    1) Get
    2) Add
    3) Update
    4) Delete
*/
// 1) GET
// Function receives a req and res parameter and returns a promise
// Gets the data from MongoDB and return a response with the array of todos
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield todo_1.default.find();
        res.status(200).json({ todos });
    }
    catch (error) {
        throw error;
    }
});
exports.getTodos = getTodos;
// 3) ADD
// receives the body object that contains data entered by the user
const addTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Typecasting is used to avoid typos and restrict the body variable to match ITodo
        const body = req.body;
        // create a new Todo based on the model
        const todo = new todo_1.default({
            name: body.name,
            description: body.description,
            status: body.status,
        });
        const newTodo = yield todo.save();
        const allTodos = yield todo_1.default.find();
        // save the Todo in the DB by returning a response that contains the todo created and the updated todos array
        res
            .status(201)
            .json({ message: "Todo added", todo: newTodo, todos: allTodos });
    }
    catch (error) {
        throw error;
    }
});
exports.addTodo = addTodo;
// 3) UPDATE
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extracts the id and the body from the req object
        const { params: { id }, body, } = req;
        // Passes id and the body to findByIdAndUpdate()
        // and finds the Todo on the database and update it@
        const updateTodo = yield todo_1.default.findByIdAndUpdate({ _id: id }, body);
        const allTodos = yield todo_1.default.find();
        // Returns the updated data to the user
        res.status(200).json({
            message: "Todo updated",
            todo: updateTodo,
            todos: allTodos,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.updateTodo = updateTodo;
// 4) Delete
// allows to delete a Todo from the database
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // pull out the id from req and pass it as an argument to findByIdAndRemove()
        // corresponding Todo and delete it from the DB
        const deletedTodo = yield todo_1.default.findByIdAndRemove(req.params.id);
        const allTodos = yield todo_1.default.find();
        res.status(200).json({
            message: "Todo deleted",
            todo: deletedTodo,
            todos: allTodos,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteTodo = deleteTodo;
