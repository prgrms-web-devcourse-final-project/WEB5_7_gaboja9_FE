import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchFavoriteStocks } from '@/api/stock';
import { fetchPortfolios } from '@/api/user';
import AssetSummaryCard from '@/components/dashboard/AssetSummaryCard';
import DashboardStockList from '@/components/dashboard/DashboardStockList';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import { stockPricesAtom, loadingAtom } from '@/store/atoms';
import { isLoggedInAtom } from '@/store/user';

const DashboardPage = () => {
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const navigate = useNavigate();
  const setIsLoading = useSetAtom(loadingAtom);

  const [portfolio, setPortfolio] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const stockPrices = useAtomValue(stockPricesAtom);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [portfolioData, favoriteData] = await Promise.all([fetchPortfolios(), fetchFavoriteStocks()]);
        setPortfolio(portfolioData);
        setWatchlist(favoriteData);
      } catch (error) {
        console.error('대시보드 데이터 로딩 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn, navigate, setIsLoading]);

  const ownedStocksWithLivePrice =
    portfolio?.portfolios.map((stock) => ({
      ...stock,
      id: stock.stockCode,
      name: stock.stockName,
      currentPrice: stockPrices[stock.stockCode]?.currentPrice || stock.currentPrice,
    })) || [];

  const watchlistWithLivePrice =
    watchlist.map((stock) => ({
      ...stock,
      id: stock.stockCode,
      name: stock.stockName,
      currentPrice: stockPrices[stock.stockCode]?.currentPrice || 0,
      changeRate: stockPrices[stock.stockCode]?.dayOverDayPercent || 0,
    })) || [];

  if (!isLoggedIn || !portfolio) {
    return null;
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-page__summary">
        <AssetSummaryCard title="현재 자산" value={portfolio.cashBalance + portfolio.totalEvaluationAmount} />
        <AssetSummaryCard title="수익률" value={portfolio.totalProfitRate} isPercentage />
        <AssetSummaryCard title="보유 현금" value={portfolio.cashBalance} />
      </div>
      <div className="dashboard-page__lists">
        <DashboardStockList title="보유 종목" stocks={ownedStocksWithLivePrice} type="owned" />
        <DashboardStockList title="관심 종목" stocks={watchlistWithLivePrice} type="watch" />
      </div>
      <div className="dashboard-page__transactions">
        <RecentTransactions />
      </div>
    </div>
  );
};

export default DashboardPage;
