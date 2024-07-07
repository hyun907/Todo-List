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
  const { userId } = useParams(); // URL에서 동적으로 userId 파라미터를 받아옴
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const nextId = useRef(1); // 신규 Todo 아이템의 ID를 관리하기 위한 useRef

  useEffect(() => {
    if (userId) {
      fetchTodos(userId); // userId가 있을 때만 투두리스트 조회
    }
  }, [userId]); // userId가 변경될 때마다 useEffect가 실행되도록 설정

  const fetchTodos = async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/todos/${userId}`);
      setTodos(response.data); // API에서 받은 데이터를 상태에 저장
    } catch (error) {
      console.error("Error fetching todos:", error);
      setError("투두리스트를 불러오는 중 오류가 발생했습니다.");
    }
  };

  const onInsert = async (text) => {
    if (!userId) {
      console.error("userId가 정의되지 않았습니다.");
      return;
    }

    const newTodo = {
      user_id: userId,
      date: new Date().toISOString(),
      content: text,
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/api/todos/${userId}`,
        newTodo
      );
      newTodo.todo_id = response.data.todo_id;
      setTodos((prevTodos) => [...prevTodos, newTodo]); // 상태 업데이트
      nextId.current++;
    } catch (error) {
      console.error("Error adding todo:", error);
      setError("투두를 추가하는 중 오류가 발생했습니다.");
    }
  };

  const onRemove = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/todos/${userId}/${id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.todo_id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
      setError("투두를 삭제하는 중 오류가 발생했습니다.");
    }
  };

  const handleToggle = async (id) => {
    const toggledTodo = todos.find((todo) => todo.todo_id === id);
    const updatedTodo = { ...toggledTodo, is_checked: !toggledTodo.is_checked };

    try {
      await axios.patch(`${BASE_URL}/api/todos/${userId}/${id}/check`, updatedTodo);
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.todo_id === id ? { ...todo, is_checked: !todo.is_checked } : todo
        )
      );
    } catch (error) {
      console.error("Error toggling todo:", error);
      setError("투두 체크 상태를 변경하는 중 오류가 발생했습니다.");
    }
  };

  const handleSave = async (id, editedText) => {
    try {
      const editedTodo = {
        ...todos.find((todo) => todo.todo_id === id),
        content: editedText,
      };
      const response = await axios.patch(
        `${BASE_URL}/api/todos/${userId}/${id}`,
        editedTodo
      );
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.todo_id === id ? response.data : todo
        )
      );
    } catch (error) {
      console.error("Error saving todo:", error);
      setError("투두 내용을 저장하는 중 오류가 발생했습니다.");
    }
  };

  const handleEmojiChange = async (id, emoji) => {
    try {
      const editedTodo = {
        ...todos.find((todo) => todo.todo_id === id),
        emoji: emoji,
      };
      const response = await axios.patch(
        `${BASE_URL}/api/todos/${userId}/${id}/reviews`,
        { emoji }
      );
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.todo_id === id ? response.data : todo
        )
      );
    } catch (error) {
      console.error("Error changing emoji:", error);
      setError("이모지를 변경하는 중 오류가 발생했습니다.");
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
