import ReactECharts from 'echarts-for-react';
import { useCallback } from 'react';

const StockChart = ({ data, timeframe, onLoadMore }) => {
  const formatKST = (isoString, frame) => {
    const date = new Date(isoString);
    if (frame === 'minute') {
      return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false });
    }
    return date.toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' }).replace(/\./g, '').replace(' ', '-');
  };

  const processDataForECharts = useCallback((chartData) => {
    const dates = chartData.map((item) => item.time);
    const ohlcData = chartData.map((item) => [item.open, item.close, item.low, item.high]);
    return { dates, ohlcData };
  }, []);

  const calculateMA = useCallback((dayCount, ohlcData) => {
    const result = [];
    for (let i = 0, len = ohlcData.length; i < len; i++) {
      if (i < dayCount - 1) {
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
  }, []);

  const getChartOption = useCallback(() => {
    const { dates, ohlcData } = processDataForECharts(data);
    const ma5 = calculateMA(5, ohlcData);

    return {
      animation: false,
      legend: { data: ['캔들스틱', '이동평균(5)'], top: 10, textStyle: { color: '#A0AEC0' } },
      grid: { left: '5px', right: '0px', bottom: '20px', top: '40px', containLabel: true },
      tooltip: {
        trigger: 'axis',
        formatter: (params) => {
          const item = params[0];
          const date = new Date(item.name);
          const dateString = timeframe === 'minute' ? date.toLocaleString('ko-KR') : date.toLocaleDateString('ko-KR');
          const [_, open, close, low, high] = item.value;

          return `<strong>${dateString}</strong><br/>
                  시가: ${open.toLocaleString()}<br/>
                  종가: ${close.toLocaleString()}<br/>
                  저가: ${low.toLocaleString()}<br/>
                  고가: ${high.toLocaleString()}`;
        },
      },
      xAxis: {
        type: 'category',
        data: dates,
        axisLabel: { formatter: (value) => formatKST(value, timeframe) },
      },
      yAxis: { scale: true, axisLabel: { formatter: (value) => value.toLocaleString() } },
      dataZoom: [{ type: 'inside', start: 50, end: 100 }],
      series: [
        { name: '캔들스틱', type: 'candlestick', data: ohlcData },
        { name: '이동평균(5)', type: 'line', data: ma5, smooth: true, showSymbol: false },
      ],
    };
  }, [data, timeframe, processDataForECharts, calculateMA]);

  const onEvents = {
    datazoom: (params) => {
      if (params.batch[0].start === 0 && onLoadMore) {
        onLoadMore();
      }
    },
  };

  return (
    <div className="chart-container" style={{ width: '100%', height: '100%' }}>
      <ReactECharts
        option={getChartOption()}
        onEvents={onEvents}
        lazyUpdate={true}
        style={{ width: '100%', height: '100%', minHeight: '450px' }}
      />
    </div>
  );
};

export default StockChart;
