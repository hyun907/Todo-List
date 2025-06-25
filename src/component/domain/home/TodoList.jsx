import React from "react";
import TodoItem from "./TodoItem";
import EmptyState from "./EmptyState";
import "./TodoList.css";

const TodoList = ({ todos, onToggle, onRemove, onSave, onEmojiChange }) => {
  return (
    <div className="todo-list">
      {todos.length ? (
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
        <EmptyState />
      )}
    </div>
  );
};

export default TodoList;
