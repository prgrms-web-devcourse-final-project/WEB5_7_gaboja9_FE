import { Routes, Route } from 'react-router-dom';

import LoadingSpinner from '@/components/common/LoadingSpinner';
import Modal from '@/components/common/Modal';
import Layout from '@/components/layout/Layout';
import AuthPage from '@/pages/AuthPage';
import DashboardPage from '@/pages/DashboardPage';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage';
import MyPage from '@/pages/MyPage';
import RankingPage from '@/pages/RankingPage';
import StockDetailPage from '@/pages/StockDetailPage';
import StocksPage from '@/pages/StocksPage';

const App = () => {
  return (
    <>
      <LoadingSpinner />
      <Modal />
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
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
