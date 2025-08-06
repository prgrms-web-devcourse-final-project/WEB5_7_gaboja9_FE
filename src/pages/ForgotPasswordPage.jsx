import { Link } from 'react-router-dom';

import ForgotPassword from '@/components/auth/ForgotPassword';

const ForgotPasswordPage = () => {
  return (
    <div className="auth-container">
      <div className="auth-info-panel">
        <h1 className="logo">MockStock</h1>
        <p className="description">비밀번호를 재설정합니다.</p>
      </div>

      <div className="auth-form-panel">
        <div className="form-header">
          <h2>비밀번호 찾기</h2>
          <p>가입 시 사용한 이메일을 통해 비밀번호를 재설정하세요.</p>
        </div>

        <ForgotPassword />

        <div className="auth-footer">
          <Link to="/login" className="link">
            로그인 페이지로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
