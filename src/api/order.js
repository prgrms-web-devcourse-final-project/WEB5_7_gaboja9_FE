import axiosInstance from '@/api/instance';

export const sellMarketOrder = async (orderData) => {
  const response = await axiosInstance.post('/orders/market/sell', orderData);
  return response.data;
};

export const buyMarketOrder = async (orderData) => {
  const response = await axiosInstance.post('/orders/market/buy', orderData);
  return response.data;
};

export const sellLimitOrder = async (orderData) => {
  const response = await axiosInstance.post('/orders/limit/sell', orderData);
  return response.data;
};

export const buyLimitOrder = async (orderData) => {
  const response = await axiosInstance.post('/orders/limit/buy', orderData);
  return response.data;
};
