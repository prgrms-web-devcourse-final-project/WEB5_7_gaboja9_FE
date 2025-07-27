import classNames from 'classnames';

const MyPageTabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="mypage-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={classNames('tab-item', { active: activeTab === tab.id })}
          onClick={() => tab.id && setActiveTab(tab.id)}
        >
          <span>{tab.label}</span>
          {tab.count > 0 && <span className="notification-badge">{tab.count}</span>}
        </button>
      ))}
    </div>
  );
};

export default MyPageTabs;
