import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { fetchMails } from '@/api/user';
import Mailbox from '@/components/mypage/Mailbox';
import MyPageHeader from '@/components/mypage/MyPageHeader';
import MyPageTabs from '@/components/mypage/MyPageTabs';
import Portfolio from '@/components/mypage/Portfolio';
import Settings from '@/components/mypage/Settings';
import TransactionHistory from '@/components/mypage/TransactionHistory';
import useModal from '@/hooks/useModal';

const MyPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { openAlert } = useModal();
  const [unreadCount, setUnreadCount] = useState(0);

  const activeTab = searchParams.get('tab') || 'portfolio';

  const setActiveTab = (tabId) => {
    setSearchParams({ tab: tabId });
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      openAlert('로그인이 필요합니다.', () => {
        navigate('/login');
      });
    }
  }, [navigate, openAlert]);

  useEffect(() => {
    const getUnreadCount = async () => {
      try {
        const mailData = await fetchMails();
        const count = mailData.content.filter((mail) => mail.unread).length;
        setUnreadCount(count);
      } catch (error) {
        console.error('Failed to fetch mail count', error);
      }
    };
    getUnreadCount();
  }, []);

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
        return <Mailbox setUnreadCount={setUnreadCount} />;
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
