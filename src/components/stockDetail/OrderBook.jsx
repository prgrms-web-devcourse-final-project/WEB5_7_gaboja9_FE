import classNames from 'classnames';
import { useLayoutEffect, useRef } from 'react';

const mergeOrderBookData = (asks, bids) => {
  const merged = {};
  asks.forEach((ask) => {
    if (!merged[ask.price]) merged[ask.price] = { price: ask.price };
    merged[ask.price].askQty = ask.quantity;
  });
  bids.forEach((bid) => {
    if (!merged[bid.price]) merged[bid.price] = { price: bid.price };
    merged[bid.price].bidQty = bid.quantity;
  });

  return Object.values(merged).sort((a, b) => b.price - a.price);
};

const OrderBook = ({ orderBook, onPriceSelect, openingPrice, previousClosePrice, currentPrice }) => {
  const scrollRef = useRef(null);
  const itemsRef = useRef({});

  useLayoutEffect(() => {
    const targetElement = Object.values(itemsRef.current).find((el) => el && Number(el.dataset.price) >= currentPrice);

    if (targetElement && scrollRef.current) {
      const container = scrollRef.current;
      const scrollTop = targetElement.offsetTop - container.clientHeight / 2 + targetElement.clientHeight / 2;

      container.scrollTo({ top: scrollTop, behavior: 'smooth' });
    }
  }, [currentPrice]);

  const { asks = [], bids = [] } = orderBook;
  const mergedData = mergeOrderBookData(asks, bids);

  const maxAskQty = Math.max(...asks.map((a) => a.quantity), 0);
  const maxBidQty = Math.max(...bids.map((b) => b.quantity), 0);
  const maxQty = Math.max(maxAskQty, maxBidQty, 1);

  return (
    <div className="order-book">
      <div className="order-book__header">
        <div className="header-cell ask">매도잔량</div>
        <div className="header-cell price">호가</div>
        <div className="header-cell bid">매수잔량</div>
      </div>
      <div className="order-book__content" ref={scrollRef}>
        {mergedData.map((item) => {
          const percentage = ((item.price - previousClosePrice) / previousClosePrice) * 100;
          const isOpeningPrice = item.price === openingPrice;
          const isCurrentPrice = item.price === currentPrice;

          return (
            <div
              ref={(el) => (itemsRef.current[item.price] = el)}
              data-price={item.price}
              className={classNames('order-item', { 'current-marker': isCurrentPrice })}
              key={item.price}
              onClick={() => onPriceSelect(item.price)}
            >
              <div className="quantity-cell ask">
                {item.askQty && (
                  <>
                    <div className="quantity-bar" style={{ width: `${(item.askQty / maxQty) * 100}%` }}></div>
                    <span className="quantity-text negative">{item.askQty.toLocaleString()}</span>
                  </>
                )}
              </div>
              <div
                className={classNames('price-cell', {
                  ask: !isOpeningPrice && percentage < 0,
                  bid: !isOpeningPrice && percentage > 0,
                  opening: isOpeningPrice,
                })}
              >
                <span className="price-value">{item.price.toLocaleString()}</span>
                <span className="price-percent">
                  {percentage > 0 ? '+' : ''}
                  {percentage.toFixed(2)}%
                </span>
              </div>
              <div className="quantity-cell bid">
                {item.bidQty && (
                  <>
                    <div className="quantity-bar" style={{ width: `${(item.bidQty / maxQty) * 100}%` }}></div>
                    <span className="quantity-text positive">{item.bidQty.toLocaleString()}</span>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderBook;
