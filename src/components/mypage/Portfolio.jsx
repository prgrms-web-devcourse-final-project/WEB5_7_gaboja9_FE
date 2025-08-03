import classNames from 'classnames';
import { useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';

import { fetchPortfolios } from '@/api/user';
import AssetCompositionChart from '@/components/mypage/AssetCompositionChart';
import { loadingAtom } from '@/store/atoms';

const Portfolio = () => {
  const [portfolioData, setPortfolioData] = useState(null);
  const setIsLoading = useSetAtom(loadingAtom);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      setIsLoading(true);
      try {
        const result = await fetchPortfolios();
        setPortfolioData(result);
      } catch (error) {
        console.error('Failed to fetch portfolio data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolioData();
  }, [setIsLoading]);

  if (!portfolioData) {
    return null;
  }

  const { cashBalance, totalEvaluationAmount, totalProfit, totalProfitRate, portfolios } = portfolioData;

  return (
    <div className="portfolio-section">
      <div className="portfolio-summary-grid">
        <div className="summary-card">
          <div className="card-title">현금</div>
          <div className="card-value large">{Number(cashBalance).toLocaleString()}원</div>
        </div>
        <div className="summary-card">
          <div className="card-title">주식 평가액</div>
          <div className="card-value">{totalEvaluationAmount.toLocaleString()}원</div>
        </div>
        <div className="summary-card">
          <div className="card-title">총 손익</div>
          <div className={classNames('card-value', { positive: totalProfit > 0, negative: totalProfit < 0 })}>
            {totalProfit >= 0 ? '+' : ''}
            {totalProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}원
          </div>
        </div>
        <div className="summary-card">
          <div className="card-title">수익률</div>
          <div className={classNames('card-value', { positive: totalProfitRate > 0, negative: totalProfitRate < 0 })}>
            {totalProfitRate >= 0 ? '+' : ''}
            {totalProfitRate.toFixed(2)}%
          </div>
        </div>
      </div>

      <div className="portfolio-details-grid">
        <div className="details-card chart-card">
          <h3 className="card-title">자산 구성</h3>
          <AssetCompositionChart stocks={portfolios} cash={cashBalance} />
        </div>

        <div className="details-card stocks-card">
          <h3 className="card-title">보유 종목</h3>
          <div className="owned-stocks-list">
            {portfolios.length > 0 ? (
              portfolios.map((stock) => (
                <div key={stock.stockCode} className="owned-stock-item">
                  <div className="stock-item-left">
                    <div className="stock-name">{stock.stockName}</div>
                    <div className="stock-meta">
                      {stock.quantity}주 · 평단 {stock.avgPrice.toLocaleString()}원
                    </div>
                  </div>
                  <div className="stock-item-right">
                    <div className="stock-value">{stock.evaluationAmount.toLocaleString()}원</div>
                    <div
                      className={classNames('stock-return', {
                        positive: stock.profit > 0,
                        negative: stock.profit < 0,
                      })}
                    >
                      {stock.profit.toLocaleString(undefined, { maximumFractionDigits: 0 })}원 (
                      {stock.profitRate > 0 ? '+' : ''}
                      {stock.profitRate.toFixed(2)}%)
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-data-message small">
                <p>보유한 주식이 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
