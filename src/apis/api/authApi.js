import { axios } from "../utils/axios";

// 로그인
export const loginUser = async (credentials) => {
  const { data } = await axios.post("/api/users/login/", credentials);
  return data;
};

// 회원가입
export const registerUser = async (userData) => {
  const { data } = await axios.post("/api/users/register/", userData);
  return data;
};
