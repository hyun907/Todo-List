import React from "react";
import TodoItem from "./TodoItem";
import "./List.css";

const List = () => {
  return (
    <div className="List">
      <TodoItem />
      <TodoItem />
      <TodoItem />
    </div>
  );
};

export default List;
