const SignUp = () => {
  const handleSignUp = (e) => {
    e.preventDefault();
    alert('회원가입');
  };

  return (
    <form className="auth-form" onSubmit={handleSignUp}>
      <div className="input-group-with-btn">
        <div className="input-group">
          <label htmlFor="signup-id">아이디</label>
          <input id="signup-id" type="text" placeholder="아이디를 입력하세요" />
        </div>
        <button type="button" className="inline-btn">
          중복확인
        </button>
      </div>
      <div className="input-group">
        <label htmlFor="signup-password">비밀번호</label>
        <input id="signup-password" type="password" placeholder="비밀번호를 입력하세요" />
      </div>
      <div className="input-group">
        <label htmlFor="signup-password-confirm">비밀번호 확인</label>
        <input id="signup-password-confirm" type="password" placeholder="비밀번호를 다시 입력하세요" />
      </div>
      <div className="input-group">
        <label htmlFor="signup-name">이름</label>
        <input id="signup-name" type="text" placeholder="이름을 입력하세요" />
      </div>
      <div className="input-group-with-btn">
        <div className="input-group">
          <label htmlFor="signup-email">이메일</label>
          <input id="signup-email" type="email" placeholder="이메일을 입력하세요" />
        </div>
        <button type="button" className="inline-btn">
          인증번호 발송
        </button>
      </div>
      <div className="input-group-with-btn">
        <div className="input-group">
          <label htmlFor="signup-verify">인증번호</label>
          <input id="signup-verify" type="text" placeholder="인증번호를 입력하세요" />
        </div>
        <button type="button" className="inline-btn">
          인증 확인
        </button>
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
