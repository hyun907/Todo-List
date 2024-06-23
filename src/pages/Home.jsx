import React, { useCallback, useRef, useState } from "react";
import ReactCalendar from "../component/ReactCalendar";
import "./Home.css";
import EditBox from "../component/EditBox";
import TodoItem from "../component/TodoItem";

const Home = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "리액트 기초 알아보기",
      checked: true,
      emoji: "",
    },
    {
      id: 2,
      text: "컴포넌트 스타일링 하기",
      checked: true,
      emoji: "",
    },
    {
      id: 3,
      text: "투두리스트 만들기",
      checked: false,
      emoji: "",
    },
  ]);

  const nextId = useRef(4);

  const onInsert = useCallback((text) => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    setTodos((todos) => todos.concat(todo)); //concat(): 인자로 주어진 배열이나 값들을 기존 배열에 합쳐서 새 배열 반환
    nextId.current++; //nextId 1씩 더하기
  }, []);

  const onRemove = useCallback((id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }, []);

  const handleToggle = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, checked: !todo.checked } : todo
    );
    setTodos(updatedTodos);
  };

  const handleRemove = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleSave = (id, editedText) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: editedText } : todo
    );
    setTodos(updatedTodos);
  };

  const handleEmojiChange = (id, emoji) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, emoji: emoji } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div className="Home">
      <section className="section_top">
        <ReactCalendar />
        <EditBox onInsert={onInsert} />
      </section>
      <section className="section_bottom">
        <div className="todo-list">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggle}
              onRemove={handleRemove}
              onSave={handleSave}
              onEmojiChange={handleEmojiChange}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
