import classNames from 'classnames';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { buyLimitOrder, buyMarketOrder, sellLimitOrder, sellMarketOrder } from '@/api/order';
import {
  fetchChartData,
  fetchPastChartData,
  addFavoriteStock,
  removeFavoriteStock,
  fetchFavoriteStocks,
} from '@/api/stock';
import { fetchPortfolios, fetchUserInfo } from '@/api/user';
import CustomSelect from '@/components/common/CustomSelect';
import OrderBook from '@/components/stockDetail/OrderBook';
import OrderPanel from '@/components/stockDetail/OrderPanel';
import StockChart from '@/components/stockDetail/StockChart';
import useModal from '@/hooks/useModal';
import { stocksAtom, stockPricesAtom, loadingAtom } from '@/store/atoms';
import { isLoggedInAtom, memberInfoAtom } from '@/store/user';

const StockDetailPage = () => {
  const { stockId } = useParams();
  const { openAlert, openConfirm } = useModal();

  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const allStocks = useAtomValue(stocksAtom);
  const realtimePrices = useAtomValue(stockPricesAtom);
  const [, setMemberInfo] = useAtom(memberInfoAtom);
  const setIsLoading = useSetAtom(loadingAtom);

  const [stockInfo, setStockInfo] = useState({ name: '', previousClosePrice: 0 });
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState(null);
  const [timeframe, setTimeframe] = useState('minute');
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [portfolio, setPortfolio] = useState(null);
  const lastTickRef = useRef(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const realtimeData = realtimePrices[stockId] || {};
  const currentPrice = realtimeData.currentPrice || stockInfo.previousClosePrice;
  const changeValue = currentPrice - stockInfo.previousClosePrice;

  const calculatedChangeRate =
    stockInfo.previousClosePrice > 0 ? (changeValue / stockInfo.previousClosePrice) * 100 : 0;

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
      setIsLoading(true);
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
        setIsLoading(false);
      }
    },
    [stockId, setIsLoading],
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
    const checkFavorite = async () => {
      if (!isLoggedIn) {
        return;
      }

      try {
        const favorites = await fetchFavoriteStocks();
        setIsFavorite(favorites.some((fav) => fav.stockCode === stockId));
      } catch (error) {
        console.error('관심 종목 확인 실패:', error);
      }
    };

    getPortfolio();
    checkFavorite();
  }, [stockId, allStocks, isLoggedIn]);

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
    setIsLoading(true);
    try {
      const pastData = await fetchPastChartData(stockId, timeframe, oldestTimestamp);
      if (pastData.data.length > 0) {
        setChartData((prev) => [...formatApiDataToChart(pastData.data.slice().reverse()), ...prev]);
      }
    } catch (error) {
      console.error('과거 데이터 로딩 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFavorite = async () => {
    try {
      if (isFavorite) {
        await removeFavoriteStock(stockId);
        openAlert('관심 종목에서 해제되었습니다.');
      } else {
        await addFavoriteStock(stockId);
        openAlert('관심 종목으로 등록되었습니다.');
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('관심 종목 처리 실패:', error);
      openAlert('관심 종목 처리에 실패했습니다.');
    }
  };

  const handleOrderSubmit = async (order) => {
    const { type, priceType, quantity, price } = order;
    const orderFunctions = {
      buy: { limit: buyLimitOrder, market: buyMarketOrder },
      sell: { limit: sellLimitOrder, market: sellMarketOrder },
    };
    const orderDetails = { stockName: stockInfo.name, stockCode: stockId, quantity, price };

    openConfirm(
      `${quantity.toLocaleString()}주를 ${priceType === 'limit' ? price.toLocaleString() + '원에' : '시장가로'} ${type === 'buy' ? '매수' : '매도'}하시겠습니까?`,
      async () => {
        setIsLoading(true);
        try {
          await orderFunctions[type][priceType](orderDetails);
          openAlert('주문이 성공적으로 체결되었습니다.');
          const updatedUserInfo = await fetchUserInfo();
          setMemberInfo(updatedUserInfo);
          const updatedPortfolio = await fetchPortfolios();
          setPortfolio(updatedPortfolio);
        } catch (err) {
          console.error('주문 실패:', err);
          openAlert(err.response?.data?.message || '주문 처리에 실패했습니다.');
        } finally {
          setIsLoading(false);
        }
      },
    );
  };

  if (error) return <div className="loading-message">{error}</div>;

  const timeOptions = [
    { value: 'minute', label: '분봉' },
    { value: '5minute', label: '5분봉' },
    { value: 'daily', label: '일봉' },
    { value: 'weekly', label: '주봉' },
  ];

  return (
    <div className="stock-detail-page">
      <header className="stock-header">
        <div className="stock-header__left">
          <div className="stock-header__info">
            <h1 className="stock-name">{stockInfo.name}</h1>
            <p className="stock-code">({stockId})</p>
            <button
              onClick={handleToggleFavorite}
              className="favorite-btn"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                marginLeft: '0.5rem',
                padding: 0,
                outline: 'none',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill={isFavorite ? '#f44336' : 'none'}
                stroke={isFavorite ? '#f44336' : '#FFFFFF'}
                strokeWidth="2"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3c3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </button>
          </div>
          <div className="stock-header__price">
            <span className={classNames('current-price', { positive: changeValue > 0, negative: changeValue < 0 })}>
              {currentPrice.toLocaleString()}원
            </span>
            <span className={classNames('change-info', { positive: changeValue > 0, negative: changeValue < 0 })}>
              {changeValue >= 0 ? '▲' : '▼'} {changeValue.toLocaleString()} ({calculatedChangeRate.toFixed(2)}%)
            </span>
          </div>
        </div>
        <div className="stock-header__actions">
          <CustomSelect options={timeOptions} value={timeframe} onChange={setTimeframe} />
        </div>
      </header>

      <div className="chart-area">
        <StockChart data={chartData} timeframe={timeframe} onLoadMore={handleLoadMore} />
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
