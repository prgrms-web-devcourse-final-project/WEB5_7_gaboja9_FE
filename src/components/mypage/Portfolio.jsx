import classNames from 'classnames';
import { useAtomValue } from 'jotai';
import { useEffect, useState, useMemo } from 'react';

import { fetchPortfolios } from '@/api/user';
import AssetCompositionChart from '@/components/mypage/AssetCompositionChart';
import { stockPricesAtom } from '@/store/atoms';

const Portfolio = () => {
  const [portfolioData, setPortfolioData] = useState(null);
  const stockPrices = useAtomValue(stockPricesAtom);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const result = await fetchPortfolios();
        setPortfolioData(result);
      } catch (error) {
        console.error('Failed to fetch portfolio data:', error);
      }
    };

    fetchPortfolioData();
  }, []);

  const ownedStocksWithRealtimePrice = useMemo(() => {
    if (!portfolioData?.portfolios) return [];

    return portfolioData.portfolios.map((stock) => {
      const realtimeInfo = stockPrices[stock.stockCode];
      const currentPrice = realtimeInfo?.currentPrice || stock.currentPrice;
      return {
        ...stock,
        id: stock.stockCode,
        name: stock.stockName,
        currentPrice: currentPrice,
        avgPrice: stock.avgPrice,
      };
    });
  }, [portfolioData, stockPrices]);

  const totalEvaluationAmount = useMemo(() => {
    return ownedStocksWithRealtimePrice.reduce((acc, stock) => acc + stock.currentPrice * stock.quantity, 0);
  }, [ownedStocksWithRealtimePrice]);

  const totalPurchaseAmount = useMemo(() => {
    if (!portfolioData?.portfolios) return 0;
    return portfolioData.portfolios.reduce((acc, stock) => acc + stock.avgPrice * stock.quantity, 0);
  }, [portfolioData]);

  const totalProfit = totalEvaluationAmount - totalPurchaseAmount;
  const totalProfitRate = totalPurchaseAmount > 0 ? (totalProfit / totalPurchaseAmount) * 100 : 0;

  if (!portfolioData) {
    return (
      <div className="no-data-message" style={{ minHeight: '400px' }}>
        <p>포트폴리오 데이터를 불러오는 중입니다...</p>
      </div>
    );
  }

  return (
    <div className="portfolio-section">
      <div className="portfolio-summary-grid">
        <div className="summary-card">
          <div className="card-title">현금</div>
          <div className="card-value large">{Number(portfolioData?.cashBalance).toLocaleString()}원</div>
        </div>
        <div className="summary-card">
          <div className="card-title">주식 평가액</div>
          <div className="card-value">{totalEvaluationAmount.toLocaleString()}원</div>
        </div>
        <div className="summary-card">
          <div className="card-title">총 손익</div>
          <div
            className={classNames('card-value', {
              positive: totalProfit > 0,
              negative: totalProfit < 0,
            })}
          >
            {totalProfit >= 0 ? '+' : ''}
            {totalProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}원
          </div>
        </div>
        <div className="summary-card">
          <div className="card-title">수익률</div>
          <div
            className={classNames('card-value', {
              positive: totalProfitRate > 0,
              negative: totalProfitRate < 0,
            })}
          >
            {totalProfitRate >= 0 ? '+' : ''}
            {totalProfitRate.toFixed(2)}%
          </div>
        </div>
      </div>

      <div className="portfolio-details-grid">
        <div className="details-card chart-card">
          <h3 className="card-title">자산 구성</h3>
          <AssetCompositionChart stocks={ownedStocksWithRealtimePrice} cash={portfolioData.cashBalance} />
        </div>

        <div className="details-card stocks-card">
          <h3 className="card-title">보유 종목</h3>
          <div className="owned-stocks-list">
            {ownedStocksWithRealtimePrice.length > 0 ? (
              ownedStocksWithRealtimePrice.map((stock) => {
                const currentValue = stock.currentPrice * stock.quantity;
                const purchaseValue = stock.avgPrice * stock.quantity;
                const profitLoss = currentValue - purchaseValue;
                const returnRate = purchaseValue > 0 ? (profitLoss / purchaseValue) * 100 : 0;

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
                        {profitLoss.toLocaleString(undefined, { maximumFractionDigits: 0 })}원 (
                        {returnRate > 0 ? '+' : ''}
                        {returnRate.toFixed(2)}%)
                      </div>
                    </div>
                  </div>
                );
              })
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
