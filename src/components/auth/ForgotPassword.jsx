import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchEmailPasswordFind, fetchPasswordFind } from '@/api/auth';
import useModal from '@/hooks/useModal';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerificationSent, setIsVerificationSent] = useState(false);

  const { openAlert } = useModal();
  const navigate = useNavigate();

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      openAlert('새로운 비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await fetchPasswordFind({ email, newPassword: password, passwordConfirm, verificationCode });
      if (!response.success) {
        throw new Error(response.error?.message || '비밀번호 재설정에 실패했습니다.');
      }

      openAlert('비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요.', () => {
        navigate('/login');
      });
    } catch (error) {
      console.error('비밀번호 재설정 처리 중 오류 발생:', error);
      openAlert(error.message || '요청 중 오류가 발생했습니다.');
    }
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const handleChangeVerificationCode = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleSendVerificationCode = async () => {
    if (!email) {
      openAlert('이메일을 입력해주세요.');
      return;
    }

    const params = { email: email.trim() };

    const result = await fetchEmailPasswordFind(params);
    if (!result.success) {
      openAlert(result.error?.message || '인증번호 발송에 실패했습니다.');
      return;
    }

    openAlert('인증번호가 발송되었습니다.');
    setIsVerificationSent(true);
  };

  return (
    <form className="auth-form" onSubmit={handlePasswordReset}>
      <div className="input-group-with-btn">
        <div className="input-group">
          <label htmlFor="reset-email">이메일</label>
          <input
            id="reset-email"
            type="email"
            placeholder="가입한 이메일을 입력하세요"
            value={email}
            onChange={handleChangeEmail}
            disabled={isVerificationSent}
          />
        </div>
        <button type="button" className="inline-btn" onClick={handleSendVerificationCode} disabled={isVerificationSent}>
          인증번호 발송
        </button>
      </div>
      <div className="input-group">
        <label htmlFor="reset-verify">인증번호</label>
        <input
          id="reset-verify"
          type="text"
          placeholder="인증번호를 입력하세요"
          disabled={!isVerificationSent}
          value={verificationCode}
          onChange={handleChangeVerificationCode}
        />
      </div>

      <div className="input-group">
        <label htmlFor="reset-password">새 비밀번호</label>
        <input
          id="reset-password"
          type="password"
          placeholder="새 비밀번호를 입력하세요"
          value={password}
          onChange={handleChangePassword}
          disabled={!isVerificationSent}
        />
      </div>
      <div className="input-group">
        <label htmlFor="reset-password-confirm">새 비밀번호 확인</label>
        <input
          id="reset-password-confirm"
          type="password"
          placeholder="새 비밀번호를 다시 입력하세요"
          value={passwordConfirm}
          onChange={handleChangePasswordConfirm}
          disabled={!isVerificationSent}
        />
      </div>

      <button
        type="submit"
        className="submit-btn"
        disabled={!email || !password || !passwordConfirm || !verificationCode}
      >
        비밀번호 재설정
      </button>
    </form>
  );
};

export default ForgotPassword;
