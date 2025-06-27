import { axios } from "../utils/axios";

// 투두 목록 조회
export const fetchTodos = async (userId) => {
  const { data } = await axios.get(`/api/todos/${userId}`);
  return data;
};

// 날짜별 투두 조회
export const fetchTodosByDate = async (userId, month, day) => {
  const { data } = await axios.get(
    `/api/todos/${userId}?month=${month}&day=${day}`
  );
  return data;
};

// 투두 작성
export const addTodo = async ({ userId, todo }) => {
  const { data } = await axios.post(`/api/todos/${userId}/`, todo);
  return data;
};

// 투두 수정
export const editTodo = async ({ userId, todoId, date, content }) => {
  const updateData = { content };
  if (date) {
    updateData.date = date;
  }

  const { data } = await axios.patch(
    `/api/todos/${userId}/${todoId}/`,
    updateData
  );
  return data;
};

// 투두 삭제
export const deleteTodo = async ({ userId, todoId }) => {
  await axios.delete(`/api/todos/${userId}/${todoId}/`);
  return todoId;
};

// 투두 완료
export const checkTodo = async ({ userId, todoId, isChecked }) => {
  const { data } = await axios.patch(`/api/todos/${userId}/${todoId}/check/`, {
    is_checked: isChecked,
  });

  return data;
};

// 투두 리뷰
export const reviewTodo = async ({ userId, todoId, emoji }) => {
  const { data } = await axios.patch(`/api/todos/${userId}/${todoId}/review/`, {
    emoji,
  });
  return data;
};
