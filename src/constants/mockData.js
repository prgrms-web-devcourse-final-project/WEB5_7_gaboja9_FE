export const MOCK_USER_ASSETS = {
  totalAssets: 8500000,
  returnPercentage: -15,
  availableCash: 2300000,
};

export const MOCK_OWNED_STOCKS = [
  { id: '005930', name: '삼성전자', quantity: 10, avgPrice: 80000, currentPrice: 77800 },
  { id: '035720', name: '현대차', quantity: 5, avgPrice: 380000, currentPrice: 421000 },
  { id: '035720', name: '카카오', quantity: 20, avgPrice: 50000, currentPrice: 46400 },
];

export const MOCK_WATCHLIST = [
  { id: '035420', name: 'NAVER', currentPrice: 185000, changeRate: 1.9 },
  { id: '000660', name: 'SK하이닉스', currentPrice: 128500, changeRate: -2.7 },
  { id: '005490', name: 'POSCO홀딩스', currentPrice: 421000, changeRate: -0.7 },
];

export const MOCK_RECENT_TRANSACTIONS = [
  { id: 1, type: '매수', name: '현대차', quantity: 5, date: '2024-01-15', amount: 1004000 },
  { id: 2, type: '매도', name: '카카오', quantity: 10, date: '2024-01-16', amount: 550000 },
];

export const MOCK_ALL_STOCKS = [
  { id: '005930', name: '삼성전자', currentPrice: 77800, changeRate: -0.26, volume: 10354367, marketCap: '420조' },
  { id: '000660', name: 'SK하이닉스', currentPrice: 128500, changeRate: 2.3, volume: 5468799, marketCap: '94.2조' },
  { id: '005490', name: '현대차', currentPrice: 208000, changeRate: 0.7, volume: 1234567, marketCap: '52.3조' },
  { id: '035420', name: 'NAVER', currentPrice: 185000, changeRate: 1.9, volume: 887654, marketCap: '30.6조' },
  { id: '035720', name: '카카오', currentPrice: 46400, changeRate: -2.48, volume: 2348576, marketCap: '23.5조' },
  { id: '051910', name: 'LG화학', currentPrice: 421000, changeRate: -0.9, volume: 456789, marketCap: '120.5조' },
  {
    id: '207940',
    name: '삼성바이오로직스',
    currentPrice: 822000,
    changeRate: 0.0,
    volume: 125847,
    marketCap: '64.2조',
  },
  { id: '068270', name: '셀트리온', currentPrice: 164500, changeRate: 1.24, volume: 236100, marketCap: '124.2조' },
  { id: '096770', name: 'SK이노베이션', currentPrice: 178000, changeRate: -1.77, volume: 887734, marketCap: '56.1조' },
  { id: '010130', name: '고려아연', currentPrice: 461500, changeRate: -0.22, volume: 342100, marketCap: '78.1조' },
  { id: '003490', name: '대한항공', currentPrice: 21300, changeRate: 1.88, volume: 160700, marketCap: '18.1조' },
  ...Array.from({ length: 37 }, (_, i) => ({
    id: `0000${i + 1}`,
    name: `더미주식${i + 1}`,
    currentPrice: 10000 + i * 100,
    changeRate: (Math.random() - 0.5) * 5,
    volume: Math.floor(Math.random() * 10000000),
    marketCap: `${Math.floor(Math.random() * 100)}조`,
  })),
];
