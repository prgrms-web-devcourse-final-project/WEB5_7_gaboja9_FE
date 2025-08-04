import classNames from 'classnames';
import React from 'react';

const RankingUserCell = ({ user, selectedRankingTab }) => {
  const returnRate =
    user.returnRate !== undefined ? `${user.returnRate >= 0 ? '+' : ''}${user.returnRate.toFixed(2)}%` : 'N/A';

  const getSubInfo = () => {
    switch (selectedRankingTab) {
      case 'returnRate':
        return `시작자금: ${user.totalInvestment?.toLocaleString()}원`;
      case 'asset':
      case 'volume':
        return `수익률: ${returnRate}`;
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
