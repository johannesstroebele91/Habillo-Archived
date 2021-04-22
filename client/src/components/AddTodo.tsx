import { useState } from "react";
import { ITodo } from "../type";

type Props = {
  saveTodo: (e: React.FormEvent, formData: ITodo | any) => void;
};

// functional component of type React.FC (FC stands for functional component)
// receives as a prop the method saveTodo()
// that allows us to save data to the DB
const AddTodo: React.FC<Props> = ({ saveTodo }) => {

    // formData state that needs to match the ITodo type
    // to satisfy the compiler.
    // That is why we pass it to the useState hook
    // also need to add an alternative type ({}) because the initial state will be an empty object
  const [formData, setFormData] = useState<ITodo | {}>();

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };
  return (
    <form className="Form" onSubmit={(e) => saveTodo(e, formData)}>
      <div>
        <div>
          <label htmlFor="name">Name</label>
          <input onChange={handleForm} type="text" id="name" />
        </div>
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input onChange={handleForm} type="text" id="description" />
      </div>
      <button disabled={formData === undefined ? true : false}>Add Todo</button>
    </form>
  );
};

export default AddTodo;
