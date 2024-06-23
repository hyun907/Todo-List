import React, { useCallback, useRef, useState } from "react";
import ReactCalendar from "../component/ReactCalendar";
import "./Home.css";
import EditBox from "../component/EditBox";
import TodoItem from "../component/TodoItem";

const Home = () => {
  const [todos, setTodos] = useState([
    {
      todo_id: 1,
      user: "걸어봐위엄라이커라이온",
      date: "2024-06-17T17:00:00.123456+09:00",
      content: "멋사와 함께 행복 개발하기",
      is_checked: false,
      emoji: "",
    },
    {
      todo_id: 2,
      user: "걸어봐위엄라이커라이온",
      date: "2024-06-16T11:30:15.123456+09:00",
      content: "투두리스트 API 개발 끝내기",
      is_checked: false,
      emoji: "",
    },
    {
      todo_id: 3,
      user: "걸어봐위엄라이커라이온",
      date: "2024-06-20T15:15:15.123456+09:00",
      content: "건강하기",
      is_checked: false,
      emoji: "",
    },
  ]);

  const nextId = useRef(4);

  const onInsert = useCallback((text) => {
    const newTodo = {
      todo_id: nextId.current,
      user: "걸어봐위엄라이커라이온",
      date: new Date().toISOString(),
      content: text,
      is_checked: false,
      emoji: "",
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    nextId.current++;
  }, []);

  const onRemove = useCallback((id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.todo_id !== id));
  }, []);

  const handleToggle = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.todo_id === id ? { ...todo, is_checked: !todo.is_checked } : todo
    );
    setTodos(updatedTodos);
  };

  const handleSave = (id, editedText) => {
    const updatedTodos = todos.map((todo) =>
      todo.todo_id === id ? { ...todo, content: editedText } : todo
    );
    setTodos(updatedTodos);
  };

  const handleEmojiChange = (id, emoji) => {
    const updatedTodos = todos.map((todo) =>
      todo.todo_id === id ? { ...todo, emoji: emoji } : todo
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
          {todos.length > 0 ? (
            todos.map((todo) => (
              <TodoItem
                key={todo.todo_id}
                todo={todo}
                onToggle={handleToggle}
                onRemove={onRemove}
                onSave={handleSave}
                onEmojiChange={handleEmojiChange}
              />
            ))
          ) : (
            <p>No todos found.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
