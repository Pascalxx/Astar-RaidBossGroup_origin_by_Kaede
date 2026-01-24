import React, { useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { normalizeJob, getJobColor, getJobBorderColor } from '../../utils/jobUtils';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const StatsModal = ({ data, onClose }) => {

  const chartData = useMemo(() => {
    const rows = data.filter(r => (r.camp || '').trim() !== '外援大大');
    const counter = {};

    for (const r of rows) {
      const key = normalizeJob(r.job);
      counter[key] = (counter[key] || 0) + 1;
    }

    const entries = Object.entries(counter).sort((a, b) => b[1] - a[1]);
    const labels = entries.map(e => e[0]);
    const values = entries.map(e => e[1]);
    const total = values.reduce((a, c) => a + c, 0);

    const bgColors = labels.map(name => getJobColor(name));
    const borderColors = labels.map(name => getJobBorderColor(name));

    return {
      labels,
      datasets: [{
        label: '人數',
        data: values,
        backgroundColor: bgColors,
        borderColor: borderColors,
        borderWidth: 1.5,
        hoverOffset: 6
      }],
      total
    };
  }, [data]);

  return (
    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">公會職業分佈統計（不含外援大大）</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <Doughnut
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: true, position: 'bottom' },
                  tooltip: {
                    callbacks: {
                      label: (ctx) => {
                        const value = ctx.parsed;
                        const total = chartData.total || 0;
                        const pct = total ? (value * 100 / total).toFixed(1) : 0;
                        return `${ctx.label}: ${value} 人（${pct}%）`;
                      }
                    }
                  },
                  title: {
                    display: true,
                    text: `公會職業分佈（總數：${chartData.total || 0}）`
                  }
                }
              }}
              height={140}
            />
            <small className="text-muted d-block mt-2">
              說明：統計來源為列表讀入的 Google Sheet；同義職業會自動合併（如「十字軍=英雄」）。
            </small>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary btn-sm" onClick={onClose}>關閉</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsModal;
