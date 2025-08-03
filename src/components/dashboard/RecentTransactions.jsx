import classNames from 'classnames';
import { useEffect, useState } from 'react';

import { fetchTradeHistory } from '@/api/user';

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const getTradeHistory = async () => {
      try {
        const historyData = await fetchTradeHistory(0, 5); // 최근 5개 거래내역
        const formattedData = historyData.content.map((tx) => ({
          id: `${tx.tradeDateTime}-${tx.stockCode}-${tx.quantity}`,
          type: tx.tradeType === 'BUY' ? '매수' : '매도',
          name: tx.stockName,
          quantity: tx.quantity,
          date: new Date(tx.tradeDateTime).toLocaleDateString('ko-KR'),
          amount: tx.totalAmount,
        }));
        setTransactions(formattedData);
      } catch (error) {
        console.error('최근 거래 내역 로딩 실패:', error);
      }
    };
    getTradeHistory();
  }, []);

  return (
    <div className="recent-transactions">
      <h3 className="list-title">최근 거래 내역</h3>
      {transactions.length > 0 ? (
        <ul>
          {transactions.map((tx) => (
            <li key={tx.id} className="transaction-item">
              <div className="tx-info">
                <span className={classNames('tx-type', { buy: tx.type === '매수', sell: tx.type === '매도' })}>
                  {tx.type}
                </span>
                <span className="stock-name">
                  {tx.name} {tx.quantity}주
                </span>
              </div>
              <div className="tx-details">
                <span className="tx-date">{tx.date}</span>
                <span className="tx-amount">₩ {tx.amount.toLocaleString()}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="no-data-message small" style={{ textAlign: 'center', padding: '2rem 0' }}>
          <p>최근 거래 내역이 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;
