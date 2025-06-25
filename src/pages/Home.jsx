import React from "react";
import { useParams } from "react-router-dom";
import ReactCalendar from "../component/domain/home/ReactCalendar";
import EditBox from "../component/domain/home/EditBox";
import TodoList from "../component/domain/home/TodoList";
import Button from "../component/common/Button";
import { useTodos } from "../hooks/useTodos";
import "./Home.css";

const Home = () => {
  const { userId } = useParams();
  const {
    todos,
    isLoading,
    error,
    selectedDate,
    loadTodos,
    viewAllTodos,
    loadTodosByDate,
    insertTodo,
    removeTodo,
    editTodoContent,
    checkTodoComplete,
    addTodoReview,
  } = useTodos(userId);

  if (isLoading) {
    return <div className="Home">로딩 중...</div>;
  }

  if (error) {
    return <div className="Home">{error}</div>;
  }

  return (
    <div className="Home">
      <section className="section_top">
        <div className="calendar-container">
          <ReactCalendar onDateSelect={loadTodosByDate} />
          <div className="btn-wraaper">
            <Button
              text="전체 투두 보기"
              type={"LIGHT"}
              onClick={viewAllTodos}
            />
          </div>
        </div>
        <EditBox onInsert={insertTodo} />
      </section>
      <section className="section_bottom">
        <TodoList
          todos={todos}
          onToggle={checkTodoComplete}
          onRemove={removeTodo}
          onSave={editTodoContent}
          onEmojiChange={addTodoReview}
        />
      </section>
    </div>
  );
};

export default Home;
