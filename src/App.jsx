import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Modal from '@/components/common/Modal';
import Layout from '@/components/layout/Layout';
import { useStockSocket } from '@/hooks/useStockSocket';
import AuthPage from '@/pages/AuthPage';
import DashboardPage from '@/pages/DashboardPage';
import MyPage from '@/pages/MyPage';
import RankingPage from '@/pages/RankingPage';
import StockDetailPage from '@/pages/StockDetailPage';
import StocksPage from '@/pages/StocksPage';

const App = () => {
  // const [stockCode, setStockCode] = useState('005930');

  // // 커스텀 훅 사용
  // const { stockData, socketError, isConnected } = useStockSocket(stockCode);

  // console.log('Stock Data:', stockData);
  // console.log('Socket Error:', socketError);
  // console.log('Is Connected:', isConnected);

  return (
    <>
      <Modal />
      <Routes>
        <Route path="/login" element={<AuthPage />} />

        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/stocks" element={<StocksPage />} />
          <Route path="/stock/:stockId" element={<StockDetailPage />} />
          <Route path="/ranking" element={<RankingPage />} />
          <Route path="/mypage" element={<MyPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
