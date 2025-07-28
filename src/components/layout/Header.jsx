import { useAtomValue } from 'jotai';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';
import useModal from '@/hooks/useModal';
import { isLoggedInAtom } from '@/store/user';
import { memberInfoAtom } from '@/store/user';

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const memberInfo = useAtomValue(memberInfoAtom);

  const { openConfirm } = useModal();
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
          <NavLink to="/mypage" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            마이페이지
          </NavLink>
        </nav>
        {isLoggedIn ? (
          <div className="header__user-info">
            <span>{memberInfo.nickname}님</span>
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
