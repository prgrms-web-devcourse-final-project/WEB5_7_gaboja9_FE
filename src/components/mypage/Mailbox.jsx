import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';

import { fetchMails } from '@/api/user';
import MailItem from '@/components/mypage/MailItem';
import { MOCK_MAIL_DATA } from '@/constants/mockData';

const Mailbox = () => {
  const [mails, setMails] = useState([]);
  const [filter, setFilter] = useState('all');
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetchMail = async () => {
      try {
        const data = await fetchMails();
        const mailsWithId = data.content.map((mail, index) => ({
          ...mail,
          id: index + 1,
        }));

        setMails(mailsWithId || MOCK_MAIL_DATA);

        return;
      } catch (error) {
        console.error('메일 불러오기 실패:', error);
        return null;
      }
    };

    fetchMail();
  }, []);

  const filteredMails = useMemo(() => {
    switch (filter) {
      case 'unread':
        return mails.filter((m) => m.unread);
      case 'read':
        return mails.filter((m) => !m.unread);
      default:
        return mails;
    }
  }, [mails, filter]);

  const handleToggle = (id) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
    setMails((prev) => prev.map((m) => (m.id === id ? { ...m, unread: false } : m)));
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
        {filteredMails.map((mail, idx) => (
          <MailItem
            key={`mail-${idx}`}
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
