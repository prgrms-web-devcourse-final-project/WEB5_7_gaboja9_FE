import { Routes, Route, Outlet } from 'react-router-dom';

import Header from './components/layout/Header';
import DashboardPage from './pages/DashboardPage';
import StocksPage from './pages/StocksPage';

// Layout Component
const Layout = () => (
  <>
    <Header />
    <main className="main-container">
      <Outlet />
    </main>
  </>
);

// Placeholder pages for routing
const PlaceholderPage = ({ title }) => (
  <h1 style={{ fontSize: '2rem', textAlign: 'center', marginTop: '4rem' }}>{title} 페이지</h1>
);

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/stocks" element={<StocksPage />} />
        <Route path="/ranking" element={<PlaceholderPage title="랭킹" />} />
        <Route path="/mypage" element={<PlaceholderPage title="마이페이지" />} />
      </Route>
    </Routes>
  );
};

export default App;
