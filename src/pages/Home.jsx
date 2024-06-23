import React, { useCallback, useRef, useState } from "react";
import ReactCalendar from "../component/ReactCalendar";
import "./Home.css";
import EditBox from "../component/EditBox";
import List from "../component/List";

const Home = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "리액트 기초 알아보기",
      checked: true,
    },
    {
      id: 2,
      text: "컴포넌트 스타일링 하기",
      checked: true,
    },
    {
      id: 3,
      text: "투두리스트 만들기",
      checked: false,
    },
  ]);
  const nextId = useRef(4);
  const onInsert = useCallback(
    (text) => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      setTodos(todos.concat(todo));
      nextId.current++;
    },
    [todos]
  );

  return (
    <div className="Home">
      <section className="section_top">
        <ReactCalendar />
        <EditBox onInsert={onInsert} />
      </section>
      <section className="section_bottom">
        <List todos={todos} />
      </section>
    </div>
  );
};

export default Home;
