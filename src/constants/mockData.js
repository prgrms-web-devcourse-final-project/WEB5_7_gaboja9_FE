const generateCandleData = (basePrice, days) => {
  let date = new Date();
  date.setDate(date.getDate() - days);
  let price = basePrice;
  const data = [];
  for (let i = 0; i < days; i++) {
    const open = price + (Math.random() - 0.5) * (price * 0.02);
    const high = Math.max(open, price) + Math.random() * (price * 0.01);
    const low = Math.min(open, price) - Math.random() * (price * 0.01);
    const close = low + Math.random() * (high - low);
    data.push({
      time: date.toISOString().split('T')[0],
      open: Math.round(open / 10) * 10,
      high: Math.round(high / 10) * 10,
      low: Math.round(low / 10) * 10,
      close: Math.round(close / 10) * 10,
    });
    price = close;
    date.setDate(date.getDate() + 1);
  }
  return data;
};

const generateMinuteData = (basePrice, minutes, interval) => {
  let date = new Date();
  date.setMinutes(date.getMinutes() - minutes);
  let price = basePrice;
  const data = [];
  for (let i = 0; i < minutes / interval; i++) {
    const open = price + (Math.random() - 0.5) * (price * 0.001);
    const high = Math.max(open, price) + Math.random() * (price * 0.0005);
    const low = Math.min(open, price) - Math.random() * (price * 0.0005);
    const close = low + Math.random() * (high - low);
    data.push({
      time: new Date(date).toISOString(),
      open: Math.round(open / 10) * 10,
      high: Math.round(high / 10) * 10,
      low: Math.round(low / 10) * 10,
      close: Math.round(close / 10) * 10,
    });
    price = close;
    date.setMinutes(date.getMinutes() + interval);
  }
  return data;
};

const getPriceStep = (price) => {
  if (price >= 500000) return 1000;
  if (price >= 100000) return 500;
  if (price >= 50000) return 100;
  if (price >= 10000) return 50;
  return 10;
};

const generateOrderBook = (currentPrice) => {
  const asks = [];
  const bids = [];
  const step = getPriceStep(currentPrice);
  let askPrice = currentPrice + step;
  let bidPrice = currentPrice;

  for (let i = 0; i < 15; i++) {
    asks.unshift({ price: askPrice, quantity: Math.floor(Math.random() * 5000) + 100 });
    askPrice += step;
  }
  for (let i = 0; i < 15; i++) {
    bids.push({ price: bidPrice, quantity: Math.floor(Math.random() * 5000) + 100 });
    bidPrice -= step;
  }
  return { asks, bids };
};

const baseStockData = [
  {
    id: '005930',
    name: '삼성전자',
    marketCap: '546.6조',
    volume: 13987123,
    currentPrice: 91500,
    previousClosePrice: 91200,
  },
  {
    id: '000660',
    name: 'SK하이닉스',
    marketCap: '168.1조',
    volume: 4321987,
    currentPrice: 231000,
    previousClosePrice: 228000,
  },
  {
    id: '373220',
    name: 'LG에너지솔루션',
    marketCap: '80.7조',
    volume: 456789,
    currentPrice: 345000,
    previousClosePrice: 348000,
  },
  {
    id: '207940',
    name: '삼성바이오로직스',
    marketCap: '53.4조',
    volume: 158321,
    currentPrice: 750000,
    previousClosePrice: 748000,
  },
  {
    id: '005380',
    name: '현대차',
    marketCap: '60.6조',
    volume: 1023456,
    currentPrice: 288000,
    previousClosePrice: 286000,
  },
  {
    id: '000270',
    name: '기아',
    marketCap: '51.5조',
    volume: 1532890,
    currentPrice: 128300,
    previousClosePrice: 126500,
  },
  {
    id: '068270',
    name: '셀트리온',
    marketCap: '38.9조',
    volume: 789123,
    currentPrice: 178500,
    previousClosePrice: 180200,
  },
  {
    id: '005490',
    name: 'POSCO홀딩스',
    marketCap: '32.1조',
    volume: 456789,
    currentPrice: 380500,
    previousClosePrice: 379500,
  },
  {
    id: '051910',
    name: 'LG화학',
    marketCap: '27.4조',
    volume: 245890,
    currentPrice: 388000,
    previousClosePrice: 391500,
  },
  { id: '105560', name: 'KB금융', marketCap: '31.3조', volume: 654321, currentPrice: 78500, previousClosePrice: 78400 },
  {
    id: '035420',
    name: 'NAVER',
    marketCap: '27.2조',
    volume: 987234,
    currentPrice: 165500,
    previousClosePrice: 168000,
  },
  {
    id: '006400',
    name: '삼성SDI',
    marketCap: '26.8조',
    volume: 345678,
    currentPrice: 389500,
    previousClosePrice: 390000,
  },
  {
    id: '055550',
    name: '신한지주',
    marketCap: '24.1조',
    volume: 890123,
    currentPrice: 48900,
    previousClosePrice: 48750,
  },
  {
    id: '028260',
    name: '삼성물산',
    marketCap: '22.3조',
    volume: 345123,
    currentPrice: 120500,
    previousClosePrice: 120000,
  },
  {
    id: '012330',
    name: '현대모비스',
    marketCap: '21.4조',
    volume: 234567,
    currentPrice: 228000,
    previousClosePrice: 227500,
  },
  {
    id: '003670',
    name: '포스코퓨처엠',
    marketCap: '20.9조',
    volume: 654321,
    currentPrice: 269000,
    previousClosePrice: 268000,
  },
  {
    id: '035720',
    name: '카카오',
    marketCap: '19.1조',
    volume: 3456789,
    currentPrice: 43250,
    previousClosePrice: 43800,
  },
  {
    id: '086790',
    name: '하나금융지주',
    marketCap: '18.1조',
    volume: 567890,
    currentPrice: 61200,
    previousClosePrice: 61000,
  },
  { id: '066570', name: 'LG전자', marketCap: '15.8조', volume: 567890, currentPrice: 97800, previousClosePrice: 98200 },
  {
    id: '032830',
    name: '삼성생명',
    marketCap: '15.5조',
    volume: 234567,
    currentPrice: 77800,
    previousClosePrice: 77500,
  },
  {
    id: '000810',
    name: '삼성화재',
    marketCap: '15.0조',
    volume: 123456,
    currentPrice: 318000,
    previousClosePrice: 317000,
  },
  { id: '003550', name: 'LG', marketCap: '12.6조', volume: 210987, currentPrice: 82300, previousClosePrice: 82000 },
  {
    id: '015760',
    name: '한국전력',
    marketCap: '12.4조',
    volume: 2345678,
    currentPrice: 19400,
    previousClosePrice: 19350,
  },
  { id: '034730', name: 'SK', marketCap: '11.8조', volume: 345678, currentPrice: 165000, previousClosePrice: 164000 },
  {
    id: '009150',
    name: '삼성전기',
    marketCap: '11.6조',
    volume: 456123,
    currentPrice: 155000,
    previousClosePrice: 154500,
  },
  { id: '033780', name: 'KT&G', marketCap: '11.6조', volume: 345901, currentPrice: 85000, previousClosePrice: 85200 },
  {
    id: '018260',
    name: '삼성에스디에스',
    marketCap: '11.5조',
    volume: 234890,
    currentPrice: 148500,
    previousClosePrice: 149000,
  },
  {
    id: '017670',
    name: 'SK텔레콤',
    marketCap: '11.0조',
    volume: 456789,
    currentPrice: 51200,
    previousClosePrice: 51100,
  },
  {
    id: '323410',
    name: '카카오뱅크',
    marketCap: '10.8조',
    volume: 1234567,
    currentPrice: 22600,
    previousClosePrice: 22850,
  },
  {
    id: '096770',
    name: 'SK이노베이션',
    marketCap: '10.1조',
    volume: 789012,
    currentPrice: 108300,
    previousClosePrice: 109500,
  },
];

