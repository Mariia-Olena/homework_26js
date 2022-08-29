import { removeTodoAsync } from '../redux/todoSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function TodoCompleted() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const todosCompleted = todos.filter((todo) => todo.checked);
  const reduxToken = useSelector((state) => state.token);

  const onClick = () => {
    todos.forEach(todo => {
      if (todo.checked) {
        dispatch(
          removeTodoAsync({_id: todo._id, token: reduxToken})
        )
      }
    });
    
  }

  if (todosCompleted.length) {
    return <button className="clear-completed" onClick={onClick}>Clear completed</button>;
  }

}
