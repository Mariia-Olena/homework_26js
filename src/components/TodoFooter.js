import TodoItemsLeft from "./TodoItemsLeft";
import TodoFilter from "./TodoFilter";
import TodoCompleted from "./TodoCompleted";

import { useSelector } from 'react-redux';

export default function TodoFooter({filter, setFilter}) {
  const showFooter = useSelector((state) => 
    state.todos.length
  );
  if (showFooter) {
    return (
      <footer className="footer">
        <TodoItemsLeft />
        <TodoFilter filter={filter} setFilter={setFilter} />
        <TodoCompleted  />
      </footer>
    );
  }
}

