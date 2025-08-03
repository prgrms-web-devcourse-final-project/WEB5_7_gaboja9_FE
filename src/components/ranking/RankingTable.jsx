import classNames from 'classnames';
import React from 'react';

import RankingUserCell from './RankingUserCell';

const RankingTable = ({ displayedData, myRankData, selectedRankingTab, onLoadMore, hasMore, isLoading }) => {
  const formatValue = (tabId, value) => {
    switch (tabId) {
      case 'returnRate':
        return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
      case 'asset':
      case 'volume':
        return `${value.toLocaleString()}원`;
      case 'bankruptcy':
        return `${value}회`;
      default:
        return value;
    }
  };

  const getSecondaryValue = (tabId, user) => {
    switch (tabId) {
      case 'returnRate':
        return `투자액: ${user.totalInvestment.toLocaleString()}원`;
      case 'asset': {
        const profit = user.totalAsset - user.totalInvestment;
        return `${profit >= 0 ? '+' : ''}${profit.toLocaleString()}원`;
      }
      case 'volume':
        return `수익률: ${user.returnRate.toFixed(2)}%`;
      case 'bankruptcy':
        return `현재 자산: ${user.totalAsset.toLocaleString()}원`;
      default:
        return '';
    }
  };

  const isMyRankDisplayed = displayedData.some((user) => user.id === myRankData?.id);

  return (
    <div className="ranking-table-container">
      <table className="ranking-table">
        <tbody>
          {displayedData.map((user) => (
            <tr key={user.id} className={classNames({ 'my-rank-row': user.isMyRank })}>
              <td>
                <RankingUserCell user={user} selectedRankingTab={selectedRankingTab} />
              </td>
              <td
                className={classNames('value-column', {
                  positive: (selectedRankingTab === 'returnRate' || selectedRankingTab === 'volume') && user.value > 0,
                  negative: (selectedRankingTab === 'returnRate' || selectedRankingTab === 'volume') && user.value < 0,
                })}
              >
                <div>{formatValue(selectedRankingTab, user.value)}</div>
                <div style={{ fontSize: '0.875rem', color: '#a0aec0', marginTop: '0.25rem' }}>
                  {getSecondaryValue(selectedRankingTab, user)}
                </div>
              </td>
            </tr>
          ))}

          {hasMore && (
            <tr className="load-more-row">
              <td colSpan="2">
                <button className="load-more-button" onClick={onLoadMore} disabled={isLoading}>
                  {isLoading ? '로딩 중...' : '더 보기'}
                </button>
              </td>
            </tr>
          )}

          {myRankData && !isMyRankDisplayed && (
            <tr className="my-rank-row">
              <td>
                <RankingUserCell user={myRankData} selectedRankingTab={selectedRankingTab} />
              </td>
              <td
                className={classNames('value-column', {
                  positive:
                    (selectedRankingTab === 'returnRate' || selectedRankingTab === 'volume') && myRankData.value > 0,
                  negative:
                    (selectedRankingTab === 'returnRate' || selectedRankingTab === 'volume') && myRankData.value < 0,
                })}
              >
                <div>{formatValue(selectedRankingTab, myRankData.value)}</div>
                <div style={{ fontSize: '0.875rem', color: '#a0aec0', marginTop: '0.25rem' }}>
                  {getSecondaryValue(selectedRankingTab, myRankData)}
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RankingTable;
