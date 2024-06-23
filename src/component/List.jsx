import React, { useCallback, useRef, useState } from "react";
import TodoItem from "./TodoItem";
import "./List.css";

const List = ({ todos, onRemove }) => {
  return (
    <div className="List">
      {todos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} onRemove={onRemove} />
      ))}
    </div>
  );
};

export default List;
