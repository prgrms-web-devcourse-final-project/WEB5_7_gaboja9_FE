import classNames from 'classnames';
import { useMemo, useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { MOCK_TRANSACTION_HISTORY } from '@/constants/mockData';

const TransactionHistory = () => {
  const [filter, setFilter] = useState('all'); // 'all', 'buy', 'sell'
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const filteredTransactions = useMemo(() => {
    return MOCK_TRANSACTION_HISTORY.filter((tx) => {
      // 1. 거래 유형 필터
      const typeMatch =
        filter === 'all' || (filter === 'buy' && tx.type === '매수') || (filter === 'sell' && tx.type === '매도');

      // 2. 종목명 검색 필터
      const searchTermMatch = tx.name.toLowerCase().includes(searchTerm.toLowerCase());

      // 3. 날짜 범위 필터
      const txDate = new Date(tx.date);
      let dateMatch = true;
      if (startDate && endDate) {
        const endOfDay = new Date(endDate);
        endOfDay.setHours(23, 59, 59, 999);
        dateMatch = txDate >= startDate && txDate <= endOfDay;
      } else if (startDate) {
        dateMatch = txDate >= startDate;
      } else if (endDate) {
        const endOfDay = new Date(endDate);
        endOfDay.setHours(23, 59, 59, 999);
        dateMatch = txDate <= endOfDay;
      }

      return typeMatch && searchTermMatch && dateMatch;
    });
  }, [filter, searchTerm, startDate, endDate]);

  const calculateRealizedPL = (tx) => {
    if (tx.type !== '매도' || tx.purchasePrice == null) {
      return null;
    }
    return (tx.price - tx.purchasePrice) * tx.quantity;
  };

  return (
    <div className="transaction-history-section">
      <div className="filter-bar">
        <div className="filter-group">
          <button className={classNames({ active: filter === 'all' })} onClick={() => setFilter('all')}>
            전체
          </button>
          <button className={classNames({ active: filter === 'buy' })} onClick={() => setFilter('buy')}>
            매수
          </button>
          <button className={classNames({ active: filter === 'sell' })} onClick={() => setFilter('sell')}>
            매도
          </button>
        </div>
        <div className="search-group">
          <input
            type="text"
            placeholder="종목명 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="date-picker-wrapper">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="시작일"
              dateFormat="yyyy.MM.dd"
              className="date-picker-input"
              isClearable
            />
            <span className="date-picker-tilde">~</span>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="종료일"
              dateFormat="yyyy.MM.dd"
              className="date-picker-input"
              isClearable
            />
          </div>
          <button className="search-btn">조회</button>
        </div>
      </div>

      <div className="transaction-list">
        {filteredTransactions.map((tx) => {
          const realizedPL = calculateRealizedPL(tx);
          return (
            <div key={tx.id} className="transaction-item">
              <div className="item-left">
                <div className={classNames('type-icon', { buy: tx.type === '매수', sell: tx.type === '매도' })}>
                  {tx.type}
                </div>
                <div className="info-group">
                  <span className="tx-date">{tx.date}</span>
                  <div className="stock-info">
                    <span className="stock-name">{tx.name}</span>
                    <span className="stock-id">({tx.stockId})</span>
                  </div>
                  <div className="tx-details">
                    {tx.quantity}주 · {tx.price.toLocaleString()}원
                  </div>
                </div>
              </div>
              <div className="item-right">
                <div className="tx-amount">{tx.amount.toLocaleString()}원</div>
                {realizedPL != null && (
                  <div className={classNames('tx-pl', { positive: realizedPL > 0, negative: realizedPL < 0 })}>
                    {realizedPL >= 0 ? '+' : ''}
                    {realizedPL.toLocaleString()}원
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TransactionHistory;
