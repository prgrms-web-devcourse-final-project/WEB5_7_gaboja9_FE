import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Mailbox from '@/components/mypage/Mailbox';
import MyPageHeader from '@/components/mypage/MyPageHeader';
import MyPageTabs from '@/components/mypage/MyPageTabs';
import Portfolio from '@/components/mypage/Portfolio';
import Settings from '@/components/mypage/Settings';
import TransactionHistory from '@/components/mypage/TransactionHistory';
import { MOCK_MAIL_DATA } from '@/constants/mockData';
import useModal from '@/hooks/useModal';

const MyPage = () => {
  const [activeTab, setActiveTab] = useState('portfolio');

  const navigate = useNavigate();

  const { openAlert } = useModal();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      openAlert('로그인이 필요합니다.', () => {
        navigate('/login');
      });
    }
  }, []);

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
      case 'settings':
        return <Settings />;
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
