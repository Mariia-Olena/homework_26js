import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const fetchAPI = {
  baseUrl: "https://todo.hillel.it"
};

export const getTokenAsync = createAsyncThunk(
  "token/getTokenAsync",
  async (userLogin) => {
    const requestBody = JSON.stringify({
      value: userLogin,
    });

    const headers = new Headers();
    headers.set("Content-Type", "application/json");

    const response = await fetch(`${fetchAPI.baseUrl}/auth/login`, {
      method: "POST",
      headers,
      body: requestBody,
    });

    const { access_token: accessToken } = await response.json();

    localStorage.setItem("userToken", accessToken);
    return accessToken;
  }
);

export const getTodosAsync = createAsyncThunk(
  'todos/getTodosAsync',
  async (payload) => {
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Authorization", `Bearer ${payload.token}`);

    const response = await fetch(`${fetchAPI.baseUrl}/todo`, {
      method: "GET",
      headers
    });

    if (response.ok) {
      const todos = await response.json();
      return { todos };
    }
  }
);

export const addTodoAsync = createAsyncThunk(
  'todos/addTodoAsync',
  async (payload) => {
    const requestBody = JSON.stringify({
      value: payload.value,
      priority: 1
    });
  
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Authorization", `Bearer ${payload.token}`);
  
    const response = await fetch(`${fetchAPI.baseUrl}/todo`, {
      method: "POST",
      headers,
      body: requestBody
    });
  
    if (response.ok) {
      const todo = await response.json();
      
      return { todo }
    } 
  }
);

export const editTodoAsync = createAsyncThunk(
  'todos/editTodoAsync',
  async (payload) => {
    const requestBody = JSON.stringify({
      value: payload.value,
      priority: 1
    });
  
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Authorization", `Bearer ${payload.token}`);
  
    const response = await fetch(`${fetchAPI.baseUrl}/todo/${payload._id}`, {
      method: "PUT",
      headers,
      body: requestBody
    });
  
    if (response.ok) {
      const todo = await response.json();

      return { todo }
    }
  }
);

export const toggleTodoAsync = createAsyncThunk(
  'todos/toggleTodoAsync', 
  async (payload) => {
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Authorization", `Bearer ${payload.token}`);

    const response = await fetch(`${fetchAPI.baseUrl}/todo/${payload._id}/toggle`, {
      method: "PUT",
      headers
    });

    if (response.ok) {
      const todo = await response.json();
      return { _id: todo._id, checked: todo.checked }
    }
  }
)

export const removeTodoAsync = createAsyncThunk(
  'todos/removeTodoAsync', 
  async (payload) => {
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Authorization", `Bearer ${payload.token}`);

    const response = await fetch(`${fetchAPI.baseUrl}/todo/${payload._id}`, {
      method: "DELETE",
      headers
    });

    if (response.ok) {
      return { _id: payload._id }
    }
  }
)

const todoSlice = createSlice({
  name: "todos",
  initialState: [],

  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        _id: Date.now(),
        value: action.payload.value,
        checked: false,
      };
      state.push(newTodo);
    },

    toggleTodo: (state, action) => {
      return state.map((todo) => {
        if (todo._id === action.payload._id) {
          return {
            ...todo,
            checked: !todo.checked,
          };
        }
        return todo;
      });
    },

    toggleAllTodo: (state) => {
      const iscompletedExist = state.some((todo) => todo.checked === false);

      if (iscompletedExist) {
        return state.map((todo) => {
          return { ...todo, checked: true };
        });
      } else {
        return state.map((todo) => {
          return { ...todo, checked: false };
        });
      }
    },

    removeTodo: (state, action) => {
      return state.filter((todo) => todo._id !== action.payload._id);
    },

    editTodo: (state, action) => {
      return state.map((todo) => {
        if (todo._id === action.payload._id) {
          return {
            ...todo,
            value: action.payload.value,
          };
        }
        return todo;
      });
    },

    clearCompleted: (state) => {
      return state.filter((todo) => !todo.checked);
    },

  },

  extraReducers: {
    [getTodosAsync.fulfilled]: (state, action) => {
      return action.payload.todos;
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      state.push(action.payload.todo);
    },
    [toggleTodoAsync.fulfilled]: (state, action) => {
      const index = state.findIndex((todo) => todo._id === action.payload._id);
      state[index].checked = action.payload.checked;
    },
    [removeTodoAsync.fulfilled]: (state, action) => {
      return state.filter((todo) => todo._id !== action.payload._id);
    },
    [editTodoAsync.fulfilled]: (state, action) => {
      const index = state.findIndex((todo) => todo._id === action.payload._id);
      state[index] = action.payload;
    },
  },
});

const tokenSlice = createSlice({
  name: "token",
  initialState: localStorage.getItem("userToken"),

  reducers: {
    setToken(state, action) {
      return action.payload;
    },
    removeToken(state, action) {
      localStorage.removeItem("userToken");
      return "";
    },
  },
  extraReducers: {
    [getTokenAsync.fulfilled]: (state, action) => {
      return action.payload;
    },
  },
});

export const { setToken, removeToken } = tokenSlice.actions;

export const {
  addTodo,
  toggleTodo,
  toggleAllTodo,
  removeTodo,
  editTodo,
  clearCompleted,
} = todoSlice.actions;

export const todoReducer = todoSlice.reducer;
export const tokenReducer = tokenSlice.reducer;