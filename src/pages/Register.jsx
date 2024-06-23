import React, { useState } from "react";
import axios from "axios";
import Button from "../component/Button";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = () => {
    if (!username || !password) {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    const data = {
      username: username,
      password: password,
    };

    axios.post("/api/users/register", data)
      .then((response) => {
        alert("회원가입 되었습니다.");
        nav("/");
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 400 && error.response.data.username) {
            alert("회원가입 실패: " + error.response.data.username[0]);
          } else {
            console.error("Error:", error.response.data);
            alert("회원가입 실패");
          }
        } else if (error.request) {
          console.error("No response from server:", error.request);
          alert("서버로부터 응답을 받지 못했습니다.");
        } else {
          console.error("Request error:", error.message);
          alert("요청 중 오류가 발생했습니다.");
        }
      });
  };

  const goLogin = () => {
    nav("/");
  };

  return (
    <>
      <div className="loginPage">
        <h1 className="logo">Plan T</h1>
        <p className="loginText">나만의 일정관리 서비스</p>
        <div className="login">
          <div className="contentWrap">
            <div className="inputTitle">아이디</div>
            <div className="inputWrap">
              <input
                className="input"
                placeholder="아이디를 입력하세요"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>

            <div className="inputTitle">비밀번호</div>
            <div className="inputWrap">
              <input
                type="password"
                className="input"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
          </div>

          <div className="btnWrap">
            <Button text="회원가입" onClick={handleRegister}></Button>
            <Button
              text="로그인 페이지로 돌아가기"
              type="SECONDARY"
              onClick={goLogin}
            ></Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
