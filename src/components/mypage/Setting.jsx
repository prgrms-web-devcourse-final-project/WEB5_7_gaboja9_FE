import React, { useState } from 'react';

import useModal from '@/hooks/useModal';

const Settings = () => {
  const { openAlert, openConfirm } = useModal();
  const [notifications, setNotifications] = useState({
    system: true,
    marketing: false,
  });

  const handleToggle = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleNicknameChange = () => {
    openAlert('닉네임이 변경되었습니다.');
  };

  const handlePasswordChange = () => {
    openConfirm(
      '비밀번호를 변경하시겠습니까?',
      () => {
        openAlert('비밀번호가 변경되었습니다.');
      },
      () => {},
    );
  };

  const handleSaveSettings = () => {
    openAlert('알림 설정이 저장되었습니다.');
  };

  const handleWithdrawal = () => {
    openConfirm(
      '정말로 회원탈퇴를 하시겠습니까?\n모든 데이터가 삭제되며 복구할 수 없습니다.',
      () => {
        openAlert('회원탈퇴가 처리되었습니다.');
        // TODO: Add logic for actual withdrawal and redirect
      },
      () => {},
    );
  };

  return (
    <div className="settings-section">
      <div className="setting-card">
        <h3 className="card-title">기본 정보</h3>
        <div className="form-group">
          <label htmlFor="nickname">닉네임</label>
          <div className="input-with-btn">
            <input id="nickname" type="text" defaultValue="김투자" />
            <button className="inline-btn" onClick={handleNicknameChange}>
              변경
            </button>
          </div>
        </div>
      </div>

      <div className="setting-card">
        <h3 className="card-title">비밀번호 변경</h3>
        <div className="form-group">
          <label htmlFor="current-password">현재 비밀번호</label>
          <input id="current-password" type="password" placeholder="현재 비밀번호를 입력하세요" />
        </div>
        <div className="form-group">
          <label htmlFor="new-password">새 비밀번호</label>
          <input id="new-password" type="password" placeholder="새 비밀번호를 입력하세요" />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">새 비밀번호 확인</label>
          <input id="confirm-password" type="password" placeholder="새 비밀번호를 다시 입력하세요" />
        </div>
        <div className="card-actions">
          <button className="submit-btn" onClick={handlePasswordChange}>
            비밀번호 변경
          </button>
        </div>
      </div>

      <div className="setting-card">
        <h3 className="card-title">알림 설정</h3>
        <div className="notification-setting-item">
          <div>
            <div className="setting-label">시스템 알림</div>
            <div className="setting-description">서비스 이용 관련 필수 안내</div>
          </div>
          <label className="switch">
            <input type="checkbox" checked={notifications.system} onChange={() => handleToggle('system')} />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="notification-setting-item">
          <div>
            <div className="setting-label">마케팅 정보 수신 동의</div>
            <div className="setting-description">이벤트 및 프로모션 안내</div>
          </div>
          <label className="switch">
            <input type="checkbox" checked={notifications.marketing} onChange={() => handleToggle('marketing')} />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="card-actions">
          <button className="submit-btn" onClick={handleSaveSettings}>
            알림 설정 저장
          </button>
        </div>
      </div>

      <div className="setting-card withdrawal-card">
        <h3 className="card-title">회원 탈퇴</h3>
        <p className="withdrawal-description">
          회원 탈퇴 시 모든 개인 정보와 투자 기록이 영구적으로 삭제되며, 복구할 수 없습니다.
        </p>
        <div className="card-actions">
          <button className="submit-btn danger" onClick={handleWithdrawal}>
            회원 탈퇴
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
