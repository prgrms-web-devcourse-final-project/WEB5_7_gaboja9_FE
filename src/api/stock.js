import { MOCK_STOCK_DETAIL } from '../constants/mockData';

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
