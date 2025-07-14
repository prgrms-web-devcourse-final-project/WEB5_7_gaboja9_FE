import ReactECharts from 'echarts-for-react';
import { useEffect, useRef, useCallback } from 'react';

const processDataForECharts = (data) => {
  const dates = [];
  const ohlcData = [];

  data.forEach((item) => {
    dates.push(item.time);
    ohlcData.push([item.open, item.close, item.low, item.high]);
  });

  return { dates, ohlcData };
};

const calculateMA = (dayCount, ohlcData) => {
  const result = [];
  for (let i = 0, len = ohlcData.length; i < len; i++) {
    if (i < dayCount) {
      result.push('-');
      continue;
    }
    let sum = 0;
    for (let j = 0; j < dayCount; j++) {
      sum += ohlcData[i - j][1];
    }
    result.push(+(sum / dayCount).toFixed(2));
  }
  return result;
};

const StockChart = ({ data, timeframe }) => {
  const chartRef = useRef(null);
  const containerRef = useRef(null);

  const getChartOption = useCallback(() => {
    const { dates, ohlcData } = processDataForECharts(data);
    const ma5 = calculateMA(5, ohlcData);

    return {
      backgroundColor: 'transparent',
      animation: false,
      legend: {
        data: ['캔들스틱', '이동평균(5)'],
        top: 10,
        textStyle: { color: '#A0AEC0' },
      },
      grid: {
        left: '5px',
        right: '0px',
        bottom: '20px',
        top: '40px',
        containLabel: true,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'cross' },
        backgroundColor: 'rgba(25, 38, 59, 0.9)',
        borderColor: '#485c7b',
        textStyle: { color: '#E2E8F0' },
        formatter: (params) => {
          if (!params || params.length === 0 || !params[0].name) return '';
          const data = params[0];
          const date = new Date(data.name);
          const dateString = timeframe === 'minute5' ? date.toLocaleString('ko-KR') : date.toLocaleDateString('ko-KR');
          if (!Array.isArray(data.value) || data.value.length < 5) return '';
          return `
            <strong>${dateString}</strong><br/>
            시가: ${data.value[1].toLocaleString()}<br/>
            종가: ${data.value[2].toLocaleString()}<br/>
            저가: ${data.value[3].toLocaleString()}<br/>
            고가: ${data.value[4].toLocaleString()}
          `;
        },
      },
      xAxis: {
        type: 'category',
        data: dates,
        axisLine: { lineStyle: { color: '#485c7b' } },
        axisTick: { alignWithLabel: true },
        axisLabel: {
          hideOverlap: true,
          formatter: (value) => {
            if (timeframe === 'minute5') {
              const date = new Date(value);
              return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
            }
            return value.slice(5);
          },
        },
      },
      yAxis: {
        scale: true,
        axisLine: { lineStyle: { color: '#485c7b' } },
        splitLine: { lineStyle: { color: '#2D3748' } },
        axisLabel: {
          formatter: (value) => value.toLocaleString(),
        },
      },
      dataZoom: [{ type: 'inside', start: 50, end: 100 }],
      series: [
        {
          name: '캔들스틱',
          type: 'candlestick',
          data: ohlcData,
          itemStyle: {
            color: '#F56565',
            color0: '#23C9D3',
            borderColor: '#F56565',
            borderColor0: '#23C9D3',
          },
        },
        {
          name: '이동평균(5)',
          type: 'line',
          data: ma5,
          smooth: true,
          showSymbol: false,
          lineStyle: { opacity: 0.8, color: '#E9D57C' },
        },
      ],
    };
  }, [data, timeframe]);

  return (
    <div className="chart-container" ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <ReactECharts
        ref={chartRef}
        option={getChartOption()}
        lazyUpdate={true}
        style={{ width: '100%', height: '100%', minHeight: '450px' }}
      />
    </div>
  );
};

export default StockChart;
