import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../component/domain/auth/AuthForm";
import { useAuthError } from "../hooks/useAuthError";
import { loginUser } from "../apis/api/authApi";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();
  const { handleAuthError } = useAuthError();

  const handleLogin = async () => {
    if (!username || !password) {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    setIsLoading(true);

    try {
      const data = await loginUser({ username, password });
      alert("로그인에 성공했습니다.");
      const userId = data.user_id;
      nav(`/home/${userId}`);
    } catch (error) {
      handleAuthError(error, "login");
    } finally {
      setIsLoading(false);
    }
  };

  const goRegister = () => {
    nav("/Register");
  };

  return (
    <AuthForm
      title="Plan T"
      subtitle="나만의 일정관리 서비스"
      primaryButtonText="로그인"
      secondaryButtonText="회원가입"
      isLoading={isLoading}
      onPrimaryClick={handleLogin}
      onSecondaryClick={goRegister}
      username={username}
      password={password}
      onUsernameChange={(e) => setUsername(e.target.value)}
      onPasswordChange={(e) => setPassword(e.target.value)}
    />
  );
};

export default Login;
