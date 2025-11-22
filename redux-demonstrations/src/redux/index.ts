import { configureStore } from "@reduxjs/toolkit";
import { pokemonApi } from "../services/pokemon/pokemon";
import counterReducer from "./features/counter/counter-slice";
import userReducer from "./features/user/user-slice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
