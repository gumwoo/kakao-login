# 🎬 Netflix Clone Project

현대적인 UI/UX를 갖춘 Netflix 스타일의 영화 스트리밍 서비스 클론 프로젝트입니다.

## 📸 스크린샷
![Netflix Clone Screenshot](./image.png)

## 🌐 배포 링크
**[넷플릭스 클론 웹사이트 바로가기](https://hilarious-lolly-e4a1fe.netlify.app/)**

## 🌟 주요 기능

### 인증 시스템 🔐
- 회원가입 및 로그인 
- Local Storage를 활용한 세션 관리 
- 보안된 라우팅 시스템 

### 홈 페이지 🏠
- 동적 배너 표시
- 카테고리별 영화 슬라이더
- 반응형 레이아웃

### 영화 기능 🎥
- TMDB API 기반 영화 정보 표시
- 영화 검색 기능
- 장르별 필터링
- 무한 스크롤
- 찜하기 기능

### UI/UX 특징 ✨
- 반응형 디자인 (모바일, 태블릿, 데스크톱)
- 부드러운 애니메이션과 트랜지션
- 직관적인 네비게이션
- 모바일 최적화

## 🛠 기술 스택

### Frontend
- **React.js** - 프레임워크
- **Redux Toolkit** - 상태 관리
- **React Query** - 서버 상태 관리
- **React Router** - 라우팅
- **Axios** - HTTP 클라이언트

### 스타일링
- **CSS3** - 스타일링
- **CSS Custom Properties** - 테마 관리
- **CSS Animations** - 애니메이션

### API
- **TMDB API** - 영화 데이터

## 📱 반응형 디자인

- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)
- 다양한 화면 방향 지원 (Portrait/Landscape)

## 💫 주요 구현 사항

1. **컴포넌트 구조**
   - 재사용 가능한 컴포넌트 설계
   - Props를 통한 데이터 전달
   - Event Handling을 통한 상호작용

2. **상태 관리**
   - Redux를 통한 전역 상태 관리
   - React Query를 통한 서버 상태 관리
   - Local Storage를 통한 영구 데이터 저장

3. **성능 최적화**
   - 이미지 최적화
   - 무한 스크롤 구현
   - 조건부 렌더링

## 🚀 설치 및 실행
### 📦 설치
- 프로젝트를 로컬 환경에 설치하고 실행하기 위한 단계는 다음과 같습니다.

#### 의존성 설치
- 프로젝트에 필요한 모든 의존성을 설치합니다.
- npm install
#### 주요 패키지 설치 내역
- 프로젝트에 필요한 주요 패키지들을 명시적으로 설치합니다.
### 코어 패키지
- npm install react@18.3.1 react-dom@18.3.1
- npm install @reduxjs/toolkit@2.3.0 react-redux@9.1.2
- npm install @tanstack/react-query@5.59.19
- npm install react-router-dom@6.27.0
- npm install axios@1.7.7
- npm install framer-motion@11.11.17

### UI 관련 패키지

- npm install @fortawesome/fontawesome-svg-core@6.6.0
- npm install @fortawesome/free-solid-svg-icons@6.6.0
- npm install @fortawesome/react-fontawesome@0.2.2
- npm install react-lazy-load-image-component@1.6.2
- npm install react-toastify@10.0.6

### 개발 도구
- npm install -D @babel/plugin-proposal-private-property-in-object@7.21.11
### 개발 서버 실행 (http://localhost:3001)
npm start

### 온라인 데모
- 배포된 웹사이트: https://hilarious-lolly-e4a1fe.netlify.app/
- Netlify를 통한 지속적 배포 구현

