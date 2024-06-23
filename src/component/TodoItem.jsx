import React, { useState } from "react";
import "./TodoItem.css";
import Button from "./Button";

const TodoItem = ({ todo, onRemove, onSave, onToggle }) => {
  const { id, text, checked } = todo;
  const [isEditing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleEdit = () => {
    setEditedText(text); // Reset edited text to current text
    setEditing(true);
  };

  const handleSave = () => {
    onSave(id, editedText); // Pass id and edited text to parent component
    setEditing(false);
  };

  const handleDelete = () => {
    onRemove(id);
  };

  const handleInputChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleCheckboxChange = () => {
    onToggle(id); // Toggle checked state in parent component
  };

  return (
    <div className="TodoItem">
      <input
        className="checkbox"
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
      />

      {isEditing ? (
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
      ) : (
        <div className="content">{text}</div>
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
