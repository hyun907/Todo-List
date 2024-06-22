import React from "react";
import Button from "./Button";
import "./EditBox.css";

const EditBox = () => {
  return (
    <div className="EditBox">
      <textarea name="content" placeholder="할 일을 추가해보세요." />
      <div className="button_wrapper">
        <Button text={"추가하기"} />
      </div>
    </div>
  );
};

export default EditBox;
