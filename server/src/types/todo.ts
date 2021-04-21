import { Document } from "mongoose";

// Create a Todo Type
export interface ITodo extends Document {
    name: string,
    description: string,
    status: boolean
};
