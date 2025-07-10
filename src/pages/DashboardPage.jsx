import { useAtomValue } from 'jotai';

import AssetSummaryCard from '@/components/dashboard/AssetSummaryCard';
import DashboardStockList from '@/components/dashboard/DashboardStockList';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import { MOCK_OWNED_STOCKS, MOCK_WATCHLIST } from '@/constants/mockData';
import { userAssetsAtom, totalAssetsAtom } from '@/store/atoms';

const DashboardPage = () => {
  const userAssets = useAtomValue(userAssetsAtom);
  const totalAssets = useAtomValue(totalAssetsAtom);

  return (
    <div className="dashboard-page">
      <div className="dashboard-page__summary">
        <AssetSummaryCard title="현재 자산" value={totalAssets} />
        <AssetSummaryCard title="수익률" value={userAssets.returnPercentage} isPercentage />
        <AssetSummaryCard title="보유 현금" value={userAssets.availableCash} />
      </div>
      <div className="dashboard-page__lists">
        <DashboardStockList title="보유 종목" stocks={MOCK_OWNED_STOCKS} type="owned" />
        <DashboardStockList title="관심 종목" stocks={MOCK_WATCHLIST} type="watch" />
      </div>
      <div className="dashboard-page__transactions">
        <RecentTransactions />
      </div>
    </div>
  );
};

export default DashboardPage;
