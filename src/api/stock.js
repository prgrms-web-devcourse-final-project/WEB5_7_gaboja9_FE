import { MOCK_STOCK_DETAIL } from '../constants/mockData';

import axiosInstance from '@/api/instance';

export const fetchStocks = async () => {
  const response = await axiosInstance.get('/stocks');
  return response.data;
};

export const fetchStockDetails = async (stockId) => {
  if (MOCK_STOCK_DETAIL[stockId]) {
    return MOCK_STOCK_DETAIL[stockId];
  } else {
    const defaultData = MOCK_STOCK_DETAIL['005930'];
    return {
      ...defaultData,
      id: stockId,
      name: `주식 ${stockId}`,
    };
  }
};

export const addFavoriteStock = async (stockCode) => {
  const response = await axiosInstance.post(`/favorites/${stockCode}`);
  return response.data;
};

export const removeFavoriteStock = async (stockCode) => {
  const response = await axiosInstance.delete(`/favorites/${stockCode}`);
  return response.data;
};

export const fetchFavoriteStocks = async () => {
  const response = await axiosInstance.get('/favorites');
  return response.data;
};
