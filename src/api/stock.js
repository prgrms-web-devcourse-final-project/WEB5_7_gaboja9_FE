import axiosInstance from '@/api/instance';

export const fetchStocks = async () => {
  const response = await axiosInstance.get('/api/stocks');
  return response.data;
};

export const fetchChartData = async (stockCode, timeframe = 'daily', params = {}) => {
  const type = timeframe === 'minute' ? 'daily' : timeframe;
  const endpoint = `/stocks/chart/${type}/${stockCode}/initial`;
  const response = await axiosInstance.get(endpoint, { params });
  return response.data;
};

/**
 * 지정된 시점 이전의 과거 차트 데이터를 가져옵니다. (차트 무한 스크롤용)
 * @param {string} stockCode - 주식 코드
 * @param {'daily' | 'weekly' | 'monthly' | 'minute'} timeframe - 차트 기간 타입
 * @param {string} before - 기준 시점 (ISO 8601 형식)
 * @param {number} limit - 조회할 데이터 개수
 */
export const fetchPastChartData = async (stockCode, timeframe = 'daily', before, limit = 50) => {
  const type = timeframe === 'minute' ? 'daily' : timeframe;
  const endpoint = `/stocks/chart/${type}/${stockCode}/load-past`;
  const response = await axiosInstance.get(endpoint, { params: { before, limit } });
  return response.data;
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
