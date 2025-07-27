import classNames from 'classnames';
import React from 'react';

import RankingUserCell from './RankingUserCell';

const RankingTable = ({ displayedData, myRankData, selectedRankingTab, onLoadMore, hasMore }) => {
  const formatValue = (tabId, value, initialValue = 0) => {
    switch (tabId) {
      case 'returnRate':
        // 수익률 랭킹: 위에는 수익률, 아래는 투자액
        return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
      case 'asset':
        // 자산 랭킹: 위에는 현재 자산, 아래는 +자산
        return `${value.toLocaleString()}원`;
      case 'volume':
        // 거래량 랭킹: 위에는 거래량, 아래는 총 거래량 금액
        return `${value.toLocaleString()}원`;
      case 'bankruptcy':
        // 파산 순위: 위에는 파산 횟수, 아래는 현재 자산
        return `${value}회`;
      default:
        return value;
    }
  };

  const getSecondaryValue = (tabId, user) => {
    const profit = user.value - user.initialCapital;

    switch (tabId) {
      case 'returnRate':
        // 수익률 랭킹의 오른쪽 보조값 (투자액)
        return `투자액: ${user.initialCapital.toLocaleString()}원`;
      case 'asset':
        // 자산 랭킹의 오른쪽 보조값 (+자산)
        return `${profit >= 0 ? '+' : ''}${profit.toLocaleString()}원`;
      case 'volume':
        // 거래량 랭킹의 오른쪽 보조값 (총 거래량 금액)
        return `총 거래량: ${user.totalTradeValue.toLocaleString()}원`;
      case 'bankruptcy':
        // 파산 순위의 오른쪽 보조값 (현재 자산)
        return `현재 자산: ${user.currentAsset.toLocaleString()}원`;
      default:
        return '';
    }
  };

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
                  positive: selectedRankingTab === 'returnRate' && user.value >= 0,
                  negative: selectedRankingTab === 'returnRate' && user.value < 0,
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
                <button className="load-more-button" onClick={onLoadMore}>
                  더 보기
                </button>
              </td>
            </tr>
          )}

          {/* 내 순위가 현재 보이는 목록에 없고, 더보기 할 데이터가 없을 때만 표시 */}
          {!hasMore && myRankData && !displayedData.some((user) => user.id === myRankData.id) && (
            <tr className="my-rank-row">
              <td>
                <RankingUserCell user={myRankData} selectedRankingTab={selectedRankingTab} />
              </td>
              <td
                className={classNames('value-column', {
                  positive: selectedRankingTab === 'returnRate' && myRankData.value >= 0,
                  negative: selectedRankingTab === 'returnRate' && myRankData.value < 0,
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
