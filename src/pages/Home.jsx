import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import ReactCalendar from "../component/ReactCalendar";
import "./Home.css";
import EditBox from "../component/EditBox";
import TodoItem from "../component/TodoItem";
import axios from "axios";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const { userId } = useParams();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const nextId = useRef(1);

  useEffect(() => {
    if (userId) {
      fetchTodos(userId);
    }
  }, [userId]);

  const handleApiError = (error, message) => {
    console.error(message, error);
    setError(message);
  };

  const fetchTodos = async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/todos/${userId}`);
      setTodos(response.data);
    } catch (error) {
      handleApiError(error, "투두리스트를 불러오는 중 오류가 발생했습니다.");
    }
  };

  const addTodo = async (newTodo) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/todos/${userId}`,
        newTodo
      );
      return response.data.todo_id;
    } catch (error) {
      handleApiError(error, "투두를 추가하는 중 오류가 발생했습니다.");
    }
  };

  const updateTodo = async (id, updatedFields) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/api/todos/${userId}/${id}`,
        updatedFields
      );
      return response.data;
    } catch (error) {
      handleApiError(error, "투두를 업데이트하는 중 오류가 발생했습니다.");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/todos/${userId}/${id}`);
    } catch (error) {
      handleApiError(error, "투두를 삭제하는 중 오류가 발생했습니다.");
    }
  };

  const onInsert = async (text) => {
    if (!userId) return;

    const newTodo = {
      user_id: userId,
      date: new Date().toISOString(),
      content: text,
    };

    const todoId = await addTodo(newTodo);
    if (todoId) {
      setTodos((prevTodos) => [...prevTodos, { ...newTodo, todo_id: todoId }]);
      nextId.current++;
    }
  };

  const onRemove = async (id) => {
    await deleteTodo(id);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.todo_id !== id));
  };

  const handleToggle = async (id) => {
    const toggledTodo = todos.find((todo) => todo.todo_id === id);
    const updatedTodo = await updateTodo(id, {
      is_checked: !toggledTodo.is_checked,
    });

    if (updatedTodo) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.todo_id === id ? updatedTodo : todo))
      );
    }
  };

  const handleSave = async (id, editedText) => {
    const updatedTodo = await updateTodo(id, { content: editedText });
    if (updatedTodo) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.todo_id === id ? updatedTodo : todo))
      );
    }
  };

  const handleEmojiChange = async (id, emoji) => {
    const updatedTodo = await updateTodo(id, { emoji });
    if (updatedTodo) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.todo_id === id ? updatedTodo : todo))
      );
    }
  };

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
          ) : todos.length > 0 ? (
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
            <p>🥳 추가하기 버튼으로 할 일을 추가할 수 있어요!</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
