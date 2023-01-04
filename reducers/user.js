import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    username: null,
    token: null,
    password: null,
    email: null,
    todo: [],
    favorites: [],
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
    removeTodo: (state, action) => {
      state.value.todo = state.value.todo.filter((e) => e !== action.payload);
    },
    removeAll: (state) => {
      state.value.todo = [];
    },
    logout: (state) => {
      state.value.username = null;
      state.value.email = null;
    },
    addFavorites: (state, action) => {
      state.value.favorites.push(action.payload.favorites);
    },
  },
});

export const { login, addTodo, removeTodo, removeAll, logout, addFavorites } =
  userSlice.actions;
export default userSlice.reducer;
