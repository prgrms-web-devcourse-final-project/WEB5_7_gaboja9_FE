import classNames from 'classnames';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';

import { fetchPortfolios } from '@/api/user';
import AssetCompositionChart from '@/components/mypage/AssetCompositionChart';
import { ownedStocksAtom, userAssetsAtom } from '@/store/atoms';

const Portfolio = () => {
  const [portfolioData, setPortfolioData] = useState(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      const result = await fetchPortfolios();

      setPortfolioData(result);
    };

    fetchPortfolioData();
  }, []);

  const ownedStocks = useAtomValue(ownedStocksAtom);
  const userAssets = useAtomValue(userAssetsAtom);

  return (
    <div className="portfolio-section">
      <div className="portfolio-summary-grid">
        <div className="summary-card">
          <div className="card-title">현금</div>
          <div className="card-value large">{Number(portfolioData?.cashBalance).toLocaleString()}원</div>
        </div>
        <div className="summary-card">
          <div className="card-title">주식 평가액</div>
          <div className="card-value">{Number(portfolioData?.totalEvaluationAmount).toLocaleString()}원</div>
        </div>
        <div className="summary-card">
          <div className="card-title">총 손익</div>
          <div
            className={classNames('card-value', {
              positive: portfolioData?.totalProfit > 0,
              negative: portfolioData?.totalProfit < 0,
            })}
          >
            {portfolioData?.totalProfit >= 0 ? '+' : ''}
            {portfolioData?.totalProfit.toLocaleString()}원
          </div>
        </div>
        <div className="summary-card">
          <div className="card-title">수익률</div>
          <div
            className={classNames('card-value', {
              positive: portfolioData?.totalProfitRate > 0,
              negative: portfolioData?.totalProfitRate < 0,
            })}
          >
            {portfolioData?.totalProfitRate >= 0 ? '+' : ''}
            {portfolioData?.totalProfitRate.toFixed(2)}%
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
