import { useState } from "react";
import { useDispatch } from "react-redux";
import { getTokenAsync } from "../redux/todoSlice";

export default function Modal() {
  const [loginInput, setLoginInput] = useState("");

  const dispatch = useDispatch();

  const onClick = () => {
    if (loginInput) {
      dispatch(getTokenAsync(loginInput));
    }
  };

  return (
    <>
      <div className="modal">
        <div className="modal-body">
          <h2>Enter your login</h2>
          <input
            value={loginInput}
            onChange={(e) => setLoginInput(e.target.value)}
          />
          <button type="submit" className="modal-btn" onClick={onClick}>
            Send
          </button>
        </div>
      </div>
    </>
  );
}