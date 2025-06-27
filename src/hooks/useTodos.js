import { useState, useEffect } from "react";
import {
  fetchTodos,
  fetchTodosByDate,
  addTodo,
  deleteTodo,
  checkTodo,
  reviewTodo,
  editTodo,
} from "../apis/api/todoApi";

export const useTodos = (userId) => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null); // 현재 선택된 날짜

  // 투두 불러오기 (초기 로딩용)
  const loadTodos = async () => {
    try {
      setIsLoading(true);
      const data = await fetchTodos(userId);
      setTodos(data);
      setSelectedDate(null); // 전체 보기로 설정
      setError(null);
    } catch (err) {
      setError("투두리스트를 불러오는 중 오류가 발생했습니다.");
      console.error("투두 조회 실패:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // 전체 투두 보기 (버튼 클릭용)
  const viewAllTodos = async () => {
    try {
      const data = await fetchTodos(userId);
      setTodos(data);
      setSelectedDate(null); // 전체 보기로 설정
      setError(null);
    } catch (err) {
      setError("투두리스트를 불러오는 중 오류가 발생했습니다.");
      console.error("투두 조회 실패:", err);
    }
  };

  // 날짜별 투두 불러오기
  const loadTodosByDate = async (month, day) => {
    try {
      // 이미 해당 날짜가 선택되어 있다면 API 호출하지 않음
      if (
        selectedDate &&
        selectedDate.month === month &&
        selectedDate.day === day
      ) {
        return;
      }

      const data = await fetchTodosByDate(userId, month, day);
      setTodos(data);
      setSelectedDate({ month, day }); // 선택된 날짜 저장
      setError(null);
    } catch (err) {
      setError("해당 날짜의 투두리스트를 불러오는 중 오류가 발생했습니다.");
      console.error("날짜별 투두 조회 실패:", err);
    }
  };

  useEffect(() => {
    if (userId) {
      loadTodos();
    }
  }, [userId]);

  // 투두 추가하기
  const insertTodo = async (text) => {
    if (!userId) return;

    // 한국 시간대로 현재 날짜 생성
    const now = new Date();
    const koreanTime = new Date(now.getTime() + 9 * 60 * 60 * 1000);

    const newTodo = {
      user_id: userId,
      date: koreanTime.toISOString(),
      content: text,
    };

    await addTodo({ userId, todo: newTodo });
    // 현재 선택된 날짜가 있으면 해당 날짜로, 없으면 전체로 새로고침
    if (selectedDate) {
      loadTodosByDate(selectedDate.month, selectedDate.day);
    } else {
      viewAllTodos();
    }
  };

  // 투두 삭제
  const removeTodo = async (id) => {
    await deleteTodo({ userId, todoId: id });
    if (selectedDate) {
      loadTodosByDate(selectedDate.month, selectedDate.day);
    } else {
      viewAllTodos();
    }
  };

  // 투두 수정
  const editTodoContent = async (id, content, date = null) => {
    await editTodo({ userId, todoId: id, content, date });
    if (selectedDate) {
      loadTodosByDate(selectedDate.month, selectedDate.day);
    } else {
      viewAllTodos();
    }
  };

  // 투두 채크하기
  const checkTodoComplete = async (id, currentChecked) => {
    // null이나 undefined 값을 false로 처리하고 boolean으로 변환
    const currentCheckedBool = Boolean(currentChecked);
    const newChecked = !currentCheckedBool;

    console.log("체크 상태 변경:", {
      todoId: id,
      currentChecked,
      currentCheckedBool,
      newChecked,
    });

    await checkTodo({ userId, todoId: id, isChecked: newChecked });
    if (selectedDate) {
      loadTodosByDate(selectedDate.month, selectedDate.day);
    } else {
      viewAllTodos();
    }
  };

  // 투두 리뷰 추가하기
  const addTodoReview = async (id, emoji) => {
    await reviewTodo({ userId, todoId: id, emoji });
    if (selectedDate) {
      loadTodosByDate(selectedDate.month, selectedDate.day);
    } else {
      viewAllTodos();
    }
  };

  return {
    todos,
    isLoading,
    error,
    selectedDate,
    loadTodos,
    viewAllTodos,
    loadTodosByDate,
    insertTodo,
    removeTodo,
    editTodoContent,
    checkTodoComplete,
    addTodoReview,
  };
};
