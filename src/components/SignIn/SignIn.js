// src/components/SignIn/SignIn.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css'; // 스타일은 필요에 따라 수정

function SignIn() {
  const navigate = useNavigate();

  // 카카오 로그인 버튼 클릭
  const handleKakaoLogin = () => {
    if (!window.Kakao) {
      alert('Kakao SDK 로드 실패');
      return;
    }
    window.Kakao.Auth.login({
      scope: 'profile_nickname, profile_image',
      success: (authObj) => {
        console.log('[카카오 로그인 성공]', authObj);
        // 토큰 저장
        localStorage.setItem('kakao_token', authObj.access_token);

        // 사용자 정보 요청
        window.Kakao.API.request({
          url: '/v2/user/me',
          success: (res) => {
            console.log('[카카오 사용자 정보]', res);

            // 예: 닉네임, 이메일 등
            const { id, kakao_account } = res;
            const { email, profile } = kakao_account || {};

            const userData = {
              kakaoId: id,
              email: email || '',
              nickname: profile?.nickname || '홍길동',
              profileImage: profile?.profile_image_url || '', // 추가
            };
            // localStorage 등에 저장
            localStorage.setItem('kakao_user', JSON.stringify(userData));

            // 메인 페이지로 이동
            navigate('/');
          },
          fail: (err) => {
            console.error('[사용자 정보 요청 실패]', err);
            alert('카카오 사용자 정보 요청 실패');
          },
        });
      },
      fail: (err) => {
        console.error('[카카오 로그인 실패]', err);
        alert('카카오 로그인 실패');
      },
    });
  };

  return (
    <div className="sign-in-container">
      <h1>카카오 로그인</h1>
      <button 
        type="button"
        className="kakao-login-btn"
        onClick={handleKakaoLogin}
      >
        카카오로 시작하기
      </button>
    </div>
  );
}

export default SignIn;
