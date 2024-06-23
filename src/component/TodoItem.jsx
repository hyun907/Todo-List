import React, { useState } from "react";
import "./TodoItem.css";
import Button from "./Button";

const TodoItem = ({ todo, onRemove, onSave, onToggle, onEmojiChange }) => {
  const { todo_id, content, is_checked, emoji, date } = todo;
  const [isEditing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(content);
  const [editedEmoji, setEditedEmoji] = useState(emoji || "");

  const handleEdit = () => {
    setEditedText(content);
    setEditedEmoji(emoji || "");
    setEditing(true);
  };

  const handleSave = () => {
    onSave(todo_id, editedText);
    onEmojiChange(todo_id, editedEmoji);
    setEditing(false);
  };

  const handleDelete = () => {
    onRemove(todo_id);
  };

  const handleInputChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleEmojiInputChange = (e) => {
    setEditedEmoji(e.target.value);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const formattedDate = new Date(dateString).toLocaleDateString("ko-KR", options);
    return formattedDate;
  };

  return (
    <div className="TodoItem">
      <input
        className="checkbox"
        type="checkbox"
        checked={is_checked}
        onChange={() => onToggle(todo_id)}
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
          <div className="date">{formatDate(date)}</div>
            <Button text={"수정"} type={"SECONDARY"} onClick={handleEdit} />
            <Button text={"삭제"} type={"DELETE"} onClick={() => handleDelete(todo_id)} />
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
