import classNames from 'classnames';

const AssetSummaryCard = ({ title, value, isPercentage = false }) => {
  const isNegative = typeof value === 'number' && value < 0;
  const formattedValue = isPercentage ? `${value}%` : `₩ ${value.toLocaleString()}`;

  return (
    <div className="asset-summary-card">
      <h3 className="card-title">{title}</h3>
      <p className={classNames('card-value', { negative: isNegative, positive: !isPercentage && !isNegative })}>
        {formattedValue}
      </p>
    </div>
  );
};

export default AssetSummaryCard;
