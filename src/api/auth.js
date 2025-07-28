import axiosInstance from '@/api/instance';

export const fetchSignUp = async (params) => {
  const response = await axiosInstance.post('/auth/signup', params);
  return response.data;
};

export const fetchRefreshToken = async () => {
  const response = await axiosInstance.post('/auth/refresh');
  return response.data;
};

export const fetchPasswordReset = async (params) => {
  const response = await axiosInstance.post('/auth/passwordReset', params);
  return response.data;
};

export const fetchLogout = async () => {
  const response = await axiosInstance.post('/auth/logout');
  return response.data;
};

export const fetchLogin = async (params) => {
  const response = await axiosInstance.post('/auth/login', params);
  return response.data;
};

export const fetchEmail = async (params) => {
  const response = await axiosInstance.post('/auth/email', params);
  return response.data;
};
