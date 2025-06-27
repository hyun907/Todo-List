import React, { useState } from "react";
import "./TodoItem.css";
import Button from "../../common/Button";

const TodoItem = ({ todo, onRemove, onSave, onToggle, onEmojiChange }) => {
  const { todo_id, content, is_checked, emoji, date } = todo;

  const [isEditing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(content);
  const [editedDate, setEditedDate] = useState(date.split("T")[0]);

  const handleEdit = () => {
    setEditedText(content);
    setEditedDate(date.split("T")[0]);
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      const isoDate = new Date(editedDate + "T00:00:00Z").toISOString();
      await onSave(todo_id, editedText, isoDate);
      setEditing(false);
    } catch (error) {
      alert("투두를 저장하는 중 오류가 발생했습니다.");
    }
  };

  const handleEmojiClick = () => {
    const userEmoji = prompt("이모지를 입력해주세요:", emoji || "");
    if (userEmoji !== null) {
      onEmojiChange(todo_id, userEmoji);
    }
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("T")[0].split("-");
    return `${year}.${month}.${day}`;
  };

  return (
    <div className="TodoItem">
      <input
        className="checkbox"
        type="checkbox"
        checked={is_checked}
        onChange={() => onToggle(todo_id, is_checked)}
        style={{ zoom: "1.5", accentColor: "green" }}
      />

      <button className="emoji-button" onClick={handleEmojiClick}>
        {emoji || "😊"}
      </button>

      {isEditing ? (
        <input
          className="edit-input"
          type="text"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          autoFocus
          onKeyPress={(e) => e.key === "Enter" && handleSave()}
        />
      ) : (
        <div className="content">{content}</div>
      )}

      <div className="button_wrapper">
        {isEditing ? (
          <>
            <input
              className="date-input"
              type="date"
              value={editedDate}
              onChange={(e) => setEditedDate(e.target.value)}
            />
            <Button text="저장" type="PRIMARY" onClick={handleSave} />
          </>
        ) : (
          <>
            <div className="date">{formatDate(date)}</div>
            <Button text="수정" type="SECONDARY" onClick={handleEdit} />
            <Button
              text="삭제"
              type="DELETE"
              onClick={() => onRemove(todo_id)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
