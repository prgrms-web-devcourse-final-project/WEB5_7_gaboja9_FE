import classNames from 'classnames';
import { useAtomValue } from 'jotai';

import { recentTransactionsAtom } from '@/store/atoms';

const RecentTransactions = () => {
  const transactions = useAtomValue(recentTransactionsAtom);

  return (
    <div className="recent-transactions">
      <h3 className="list-title">최근 거래 내역</h3>
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
    </div>
  );
};

export default RecentTransactions;
