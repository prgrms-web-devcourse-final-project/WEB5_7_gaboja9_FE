import { useAtomValue, useSetAtom } from 'jotai';
import React, { useState, useEffect, useCallback } from 'react';

import { fetchRanks } from '@/api/user';
import RankingSummaryCards from '@/components/ranking/RankingSummaryCards';
import RankingTable from '@/components/ranking/RankingTable';
import RankingTableSkeleton from '@/components/ranking/RankingTableSkeleton';
import RankingTabs from '@/components/ranking/RankingTabs';
import { loadingAtom } from '@/store/atoms';
import { memberInfoAtom } from '@/store/user';

const RANKING_TYPE_MAP = {
  returnRate: 'RETURN_RATE',
  asset: 'ASSET',
  volume: 'PROFIT',
  bankruptcy: 'BANKRUPTCY',
};

const ITEMS_PER_PAGE = 10;

const RankingPage = () => {
  const [selectedRankingTab, setSelectedRankingTab] = useState('returnRate');
  const [rankingData, setRankingData] = useState([]);
  const [myRankData, setMyRankData] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    hasNext: false,
  });
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const setIsLoading = useSetAtom(loadingAtom);

  const memberInfo = useAtomValue(memberInfoAtom);
  const myUserId = memberInfo?.memberId;

  const getValueKeyForTab = (tabId) => {
    switch (tabId) {
      case 'returnRate':
        return 'returnRate';
      case 'asset':
        return 'totalAsset';
      case 'volume':
        return 'totalProfit';
      case 'bankruptcy':
        return 'bankruptcyCount';
      default:
        return 'value';
    }
  };

  const loadRankingData = useCallback(
    async (page = 0, loadMore = false) => {
      if (!loadMore) {
        setIsInitialLoading(true);
      } else {
        setIsLoading(true);
      }

      try {
        const ranksType = RANKING_TYPE_MAP[selectedRankingTab];
        const data = await fetchRanks(ranksType, page, ITEMS_PER_PAGE);

        const processedData = data.rankers.map((user) => ({
          ...user,
          id: user.memberId,
          name: user.nickname,
          value: user[getValueKeyForTab(selectedRankingTab)],
          isMyRank: user.memberId === myUserId,
        }));

        setRankingData((prev) => (loadMore ? [...prev, ...processedData] : processedData));

        if (data.myRanking) {
          setMyRankData({
            ...data.myRanking,
            id: data.myRanking.memberId,
            name: data.myRanking.nickname,
            value: data.myRanking[getValueKeyForTab(selectedRankingTab)],
          });
        }
        setPagination(data.pagination);
      } catch (error) {
        console.error('Failed to fetch ranking data:', error);
      } finally {
        setIsInitialLoading(false);
        setIsLoading(false);
      }
    },
    [selectedRankingTab, myUserId, setIsLoading],
  );

  useEffect(() => {
    if (myUserId) {
      loadRankingData(0);
    }
  }, [selectedRankingTab, myUserId, loadRankingData]);

  const handleTabChange = (tabId) => {
    setSelectedRankingTab(tabId);
    setRankingData([]);
    setMyRankData(null);
    setPagination({ currentPage: 0, hasNext: false });
  };

  const handleLoadMore = () => {
    if (pagination.hasNext) {
      loadRankingData(pagination.currentPage + 1, true);
    }
  };

  const rankingTabs = [
    { id: 'returnRate', label: '수익률 랭킹' },
    { id: 'asset', label: '자산 랭킹' },
    { id: 'volume', label: '수익금 랭킹' },
    { id: 'bankruptcy', label: '파산 순위' },
  ];

  return (
    <div className="ranking-page">
      <div className="ranking-page__header">
        <h1>랭킹</h1>
      </div>
      <RankingSummaryCards />
      <RankingTabs tabs={rankingTabs} selectedTab={selectedRankingTab} onTabChange={handleTabChange} />
      {isInitialLoading ? (
        <RankingTableSkeleton />
      ) : (
        <RankingTable
          displayedData={rankingData}
          myRankData={myRankData}
          selectedRankingTab={selectedRankingTab}
          onLoadMore={handleLoadMore}
          hasMore={pagination.hasNext}
        />
      )}
    </div>
  );
};

export default RankingPage;
