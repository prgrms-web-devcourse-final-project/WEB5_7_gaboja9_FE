import classNames from 'classnames';
import { useLayoutEffect, useRef } from 'react';

const OrderBook = ({ orderBook, onPriceSelect, previousClosePrice, currentPrice }) => {
  const scrollRef = useRef(null);
  const itemsRef = useRef({});

  const { asks = [], bids = [] } = orderBook;

  const allPrices = [...new Set([...asks.map((a) => a.price), ...bids.map((b) => b.price)])].sort((a, b) => b - a);

  useLayoutEffect(() => {
    if (scrollRef.current && itemsRef.current[currentPrice]) {
      const container = scrollRef.current;
      const targetElement = itemsRef.current[currentPrice];
      const scrollTop = targetElement.offsetTop - container.clientHeight / 2 + targetElement.clientHeight / 2;
      container.scrollTo({ top: scrollTop, behavior: 'smooth' });
    }
  }, [currentPrice]);

  return (
    <div className="order-book single-column">
      <div className="order-book__header">
        <div className="header-cell">호가</div>
      </div>
      <div className="order-book__content" ref={scrollRef}>
        {allPrices.map((price) => {
          const percentage = ((price - previousClosePrice) / previousClosePrice) * 100;
          const isCurrentPrice = price === currentPrice;
          const isBasePrice = price === previousClosePrice;

          return (
            <div
              key={price}
              ref={(el) => (itemsRef.current[price] = el)}
              className={classNames('order-item', { 'current-marker': isCurrentPrice })}
              onClick={() => onPriceSelect(price)}
            >
              <div
                className={classNames('price-cell', {
                  opening: isBasePrice,
                  ask: !isBasePrice && price > previousClosePrice, // 기준가보다 높으면 ask (상승)
                  bid: !isBasePrice && price < previousClosePrice, // 기준가보다 낮으면 bid (하락)
                })}
              >
                <div className="quantity-bar" />

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
