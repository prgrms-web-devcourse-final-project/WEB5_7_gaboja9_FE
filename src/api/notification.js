import axiosInstance from '@/api/instance';

export const fetchNotificationSettings = async () => {
  const response = await axiosInstance.get('/notifications/settings');
  return response.data;
};

export const updateNotificationSettings = async (settings) => {
  const response = await axiosInstance.patch('/notifications/settings', settings);
  return response.data;
};
``