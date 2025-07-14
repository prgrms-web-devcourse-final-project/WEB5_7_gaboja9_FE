import { Outlet } from 'react-router-dom';

import Header from '@/components/layout/Header';

const Layout = () => (
  <>
    <Header />
    <main className="main-container">
      <Outlet />
    </main>
  </>
);

export default Layout;
