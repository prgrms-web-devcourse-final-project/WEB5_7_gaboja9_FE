import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import useModal from '@/hooks/useModal';

const Header = () => {
  const navigate = useNavigate();
  const { openConfirm } = useModal();

  const handleClickLogout = () => {
    openConfirm(
      '정말 로그아웃 하시겠습니까?',
      () => navigate('/login'),
      () => console.log('Confirm Cancel'),
    );
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
        <div className="header__user-info">
          <span>홍길동님</span>
          <button className="logout-button" onClick={handleClickLogout}>
            로그아웃
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
