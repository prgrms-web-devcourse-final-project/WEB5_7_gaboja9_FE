import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchEmail } from '@/api/auth';
import { useAuth } from '@/hooks/useAuth';
import useModal from '@/hooks/useModal';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerificationSent, setIsVerificationSent] = useState(false);

  const { login, signup } = useAuth();
  const { openAlert } = useModal();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      openAlert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const signupResponse = await signup({ name, email, password, passwordConfirm, verificationCode });
      if (!signupResponse.success) {
        throw new Error(signupResponse.error?.message || '회원가입에 실패했습니다.');
      }

      const loginResponse = await login({ email, password });
      if (!loginResponse.success) {
        throw new Error(loginResponse.error?.message || '자동 로그인에 실패했습니다.');
      }

      openAlert('회원가입이 완료되었습니다.', () => {
        navigate('/');
      });
    } catch (error) {
      console.error('회원가입 또는 로그인 처리 중 오류 발생:', error);
      openAlert(error.message || '요청 중 오류가 발생했습니다.');
    }
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
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
    console.log(params);
    const result = await fetchEmail(params);
    // 여기에 이메일 인증 코드 발송 로직을 추가합니다.
    if (!result.success) {
      openAlert(result.error?.message || '인증번호 발송에 실패했습니다.');
      return;
    }

    openAlert('인증번호가 발송되었습니다.');
    setIsVerificationSent(true);
  };

  return (
    <form className="auth-form" onSubmit={handleSignUp}>
      <div className="input-group">
        <label htmlFor="signup-name">이름</label>
        <input id="signup-name" type="text" placeholder="이름을 입력하세요" value={name} onChange={handleChangeName} />
      </div>

      <div className="input-group">
        <label htmlFor="signup-password">비밀번호</label>
        <input
          id="signup-password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={handleChangePassword}
        />
      </div>
      <div className="input-group">
        <label htmlFor="signup-password-confirm">비밀번호 확인</label>
        <input
          id="signup-password-confirm"
          type="password"
          placeholder="비밀번호를 다시 입력하세요"
          value={passwordConfirm}
          onChange={handleChangePasswordConfirm}
        />
      </div>

      <div className="input-group-with-btn">
        <div className="input-group">
          <label htmlFor="signup-email">이메일</label>
          <input
            id="signup-email"
            type="email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={handleChangeEmail}
          />
        </div>
        <button type="button" className="inline-btn" onClick={handleSendVerificationCode}>
          인증번호 발송
        </button>
      </div>
      <div className="input-group">
        <label htmlFor="signup-verify">인증번호</label>
        <input
          id="signup-verify"
          type="text"
          placeholder="인증번호를 입력하세요"
          disabled={!isVerificationSent}
          value={verificationCode}
          onChange={handleChangeVerificationCode}
        />
      </div>

      <button type="submit" className="submit-btn">
        가입하기
      </button>

      <div className="social-login">
        <div className="divider">
          <span>OR</span>
        </div>
        <button type="button" className="social-btn kakao">
          카카오로 시작하기
        </button>
        <button type="button" className="social-btn google">
          Google로 시작하기
        </button>
        <button type="button" className="social-btn naver">
          네이버로 시작하기
        </button>
      </div>
    </form>
  );
};

export default SignUp;
