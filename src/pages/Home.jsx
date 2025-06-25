import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactCalendar from "../component/ReactCalendar";
import EditBox from "../component/EditBox";
import TodoItem from "../component/TodoItem";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const { userId } = useParams();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    if (userId) fetchTodos();
  }, [userId]);

  const handleApiError = (error, message) => {
    console.error(message, error);
    setError(message);
  };

  const fetchTodos = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/todos/${userId}`, {
        withCredentials: true,
      });
      setTodos(data);
    } catch (err) {
      handleApiError(err, "투두리스트를 불러오는 중 오류가 발생했습니다.");
    }
  };

  const modifyTodo = async (id, fields) => {
    try {
      const { data } = await axios.patch(
        `${BASE_URL}/api/todos/${userId}/${id}`,
        fields
      );
      setTodos((prev) =>
        prev.map((todo) => (todo.todo_id === id ? data : todo))
      );
    } catch (err) {
      handleApiError(err, "투두를 수정하는 중 오류가 발생했습니다.");
    }
  };

  const addTodo = async (text) => {
    try {
      const newTodo = {
        user_id: userId,
        date: new Date().toISOString(),
        content: text,
      };
      const { data } = await axios.post(
        `${BASE_URL}/api/todos/${userId}`,
        newTodo
      );
      setTodos((prev) => [...prev, { ...newTodo, todo_id: data.todo_id }]);
    } catch (err) {
      handleApiError(err, "투두를 추가하는 중 오류가 발생했습니다.");
    }
  };

  const removeTodo = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/todos/${userId}/${id}`);
      setTodos((prev) => prev.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      handleApiError(err, "투두를 삭제하는 중 오류가 발생했습니다.");
    }
  };

  // 핸들러 묶기
  const onInsert = (text) => userId && addTodo(text);
  const onRemove = (id) => removeTodo(id);
  const onToggle = (id) => {
    const todo = todos.find((t) => t.todo_id === id);
    if (todo) modifyTodo(id, { is_checked: !todo.is_checked });
  };
  const onSave = (id, content) => modifyTodo(id, { content });
  const onEmojiChange = (id, emoji) => modifyTodo(id, { emoji });

  return (
    <div className="Home">
      <section className="section_top">
        <ReactCalendar />
        <EditBox onInsert={onInsert} />
      </section>
      <section className="section_bottom">
        <div className="todo-list">
          {error ? (
            <p>{error}</p>
          ) : todos.length ? (
            todos.map((todo) => (
              <TodoItem
                key={todo.todo_id}
                todo={todo}
                onToggle={onToggle}
                onRemove={onRemove}
                onSave={onSave}
                onEmojiChange={onEmojiChange}
              />
            ))
          ) : (
            <p>🥳 추가하기 버튼으로 할 일을 추가할 수 있어요!</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
