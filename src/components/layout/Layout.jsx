import { useAtom, useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { fetchUserData } from '@/api/user';
import Header from '@/components/layout/Header';
import { useAuth } from '@/hooks/useAuth';
import { setMemberInfoAtom } from '@/store/user';
import { isLoggedInAtom } from '@/store/user';

const Layout = () => {
  const isLoggedIn = useAtomValue(isLoggedInAtom);

  const [, setMemberInfo] = useAtom(setMemberInfoAtom);

  useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    const fetchData = async () => {
      const userData = await fetchUserData();
      setMemberInfo(userData);
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
