import classNames from 'classnames';
import { useAtomValue } from 'jotai';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { chargeCash } from '@/api/user';
import useModal from '@/hooks/useModal';
import { isLoggedInAtom } from '@/store/user';

const OrderPanel = ({ initialPrice, onSubmit, availableCash, ownedQuantity, currentPrice }) => {
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const { openAlert, openConfirm } = useModal();
  const navigate = useNavigate();

  const [orderType, setOrderType] = useState('buy');
  const [priceType, setPriceType] = useState('limit');
  const [price, setPrice] = useState(initialPrice);
  const [quantity, setQuantity] = useState('');

  const executionPrice = priceType === 'market' ? currentPrice : price;

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
    if (orderType === 'sell' && numericValue > ownedQuantity) {
      numericValue = ownedQuantity;
    }
    setQuantity(numericValue > 0 ? numericValue : '');
  };

  const handleMaxClick = () => {
    if (orderType === 'buy') {
      const maxBuyQty = executionPrice > 0 ? Math.floor(availableCash / executionPrice) : 0;
      setQuantity(maxBuyQty > 0 ? maxBuyQty : '');
    } else {
      setQuantity(ownedQuantity);
    }
  };

  const handleQuantityClick = (amount) => {
    let newQty = Number(quantity || 0) + amount;
    if (orderType === 'sell' && newQty > ownedQuantity) {
      newQty = ownedQuantity;
    }
    setQuantity(newQty);
  };

  const numericQuantity = Number(quantity || 0);
  const totalAmount = executionPrice * numericQuantity;
  const fee = orderType === 'sell' ? totalAmount * 0.0025 : 0;
  const finalAmount = orderType === 'buy' ? totalAmount : totalAmount - fee;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      openAlert('로그인이 필요한 서비스입니다.', () => navigate('/login'));
      return;
    }
    if (numericQuantity <= 0) {
      openAlert('주문 수량을 입력해주세요.');
      return;
    }

    if (orderType === 'buy' && totalAmount > availableCash) {
      const shortage = totalAmount - availableCash;
      openConfirm(`${shortage.toLocaleString()}원이 부족합니다. 충전하시겠습니까?`, async () => {
        try {
          const response = await chargeCash({ chargeAmount: shortage });
          if (response.success) {
            const popup = window.open(response.data.next_redirect_pc_url, 'kakaopay-popup', 'width=800,height=600');
            if (!popup) {
              openAlert('팝업이 차단되었습니다. 팝업 차단을 해제하고 다시 시도해주세요.');
            } else {
              openAlert('결제창이 열렸습니다. 결제 완료 후 다시 주문해주세요.');
            }
          } else {
            throw new Error(response.message || '결제 준비에 실패했습니다.');
          }
        } catch (error) {
          console.error('충전 준비 실패:', error);
          openAlert(error.message || '충전 중 오류가 발생했습니다.');
        }
      });
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

  const isSubmitDisabled = !isLoggedIn || (orderType === 'sell' && ownedQuantity === 0);

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
              disabled={!isLoggedIn || (orderType === 'sell' && ownedQuantity === 0)}
            />
          </div>
          <div className="quantity-shortcuts">
            <button type="button" onClick={() => handleQuantityClick(1)} disabled={isSubmitDisabled}>
              1주
            </button>
            <button type="button" onClick={() => handleQuantityClick(5)} disabled={isSubmitDisabled}>
              5주
            </button>
            <button type="button" onClick={() => handleQuantityClick(10)} disabled={isSubmitDisabled}>
              10주
            </button>
            <button type="button" onClick={handleMaxClick} disabled={isSubmitDisabled}>
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

          <button type="submit" className={classNames('submit-btn', orderType)} disabled={isSubmitDisabled}>
            {numericQuantity > 0 ? `${numericQuantity.toLocaleString()}주 ` : ''}
            {orderType === 'buy' ? '매수' : '매도'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderPanel;
