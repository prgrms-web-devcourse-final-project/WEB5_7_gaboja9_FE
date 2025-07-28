import { useState } from 'react';

import { useAuth } from '@/hooks/useAuth';
import useModal from '@/hooks/useModal';

const Login = () => {
  const [id, setId] = useState('sunjh96@naver.com');
  const [password, setPassword] = useState('password123!');

  const { login } = useAuth();
  const { openAlert } = useModal();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await login({ email: id, password });

    if (!response.success) {
      openAlert(`로그인 실패: ${response.error}`);
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
      <button type="submit" className="submit-btn">
        로그인
      </button>
    </form>
  );
};

export default Login;
