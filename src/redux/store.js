import { configureStore } from '@reduxjs/toolkit';
import {todoReducer, tokenReducer} from './todoSlice'

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    token: tokenReducer,
  },
});
