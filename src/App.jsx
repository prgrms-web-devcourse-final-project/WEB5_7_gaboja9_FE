import { Routes, Route } from 'react-router-dom';

import Modal from '@/components/common/Modal';
import Layout from '@/components/layout/Layout';
import AuthPage from '@/pages/AuthPage';
import DashboardPage from '@/pages/DashboardPage';
import MyPage from '@/pages/MyPage';
import RankingPage from '@/pages/RankingPage';
import StockDetailPage from '@/pages/StockDetailPage';
import StocksPage from '@/pages/StocksPage';

const App = () => {
  return (
    <>
      <Modal />
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/" element={<StocksPage />} />
          <Route path="/stock/:stockId" element={<StockDetailPage />} />
          <Route path="/ranking" element={<RankingPage />} />
          <Route path="/mypage" element={<MyPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
