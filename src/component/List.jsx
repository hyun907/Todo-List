import React, { useCallback, useRef, useState } from "react";
import TodoItem from "./TodoItem";
import "./List.css";

const List = ({ todos }) => {
  return (
    <div className="List">
      {todos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </div>
  );
};

export default List;
