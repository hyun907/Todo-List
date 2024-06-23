import React, { useState, useCallback, useRef, useEffect } from "react";
import "./TodoItem.css";
import Button from "./Button";

const TodoItem = ({ todos, todo, onRemove, onInsert }) => {
  const { id, text, checked } = todo;

  // check 값 저장
  const [checkedItems, setCheckedItems] = useState(new Set());

  const checkedItemHandler = (id, isChecked) => {
    if (isChecked) {
      checkedItems.add(id);
      setCheckedItems(checkedItems);
    } else if (!isChecked && checkedItems.has(id)) {
      checkedItems.delete(id);
      setCheckedItems(checkedItems);
    }
  };

  const [bChecked, setChecked] = useState(false);

  const checkHandler = ({ target }) => {
    setChecked(!bChecked);
    checkedItemHandler(todo.id, target.checked);
    console.log(todos);
  };

  return (
    <div className="TodoItem">
      <input
        type="checkbox"
        checked={bChecked}
        onChange={(e) => checkHandler(e)}
      />
      <div className="content">{text}</div>

      <div className="button_wrapper">
        <Button
          text={"수정"}
          type={"SECONDARY"}
          onClick={() => {
            // 수정 함수
          }}
        />
        <Button text={"삭제"} type={"DELETE"} onClick={() => onRemove(id)} />
      </div>
    </div>
  );
};

export default TodoItem;
