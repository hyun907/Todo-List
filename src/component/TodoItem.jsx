import React from "react";
import "./TodoItem.css";
import Button from "./Button";

const TodoItem = ({ todo, onRemove }) => {
  const { id, text, checked } = todo;
  return (
    <div className="TodoItem">
      <input type="checkbox" />
      <div className="content">{text}</div>
      <div className="button_wrapper">
        <Button text={"수정"} type={"SECONDARY"} />
        <Button text={"삭제"} type={"DELETE"} onClick={() => onRemove(id)} />
      </div>
    </div>
  );
};

export default TodoItem;
