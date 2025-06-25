import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../component/common/AuthForm";
import { useAuthError } from "../hooks/useAuthError";
import { registerUser } from "../apis/api/authApi";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();
  const { handleAuthError } = useAuthError();

  const handleRegister = async () => {
    if (!username || !password) {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    setIsLoading(true);

    try {
      await registerUser({ username, password });
      alert("회원가입 되었습니다.");
      nav("/");
    } catch (error) {
      handleAuthError(error, "register");
    } finally {
      setIsLoading(false);
    }
  };

  const goLogin = () => {
    nav("/");
  };

  return (
    <AuthForm
      title="Plan T"
      subtitle="나만의 일정관리 서비스"
      primaryButtonText="회원가입"
      secondaryButtonText="로그인 페이지로 돌아가기"
      isLoading={isLoading}
      onPrimaryClick={handleRegister}
      onSecondaryClick={goLogin}
      username={username}
      password={password}
      onUsernameChange={(e) => setUsername(e.target.value)}
      onPasswordChange={(e) => setPassword(e.target.value)}
    />
  );
};

export default Register;
