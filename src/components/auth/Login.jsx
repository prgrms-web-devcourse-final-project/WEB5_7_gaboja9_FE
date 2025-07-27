const Login = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    alert('로그인');
  };

  return (
    <form className="auth-form" onSubmit={handleLogin}>
      <div className="input-group">
        <label htmlFor="login-id">아이디</label>
        <input id="login-id" type="text" placeholder="아이디를 입력하세요" />
      </div>
      <div className="input-group">
        <label htmlFor="login-password">비밀번호</label>
        <input id="login-password" type="password" placeholder="비밀번호를 입력하세요" />
      </div>
      <button type="submit" className="submit-btn">
        로그인
      </button>
    </form>
  );
};

export default Login;
