import { useSelector } from 'react-redux';

function TodoItemsLeft() {
  const itemsLeft = useSelector((state) => 
    state.todos.filter((todo) => todo.checked === false)
  );

  return (
    <span className="todo-count">
      <strong>{itemsLeft.length}</strong> items left
    </span>
  );
}

export default TodoItemsLeft;
