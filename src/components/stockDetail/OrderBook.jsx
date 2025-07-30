import classNames from 'classnames';
import { useEffect, useRef } from 'react';

const OrderBook = ({ orderBook, onPriceSelect, previousClosePrice, currentPrice }) => {
  const scrollRef = useRef(null);
  const itemsRef = useRef({});

  const { asks = [], bids = [] } = orderBook;

  const allPrices = [...new Set([...asks.map((a) => a.price), ...bids.map((b) => b.price)])].sort((a, b) => b - a);

  const askMap = new Map(asks.map((a) => [a.price, a.quantity]));
  const bidMap = new Map(bids.map((b) => [b.price, b.quantity]));

  useEffect(() => {
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
          const askQty = askMap.get(price);
          const bidQty = bidMap.get(price);
          const percentage = ((price - previousClosePrice) / previousClosePrice) * 100;
          const isCurrentPrice = price === currentPrice;

          return (
            <div
              key={price}
              ref={(el) => (itemsRef.current[price] = el)}
              className={classNames('order-item', { 'current-marker': isCurrentPrice })}
              onClick={() => onPriceSelect(price)}
            >
              <div
                className={classNames('price-cell', {
                  ask: !!askQty,
                  bid: !!bidQty,
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
