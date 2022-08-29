import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addTodoAsync } from '../redux/todoSlice'

export default function TodoAdd() {
  const [inputValue, setInputValue] = useState("");
  const reduxToken = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(
      addTodoAsync({
        value: inputValue,
        token: reduxToken
      })
    );
    setInputValue("");
  };

  return (
    <form
      onSubmit={onSubmit}
    >
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </form>
  );
}