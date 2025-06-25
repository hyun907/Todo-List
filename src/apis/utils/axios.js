import Axios from "axios";
import { BASE_URL } from "../../constants/api";

export const axios = Axios.create({
  baseURL: BASE_URL,
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      alert(`문제가 발생했습니다. (코드: ${error.response.status})`);
    } else {
      alert("서버에 연결할 수 없습니다. ");
    }

    return Promise.reject(error);
  }
);
