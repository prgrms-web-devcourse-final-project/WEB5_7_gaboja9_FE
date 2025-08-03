import classNames from 'classnames';

const MailItem = ({ mail, isExpanded, onToggle }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'system':
        return '📢'; // 공지
      case 'warning':
        return '⚠️'; // 경고
      case 'trade':
        return '📈'; // 거래
      case 'info':
        return 'ℹ️'; // 정보
      default:
        return '✉️';
    }
  };

  return (
    <div className={classNames('mail-item', { unread: mail.unread })}>
      <div className="mail-summary" onClick={onToggle}>
        <div className="summary-left">
          <span className="icon">{getIcon(mail.type)}</span>
          <div className="mail-details">
            <span className="title">{mail.subject}</span>
          </div>
        </div>
        <div className="summary-right">
          {mail.unread && <div className="unread-dot" />}
          <span className="chevron">{isExpanded ? '▲' : '▼'}</span>
        </div>
      </div>
      <div className={classNames('mail-content', { expanded: isExpanded })}>
        <div className="content-inner">
          <p>{mail.content}</p>
        </div>
      </div>
    </div>
  );
};

export default MailItem;
