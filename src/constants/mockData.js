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

export const MOCK_TRANSACTION_HISTORY = [
  {
    id: 1,
    type: '매수',
    name: 'SK하이닉스',
    stockId: '000660',
    date: '2025-07-26',
    quantity: 10,
    price: 231000,
    amount: 2310000,
    purchasePrice: 155000,
  },
  {
    id: 2,
    type: '매도',
    name: 'NAVER',
    stockId: '035420',
    date: '2025-07-25',
    quantity: 5,
    price: 165500,
    amount: 827500,
    purchasePrice: 155000,
  },
  {
    id: 3,
    type: '매수',
    name: '삼성전자',
    stockId: '005930',
    date: '2025-07-24',
    quantity: 20,
    price: 91500,
    amount: 1830000,
    purchasePrice: 155000,
  },
  {
    id: 4,
    type: '매수',
    name: '카카오',
    stockId: '035720',
    date: '2025-07-23',
    quantity: 30,
    price: 43250,
    amount: 1297500,
    purchasePrice: 155000,
  },
  {
    id: 5,
    type: '매도',
    name: '현대차',
    stockId: '005380',
    date: '2025-07-22',
    quantity: 10,
    price: 288000,
    amount: 2880000,
    purchasePrice: 300000,
  },
  {
    id: 6,
    type: '매수',
    name: 'LG에너지솔루션',
    stockId: '373220',
    date: '2025-07-21',
    quantity: 5,
    price: 345000,
    amount: 1725000,
    purchasePrice: 155000,
  },
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

export const MOCK_MAIL_DATA = [
  {
    id: 1,
    type: 'system',
    sender: 'MockStock',
    title: 'v1.1 업데이트 안내: 포트폴리오 분석 기능 추가',
    content:
      '안녕하세요, MockStock입니다. 더 나은 서비스 제공을 위해 v1.1 업데이트가 진행되었습니다. 이제 마이페이지에서 상세 포트폴리오 분석 기능을 이용하실 수 있습니다. 많은 이용 바랍니다. 추가적으로 변경된 사항은 다음과 같습니다: 1. UI 개선, 2. 버그 수정',
    date: '2025-07-27',
    isRead: false,
  },
  {
    id: 2,
    type: 'warning',
    sender: '시스템',
    title: '계좌 잔액이 100,000원 미만입니다.',
    content:
      '회원님의 계좌 잔액이 부족합니다. 안정적인 투자를 위해 계좌 관리에 유의해주시기 바랍니다. 현재 예수금: 98,000원',
    date: '2025-07-26',
    isRead: false,
  },
  {
    id: 3,
    type: 'trade',
    sender: '거래 알림',
    title: '매수 체결: 삼성전자(005930) 20주',
    content:
      '요청하신 삼성전자 20주 매수 주문이 평균 91,500원에 정상적으로 체결되었습니다. 총 체결 금액은 1,830,000원입니다. 상세 내용은 거래 내역 페이지에서 확인하세요.',
    date: '2025-07-24',
    isRead: true,
  },
  {
    id: 4,
    type: 'info',
    sender: '이벤트팀',
    title: '8월의 추천 종목 리스트가 도착했습니다.',
    content:
      'MockStock 리서치팀에서 선정한 8월의 유망 종목 리스트를 보내드립니다. 투자의 참고 자료로 활용해보세요. (주의: 본 정보는 투자 권유가 아니며, 투자에 대한 책임은 본인에게 있습니다.)',
    date: '2025-07-21',
    isRead: true,
  },
  {
    id: 5,
    type: 'system',
    sender: 'MockStock',
    title: '정기 점검 안내 (2025-08-01 02:00 ~ 04:00)',
    content:
      '보다 안정적인 서비스 제공을 위해 시스템 정기 점검이 예정되어 있습니다. 점검 시간 동안 서비스 이용이 일시적으로 중단될 수 있으니 양해 부탁드립니다.',
    date: '2025-07-20',
    isRead: true,
  },
];
