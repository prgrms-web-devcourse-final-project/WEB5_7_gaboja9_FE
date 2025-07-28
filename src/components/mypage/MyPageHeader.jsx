import classNames from 'classnames';
import { useAtom } from 'jotai';

import { memberInfoAtom } from '@/store/user';

const MyPageHeader = () => {
  const [memberInfo] = useAtom(memberInfoAtom);

  const nickname = memberInfo.nickname;
  const profileImage = memberInfo.profileImage;
  const tradeCount = memberInfo.tradeCnt;
  const daysActive = memberInfo.period;
  const rank = memberInfo.ranking;
  const totalAssets = memberInfo.totalEvaluationAmount || 0;
  const initialAsset = memberInfo.totalEvaluationAmount - memberInfo.totalProfit;

  // 총 수익률 계산
  const returnRate = initialAsset > 0 ? ((totalAssets - initialAsset) / initialAsset) * 100 : 0;

  return (
    <div className="mypage-header">
      <div className="header-left">
        <div className="user-avatar-large">{profileImage && <img src={profileImage} alt="User Avatar" />}</div>
        <div className="user-nickname-large">{nickname}</div>
      </div>
      <div className="header-right">
        <div className="stat-item">
          <span
            className={classNames('stat-value', {
              positive: returnRate > 0,
              negative: returnRate < 0,
            })}
          >
            {returnRate >= 0 ? '+' : ''}
            {returnRate.toFixed(2)}%
          </span>
          <span className="stat-label">수익률</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-value">{totalAssets.toLocaleString()}원</span>
          <span className="stat-label">총 자산</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-value">{tradeCount}회</span>
          <span className="stat-label">총 거래 횟수</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-value">{rank}등</span>
          <span className="stat-label">전체 랭킹</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-value">{daysActive}일</span>
          <span className="stat-label">활동 기간</span>
        </div>
      </div>
    </div>
  );
};

export default MyPageHeader;
