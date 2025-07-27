import { useState } from 'react';

import Mailbox from '@/components/mypage/Mailbox';
import MyPageHeader from '@/components/mypage/MyPageHeader';
import MyPageTabs from '@/components/mypage/MyPageTabs';
import Portfolio from '@/components/mypage/Portfolio';
import TransactionHistory from '@/components/mypage/TransactionHistory';
import { MOCK_MAIL_DATA } from '@/constants/mockData';
import '@/styles/mypage.scss';

const MyPage = () => {
  const [activeTab, setActiveTab] = useState('notifications');
  const unreadCount = MOCK_MAIL_DATA.filter((n) => !n.isRead).length;

  const tabs = [
    { id: 'portfolio', label: '포트폴리오' },
    { id: 'history', label: '거래 내역' },
    { id: 'notifications', label: '알림', count: unreadCount },
    { id: 'settings', label: '설정' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'portfolio':
        return <Portfolio />;
      case 'history':
        return <TransactionHistory />;
      case 'notifications':
        return <Mailbox />;
      // TODO: Add cases for other tabs
      default:
        return <Portfolio />;
    }
  };

  return (
    <div className="mypage-container">
      <MyPageHeader />

      <div className="mypage-body">
        <aside className="mypage-sidebar">
          <MyPageTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        </aside>

        <section className="mypage-content">{renderContent()}</section>
      </div>
    </div>
  );
};

export default MyPage;
