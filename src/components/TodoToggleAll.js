import { toggleTodoAsync } from '../redux/todoSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function TodoToggleAll() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const reduxToken = useSelector((state) => state.token);

  const onClick = () => {
    const iscompletedExist = todos.some((todo) => todo.checked === false);

    if (iscompletedExist) {
      const todoChecked = todos.filter((todo) => !todo.checked);
      todoChecked.map((todo) => 
      dispatch(
        toggleTodoAsync({_id: todo._id, token: reduxToken})
      ))
    } else {
      const todoNotChecked = todos.filter((todo) => todo.checked);
      todoNotChecked.map((todo) => 
      dispatch(
        toggleTodoAsync({_id: todo._id, token: reduxToken})
      ))
    }
  }

  return (
    <>
      <input id="toggle-all" className="toggle-all" type="checkbox" onChange={onClick}/>
      <label htmlFor="toggle-all">Mark all as complete</label>
    </>
  );
}
