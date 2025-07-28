import axiosInstance from '@/api/instance';

export const fetchUserData = async () => {
  const response = await axiosInstance.get('/members/me/info');
  return response.data;
};
