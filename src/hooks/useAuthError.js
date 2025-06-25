export const useAuthError = () => {
  const handleAuthError = (error, actionType) => {
    if (error.response) {
      const { status, data } = error.response;

      if (actionType === "login") {
        if (
          status === 400 &&
          data.detail === "username 또는 password가 필요합니다."
        ) {
          alert("아이디와 비밀번호를 모두 입력해주세요.");
        } else if (
          status === 404 &&
          data.detail === "유저를 찾을 수 없습니다."
        ) {
          alert("유저를 찾을 수 없습니다.");
        } else {
          console.error("Error:", data);
          alert("로그인 실패");
        }
      } else if (actionType === "register") {
        if (status === 400 && data.username) {
          alert("회원가입 실패: " + data.username[0]);
        } else {
          console.error("Error:", data);
          alert("회원가입 실패");
        }
      }
    } else if (error.request) {
      console.error("No response from server:", error.request);
      alert("서버로부터 응답을 받지 못했습니다.");
    } else {
      console.error("Request error:", error.message);
      alert("요청 중 오류가 발생했습니다.");
    }
  };

  return { handleAuthError };
};
