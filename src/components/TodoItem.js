import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toggleTodoAsync, removeTodoAsync, editTodoAsync } from '../redux/todoSlice';

export default function TodoItem({ _id, value, checked }) {
  const dispatch = useDispatch();
  const reduxToken = useSelector((state) => state.token);

  const handlerToggleClick = () => {
    dispatch(
      toggleTodoAsync({ _id: _id, checked: !checked, token: reduxToken })
    )
  }

  const handlerEditClick = (e) => {
    if (checked) {
      dispatch(
        editTodoAsync({ _id: _id, value: inputValue, token: reduxToken }),
      );
      dispatch(
        toggleTodoAsync({ _id: _id, checked: !checked, token: reduxToken })
      );
    } else {
      dispatch(
        editTodoAsync({ _id: _id, value: inputValue, token: reduxToken }),
      );
    }
    
    setEdit(false);
  }

  const handlerRemoveClick = () => {
    dispatch(removeTodoAsync({_id: _id, token: reduxToken}))
  }

  const [inputValue, setInputValue] = useState(value);
  const [edit, setEdit] = useState(false);

  const classNameEdit = edit ? "editing" : "";
  const classNameCompleted = checked ? "completed" : "";
  const className = `${classNameEdit} ${classNameCompleted}`;

  return (
    <li className={className}>
      <div 
        className="view"
        onDoubleClick={() => {
          setEdit(true);
        }}
      >
        <input 
          className="toggle" 
          type="checkbox" 
          checked={checked} 
          onChange={handlerToggleClick}
        />
        <label>{inputValue}</label>
        <button className="destroy" onClick={handlerRemoveClick}></button>
      </div>
      <input
        ref={(input) => {
          input && input.focus();
        }}
        type="text" 
        className="edit" 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            handlerEditClick()
          } 
          
          if (e.key === "Escape") {
            setInputValue(value);
            setEdit(false);
          }
        }}
        onBlur={handlerEditClick}
      />
    </li>
  );
}
