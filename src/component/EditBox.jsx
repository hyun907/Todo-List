import React from "react";
import Button from "./Button";
import "./EditBox.css";
import { useState, useCallback } from "react";

const EditBox = ({ onInsert }) => {
  const [value, setValue] = useState("");
  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      onInsert(value);
      setValue("");
      e.preventDefault();
    },
    [onInsert, value]
  );

  return (
    <div className="EditBox">
      <textarea
        onChange={onChange}
        value={value}
        className="content"
        placeholder="할 일을 추가해보세요."
      />
      <div className="button_wrapper">
        <Button text={"추가하기"} onClick={onSubmit} />
      </div>
    </div>
  );
};

export default EditBox;
