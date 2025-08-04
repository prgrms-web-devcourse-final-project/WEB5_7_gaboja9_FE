import classNames from 'classnames';
import { useLayoutEffect, useRef, useMemo } from 'react';

const OrderBook = ({ onPriceSelect, previousClosePrice, currentPrice }) => {
  const scrollRef = useRef(null);
  const itemsRef = useRef({});

  const getStep = (price) => {
    if (price >= 500000) return 1000;
    if (price >= 100000) return 500;
    if (price >= 50000) return 100;
    if (price >= 10000) return 50;
    if (price >= 5000) return 10;
    if (price >= 1000) return 5;
    return 1;
  };

  const step = getStep(currentPrice);
  const roundedCurrentPrice = currentPrice > 0 ? Math.round(currentPrice / step) * step : 0;

  const prices = useMemo(() => {
    if (!currentPrice) return [];

    const memoStep = getStep(currentPrice);
    const memoRoundedCurrentPrice = Math.round(currentPrice / memoStep) * memoStep;

    return Array.from({ length: 31 }, (_, i) => memoRoundedCurrentPrice + (15 - i) * memoStep);
  }, [currentPrice]);

  useLayoutEffect(() => {
    if (scrollRef.current && itemsRef.current[roundedCurrentPrice]) {
      const container = scrollRef.current;
      const targetElement = itemsRef.current[roundedCurrentPrice];
      const scrollTop = targetElement.offsetTop - container.clientHeight / 2 + targetElement.clientHeight / 2;
      container.scrollTo({ top: scrollTop, behavior: 'smooth' });
    }
  }, [roundedCurrentPrice]);
  return (
    <div className="order-book single-column">
      <div className="order-book__header">
        <div className="header-cell">호가</div>
      </div>
      <div className="order-book__content" ref={scrollRef}>
        {prices.map((price) => {
          if (price <= 0) return null;
          const percentage = previousClosePrice > 0 ? ((price - previousClosePrice) / previousClosePrice) * 100 : 0;

          const isCurrentPrice = price === roundedCurrentPrice;

          return (
            <div
              key={price}
              ref={(el) => (itemsRef.current[price] = el)}
              className={classNames('order-item', { 'current-marker': isCurrentPrice })}
              onClick={() => onPriceSelect(price)}
            >
              <div
                className={classNames('price-cell', {
                  opening: price === previousClosePrice,
                  ask: price > previousClosePrice,
                  bid: price < previousClosePrice,
                })}
              >
                <div className="price-info">
                  <span className="price-value">{price.toLocaleString()}</span>
                  <span className="price-percent">
                    {percentage > 0 ? '+' : ''}
                    {percentage.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderBook;
