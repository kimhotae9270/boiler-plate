# 🔑 Boiler-plate (Node.js Login Starter)

간단한 **로그인/회원가입 기능**을 빠르게 구현하기 위해 만든 Node.js 백엔드 보일러플레이트입니다.  
쿠키 기반 토큰 인증을 사용하며, 비밀번호는 bcrypt로 해싱 처리됩니다.

---

## 🚀 Features
- **회원가입**: 이메일/비밀번호 기반 유저 생성
- **로그인**: 비밀번호 검증 후 토큰 발급 → 쿠키 저장
- **인증 미들웨어**: 쿠키의 토큰을 확인해 사용자 인증
- **로그아웃**: 서버 DB에서 토큰 제거 + 쿠키 삭제
- **보안**: bcrypt 해싱, httpOnly 쿠키 사용

---

## 🛠 Tech Stack
- Node.js + Express
- MongoDB + Mongoose
- bcrypt (비밀번호 해싱)
- cookie-parser (쿠키 파싱)

