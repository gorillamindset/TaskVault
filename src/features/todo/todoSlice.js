import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [{ id: '1', text: "hello world" }],
  editableId: ''
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        text: action.payload
      }
      state.todos.push(todo);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => (todo.id !== action.payload))
    },
    getEditableTodo: (state, action) => {
      if (!state.editableId) {
        return '';
      }

      const obj = state.todos.find((todo) => todo.id === state.editableId);
      return obj.text;
    },
    updateTodo: (state, action) => {
      state.todos = state.todos.map((todo) => (state.editableId === todo.id ? { ...todo, text: action.payload } : todo));
      state.editableId = '';
    },
    setEditableTodo: (state, action) => {
      state.editableId = action.payload;
    }
  }
})

export const { addTodo, removeTodo, getEditableTodo, updateTodo, setEditableTodo } = todoSlice.actions;

export default todoSlice.reducer
