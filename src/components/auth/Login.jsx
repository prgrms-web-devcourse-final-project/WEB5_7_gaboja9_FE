import { useState } from 'react';
import { Link } from 'react-router-dom'; // Link 임포트

import { useAuth } from '@/hooks/useAuth';
import useModal from '@/hooks/useModal';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useAuth();
  const { openAlert } = useModal();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await login({ email: id, password });

    if (!response.success) {
      openAlert(`로그인 실패`);
    }
  };

  const handleChangeId = (e) => {
    setId(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <form className="auth-form" onSubmit={handleLogin}>
      {/* ... 기존 input-group ... */}
      <div className="input-group">
        <label htmlFor="login-id">아이디</label>
        <input
          id="login-id"
          type="text"
          value={id}
          onChange={handleChangeId}
          autoComplete="username"
          required
          placeholder="아이디를 입력하세요"
        />
      </div>
      <div className="input-group">
        <label htmlFor="login-password">비밀번호</label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={handleChangePassword}
          autoComplete="current-password"
          required
          placeholder="비밀번호를 입력하세요"
        />
      </div>
      <button type="submit" className="submit-btn" disabled={!id || !password}>
        로그인
      </button>

      {/* ... 기존 social-login ... */}
      <div className="social-login">
        <div className="divider">
          <span>OR</span>
        </div>
        <button
          type="button"
          className="social-btn kakao"
          onClick={() => {
            window.location.href = 'https://mockstocks.duckdns.org/oauth2/authorization/kakao';
          }}
        >
          카카오로 시작하기
        </button>
        <button
          type="button"
          className="social-btn google"
          onClick={() => {
            window.location.href = 'https://mockstocks.duckdns.org/oauth2/authorization/google';
          }}
        >
          Google로 시작하기
        </button>
        <button
          type="button"
          className="social-btn naver"
          onClick={() => {
            window.location.href = 'https://mockstocks.duckdns.org/oauth2/authorization/naver';
          }}
        >
          네이버로 시작하기
        </button>
      </div>

      <div className="auth-footer">
        <Link to="/forgot-password" className="link">
          비밀번호 찾기
        </Link>
        <p>
          <a href="/" className="link">
            비회원으로 이용하기
          </a>
        </p>
      </div>
    </form>
  );
};

export default Login;
