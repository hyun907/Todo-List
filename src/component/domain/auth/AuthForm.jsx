import React from "react";
import InputField from "./InputField";
import Button from "../../common/Button";
import "./AuthForm.css";

const AuthForm = ({
  title,
  subtitle,
  primaryButtonText,
  secondaryButtonText,
  isLoading,
  onPrimaryClick,
  onSecondaryClick,
  username,
  password,
  onUsernameChange,
  onPasswordChange,
}) => {
  return (
    <div className="loginPage">
      <h1 className="logo">{title}</h1>
      <p className="loginText">{subtitle}</p>
      <div className="login">
        <div className="contentWrap">
          <InputField
            label="아이디"
            placeholder="아이디를 입력하세요"
            value={username}
            onChange={onUsernameChange}
            required
          />
          <InputField
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={onPasswordChange}
            required
          />
        </div>

        <div className="btnWrap">
          <Button
            text={isLoading ? `${primaryButtonText} 중...` : primaryButtonText}
            onClick={onPrimaryClick}
            disabled={isLoading}
          />
          <Button
            text={secondaryButtonText}
            type="SECONDARY"
            onClick={onSecondaryClick}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
