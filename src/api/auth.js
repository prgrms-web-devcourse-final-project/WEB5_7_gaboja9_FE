import axiosInstance from '@/api/instance';

export const fetchSignUp = async (params) => {
  const response = await axiosInstance.post('/auth/signup', params);
  return response.data;
};

export const fetchRefreshToken = async () => {
  const token = localStorage.getItem('refreshToken');
  if (!token) {
    throw new Error('Refresh token not found');
  }

  const response = await axiosInstance.post('/auth/refresh', { headers: { Authorization: `Bearer ${token}` } });
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

export const fetchEmailPasswordFind = async (params) => {
  const response = await axiosInstance.post('/auth/email/passwordFind', params);
  return response.data;
};

export const fetchPasswordFind = async (params) => {
  const response = await axiosInstance.post('/auth/passwordFind', params);
  return response.data;
};
