import React, { useEffect, useState } from 'react';

import { fetchPasswordReset } from '@/api/auth';
import { fetchNotificationSettings, updateNotificationSettings } from '@/api/notification';
import { applyForBankruptcy } from '@/api/user';
import useModal from '@/hooks/useModal';

const Settings = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { openAlert, openConfirm } = useModal();
  const [notifications, setNotifications] = useState({
    market: true,
    time: true,
  });

  useEffect(() => {
    const fetchNotification = async () => {
      const result = await fetchNotificationSettings();

      setNotifications({
        market: result.marketNotificationEnabled,
        time: result.tradeNotificationEnabled,
      });
    };

    fetchNotification();
  }, []);

  const handleToggle = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePasswordChange = () => {
    if (!currentPassword || !newPassword || newPassword !== confirmPassword) {
      openAlert('비밀번호 변경에 실패했습니다. 입력값을 확인해주세요.');
      return;
    }

    openConfirm(
      '비밀번호를 변경하시겠습니까?',
      () => {
        fetchPasswordReset({
          presentPassword: currentPassword,
          newPassword,
          passwordConfirm: confirmPassword,
        })
          .then(() => {
            openAlert('비밀번호가 변경되었습니다.', () => {
              setCurrentPassword('');
              setNewPassword('');
              setConfirmPassword('');
            });
          })
          .catch((error) => {
            console.error('비밀번호 변경 실패:', error);
            openAlert('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
          });
      },
      () => {},
    );
  };

  const handleSaveSettings = () => {
    openAlert('알림 설정이 저장되었습니다.', async () => {
      try {
        await updateNotificationSettings({
          marketNotificationEnabled: notifications.market,
          tradeNotificationEnabled: notifications.time,
        });
      } catch (error) {
        console.error('알림 설정 저장 실패:', error);
        openAlert('알림 설정 저장에 실패했습니다. 다시 시도해주세요.');
      }
    });
  };

  const handleBankruptcy = () => {
    openConfirm(
      '정말로 파산 신청을 하시겠습니까?\n모든 자산이 초기화되며, 기본 자금이 다시 지급됩니다.',
      async () => {
        try {
          await applyForBankruptcy();
          openAlert('파산 신청이 처리되었습니다. 재로그인 후 자산을 확인해주세요.');
        } catch (error) {
          console.error('파산 신청 실패:', error);
          openAlert('파산 신청에 실패했습니다. 관리자에게 문의해주세요.');
        }
      },
      () => {},
    );
  };

  const handleWithdrawal = () => {
    openConfirm(
      '정말로 회원탈퇴를 하시겠습니까?\n모든 데이터가 삭제되며 복구할 수 없습니다.',
      () => {
        openAlert('회원탈퇴가 처리되었습니다.');
      },
      () => {},
    );
  };

  return (
    <div className="settings-section">
      <div className="setting-card">
        <h3 className="card-title">비밀번호 변경</h3>
        <div className="form-group-mypage">
          <label htmlFor="current-password">현재 비밀번호</label>
          <input
            id="current-password"
            type="password"
            placeholder="현재 비밀번호를 입력하세요"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div className="form-group-mypage">
          <label htmlFor="new-password">새 비밀번호</label>

          <input
            id="new-password"
            type="password"
            placeholder="새 비밀번호를 입력하세요"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="form-group-mypage">
          <label htmlFor="confirm-password">새 비밀번호 확인</label>
          <input
            id="confirm-password"
            type="password"
            placeholder="새 비밀번호를 다시 입력하세요"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="card-actions">
          <button
            className="submit-btn"
            onClick={handlePasswordChange}
            disabled={!currentPassword || !newPassword || newPassword !== confirmPassword}
          >
            비밀번호 변경
          </button>
        </div>
      </div>

      <div className="setting-card">
        <h3 className="card-title">알림 설정</h3>
        <div className="notification-setting-item">
          <div>
            <div className="setting-label">매매 알림</div>
            <div className="setting-description">매매 거래 시 알림을 받습니다</div>
          </div>
          <label className="switch">
            <input type="checkbox" checked={notifications.market} onChange={() => handleToggle('market')} />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="notification-setting-item">
          <div>
            <div className="setting-label">시장 시간 알림</div>
            <div className="setting-description">장 시작 및 마감 시간을 알림 받습니다</div>
          </div>
          <label className="switch">
            <input type="checkbox" checked={notifications.time} onChange={() => handleToggle('time')} />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="card-actions">
          <button className="submit-btn" onClick={handleSaveSettings}>
            알림 설정 저장
          </button>
        </div>
      </div>

      <div className="setting-card bankruptcy-card">
        <h3 className="card-title">파산 신청</h3>
        <p className="bankruptcy-description">
          파산 신청 시 보유 주식과 현금이 초기화되고, 기본 자금이 다시 지급됩니다.
        </p>
        <div className="card-actions">
          <button className="submit-btn warning" onClick={handleBankruptcy}>
            파산 신청
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
