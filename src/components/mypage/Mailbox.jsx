import classNames from 'classnames';
import { useMemo, useState } from 'react';

import MailItem from '@/components/mypage/MailItem';
import { MOCK_MAIL_DATA } from '@/constants/mockData';

const Mailbox = () => {
  const [mails, setMails] = useState(MOCK_MAIL_DATA);
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'read'
  const [expandedId, setExpandedId] = useState(null);

  const filteredMails = useMemo(() => {
    switch (filter) {
      case 'unread':
        return mails.filter((m) => !m.isRead);
      case 'read':
        return mails.filter((m) => m.isRead);
      default:
        return mails;
    }
  }, [mails, filter]);

  const handleToggle = (id) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
    // 메일을 열면 '읽음' 상태로 변경
    setMails((prev) => prev.map((m) => (m.id === id ? { ...m, isRead: true } : m)));
  };

  return (
    <div className="mailbox-section">
      <div className="filter-bar">
        <h3>알림</h3>
        <div className="filter-group">
          <button className={classNames({ active: filter === 'all' })} onClick={() => setFilter('all')}>
            전체
          </button>
          <button className={classNames({ active: filter === 'unread' })} onClick={() => setFilter('unread')}>
            안읽은 메일
          </button>
          <button className={classNames({ active: filter === 'read' })} onClick={() => setFilter('read')}>
            읽은 메일
          </button>
        </div>
      </div>

      <div className="mail-list">
        {filteredMails.map((mail) => (
          <MailItem
            key={mail.id}
            mail={mail}
            isExpanded={expandedId === mail.id}
            onToggle={() => handleToggle(mail.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Mailbox;
