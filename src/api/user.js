import axiosInstance from '@/api/instance';

export const fetchTradeHistory = async (page = 0, size = 10) => {
  const response = await axiosInstance.get('/members/me/trades', { params: { page, size } });
  return response.data;
};

export const fetchTradeHistoryByCondition = async (condition) => {
  const response = await axiosInstance.get('/members/me/trades/search', { params: condition });
  return response.data;
};

export const fetchPortfolios = async () => {
  const response = await axiosInstance.get('/members/me/portfolios');
  return response.data;
};

export const fetchMails = async () => {
  const response = await axiosInstance.get('/members/me/mails');
  return response.data;
};

export const fetchUserMails = async () => {
  const response = await axiosInstance.get('/members/me/mails');
  return response.data;
};

export const fetchUserInfo = async () => {
  const response = await axiosInstance.get('/members/me/info');
  return response.data;
};

export const applyForBankruptcy = async () => {
  const response = await axiosInstance.post('/members/me/bankruptcy');
  return response.data;
};

export const fetchRanks = async (ranksType, page = 0, size = 10) => {
  const response = await axiosInstance.get('/ranks', {
    params: { ranksType, page, size },
  });
  return response.data;
};

export const updateUserInfo = async (params) => {
  const response = await axiosInstance.patch('/members/me/info', params);
  return response.data;
};

export const chargeCash = async () => {
  const response = await axiosInstance.post('/members/me/charge');
  return response.data;
};
