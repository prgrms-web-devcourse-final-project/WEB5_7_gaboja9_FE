import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

const DashboardStockList = ({ title, stocks, type }) => {
  const navigate = useNavigate();

  const calculateReturn = (stock) => {
    if (type !== 'owned') return { rate: stock.changeRate };
    const rate = ((stock.currentPrice - stock.avgPrice) / stock.avgPrice) * 100;
    return { rate };
  };

  // 스톡 상세 페이지로 이동하는 함수
  const handleClickStock = (stockId) => {
    navigate(`/stock/${stockId}`);
  };

  return (
    <div className="dashboard-stock-list">
      <h3 className="list-title">{title}</h3>
      <ul>
        {stocks.map((stock) => {
          const { rate } = calculateReturn(stock);
          const isPositive = rate > 0;
          const isNegative = rate < 0;

          return (
            <li key={stock.id} className="stock-item" onClick={() => handleClickStock(stock.id)}>
              <div className="stock-info">
                <span className="stock-name">{stock.name}</span>
                {type === 'owned' && <span className="stock-quantity">{stock.quantity}주</span>}
              </div>
              <div className="stock-price-info">
                <span className="current-price">₩ {stock.currentPrice.toLocaleString()}</span>
                <span className={classNames('change-rate', { positive: isPositive, negative: isNegative })}>
                  {isPositive ? '+' + rate.toFixed(2) : rate.toFixed(2)}%
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DashboardStockList;
