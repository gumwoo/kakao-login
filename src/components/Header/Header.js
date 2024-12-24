// src/components/Header/Header.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import netflixLogo from './netflix-logo.png';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const [kakaoUser, setKakaoUser] = useState(null);

  useEffect(() => {
    // 새로고침 시 로컬 스토리지에서 사용자 정보 가져오기
    const storedUser = localStorage.getItem('kakao_user');
    if (storedUser) {
      setKakaoUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    // 카카오 SDK 로그아웃 (선택)
    if (window.Kakao && window.Kakao.Auth) {
      window.Kakao.Auth.logout(() => {
        console.log('카카오 로그아웃 완료');
      });
    }
    // localStorage 비우기
    localStorage.removeItem('kakao_token');
    localStorage.removeItem('kakao_user');

    setKakaoUser(null);
    navigate('/signin');
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <Link to="/" className="logo">
          <img src={netflixLogo} alt="Netflix Logo" />
        </Link>
        <nav className="nav-links desktop-nav">
          <ul>
            <li><Link to="/">홈</Link></li>
            <li><Link to="/popular">대세 콘텐츠</Link></li>
            <li><Link to="/wishlist">내가 찜한 리스트</Link></li>
            <li><Link to="/search">찾아보기</Link></li>
          </ul>
        </nav>
      </div>
      <div className="header-right">
        {kakaoUser ? (
          <>
             <span className="user-info">
              {/** 닉네임 표시 */}
              {kakaoUser.nickname}님
            </span>
            {/** 프로필 이미지 표시 (있을 경우) */}
            {kakaoUser.profileImage && (
              <img
                src={kakaoUser.profileImage}
                alt="프로필 이미지"
                style={{ width: '40px', height: '40px', borderRadius: '50%', marginLeft: '8px' }}
              />
            )}
            <button className="icon-button logout-button" onClick={handleLogout}>
              로그아웃
            </button>
          </>
        ) : (
          <Link to="/signin" className="icon-button">
            로그인
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
