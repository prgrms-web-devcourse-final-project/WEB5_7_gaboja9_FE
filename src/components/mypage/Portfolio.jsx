import classNames from 'classnames';
import { useAtomValue } from 'jotai';
import { useAtom } from 'jotai';

import AssetCompositionChart from '@/components/mypage/AssetCompositionChart';
import { ownedStocksAtom, totalStockValueAtom, userAssetsAtom } from '@/store/atoms';
import { memberInfoAtom } from '@/store/user';

const Portfolio = () => {
  const [memberInfo] = useAtom(memberInfoAtom);

  const ownedStocks = useAtomValue(ownedStocksAtom);
  const userAssets = useAtomValue(userAssetsAtom);
  const totalStockValue = useAtomValue(totalStockValueAtom);

  const totalInvestment = ownedStocks.reduce((sum, stock) => sum + stock.avgPrice * stock.quantity, 0);
  const totalProfitLoss = totalStockValue - totalInvestment;
  const totalReturnRate = totalInvestment > 0 ? (totalProfitLoss / totalInvestment) * 100 : 0;

  return (
    <div className="portfolio-section">
      {/* <h1>포트폴리오</h1> 타이틀 제거 */}

      <div className="portfolio-summary-grid">
        <div className="summary-card">
          <div className="card-title">현금</div>
          <div className="card-value large">{memberInfo.totalEvaluationAmount.toLocaleString()}원</div>
        </div>
        <div className="summary-card">
          <div className="card-title">주식 평가액</div>
          <div className="card-value">
            {(memberInfo.totalEvaluationAmount - memberInfo.totalProfit).toLocaleString()}원
          </div>
        </div>
        <div className="summary-card">
          <div className="card-title">총 손익</div>
          <div
            className={classNames('card-value', {
              positive: memberInfo.totalProfit > 0,
              negative: memberInfo.totalProfit < 0,
            })}
          >
            {memberInfo.totalProfit >= 0 ? '+' : ''}
            {memberInfo.totalProfit.toLocaleString()}원
          </div>
        </div>
        <div className="summary-card">
          <div className="card-title">수익률</div>
          <div
            className={classNames('card-value', {
              positive: totalReturnRate > 0,
              negative: totalReturnRate < 0,
            })}
          >
            {totalReturnRate >= 0 ? '+' : ''}
            {totalReturnRate.toFixed(2)}%
          </div>
        </div>
      </div>

      <div className="portfolio-details-grid">
        <div className="details-card chart-card">
          <h3 className="card-title">자산 구성</h3>
          <AssetCompositionChart stocks={ownedStocks} cash={userAssets.availableCash} />
        </div>

        <div className="details-card stocks-card">
          <h3 className="card-title">보유 종목</h3>
          <div className="owned-stocks-list">
            {ownedStocks.map((stock) => {
              const currentValue = stock.currentPrice * stock.quantity;
              const profitLoss = currentValue - stock.avgPrice * stock.quantity;
              const returnRate = (profitLoss / (stock.avgPrice * stock.quantity)) * 100;

              return (
                <div key={stock.id} className="owned-stock-item">
                  <div className="stock-item-left">
                    <div className="stock-name">{stock.name}</div>
                    <div className="stock-meta">
                      {stock.quantity}주 · 평단 {stock.avgPrice.toLocaleString()}원
                    </div>
                  </div>
                  <div className="stock-item-right">
                    <div className="stock-value">{currentValue.toLocaleString()}원</div>
                    <div
                      className={classNames('stock-return', {
                        positive: returnRate > 0,
                        negative: returnRate < 0,
                      })}
                    >
                      {profitLoss.toLocaleString()}원 ({returnRate.toFixed(2)}%)
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
