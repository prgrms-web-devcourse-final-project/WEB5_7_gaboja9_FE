import ReactECharts from 'echarts-for-react';

const AssetCompositionChart = ({ stocks, cash }) => {
  const chartData = stocks.map((stock) => ({
    name: stock.name,
    value: stock.currentPrice * stock.quantity,
  }));

  chartData.push({
    name: '현금',
    value: cash,
  });

  const legendData = chartData.map((item) => item.name);
  const chartColors = ['#23C9D3', '#48BB78', '#F56565', '#E9D57C', '#A0AEC0', '#7F9CF5'];

  const getChartOption = () => ({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}원 ({d}%)',
      backgroundColor: 'rgba(25, 38, 59, 0.9)',
      borderColor: '#485c7b',
      textStyle: { color: '#E2E8F0' },
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      bottom: '5%',
      data: legendData,
      textStyle: {
        color: '#A0AEC0',
      },
      icon: 'circle',
    },
    series: [
      {
        name: '자산 구성',
        type: 'pie',
        radius: ['50%', '70%'],
        center: ['50%', '35%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '20',
            fontWeight: 'bold',
            formatter: '{b}\n{d}%',
          },
        },
        labelLine: {
          show: false,
        },
        data: chartData,
        color: chartColors,
      },
    ],
  });

  return (
    <div style={{ width: '100%', height: '350px', overflow: 'visible' }}>
      <ReactECharts option={getChartOption()} style={{ height: '100%' }} />
    </div>
  );
};

export default AssetCompositionChart;
