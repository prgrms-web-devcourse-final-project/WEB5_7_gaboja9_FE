import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import * as authApi from '@/api/auth';
import useModal from '@/hooks/useModal';
import { isLoggedInAtom } from '@/store/user';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);

  const { openAlert } = useModal();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (params) => {
    try {
      const { data } = await authApi.fetchLogin(params);
      const { accessToken, refreshToken } = data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      openAlert('로그인 성공', () => {
        navigate('/');
        setIsLoggedIn(true);
      });

      return { success: true };
    } catch (error) {
      console.error('로그인 실패:', error);
      return { success: false, error };
    }
  };

  const logout = async () => {
    try {
      await authApi.fetchLogout();
    } catch (error) {
      console.error('로그아웃 API 호출 실패:', error);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setIsLoggedIn(false);
    }
  };

  const signup = async (params) => {
    return await authApi.fetchSignUp(params);
  };

  const passwordReset = async (params) => {
    return await authApi.fetchPasswordReset(params);
  };

  return {
    isLoggedIn,
    login,
    logout,
    signup,
    passwordReset,
  };
};
