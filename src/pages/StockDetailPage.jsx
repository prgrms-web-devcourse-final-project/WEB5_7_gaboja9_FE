import classNames from 'classnames';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchStockDetails } from '@/api/stock';
import CustomSelect from '@/components/common/CustomSelect';
import OrderBook from '@/components/stockDetail/OrderBook';
import OrderPanel from '@/components/stockDetail/OrderPanel';
import StockChart from '@/components/stockDetail/StockChart';
import useStockSocket from '@/hooks/useStockSocket';
import { userAssetsAtom, ownedStocksAtom } from '@/store/atoms';

const StockDetailPage = () => {
  const { stockId } = useParams();

  const [stockInfo, setStockInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeframe, setTimeframe] = useState('minute5');
  const [selectedPrice, setSelectedPrice] = useState(0);

  const userAssets = useAtomValue(userAssetsAtom);
  const ownedStocks = useAtomValue(ownedStocksAtom);
  const ownedQuantity = ownedStocks.find((stock) => stock.id === stockId)?.quantity || 0;

  useEffect(() => {
    const getDetails = async () => {
      setIsLoading(true);
      try {
        const data = await fetchStockDetails(stockId);
        setStockInfo(data);
        setSelectedPrice(data.currentPrice);
      } catch (err) {
        setError('주식 정보를 불러오는 데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };
    getDetails();
  }, [stockId]);

  const liveStockInfo = useStockSocket(stockId, stockInfo);
  const currentDisplayInfo = liveStockInfo || stockInfo;

  const handlePriceSelect = (price) => {
    setSelectedPrice(price);
  };

  const handleOrderSubmit = (order) => {
    alert(
      `${order.quantity}주 ${order.type === 'buy' ? '매수' : '매도'} 주문이 접수되었습니다. (유형: ${order.priceType})`,
    );
    console.log('Submitted Order:', order);
  };

  if (isLoading) return <div className="loading-message">데이터를 불러오는 중입니다...</div>;
  if (error) return <div className="loading-message">{error}</div>;
  if (!currentDisplayInfo) return null;

  const { name, currentPrice, changeRate, changeValue, historicalData, orderBook, openingPrice, previousClosePrice } =
    currentDisplayInfo;

  const timeOptions = [
    { value: 'minute5', label: '5분봉' },
    { value: 'day', label: '일봉' },
    { value: 'week', label: '주봉' },
    { value: 'month', label: '월봉' },
  ];

  return (
    <div className="stock-detail-page">
      <header className="stock-header">
        <div className="stock-header__info">
          <h1 className="stock-name">{name}</h1>
          <p className="stock-code">({stockId})</p>
        </div>
        <div className="stock-header__price">
          <span
            className={classNames('current-price', {
              positive: changeRate > 0,
              negative: changeRate < 0,
            })}
          >
            {currentPrice.toLocaleString()}원
          </span>
          <span
            className={classNames('change-info', {
              positive: changeRate > 0,
              negative: changeRate < 0,
            })}
          >
            {changeRate > 0 ? '▲' : '▼'} {changeValue.toLocaleString()} ({changeRate.toFixed(2)}%)
          </span>
        </div>
        <div className="stock-header__actions">
          <CustomSelect options={timeOptions} value={timeframe} onChange={setTimeframe} />
        </div>
      </header>

      <div className="chart-area">
        <StockChart data={historicalData[timeframe]} timeframe={timeframe} />
      </div>

      <section className="order-section">
        <div className="order-book-area">
          <OrderBook
            orderBook={orderBook}
            onPriceSelect={handlePriceSelect}
            openingPrice={openingPrice}
            previousClosePrice={previousClosePrice}
            currentPrice={currentPrice}
          />
        </div>
        <aside className="order-panel-area">
          <OrderPanel
            initialPrice={selectedPrice}
            onSubmit={handleOrderSubmit}
            availableCash={userAssets.availableCash}
            ownedQuantity={ownedQuantity}
            orderBook={orderBook}
          />
        </aside>
      </section>
    </div>
  );
};

export default StockDetailPage;
