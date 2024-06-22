import React from "react";
import { useState } from "react";
import Button from "../component/Button";
import { useNavigate } from "react-router-dom";

const User = {
  id: "test",
  pw: "test123",
};

const Login = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const nav = useNavigate();

  const handleId = (e) => {
    setId(e.target.value);
  };
  const handlePw = (e) => {
    setPw(e.target.value);
  };

  const onClickConfirmButton = () => {
    if (id === User.id && pw === User.pw) {
      alert("로그인에 성공했습니다.");
    } else {
      alert("로그인에 실패했습니다.");
    }
  };

  const goRegister = () => {
    nav("/Register");
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
                value={id}
                onChange={handleId}
              />
            </div>

            <div className="inputTitle">비밀번호</div>
            <div className="inputWrap">
              <input
                type="password"
                className="input"
                placeholder="비밀번호를 입력하세요"
                value={pw}
                onChange={handlePw}
              />
            </div>
          </div>

          <div className="btnWrap">
            <Button text="로그인" onClick={onClickConfirmButton}></Button>
            <Button
              text="회원가입"
              type="SECONDARY"
              onClick={goRegister}
            ></Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
