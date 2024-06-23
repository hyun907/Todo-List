import React, { useState } from "react";
import "./TodoItem.css";
import Button from "./Button";

const TodoItem = ({ todo, onRemove, onSave, onToggle, onEmojiChange }) => {
  const { todo_id, content, is_checked, emoji } = todo; // todo 객체의 필드명을 API 응답 구조에 맞게 수정
  const [isEditing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(content || ""); // 초기 값이 없을 경우 공백 문자열로 설정
  const [editedEmoji, setEditedEmoji] = useState(emoji || ""); // 초기 값이 없을 경우 공백 문자열로 설정

  const handleEdit = () => {
    setEditedText(content); // 수정된 구조에 맞추어 필드명 변경
    setEditedEmoji(emoji || ""); // 수정된 구조에 맞추어 필드명 변경
    setEditing(true);
  };

  const handleSave = () => {
    onSave(todo_id, editedText); // 수정된 구조에 맞추어 필드명 변경
    onEmojiChange(todo_id, editedEmoji); // 수정된 구조에 맞추어 필드명 변경
    setEditing(false);
  };

  const handleDelete = () => {
    onRemove(todo_id); // 수정된 구조에 맞추어 필드명 변경
  };

  const handleInputChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleEmojiInputChange = (e) => {
    setEditedEmoji(e.target.value);
  };

  const handleCheckboxChange = () => {
    onToggle(todo_id); // 수정된 구조에 맞추어 필드명 변경
  };

  return (
    <div className="TodoItem">
      <input
        className="checkbox"
        type="checkbox"
        checked={is_checked}
        onChange={handleCheckboxChange}
      />

      {isEditing ? (
        <>
          <input
            className="edit-input"
            type="text"
            value={editedText}
            onChange={handleInputChange}
            autoFocus
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSave();
              }
            }}
          />
          <input
            className="edit-input"
            type="text"
            value={editedEmoji}
            onChange={handleEmojiInputChange}
            placeholder="이모지 입력"
          />
        </>
      ) : (
        <>
          <div className="emoji">{emoji}</div>
          <div className="content">{content}</div>
        </>
      )}

      <div className="button_wrapper">
        {isEditing && (
          <Button text={"저장"} type={"PRIMARY"} onClick={handleSave} />
        )}
      </div>
      <div className="button_wrapper">
        {!isEditing && (
          <>
            <Button text={"수정"} type={"SECONDARY"} onClick={handleEdit} />
            <Button text={"삭제"} type={"DELETE"} onClick={handleDelete} />
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
