import { Routes, Route } from 'react-router-dom';

import Layout from '@/components/layout/Layout';
import DashboardPage from '@/pages/DashboardPage';
import StockDetailPage from '@/pages/StockDetailPage';
import StocksPage from '@/pages/StocksPage';

// 임시 페이지
const PlaceholderPage = ({ title }) => (
  <h1 style={{ fontSize: '2rem', textAlign: 'center', marginTop: '4rem' }}>{title} 페이지</h1>
);

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/stocks" element={<StocksPage />} />
        <Route path="/stock/:stockId" element={<StockDetailPage />} />
        <Route path="/ranking" element={<PlaceholderPage title="랭킹" />} />
        <Route path="/mypage" element={<PlaceholderPage title="마이페이지" />} />
      </Route>
    </Routes>
  );
};

export default App;
