// src/components/ProtectedRoute/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  // 카카오 로그인 여부 체크
  const kakaoToken = localStorage.getItem('kakao_token');
  if (!kakaoToken) {
    // 로그인 안 돼있으면 로그인 페이지로
    return <Navigate to="/signin" replace />;
  }
  return children;
}

export default ProtectedRoute;
