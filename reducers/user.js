import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    username: null,
    token: null,
    password: null,
    email: null,
    todo: [],
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.username = action.payload.username;
      state.value.password = action.payload.password;
      state.value.email = action.payload.email;
    },
    addTodo: (state, action) => {
      state.value.todo.push(action.payload.todo);
    },
  },
});

export const { login, addTodo } = userSlice.actions;
export default userSlice.reducer;
