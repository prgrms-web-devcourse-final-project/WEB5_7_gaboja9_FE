import classNames from 'classnames';
import { useState } from 'react';

import Login from '@/components/auth/Login';
import SignUp from '@/components/auth/SignUp';

import '@/styles/auth.scss';

const AuthPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  return (
    <div className="auth-container">
      <div className="auth-info-panel">
        <h1 className="logo">MockStock</h1>
        <p className="description">가상 투자로 주식의 재미를 경험하세요</p>
        <ul className="feature-list">
          <li>✅ 초기 자금 1,000만원 제공</li>
          <li>✅ 실시간 주식 데이터 연동</li>
          <li>✅ 모의 투자 랭킹 시스템</li>
          <li>✅ 포트폴리오 관리 기능</li>
        </ul>
      </div>

      <div className="auth-form-panel">
        <div className="form-header">
          <h2>시작하기</h2>
          <p>MockStock 계정으로 모든 서비스를 이용해보세요.</p>
        </div>

        <div className="form-toggle">
          <button className={classNames({ active: isLoginView })} onClick={() => setIsLoginView(true)}>
            로그인
          </button>
          <button className={classNames({ active: !isLoginView })} onClick={() => setIsLoginView(false)}>
            회원가입
          </button>
        </div>

        {isLoginView ? <Login /> : <SignUp />}
      </div>
    </div>
  );
};

export default AuthPage;
