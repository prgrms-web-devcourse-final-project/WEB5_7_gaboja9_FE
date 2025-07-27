import classNames from 'classnames';
import React from 'react';

const RankingUserCell = ({ user, selectedRankingTab }) => {
  // 자산 랭킹, 거래량 랭킹: 닉네임, 수익률 | 총 거래 횟수
  const returnRate =
    user.returnRate !== undefined ? `${user.returnRate >= 0 ? '+' : ''}${user.returnRate.toFixed(2)}%` : 'N/A';

  const getSubInfo = () => {
    switch (selectedRankingTab) {
      case 'returnRate':
        // 수익률 랭킹: 닉네임, 시작자금
        return `시작자금: ${user.initialCapital.toLocaleString()}원`;
      case 'asset':
      case 'volume':
        return `수익률: ${returnRate} | 거래횟수: ${user.tradeCount}회`;
      case 'bankruptcy':
        // 파산 순위: 닉네임, 현재 자산 | 총 거래 횟수
        return `현재 자산: ${user.currentAsset.toLocaleString()}원 | 거래횟수: ${user.tradeCount}회`;
      default:
        return '';
    }
  };

  return (
    <div className="ranking-user-cell">
      <div
        className={classNames('rank-circle', {
          'rank-1': user.rank === 1,
          'rank-2': user.rank === 2,
          'rank-3': user.rank === 3,
        })}
      >
        {user.rank}
      </div>
      <div className="user-details">
        <span className="user-nickname">{user.name}</span>
        <span className="user-sub-info">{getSubInfo()}</span>
      </div>
    </div>
  );
};

export default RankingUserCell;
