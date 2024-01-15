import { useDispatch, useSelector, useStore } from "react-redux";
import {
  addTodo,
  getEditableTodo,
  updateTodo,
  setEditableTodo,
} from "../features/todo/todoSlice";
import { useEffect, useState } from "react";

export function AddTodo() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  let isEditable = useSelector((state) =>
    state.editableId === "" ? false : true,
  );
  let editableId = useSelector((state) =>
    state.todos.find((todo) => todo.id === state.editableId),
  )?.text;

  useEffect(() => {
    setEditable(editableId);
  }, [editableId]);

  const [editable, setEditable] = useState(editableId ? editableId : "");

  const addTodoHandler = (e) => {
    e.preventDefault();
    if (!isEditable) {
      dispatch(addTodo(input));
      setInput("");
    } else {
      dispatch(updateTodo(editable));
      isEditable = false;
      setEditable("");
      editableId = "";
    }
  };

  const onchangefn = (e) => {
    if (isEditable) {
      setEditable(e.target.value);
    } else {
      setInput(e.target.value);
    }
  };

  return (
    <form onSubmit={(e) => addTodoHandler(e)} className="space-x-3 mt-12">
      <input
        type="text"
        className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        placeholder="Enter a Todo..."
        value={!isEditable ? input : editable}
        onChange={(e) => onchangefn(e)}
      />
      <button
        type="submit"
        className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >
        {isEditable ? "push change" : "Add Todo"}
      </button>
    </form>
  );
}
