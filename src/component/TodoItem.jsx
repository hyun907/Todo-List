import React from "react";
import "./TodoItem.css";
import Button from "./Button";

const TodoItem = () => {
  return (
    <div className="TodoItem">
      <input type="checkbox" />
      <div className="content">test</div>
      <div className="button_wrapper">
        <Button text={"수정"} type={"SECONDARY"} />
        <Button text={"삭제"} type={"DELETE"} />
      </div>
    </div>
  );
};

export default TodoItem;
