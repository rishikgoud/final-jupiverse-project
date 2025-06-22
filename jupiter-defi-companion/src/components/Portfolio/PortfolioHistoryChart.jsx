import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

const PortfolioHistoryChart = ({ history }) => {
  const chartContainerRef = useRef();
  const chartRef = useRef();
  const seriesRef = useRef();

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Create chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: '#0f172a' },
        textColor: '#94a3b8',
      },
      grid: {
        vertLines: { color: '#334155' },
        horzLines: { color: '#334155' },
      },
      priceScale: {
        autoScale: true,
        scaleMargins: { top: 0.3, bottom: 0.3 },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: true,
      },
    });
    chartRef.current = chart;

    // Add area series
    const series = chart.addAreaSeries({
      topColor: 'rgba(139, 92, 246, 0.4)',
      bottomColor: 'rgba(139, 92, 246, 0.0)',
      lineColor: '#8b5cf6',
      lineWidth: 2,
      crossHairMarkerVisible: true,
    });
    seriesRef.current = series;

    // Resize handler
    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef.current.clientWidth,
        height: 300,
      });
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (seriesRef.current) {
      const validHistory = Array.isArray(history) && history.length > 0
        ? history.map(d => ({
            time: Number(d.time) || Math.floor(Date.now() / 1000),
            value: Number(d.value) || 0,
          }))
        : [{
            time: Math.floor(Date.now() / 1000),
            value: 0,
          }];

      console.log("📊 Chart data applied:", validHistory);
      seriesRef.current.setData(validHistory);
    }
  }, [history]);

  return (
    <div className="mt-8 bg-jupiterDark rounded-xl p-4 border border-jupiterCyan/20 shadow-lg">
      <h2 className="text-xl font-bold text-jupiterCyan mb-4">📉 Portfolio Value History</h2>
      <div ref={chartContainerRef} style={{ height: 300, width: '100%' }} />
    </div>
  );
};

export default PortfolioHistoryChart;
