import React from "react";
import "./EmptyState.css";

const EmptyState = () => (
  <div className="empty-state">
    <div className="empty-icon">📝</div>
    <h3>할 일이 없어요!</h3>
    <p>추가하기 버튼으로 새로운 할 일을 추가해보세요!</p>
  </div>
);

export default EmptyState;
