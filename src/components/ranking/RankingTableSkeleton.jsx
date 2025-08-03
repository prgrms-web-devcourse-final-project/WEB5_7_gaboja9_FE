import React from 'react';

const RankingTableSkeleton = () => {
  const skeletonRows = Array.from({ length: 10 });

  return (
    <div className="ranking-table-container">
      <table className="ranking-table skeleton">
        <tbody>
          {skeletonRows.map((_, index) => (
            <tr key={index}>
              <td>
                <div className="ranking-user-cell">
                  <div className="rank-circle"></div>
                  <div className="user-details">
                    <span className="skeleton-line nickname"></span>
                    <span className="skeleton-line sub-info"></span>
                  </div>
                </div>
              </td>
              <td className="value-column">
                <span className="skeleton-line value"></span>
                <span className="skeleton-line secondary-value"></span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RankingTableSkeleton;
