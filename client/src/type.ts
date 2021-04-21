// Interface mirrors the shape of data from the API
// add additional properties to match the type defined on the API,
// because mongoose is not available in the client
export interface ITodo {
    _id: string,
    name: string,
    description: string,
    status: boolean,
    createdAt?: string,
    updatedAt?: string
}

// Props that will be received by the component
// responsible for rendering the data
export interface ToDoProps {
    todo: ITodo
}

export type ApiDataType = {
    message: string,
    status: string,
    todos: ITodo[]
    todo?: ITodo
}