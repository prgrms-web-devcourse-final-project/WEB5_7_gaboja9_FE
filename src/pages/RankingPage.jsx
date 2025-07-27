import React, { useState } from 'react';

import RankingSummaryCards from '@/components/ranking/RankingSummaryCards';
import RankingTable from '@/components/ranking/RankingTable';
import RankingTabs from '@/components/ranking/RankingTabs';

const RankingPage = () => {
  const [selectedRankingTab, setSelectedRankingTab] = useState('returnRate');
  const [visibleUsersCount, setVisibleUsersCount] = useState(10);
  const myUserId = 12;

  const allRankingData = {
    returnRate: [
      {
        id: 1,
        rank: 1,
        name: '김철수',
        value: 25.43,
        initialCapital: 10000000,
        tradeCount: 120,
        currentAsset: 12543000,
        returnRate: 25.43,
        totalTradeValue: 500000000,
      },
      {
        id: 2,
        rank: 2,
        name: '이영희',
        value: 18.76,
        initialCapital: 10000000,
        tradeCount: 110,
        currentAsset: 11876000,
        returnRate: 18.76,
        totalTradeValue: 450000000,
      },
      {
        id: 3,
        rank: 3,
        name: '박민수',
        value: 12.1,
        initialCapital: 10000000,
        tradeCount: 90,
        currentAsset: 11210000,
        returnRate: 12.1,
        totalTradeValue: 400000000,
      },
      {
        id: 4,
        rank: 4,
        name: '최지우',
        value: 5.98,
        initialCapital: 10000000,
        tradeCount: 80,
        currentAsset: 10598000,
        returnRate: 5.98,
        totalTradeValue: 350000000,
      },
      {
        id: 5,
        rank: 5,
        name: '정대현',
        value: 1.25,
        initialCapital: 10000000,
        tradeCount: 75,
        currentAsset: 10125000,
        returnRate: 1.25,
        totalTradeValue: 300000000,
      },
      {
        id: 6,
        rank: 6,
        name: '한아름',
        value: -0.5,
        initialCapital: 10000000,
        tradeCount: 60,
        currentAsset: 9950000,
        returnRate: -0.5,
        totalTradeValue: 250000000,
      },
      {
        id: 7,
        rank: 7,
        name: '강동원',
        value: -3.8,
        initialCapital: 10000000,
        tradeCount: 55,
        currentAsset: 9620000,
        returnRate: -3.8,
        totalTradeValue: 200000000,
      },
      {
        id: 8,
        rank: 8,
        name: '윤아영',
        value: -7.15,
        initialCapital: 10000000,
        tradeCount: 50,
        currentAsset: 9285000,
        returnRate: -7.15,
        totalTradeValue: 150000000,
      },
      {
        id: 9,
        rank: 9,
        name: '서준호',
        value: -10.0,
        initialCapital: 10000000,
        tradeCount: 45,
        currentAsset: 9000000,
        returnRate: -10.0,
        totalTradeValue: 100000000,
      },
      {
        id: 10,
        rank: 10,
        name: '오세훈',
        value: -15.22,
        initialCapital: 10000000,
        tradeCount: 40,
        currentAsset: 8478000,
        returnRate: -15.22,
        totalTradeValue: 90000000,
      },
      {
        id: 11,
        rank: 11,
        name: '유재석',
        value: 2.1,
        initialCapital: 10000000,
        tradeCount: 35,
        currentAsset: 10210000,
        returnRate: 2.1,
        totalTradeValue: 80000000,
      },
      {
        id: 12,
        rank: 12,
        name: '박명수',
        value: -4.5,
        initialCapital: 10000000,
        tradeCount: 30,
        currentAsset: 9550000,
        returnRate: -4.5,
        totalTradeValue: 70000000,
      },
      {
        id: 13,
        rank: 13,
        name: '노홍철',
        value: 8.9,
        initialCapital: 10000000,
        tradeCount: 25,
        currentAsset: 10890000,
        returnRate: 8.9,
        totalTradeValue: 60000000,
      },
      {
        id: 14,
        rank: 14,
        name: '정준하',
        value: 0.5,
        initialCapital: 10000000,
        tradeCount: 20,
        currentAsset: 10050000,
        returnRate: 0.5,
        totalTradeValue: 50000000,
      },
      {
        id: 15,
        rank: 15,
        name: '하하',
        value: -1.2,
        initialCapital: 10000000,
        tradeCount: 15,
        currentAsset: 9880000,
        returnRate: -1.2,
        totalTradeValue: 40000000,
      },
    ],
    asset: [
      {
        id: 1,
        rank: 1,
        name: '김철수',
        value: 150000000,
        initialCapital: 10000000,
        tradeCount: 120,
        currentAsset: 150000000,
        returnRate: 25.43,
        totalTradeValue: 500000000,
      },
      {
        id: 2,
        rank: 2,
        name: '이영희',
        value: 120000000,
        initialCapital: 10000000,
        tradeCount: 110,
        currentAsset: 120000000,
        returnRate: 18.76,
        totalTradeValue: 450000000,
      },
      {
        id: 3,
        rank: 3,
        name: '박민수',
        value: 100000000,
        initialCapital: 10000000,
        tradeCount: 90,
        currentAsset: 100000000,
        returnRate: 12.1,
        totalTradeValue: 400000000,
      },
      {
        id: 4,
        rank: 4,
        name: '최지우',
        value: 80000000,
        initialCapital: 10000000,
        tradeCount: 80,
        currentAsset: 80000000,
        returnRate: 5.98,
        totalTradeValue: 350000000,
      },
      {
        id: 5,
        rank: 5,
        name: '정대현',
        value: 60000000,
        initialCapital: 10000000,
        tradeCount: 75,
        currentAsset: 60000000,
        returnRate: 1.25,
        totalTradeValue: 300000000,
      },
      {
        id: 6,
        rank: 6,
        name: '한아름',
        value: 50000000,
        initialCapital: 10000000,
        tradeCount: 60,
        currentAsset: 50000000,
        returnRate: -0.5,
        totalTradeValue: 250000000,
      },
      {
        id: 7,
        rank: 7,
        name: '강동원',
        value: 45000000,
        initialCapital: 10000000,
        tradeCount: 55,
        currentAsset: 45000000,
        returnRate: -3.8,
        totalTradeValue: 200000000,
      },
      {
        id: 8,
        rank: 8,
        name: '윤아영',
        value: 40000000,
        initialCapital: 10000000,
        tradeCount: 50,
        currentAsset: 40000000,
        returnRate: -7.15,
        totalTradeValue: 150000000,
      },
      {
        id: 9,
        rank: 9,
        name: '서준호',
        value: 35000000,
        initialCapital: 10000000,
        tradeCount: 45,
        currentAsset: 35000000,
        returnRate: -10.0,
        totalTradeValue: 100000000,
      },
      {
        id: 10,
        rank: 10,
        name: '오세훈',
        value: 30000000,
        initialCapital: 10000000,
        tradeCount: 40,
        currentAsset: 30000000,
        returnRate: -15.22,
        totalTradeValue: 90000000,
      },
      {
        id: 11,
        rank: 11,
        name: '유재석',
        value: 25000000,
        initialCapital: 10000000,
        tradeCount: 35,
        currentAsset: 25000000,
        returnRate: 2.1,
        totalTradeValue: 80000000,
      },
      {
        id: 12,
        rank: 12,
        name: '박명수',
        value: 20000000,
        initialCapital: 10000000,
        tradeCount: 30,
        currentAsset: 20000000,
        returnRate: -4.5,
        totalTradeValue: 70000000,
      },
    ],
    volume: [
      {
        id: 1,
        rank: 1,
        name: '김철수',
        value: 500000000,
        initialCapital: 10000000,
        tradeCount: 120,
        currentAsset: 12543000,
        returnRate: 25.43,
        totalTradeValue: 500000000,
      },
      {
        id: 2,
        rank: 2,
        name: '이영희',
        value: 450000000,
        initialCapital: 10000000,
        tradeCount: 110,
        currentAsset: 11876000,
        returnRate: 18.76,
        totalTradeValue: 450000000,
      },
      {
        id: 3,
        rank: 3,
        name: '박민수',
        value: 400000000,
        initialCapital: 10000000,
        tradeCount: 90,
        currentAsset: 11210000,
        returnRate: 12.1,
        totalTradeValue: 400000000,
      },
      {
        id: 4,
        rank: 4,
        name: '최지우',
        value: 350000000,
        initialCapital: 10000000,
        tradeCount: 80,
        currentAsset: 10598000,
        returnRate: 5.98,
        totalTradeValue: 350000000,
      },
      {
        id: 5,
        rank: 5,
        name: '정대현',
        value: 300000000,
        initialCapital: 10000000,
        tradeCount: 75,
        currentAsset: 10125000,
        returnRate: 1.25,
        totalTradeValue: 300000000,
      },
      {
        id: 6,
        rank: 6,
        name: '한아름',
        value: 250000000,
        initialCapital: 10000000,
        tradeCount: 60,
        currentAsset: 9950000,
        returnRate: -0.5,
        totalTradeValue: 250000000,
      },
    ],
    bankruptcy: [
      {
        id: 1,
        rank: 1,
        name: '김철수',
        value: 3,
        initialCapital: 10000000,
        tradeCount: 120,
        currentAsset: 500000,
        returnRate: 25.43,
        totalTradeValue: 500000000,
      },
      {
        id: 2,
        rank: 2,
        name: '이영희',
        value: 2,
        initialCapital: 10000000,
        tradeCount: 110,
        currentAsset: 1000000,
        returnRate: 18.76,
        totalTradeValue: 450000000,
      },
      {
        id: 3,
        rank: 3,
        name: '박민수',
        value: 2,
        initialCapital: 10000000,
        tradeCount: 90,
        currentAsset: 2000000,
        returnRate: 12.1,
        totalTradeValue: 400000000,
      },
      {
        id: 4,
        rank: 4,
        name: '최지우',
        value: 1,
        initialCapital: 10000000,
        tradeCount: 80,
        currentAsset: 3000000,
        returnRate: 5.98,
        totalTradeValue: 350000000,
      },
      {
        id: 5,
        rank: 5,
        name: '정대현',
        value: 1,
        initialCapital: 10000000,
        tradeCount: 75,
        currentAsset: 4000000,
        returnRate: 1.25,
        totalTradeValue: 300000000,
      },
    ],
  };

  const currentRankingData = allRankingData[selectedRankingTab];

  const myRankData = currentRankingData.find((user) => user.id === myUserId);

  const usersToDisplay = currentRankingData.slice(0, visibleUsersCount).map((user) => ({
    ...user,
    isMyRank: user.id === myUserId,
  }));

  // "더 보기" 버튼 표시 여부
  const hasMoreUsers = visibleUsersCount < currentRankingData.length;

  // 내 순위가 현재 보이는 목록에 있는지 확인
  const isMyRankAlreadyDisplayed = usersToDisplay.some((user) => user.id === myUserId);

  const rankingTabs = [
    { id: 'returnRate', label: '수익률 랭킹' },
    { id: 'asset', label: '자산 랭킹' },
    { id: 'volume', label: '거래량 랭킹' },
    { id: 'bankruptcy', label: '파산 순위' },
  ];

  const handleTabChange = (tabId) => {
    setSelectedRankingTab(tabId);
    setVisibleUsersCount(10); // 탭 변경 시 다시 10개로 초기화
  };

  const handleLoadMore = () => {
    setVisibleUsersCount((prev) => prev + 10);
  };

  return (
    <div className="ranking-page">
      <div className="ranking-page__header">
        <h1>랭킹</h1>
      </div>

      <RankingSummaryCards />

      <RankingTabs tabs={rankingTabs} selectedTab={selectedRankingTab} onTabChange={handleTabChange} />

      <RankingTable
        displayedData={usersToDisplay}
        myRankData={myRankData}
        selectedRankingTab={selectedRankingTab}
        onLoadMore={handleLoadMore}
        hasMore={hasMoreUsers}
      />
    </div>
  );
};

export default RankingPage;
