import classNames from 'classnames';
import { useAtomValue } from 'jotai';

import { totalAssetsAtom, userAssetsAtom } from '@/store/atoms';

const MyPageHeader = () => {
  const userAssets = useAtomValue(userAssetsAtom);
  const totalAssets = useAtomValue(totalAssetsAtom);

  // 총 수익률 계산
  const returnRate =
    userAssets.initialAsset > 0 ? ((totalAssets - userAssets.initialAsset) / userAssets.initialAsset) * 100 : 0;

  // TODO: API 연동 필요한 목업 데이터
  const nickname = '김투자';
  const tradeCount = 67;
  const daysActive = 127;
  const rank = 23;

  return (
    <div className="mypage-header">
      <div className="header-left">
        <div className="user-avatar-large"></div>
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
          <span className="stat-label">총 거래</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-value">{daysActive}일</span>
          <span className="stat-label">활동 기간</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-value">{rank}등</span>
          <span className="stat-label">전체 랭킹</span>
        </div>
      </div>
    </div>
  );
};

export default MyPageHeader;
