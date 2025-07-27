import classNames from 'classnames';
import React from 'react';

const RankingTabs = ({ tabs, selectedTab, onTabChange }) => {
  return (
    <div className="ranking-controls">
      <div className="ranking-tabs">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={classNames('tab-item', { active: selectedTab === tab.id })}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RankingTabs;
