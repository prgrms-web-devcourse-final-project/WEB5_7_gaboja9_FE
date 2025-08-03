import classNames from 'classnames';
import { useCallback, useEffect, useMemo, useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { fetchTradeHistory } from '@/api/user';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [pagination, setPagination] = useState({
    pageNumber: 0,
    last: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const loadTransactions = useCallback(async (page, loadMore = false) => {
    setIsLoading(true);
    try {
      const data = await fetchTradeHistory(page, 10);
      const formattedData = data.content.map((tx) => ({
        id: `${tx.tradeDateTime}-${tx.stockCode}-${tx.quantity}`,
        type: tx.tradeType === 'BUY' ? '매수' : '매도',
        name: tx.stockName,
        stockId: tx.stockCode,
        date: new Date(tx.tradeDateTime).toLocaleDateString('ko-KR'),
        quantity: tx.quantity,
        price: tx.price,
        amount: tx.totalAmount,
      }));
      setTransactions((prev) => (loadMore ? [...prev, ...formattedData] : formattedData));
      setPagination({
        pageNumber: data.pageable.pageNumber,
        last: data.last,
      });
    } catch (error) {
      console.error('Failed to fetch transaction history:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTransactions(0);
  }, [loadTransactions]);

  const handleLoadMore = () => {
    if (!pagination.last && !isLoading) {
      loadTransactions(pagination.pageNumber + 1, true);
    }
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const typeMatch =
        filter === 'all' || (filter === 'buy' && tx.type === '매수') || (filter === 'sell' && tx.type === '매도');
      const searchTermMatch = tx.name.toLowerCase().includes(searchTerm.toLowerCase());
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
  }, [transactions, filter, searchTerm, startDate, endDate]);

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
        {!isLoading && filteredTransactions.length === 0 ? (
          <div className="no-data-message">
            <p>거래 내역이 없습니다.</p>
          </div>
        ) : (
          filteredTransactions.map((tx) => (
            <div key={tx.id} className="transaction-item">
              <div className="item-left">
                <div className={classNames('type-icon', { buy: tx.type === '매수', sell: tx.type === '매도' })}>
                  {tx.type}
                </div>
                <div className="info-group">
                  <span className="tx-date">{tx.date}</span>
                  <div className="stock-info">
                    <span className="stock-name">{tx?.name}</span>
                    <span className="stock-id">({tx.stockId})</span>
                  </div>
                  <div className="tx-details">
                    {tx.quantity}주 · {tx.price.toLocaleString()}원
                  </div>
                </div>
              </div>
              <div className="item-right">
                <div className="tx-amount">{tx.amount.toLocaleString()}원</div>
              </div>
            </div>
          ))
        )}
      </div>

      {!pagination.last && (
        <div style={{ textAlign: 'center', padding: '1rem' }}>
          <button onClick={handleLoadMore} disabled={isLoading} className="load-more-button">
            {isLoading ? '로딩 중...' : '더 보기'}
          </button>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
