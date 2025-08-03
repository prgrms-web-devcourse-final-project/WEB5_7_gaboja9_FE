import classNames from 'classnames';
import { useState, useEffect } from 'react';

const OrderPanel = ({ initialPrice, onSubmit, availableCash, ownedQuantity, currentPrice }) => {
  const [orderType, setOrderType] = useState('buy');
  const [priceType, setPriceType] = useState('limit');
  const [price, setPrice] = useState(initialPrice);
  const [quantity, setQuantity] = useState('');

  const executionPrice = priceType === 'market' ? currentPrice : price;
  const maxBuyQty = executionPrice > 0 ? Math.floor(availableCash / executionPrice) : 0;

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
    setQuantity(numericValue > 0 ? numericValue : '');
  };

  const handleMaxClick = () => {
    if (orderType === 'buy') {
      setQuantity(maxBuyQty > 0 ? maxBuyQty : '');
    } else {
      setQuantity(ownedQuantity);
    }
  };

  const handleQuantityClick = (amount) => {
    let newQty = Number(quantity || 0) + amount;
    if (orderType === 'buy') {
      if (newQty > maxBuyQty) newQty = maxBuyQty;
    } else {
      if (newQty > ownedQuantity) newQty = ownedQuantity;
    }
    setQuantity(newQty);
  };

  const numericQuantity = Number(quantity || 0);
  const totalAmount = executionPrice * numericQuantity;
  const fee = orderType === 'sell' ? totalAmount * 0.0025 : 0; // 매도 수수료 0.25%
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
      price: priceType === 'limit' ? price : executionPrice,
      quantity: numericQuantity,
    });
    setQuantity('');
  };

  const isSellDisabled = orderType === 'sell' && ownedQuantity === 0;
  const isBuyDisabled = orderType === 'buy' && availableCash < executionPrice && executionPrice > 0;

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
              value={quantity.toLocaleString()}
              onChange={handleQuantityChange}
              inputMode="numeric"
              disabled={isSellDisabled || isBuyDisabled}
            />
          </div>
          <div className="quantity-shortcuts">
            <button type="button" onClick={() => handleQuantityClick(1)} disabled={isSellDisabled || isBuyDisabled}>
              1주
            </button>
            <button type="button" onClick={() => handleQuantityClick(5)} disabled={isSellDisabled || isBuyDisabled}>
              5주
            </button>
            <button type="button" onClick={() => handleQuantityClick(10)} disabled={isSellDisabled || isBuyDisabled}>
              10주
            </button>
            <button type="button" onClick={handleMaxClick} disabled={isSellDisabled || isBuyDisabled}>
              최대
            </button>
          </div>

          <div className="order-summary">
            {orderType === 'sell' && fee > 0 && (
              <div className="summary-item">
                <span>수수료(0.25%)</span>
                <span>- {fee.toLocaleString(undefined, { maximumFractionDigits: 0 })} 원</span>
              </div>
            )}
            <div className="summary-item total">
              <span>{orderType === 'buy' ? '총 매수 금액' : '총 매도 금액'}</span>
              <span>{finalAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })} 원</span>
            </div>
          </div>

          <button
            type="submit"
            className={classNames('submit-btn', orderType)}
            disabled={isSellDisabled || isBuyDisabled}
          >
            {numericQuantity > 0 ? `${numericQuantity.toLocaleString()}주 ` : ''}
            {orderType === 'buy' ? '매수' : '매도'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderPanel;
