import axios from 'axios';
import { useEffect } from 'react';
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
  useEffect(() => {
    const apiUrl = 'http://mockstock.duckdns.org/members/me/info';

    const fetchData = async () => {
      const response = await axios.get(apiUrl);
      console.log(response.data);
    };

    fetchData(); // 함수 호출
  }, []);

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
