import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    username: null,
    token: null,
    password: null,
    email: null,
    todo: [],
    favorites: [],
    photo:
      "https://media.istockphoto.com/id/1300845620/fr/vectoriel/appartement-dic%C3%B4ne-dutilisateur-isol%C3%A9-sur-le-fond-blanc-symbole-utilisateur.jpg?b=1&s=170667a&w=0&k=20&c=HEO2nP4_uEAn0_JzVTU6_Y5hyn-qHxyCrWWTirBvScs=",
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
    removeFavorites: (state, action) => {
      state.value.favorites = state.value.favorites.filter(
        (e) => e !== action.payload
      );
    },
    removeAll: (state) => {
      state.value.todo = [];
    },
    logout: (state) => {
      state.value.username = null;
      state.value.email = null;
      state.value.token = null;
      state.value.photo =
        "https://media.istockphoto.com/id/1300845620/fr/vectoriel/appartement-dic%C3%B4ne-dutilisateur-isol%C3%A9-sur-le-fond-blanc-symbole-utilisateur.jpg?b=1&s=170667a&w=0&k=20&c=HEO2nP4_uEAn0_JzVTU6_Y5hyn-qHxyCrWWTirBvScs=";
    },
    addFavorites: (state, action) => {
      state.value.favorites.push(action.payload.favorites);
    },
    addPhoto: (state, action) => {
      state.value.photo = action.payload;
    },
  },
});

export const {
  login,
  addTodo,
  removeTodo,
  removeAll,
  logout,
  addFavorites,
  addPhoto,
  removeFavorites,
} = userSlice.actions;
export default userSlice.reducer;
