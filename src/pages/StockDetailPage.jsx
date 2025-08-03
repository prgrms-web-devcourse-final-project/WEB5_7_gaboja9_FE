import classNames from 'classnames';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { buyLimitOrder, buyMarketOrder, sellLimitOrder, sellMarketOrder } from '@/api/order';
import { fetchChartData, fetchPastChartData } from '@/api/stock';
import { fetchPortfolios, fetchUserInfo } from '@/api/user';
import CustomSelect from '@/components/common/CustomSelect';
import OrderBook from '@/components/stockDetail/OrderBook';
import OrderPanel from '@/components/stockDetail/OrderPanel';
import StockChart from '@/components/stockDetail/StockChart';
import useModal from '@/hooks/useModal';
import { stocksAtom, stockPricesAtom } from '@/store/atoms';
import { memberInfoAtom } from '@/store/user';

const StockDetailPage = () => {
  const { stockId } = useParams();
  const { openAlert, openConfirm } = useModal();

  const allStocks = useAtomValue(stocksAtom);
  const realtimePrices = useAtomValue(stockPricesAtom);
  const [, setMemberInfo] = useAtom(memberInfoAtom);

  const [stockInfo, setStockInfo] = useState({ name: '', previousClosePrice: 0 });
  const [chartData, setChartData] = useState([]);
  const [isChartLoading, setIsChartLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeframe, setTimeframe] = useState('daily');
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [portfolio, setPortfolio] = useState(null);
  const lastTickRef = useRef(null);

  const realtimeData = realtimePrices[stockId] || {};
  const currentPrice = realtimeData.currentPrice || stockInfo.previousClosePrice;
  const changeRate = realtimeData.dayOverDayPercent || 0;
  const changeValue = currentPrice - stockInfo.previousClosePrice;

  const ownedStock = portfolio?.portfolios?.find((s) => s.stockCode === stockId);

  const formatApiDataToChart = (data) =>
    data.map((d) => ({
      time: d.timestamp,
      open: d.openPrice,
      close: d.closePrice,
      high: d.maxPrice,
      low: d.minPrice,
    }));

  const loadChart = useCallback(
    async (selectedTimeframe) => {
      setIsChartLoading(true);
      try {
        const data = await fetchChartData(stockId, selectedTimeframe);
        const reversedData = data.data.slice().reverse();
        const formattedData = formatApiDataToChart(reversedData);
        setChartData(formattedData);

        if (formattedData.length > 1) {
          const prevDayData = formattedData[formattedData.length - 2];
          setStockInfo((prev) => ({ ...prev, previousClosePrice: prevDayData.close }));
        } else if (formattedData.length === 1) {
          setStockInfo((prev) => ({ ...prev, previousClosePrice: formattedData[0].open }));
        }
        if (currentPrice === 0 && formattedData.length > 0) {
          setSelectedPrice(formattedData[formattedData.length - 1].close);
        }
      } catch (err) {
        setError('차트 데이터를 불러오는 데 실패했습니다.');
      } finally {
        setIsChartLoading(false);
      }
    },
    [stockId, currentPrice],
  );

  useEffect(() => {
    const stock = allStocks.find((s) => s.stockCode === stockId);
    if (stock) {
      setStockInfo((prev) => ({ ...prev, name: stock.stockName }));
    }
    const getPortfolio = async () => {
      const portfolioData = await fetchPortfolios();
      setPortfolio(portfolioData);
    };
    getPortfolio();
  }, [stockId, allStocks]);

  useEffect(() => {
    loadChart(timeframe);
  }, [timeframe, loadChart]);

  useEffect(() => {
    if (!realtimeData.tradeTime || realtimeData.tradeTime === lastTickRef.current || chartData.length === 0) {
      return;
    }
    lastTickRef.current = realtimeData.tradeTime;
    setChartData((prev) => {
      const lastCandle = { ...prev[prev.length - 1] };
      lastCandle.close = realtimeData.currentPrice;
      if (realtimeData.currentPrice > lastCandle.high) lastCandle.high = realtimeData.currentPrice;
      if (realtimeData.currentPrice < lastCandle.low) lastCandle.low = realtimeData.currentPrice;
      return [...prev.slice(0, -1), lastCandle];
    });
  }, [realtimeData, chartData]);

  const handleLoadMore = async () => {
    if (chartData.length === 0) return;
    const oldestTimestamp = chartData[0].time;
    try {
      const pastData = await fetchPastChartData(stockId, timeframe, oldestTimestamp);
      if (pastData.data.length > 0) {
        setChartData((prev) => [...formatApiDataToChart(pastData.data.slice().reverse()), ...prev]);
      }
    } catch (error) {
      console.error('과거 데이터 로딩 실패:', error);
    }
  };

  const handleOrderSubmit = async (order) => {
    const orderFunctions = {
      buy: { limit: buyLimitOrder, market: buyMarketOrder },
      sell: { limit: sellLimitOrder, market: sellMarketOrder },
    };
    const orderDetails = { stockCode: stockId, quantity: order.quantity, price: order.price };

    openConfirm(
      `${order.quantity.toLocaleString()}주를 ${order.priceType === 'limit' ? order.price.toLocaleString() + '원에' : '시장가로'} ${order.type === 'buy' ? '매수' : '매도'}하시겠습니까?`,
      async () => {
        try {
          await orderFunctions[order.type][order.priceType](orderDetails);
          openAlert('주문이 성공적으로 체결되었습니다.');
          const updatedUserInfo = await fetchUserInfo();
          setMemberInfo(updatedUserInfo);
          const updatedPortfolio = await fetchPortfolios();
          setPortfolio(updatedPortfolio);
        } catch (err) {
          openAlert(err.response?.data?.message || '주문 처리에 실패했습니다.');
        }
      },
    );
  };

  if (error) return <div className="loading-message">{error}</div>;

  const timeOptions = [
    { value: 'daily', label: '일봉' },
    { value: 'weekly', label: '주봉' },
    { value: 'minute', label: '분봉' },
  ];

  return (
    <div className="stock-detail-page">
      <header className="stock-header">
        <div className="stock-header__info">
          <h1 className="stock-name">{stockInfo.name}</h1>
          <p className="stock-code">({stockId})</p>
        </div>
        <div className="stock-header__price">
          <span className={classNames('current-price', { positive: changeRate > 0, negative: changeRate < 0 })}>
            {currentPrice.toLocaleString()}원
          </span>
          <span className={classNames('change-info', { positive: changeRate > 0, negative: changeRate < 0 })}>
            {changeRate >= 0 ? '▲' : '▼'} {changeValue.toLocaleString()} ({changeRate.toFixed(2)}%)
          </span>
        </div>
        <div className="stock-header__actions">
          <CustomSelect options={timeOptions} value={timeframe} onChange={setTimeframe} />
        </div>
      </header>

      <div className="chart-area">
        {isChartLoading ? (
          <div className="loading-message">차트 데이터를 불러오는 중입니다...</div>
        ) : (
          <StockChart data={chartData} timeframe={timeframe} onLoadMore={handleLoadMore} />
        )}
      </div>

      <section className="order-section">
        <div className="order-book-area">
          <OrderBook
            onPriceSelect={setSelectedPrice}
            previousClosePrice={stockInfo.previousClosePrice}
            currentPrice={currentPrice}
          />
        </div>
        <aside className="order-panel-area">
          <OrderPanel
            initialPrice={selectedPrice}
            onSubmit={handleOrderSubmit}
            availableCash={portfolio?.cashBalance || 0}
            ownedQuantity={ownedStock?.quantity || 0}
            currentPrice={currentPrice}
          />
        </aside>
      </section>
    </div>
  );
};

export default StockDetailPage;
