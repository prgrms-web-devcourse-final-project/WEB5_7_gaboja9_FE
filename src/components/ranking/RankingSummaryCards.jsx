import React from 'react';

const RankingSummaryCards = () => {
  return (
    <div className="ranking-summary-cards">
      <div className="summary-card">
        <div className="card-title">총 참여자 수</div>
        <div className="card-value">23</div>
      </div>
      <div className="summary-card positive-rate">
        <div className="card-title">수익률 달성자 비율</div>
        <div className="card-value">+75.2%</div>
      </div>
      <div className="summary-card negative-rate">
        <div className="card-title">수익률 손실자 비율</div>
        <div className="card-value">-24.8%</div>
      </div>
      <div className="summary-card">
        <div className="card-title">파산 유저</div>
        <div className="card-value">5</div>
      </div>
    </div>
  );
};

export default RankingSummaryCards;
