# 📝 Plan T - 나만의 일정관리 서비스
<img width="1298" alt="스크린샷 2025-06-26 오전 4 34 25" src="https://github.com/user-attachments/assets/7f249a25-3372-48f6-8dee-8bcdb6366931" />
<img width="1278" alt="스크린샷 2025-06-26 오전 4 35 13" src="https://github.com/user-attachments/assets/bab063bd-7f4a-492e-ae68-36359ed5dc5c" />
<img width="1277" alt="스크린샷 2025-06-26 오전 4 40 26" src="https://github.com/user-attachments/assets/9dc96505-7565-49e7-bbcb-101b213dfa82" />

Plan T는 개인 맞춤형 일정 관리 서비스입니다. 할 일을 추가하고, 날짜별로 관리하며, 완료 상태를 체크할 수 있습니다.

## ✨ 주요 기능

### 🔐 회원가입 및 로그인

- 토이 프로젝트이기 때문에 통신을 간단하게 하고자, 사용자 인증을 없애고 URL에 있는 user_id를 통해 유저를 식별하도록 했습니다.
- 사용자별 개인 투두리스트 관리

### 😎 투두 관리

- **투두 추가**: 새로운 할 일을 추가
- **투두 수정**: 내용 및 날짜 변경
- **투두 삭제**: 불필요한 투두 제거
- **완료 체크**: 투두 완료 상태 토글
- **이모지 추가**: 투두에 이모지로 감정 표현

### 📅 날짜별 조회

- **전체 보기**: 모든 투두 리스트 조회
- **캘린더**: 날짜 클릭으로 해당 날짜 투두 조회
- **날짜별 필터링**: 특정 날짜의 투두만 표시

## 🛠 Frontend Stack

**Frontend Framework & Core**

- **React 18.2.0**
- **React DOM 18.2.0**
- **React Router DOM 6.23.1**

---

**HTTP Client & API**

- **Axios 1.7.2**
  - HTTP 클라이언트 라이브러리
  - 모듈화된 API 호출 구조
  - 인터셉터를 통한 공통 에러 처리

---

**Build Tool & Development**

- **Vite 5.2.0**: 빌드 도구
- **ESLint**

---

**UI**

- **React Calendar 5.0.0**: 캘린더 컴포넌트

---

**Style**

- **CSS Modules**: 컴포넌트별 스타일 격리

---

## 📁 프로젝트 구조

```
src/
├── apis/                    # API 관련
│   ├── api/
│   │   ├── authApi.js      # 인증 API
│   │   └── todoApi.js      # 투두 API
│   └── utils/
│       └── axios.js        # Axios 설정
├── component/               # 컴포넌트
│   ├── common/             # 공통 컴포넌트
│   │   └── Button.jsx
│   └── domain/             # 도메인별 컴포넌트
│       ├── auth/           # 인증 관련
│       │   ├── InputField.jsx
│       │   └── AuthForm.jsx
│       └── home/           # 홈 관련
│           ├── EditBox.jsx
│           ├── EmptyState.jsx
│           ├── ReactCalendar.jsx
│           ├── TodoItem.jsx
│           └── TodoList.jsx
├── hooks/                   # 커스텀 훅
│   ├── useAuthError.js     # 인증 공통 에러 처리
│   └── useTodos.js         # 투두 관리 로직
├── pages/                   # 페이지 컴포넌트
│   ├── Home.jsx            # 메인 페이지
│   ├── Login.jsx           # 로그인 페이지
│   ├── Register.jsx        # 회원가입 페이지
│   └── NotFound.jsx        # 404 페이지
└── constants/              # 상수 정의
    └── api.js              # BASE URL 관리
```

## 🚀 시작하기

### 설치

```bash
yarn install
```

### 개발 서버 실행

```bash
yarn dev
```

### 빌드

```bash
yarn build
```

## 사용법

### 1. 회원가입/로그인

- 회원가입 후 로그인하여 개인 투두리스트에 접속

### 2. 투두 추가

- "추가하기" 버튼을 클릭하여 새로운 투두 생성

### 3. 투두 관리

- **수정**: 수정 버튼 클릭 후 내용 변경
- **삭제**: 삭제 버튼으로 투두 제거
- **완료**: 체크박스로 완료 상태 변경
- **이모지**: 이모지 버튼으로 감정 표현

### 4. 날짜별 조회

- 캘린더에서 원하는 날짜 클릭
- "전체 투두 보기" 버튼으로 모든 투두 조회

## 👨‍💻 개발자

- **개발자**: Hyun
- **이메일**: seunghyun020907@gmail.com
- **GitHub**: @hyun907

---

**Thank you!**
