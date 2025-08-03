import { useAtom } from 'jotai';
import { NavLink, useNavigate } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';
import useModal from '@/hooks/useModal';
import { isLoggedInAtom, memberInfoAtom } from '@/store/user';

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  const [memberInfo] = useAtom(memberInfoAtom);

  const { openAlert, openConfirm } = useModal();
  const { logout } = useAuth();

  const handleClickLogout = () => {
    openConfirm(
      '정말 로그아웃 하시겠습니까?',
      () => {
        logout();
        navigate('/');
      },
      () => console.log('Confirm Cancel'),
    );
  };

  const handleClickLogin = () => {
    navigate('/login');
  };

  const handleMyPageClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      openAlert('로그인이 필요한 서비스입니다.');
    }
  };

  return (
    <header className="header">
      <div className="header__container">
        <NavLink to="/" className="header__logo">
          MockStock
        </NavLink>
        <nav className="header__nav">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            대시보드
          </NavLink>
          <NavLink to="/stocks" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            주식 거래
          </NavLink>
          <NavLink to="/ranking" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            랭킹
          </NavLink>
          <NavLink
            to="/mypage"
            onClick={handleMyPageClick}
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            마이페이지
          </NavLink>
        </nav>
        {isLoggedIn ? (
          <div className="header__user-info">
            <span>{memberInfo?.nickname}님</span>
            <button className="logout-button" onClick={handleClickLogout}>
              로그아웃
            </button>
          </div>
        ) : (
          <button className="logout-button" onClick={handleClickLogin}>
            로그인
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