export const MOCK_USER_ASSETS = {
  totalAssets: 85000000,
  returnPercentage: 12.5,
  availableCash: 23000000,
};

const ownedStocksInfo = [
  { id: '005930', avgPrice: 82000, quantity: 100 },
  { id: '000660', avgPrice: 205000, quantity: 50 },
  { id: '005380', avgPrice: 250000, quantity: 30 },
  { id: '035420', avgPrice: 170000, quantity: 20 },
];

export const MOCK_OWNED_STOCKS = ownedStocksInfo.map((owned) => {
  const stockInfo = baseStockData.find((s) => s.id === owned.id);
  return { ...stockInfo, ...owned };
});

const watchlistInfo = ['000270', '068270', '005490', '035720'];

export const MOCK_WATCHLIST = watchlistInfo.map((id) => {
  const stockInfo = baseStockData.find((s) => s.id === id);
  const changeValue = stockInfo.currentPrice - stockInfo.previousClosePrice;
  const changeRate = (changeValue / stockInfo.previousClosePrice) * 100;
  return {
    id: stockInfo.id,
    name: stockInfo.name,
    currentPrice: stockInfo.currentPrice,
    changeRate: changeRate,
  };
});

export const MOCK_RECENT_TRANSACTIONS = [
  { id: 1, type: '매수', name: 'SK하이닉스', quantity: 20, date: '2025-07-11', amount: 4560000 },
  { id: 2, type: '매도', name: 'NAVER', quantity: 10, date: '2025-07-10', amount: 1680000 },
];

export const MOCK_ALL_STOCKS = baseStockData.map((stock) => {
  const changeValue = stock.currentPrice - stock.previousClosePrice;
  const changeRate = (changeValue / stock.previousClosePrice) * 100;
  return {
    id: stock.id,
    name: stock.name,
    currentPrice: stock.currentPrice,
    changeRate: changeRate,
    changeValue: changeValue,
    volume: stock.volume,
    marketCap: stock.marketCap,
  };
});

export const MOCK_STOCK_DETAIL = baseStockData.reduce((acc, stock) => {
  const changeValue = stock.currentPrice - stock.previousClosePrice;
  const changeRate = (changeValue / stock.previousClosePrice) * 100;

  acc[stock.id] = {
    id: stock.id,
    name: stock.name,
    currentPrice: stock.currentPrice,
    previousClosePrice: stock.previousClosePrice,
    openingPrice:
      Math.round((stock.previousClosePrice + (Math.random() - 0.5) * (stock.previousClosePrice * 0.01)) / 10) * 10,
    changeValue: changeValue,
    changeRate: changeRate,
    marketCap: stock.marketCap,
    volume: stock.volume,
    historicalData: {
      minute5: generateMinuteData(stock.currentPrice, 60 * 8, 5),
      day: generateCandleData(stock.currentPrice, 365),
      week: generateCandleData(stock.currentPrice, 365 * 2),
      month: generateCandleData(stock.currentPrice, 365 * 5),
    },
    orderBook: generateOrderBook(stock.currentPrice),
  };
  return acc;
}, {});
