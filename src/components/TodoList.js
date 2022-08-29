import TodoItem from "./TodoItem";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTodosAsync } from "../redux/todoSlice";

export default function ToDoList({filter}) {
  const dispatch = useDispatch();
  const reduxToken = useSelector((state) => state.token);
  const todosAll = useSelector((state) => state.todos);
  const filteredTodos = todosAll.filter((todo) => {
    if (filter === "active") {
      return todo.checked === false;
    } else if (filter === "completed") {
      return todo.checked === true;
    } else {
      return todo;
    }
  });

  useEffect(() => {
    dispatch(getTodosAsync({token: reduxToken}));
  }, [reduxToken]);

  return (
    <ul className="todo-list">
      {!!todosAll.length && filteredTodos.map((todo) => {
        return (
          <TodoItem
            _id={todo._id}
            value={todo.value}
            checked={todo.checked}
            key={todo._id}
          />
        );
      })}
    </ul>
  );
}


