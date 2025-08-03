import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { fetchUserInfo } from '@/api/user';
import Header from '@/components/layout/Header';
import { useAuth } from '@/hooks/useAuth';
import { memberInfoAtom, isLoggedInAtom, initialMemberInfo } from '@/store/user';

const Layout = () => {
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  const [, setMemberInfo] = useAtom(memberInfoAtom);

  useAuth();

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
  }, [isLoggedIn]);

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
