import { ITodo } from "../controllers/types/todo";
import { model, Schema } from "mongoose";

// Create a Todo Model
const todoSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<ITodo>("Todo", todoSchema);