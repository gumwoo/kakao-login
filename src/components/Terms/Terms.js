// src/components/Terms/Terms.js

import React from 'react';
import './Terms.css';

function Terms({ isOpen, onClose, onAgree }) {
  if (!isOpen) return null;

  return (
    <div className="terms-modal-overlay">
      <div className="terms-modal">
        <h2>서비스 이용약관</h2>
        <div className="terms-content">
          <h3>제1장 총칙</h3>
          <section>
            <h4>제1조 (목적)</h4>
            <p>본 약관은 Movie App 서비스의 이용조건 및 절차, 이용자와 당사의 권리, 의무, 책임사항을 규정함을 목적으로 합니다.</p>
          </section>

          <section>
            <h4>제2조 (개인정보 보호)</h4>
            <p>당사는 이용자의 개인정보를 보호하기 위해 최선을 다하며, 개인정보 처리방침을 준수합니다.</p>
            <ul>
              <li>수집항목: 이메일 주소, 비밀번호</li>
              <li>수집목적: 서비스 제공, 회원식별</li>
              <li>보유기간: 회원 탈퇴시까지</li>
            </ul>
          </section>

          <section>
            <h4>제3조 (서비스 제공)</h4>
            <p>당사는 다음과 같은 서비스를 제공합니다:</p>
            <ul>
              <li>영화 정보 제공</li>
              <li>위시리스트 기능</li>
              <li>영화 검색 서비스</li>
            </ul>
          </section>
        </div>
        
        <div className="terms-buttons">
          <button onClick={onAgree} className="agree-button">동의</button>
          <button onClick={onClose} className="cancel-button">취소</button>
        </div>
      </div>
    </div>
  );
}

export default Terms;