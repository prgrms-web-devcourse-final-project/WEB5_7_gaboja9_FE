import { useAtom, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { fetchStocks } from '@/api/stock';
import { fetchUserInfo } from '@/api/user';
import Header from '@/components/layout/Header';
import { useAuth } from '@/hooks/useAuth';
import { stocksAtom } from '@/store/atoms';
import { memberInfoAtom, isLoggedInAtom, initialMemberInfo } from '@/store/user';

const Layout = () => {
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  const [, setMemberInfo] = useAtom(memberInfoAtom);
  const setStocks = useSetAtom(stocksAtom);

  useAuth();

  useEffect(() => {
    const getStocks = async () => {
      try {
        const fetchedStocks = await fetchStocks();
        setStocks(fetchedStocks);
      } catch (error) {
        console.error('Failed to fetch stocks:', error);
      }
    };
    getStocks();
  }, [setStocks]);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    const fetchData = async () => {
      const userData = await fetchUserInfo();

      if (userData) {
        setMemberInfo(userData);
      } else {
        setMemberInfo(initialMemberInfo);
      }
    };
    fetchData();
  }, [isLoggedIn, setMemberInfo]);

  return (
    <>
      <Header />
      <main className="main-container">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
