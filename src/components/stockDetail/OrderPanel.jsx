import classNames from 'classnames';
import { useState, useEffect } from 'react';

const OrderPanel = ({ initialPrice, onSubmit, availableCash, ownedQuantity, orderBook }) => {
  const [orderType, setOrderType] = useState('buy');
  const [priceType, setPriceType] = useState('limit');
  const [price, setPrice] = useState(initialPrice);
  const [quantity, setQuantity] = useState('');

  const executionPrice =
    priceType === 'market'
      ? (orderType === 'buy' ? orderBook.asks[0]?.price : orderBook.bids[0]?.price) || initialPrice
      : price;

  const maxBuyQty = Math.floor(availableCash / executionPrice);

  useEffect(() => {
    setPrice(initialPrice);
  }, [initialPrice]);

  const handlePriceChange = (e) => {
    const { value } = e.target;
    const sanitizedValue = value.replace(/[^0-9]/g, '');
    setPrice(Number(sanitizedValue));
  };

  const handleQuantityChange = (e) => {
    const { value } = e.target;
    let numericValue = Number(value.replace(/[^0-9]/g, ''));

    if (orderType === 'buy') {
      if (numericValue > maxBuyQty) numericValue = maxBuyQty;
    } else {
      if (numericValue > ownedQuantity) numericValue = ownedQuantity;
    }

    setQuantity(numericValue > 0 ? numericValue.toLocaleString() : '');
  };

  const handleMaxClick = () => {
    if (orderType === 'buy') {
      setQuantity(maxBuyQty > 0 ? maxBuyQty.toLocaleString() : '0');
    } else {
      setQuantity(ownedQuantity.toLocaleString());
    }
  };

  const handleQuantityClick = (amount) => {
    let newQty = Number(quantity.replace(/,/g, '') || 0) + amount;
    if (orderType === 'buy') {
      if (newQty > maxBuyQty) newQty = maxBuyQty;
    } else {
      if (newQty > ownedQuantity) newQty = ownedQuantity;
    }
    setQuantity(newQty.toLocaleString());
  };

  const numericQuantity = Number(quantity.replace(/,/g, '') || 0);
  const totalAmount = executionPrice * numericQuantity;
  const fee = orderType === 'sell' ? totalAmount * 0.0001 : 0;
  const finalAmount = orderType === 'buy' ? totalAmount : totalAmount - fee;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (numericQuantity <= 0) {
      alert('주문 수량을 입력해주세요.');
      return;
    }
    onSubmit({
      type: orderType,
      priceType: priceType,
      price: priceType === 'limit' ? price : '시장가',
      quantity: numericQuantity,
      totalAmount,
    });
    setQuantity('');
  };

  const isSellDisabled = orderType === 'sell' && ownedQuantity === 0;

  return (
    <div className="order-panel">
      <form onSubmit={handleSubmit}>
        <div className="order-panel__tabs">
          <button
            type="button"
            onClick={() => setOrderType('buy')}
            className={classNames('buy', { active: orderType === 'buy' })}
          >
            매수
          </button>
          <button
            type="button"
            onClick={() => setOrderType('sell')}
            className={classNames('sell', { active: orderType === 'sell' })}
          >
            매도
          </button>
        </div>

        <div className="order-panel__body">
          <div className="price-type-selector">
            <button
              type="button"
              onClick={() => setPriceType('limit')}
              className={classNames({ active: priceType === 'limit' })}
            >
              지정가
            </button>
            <button
              type="button"
              onClick={() => setPriceType('market')}
              className={classNames({ active: priceType === 'market' })}
            >
              시장가
            </button>
          </div>

          <div className="form-group">
            <label>{orderType === 'buy' ? '주문가능' : '보유수량'}</label>
            <div className="balance">
              {orderType === 'buy' ? `${availableCash.toLocaleString()} 원` : `${ownedQuantity.toLocaleString()} 주`}
            </div>
          </div>
          <div className="form-group">
            <label>주문가격</label>
            <input
              type="text"
              value={priceType === 'limit' ? price.toLocaleString() : '시장가'}
              onChange={handlePriceChange}
              disabled={priceType === 'market'}
              inputMode="numeric"
            />
          </div>
          <div className="form-group">
            <label>주문수량</label>
            <input
              type="text"
              placeholder="수량을 입력하세요"
              value={quantity}
              onChange={handleQuantityChange}
              inputMode="numeric"
              disabled={isSellDisabled}
            />
          </div>
          <div className="quantity-shortcuts">
            <button type="button" onClick={() => handleQuantityClick(1)} disabled={isSellDisabled}>
              1주
            </button>
            <button type="button" onClick={() => handleQuantityClick(5)} disabled={isSellDisabled}>
              5주
            </button>
            <button type="button" onClick={() => handleQuantityClick(10)} disabled={isSellDisabled}>
              10주
            </button>
            <button type="button" onClick={handleMaxClick} disabled={isSellDisabled}>
              최대
            </button>
          </div>

          <div className="order-summary">
            {orderType === 'sell' && fee > 0 && (
              <div className="summary-item">
                <span>수수료(0.01%)</span>
                <span>{fee.toLocaleString(undefined, { maximumFractionDigits: 0 })} 원</span>
              </div>
            )}
            <div className="summary-item total">
              <span>{orderType === 'buy' ? '총 매수 금액' : '총 매도 금액'}</span>
              <span>{finalAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })} 원</span>
            </div>
          </div>

          <button type="submit" className={classNames('submit-btn', orderType)} disabled={isSellDisabled}>
            {numericQuantity > 0 ? `${numericQuantity.toLocaleString()}주 ` : ''}
            {orderType === 'buy' ? '매수' : '매도'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderPanel;
