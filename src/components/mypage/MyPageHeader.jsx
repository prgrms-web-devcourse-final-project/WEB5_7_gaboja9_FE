import classNames from 'classnames';
import { useAtom, useSetAtom } from 'jotai';

import { chargeCash } from '@/api/user';
import useModal from '@/hooks/useModal';
import { loadingAtom } from '@/store/atoms';
import { memberInfoAtom } from '@/store/user';

const MyPageHeader = () => {
  const [memberInfo] = useAtom(memberInfoAtom);
  const { openPrompt, openAlert } = useModal();
  const setIsLoading = useSetAtom(loadingAtom);

  const nickname = memberInfo.nickname;
  const profileImage = memberInfo.profileImage;
  const tradeCount = memberInfo.tradeCnt;
  const daysActive = memberInfo.period;
  const rank = memberInfo.ranking;
  const totalAssets = memberInfo.totalCashBalance || 0;
  const totalProfitRate = memberInfo.totalProfitRate;

  const handlePopupClose = (popup) => {
    const checkInterval = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkInterval);
        setIsLoading(false);
        window.location.reload();
      }
    }, 1000);
  };

  const handleCharge = () => {
    openPrompt(
      '충전할 금액을 입력해주세요.',
      async (amount) => {
        const chargeAmount = Number(amount);
        if (isNaN(chargeAmount) || chargeAmount <= 0) {
          openAlert('올바른 금액을 입력해주세요.');
          return;
        }

        setIsLoading(true);
        try {
          const response = await chargeCash({ chargeAmount });
          if (response.success) {
            const popup = window.open(response.data.next_redirect_pc_url, 'kakaopay-popup', 'width=800,height=600');
            if (!popup) {
              openAlert('팝업이 차단되었습니다. 팝업 차단을 해제하고 다시 시도해주세요.');
              setIsLoading(false);
            } else {
              handlePopupClose(popup);
            }
          } else {
            throw new Error(response.message || '결제 준비에 실패했습니다.');
          }
        } catch (error) {
          console.error('충전 준비 실패:', error);
          openAlert(error.message || '충전 중 오류가 발생했습니다.');
          setIsLoading(false);
        }
      },
      () => {},
    );
  };

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
              positive: totalProfitRate > 0,
              negative: totalProfitRate < 0,
            })}
          >
            {totalProfitRate >= 0 ? '+' : ''}
            {totalProfitRate.toFixed(2)}%
          </span>
          <span className="stat-label">수익률</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <div className="asset-display">
            <span className="stat-value">{totalAssets.toLocaleString()}원</span>
            <button className="charge-btn" onClick={handleCharge}>
              충전
            </button>
          </div>
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
