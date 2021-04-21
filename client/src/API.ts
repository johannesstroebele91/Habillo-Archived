// Fetch data from the API
// axios enables to request data from the API
import axios, { AxiosResponse } from "axios";

const baseUrl: string = "http://localhost:4000";

// get data from the server
export const getTodos = async (): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todos: AxiosResponse<ApiDataType> = await axios.get(
      baseUrl + "/todos"
    );
    // return a promise of type AxiosResponse that
    // holds the Todos fetched that need to match the type ApiDataType
    return todos;
  } catch (error) {
    throw new Error(error);
  }
};

// adds a todo
// receives the data entered by the user as an argument and returns a promise
export const addTodo = async (
  formData: ITodo
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    // need to omit the _id property because MongoDB will create it on the fly
    const todo: Omit<ITodo, "_id"> = {
      name: formData.name,
      description: formData.description,
      status: false,
    };
    const saveTodo: AxiosResponse<ApiDataType> = await axios.post(
      baseUrl + "/add-todo",
      todo
    );
    return saveTodo;
  } catch (error) {
    throw new Error(error);
  }
};

// updates a Todo
// the updated data and the _id of the objects needed to be passe
export const updateTodo = async (
  todo: ITodo
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    // need to change the status of the Todo
    const todoUpdate: Pick<ITodo, "status"> = {
      status: true,
    };
    // only pick the property we need before sending the request to the server
    const updatedTodo: AxiosResponse<ApiDataType> = await axios.put(
      `${baseUrl}/edit-todo/${todo._id}`,
      todoUpdate
    );
    return updatedTodo;
  } catch (error) {
    throw new Error(error);
  }
};

// deletes todos
// function that receives as a parameter the _id property and returns a promise
export const deleteTodo = async (
    _id: string
  ): Promise<AxiosResponse<ApiDataType>> => {
    try {
      const deletedTodo: AxiosResponse<ApiDataType> = await axios.delete(
        `${baseUrl}/delete-todo/${_id}`
      )
      return deletedTodo
    } catch (error) {
      throw new Error(error)
    }
  }
  