import React from "react";

const Login = () => {
  return (
    <>
      <div className="loginPage">
        <h1 className="logo">Plan T</h1>
        <div className="login">
          <div className="contentWrap">
            <div className="inputTitle">아이디</div>
            <div className="inputWrap">
              <input className="input" placeholder="아이디를 입력하세요" />
            </div>

            <div className="errorMessageWrap">
              올바른 아이디를 입력해주세요.
            </div>

            <div className="inputTitle">비밀번호</div>
            <div className="inputWrap">
              <input className="input" placeholder="비밀번호를 입력하세요"/>
            </div>
            <div className="errorMessageWrap">
              올바른 비밀번호를 입력해주세요.
            </div>
          </div>

          <div className="btnWrap">
            <button className="loginBtn">로그인</button>
            <button className="registerBtn">회원가입</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
