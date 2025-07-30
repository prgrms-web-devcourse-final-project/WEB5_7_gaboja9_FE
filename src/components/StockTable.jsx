import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

const StockTable = ({ stocks }) => {
  const navigate = useNavigate();

  const handleClickStock = (stockId) => {
    navigate(`/stock/${stockId}`);
  };

  return (
    <div className="stock-table-container">
      <table className="stock-table">
        <thead>
          <tr>
            <th>종목명</th>
            <th>현재가</th>
            <th>등락률</th>
            <th>거래량</th>
            <th>시가총액</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock.id} onClick={() => handleClickStock(stock.id)}>
              <td>{stock.name}</td>
              <td
                className={classNames({
                  positive: stock.changeRate > 0,
                  negative: stock.changeRate < 0,
                })}
              >
                ₩ {stock.currentPrice.toLocaleString()}
              </td>
              <td
                className={classNames({
                  positive: stock.changeRate > 0,
                  negative: stock.changeRate < 0,
                })}
              >
                {stock.changeRate.toFixed(2)}%
              </td>
              <td>{stock.volume.toLocaleString()}</td>
              <td>{stock.marketCap}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;
