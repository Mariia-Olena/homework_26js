import "./style.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TodoHeader from "./components/TodoHeader.js";
import TodoToggleAll from "./components/TodoToggleAll";
import TodoFooter from "./components/TodoFooter";
import TodoList from "./components/TodoList";
import Modal from "./components/Modal";
import { removeToken, setToken } from "./redux/todoSlice";

export default function App() {
  const dispatch = useDispatch();

  const storageToken = localStorage.getItem("userToken");
  const reduxToken = useSelector((state) => state.token);

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (storageToken && !reduxToken) {
      dispatch(setToken(storageToken));
    }
    if (reduxToken || storageToken) {
      setIsModalOpen(false);
    } else {
      setIsModalOpen(true);
    }
  }, [storageToken, reduxToken]);

  return (
    <>
    <section className="todoapp">
      {isModalOpen && <Modal />}
      <TodoHeader />
      <section className="main">
        <TodoToggleAll />
        <TodoList filter={filter} />
      </section>
      <TodoFooter filter={filter} setFilter={setFilter} />
    </section>
          <button
          onClick={() => {
            dispatch(removeToken());
            setIsModalOpen(true);
          }}
        >
          Log Out
        </button>
      </>
  );
}