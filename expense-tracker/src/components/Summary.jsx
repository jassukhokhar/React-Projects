import React from 'react';
import { IndianRupee, TrendingDown, Layers, Landmark } from 'lucide-react';

const CATEGORY_COLORS = {
  Food: '#10b981',
  Travel: '#0ea5e9',
  Shopping: '#a855f7',
  Entertainment: '#ec4899',
  Bills: '#f59e0b',
  Others: '#64748b',
};

const Summary = ({ expenses }) => {
  const totalAmount = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const totalCount = expenses.length;
  const averageAmount = totalCount > 0 ? totalAmount / totalCount : 0;

  const categorySummary = expenses.reduce((acc, curr) => {
    const { category, amount } = curr;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += amount;
    return acc;
  }, {});

  const formatRupees = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0, // No decimals for summary cards
    }).format(val);
  };

  const formatRupeesDecimals = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(val);
  };

  const monthlySummary = expenses.reduce((acc, curr) => {
    const dateObj = new Date(curr.date);
    const monthYear = dateObj.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
    if (!acc[monthYear]) {
      acc[monthYear] = 0;
    }
    acc[monthYear] += curr.amount;
    return acc;
  }, {});

  const sortedMonths = Object.keys(monthlySummary)
    .map((monthStr) => {
      const parts = monthStr.split(' ');
      const dateVal = new Date(`${parts[0]} 1, ${parts[1]}`);
      return { month: monthStr, total: monthlySummary[monthStr], timeValue: dateVal.getTime() };
    })
    .sort((a, b) => b.timeValue - a.timeValue)
    .slice(0, 4);

  const radius = 50;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius;
  
  let accumulatedPercent = 0;
  const chartSlices = Object.keys(CATEGORY_COLORS).map((cat) => {
    const amount = categorySummary[cat] || 0;
    const percent = totalAmount > 0 ? (amount / totalAmount) * 100 : 0;
    const slice = {
      category: cat,
      amount,
      percent,
      color: CATEGORY_COLORS[cat],
      strokeDasharray: `${(percent / 100) * circumference} ${circumference}`,
      strokeDashoffset: -((accumulatedPercent / 100) * circumference),
    };
    accumulatedPercent += percent;
    return slice;
  }).filter(slice => slice.amount > 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-brand-surface-light dark:bg-brand-surface-dark border border-brand-border-light dark:border-brand-border-dark rounded-2xl p-5 shadow-xs relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 text-slate-105/10 dark:text-slate-700/20 group-hover:scale-110 transition-transform duration-300">
            <Landmark size={80} strokeWidth={1} />
          </div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 relative z-10">
            Total Spent
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-danger dark:text-danger-light tracking-tight mb-1 relative z-10">
            {formatRupees(totalAmount)}
          </h2>
          <div className="flex items-center gap-1.5 text-xs text-slate-455 dark:text-slate-400 relative z-10">
            <TrendingDown size={14} className="text-danger" />
            <span>Cumulative expenses</span>
          </div>
        </div>

        <div className="bg-brand-surface-light dark:bg-brand-surface-dark border border-brand-border-light dark:border-brand-border-dark rounded-2xl p-5 shadow-xs relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 text-slate-105/10 dark:text-slate-700/20 group-hover:scale-110 transition-transform duration-300">
            <Layers size={80} strokeWidth={1} />
          </div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 relative z-10">
            Transactions
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-primary dark:text-primary-light tracking-tight mb-1 relative z-10">
            {totalCount}
          </h2>
          <div className="flex items-center gap-1.5 text-xs text-slate-455 dark:text-slate-400 relative z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
            <span>Total slips submitted</span>
          </div>
        </div>

        <div className="bg-brand-surface-light dark:bg-brand-surface-dark border border-brand-border-light dark:border-brand-border-dark rounded-2xl p-5 shadow-xs relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 text-slate-105/10 dark:text-slate-700/20 group-hover:scale-110 transition-transform duration-300">
            <IndianRupee size={80} strokeWidth={0.8} />
          </div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 relative z-10">
            Average Spend
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight mb-1 relative z-10">
            {formatRupees(averageAmount)}
          </h2>
          <div className="flex items-center gap-1.5 text-xs text-slate-455 dark:text-slate-400 relative z-10">
            <span>Per transactions average</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-brand-surface-light dark:bg-brand-surface-dark border border-brand-border-light dark:border-brand-border-dark rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider mb-6">
            Category Breakdown
          </h3>

          {totalCount === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 flex-1">
              <p className="text-xs text-slate-450 dark:text-slate-500">No chart data available</p>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 flex-1">
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    fill="transparent"
                    stroke="rgba(226, 232, 240, 0.4)"
                    strokeWidth={strokeWidth}
                  />
                  {chartSlices.map((slice, idx) => (
                    <circle
                      key={idx}
                      cx="60"
                      cy="60"
                      r={radius}
                      fill="transparent"
                      stroke={slice.color}
                      strokeWidth={strokeWidth}
                      strokeDasharray={slice.strokeDasharray}
                      strokeDashoffset={slice.strokeDashoffset}
                      strokeLinecap="round"
                      className="transition-all duration-500 ease-out"
                    />
                  ))}
                </svg>
                <div className="absolute text-center">
                  <span className="block text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">
                    Total
                  </span>
                  <span className="text-sm font-extrabold text-slate-700 dark:text-slate-100">
                    {formatRupees(totalAmount)}
                  </span>
                </div>
              </div>

              <div className="flex-1 space-y-2.5 w-full">
                {Object.keys(CATEGORY_COLORS).map((cat) => {
                  const amt = categorySummary[cat] || 0;
                  const pct = totalAmount > 0 ? (amt / totalAmount) * 100 : 0;
                  if (amt === 0) return null;

                  return (
                    <div key={cat} className="flex items-center justify-between text-xs font-semibold">
                      <div className="flex items-center gap-2">
                        <span 
                          className="w-3 h-3 rounded-md" 
                          style={{ backgroundColor: CATEGORY_COLORS[cat] }}
                        ></span>
                        <span className="text-slate-650 dark:text-slate-300">{cat}</span>
                      </div>
                      <div className="text-right flex items-center gap-3">
                        <span className="text-slate-400 dark:text-slate-500">{pct.toFixed(0)}%</span>
                        <span className="text-slate-800 dark:text-slate-100 font-bold">{formatRupeesDecimals(amt)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-5 bg-brand-surface-light dark:bg-brand-surface-dark border border-brand-border-light dark:border-brand-border-dark rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider mb-4">
              Monthly Summary
            </h3>
            
            {sortedMonths.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-xs text-slate-455 dark:text-slate-500">No monthly records yet</p>
              </div>
            ) : (
              <div className="divide-y divide-brand-border-light dark:divide-brand-border-dark">
                {sortedMonths.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-3">
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-350">
                      {item.month}
                    </span>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                      {formatRupeesDecimals(item.total)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 bg-slate-50 dark:bg-brand-container-dark/30 rounded-xl p-3 border border-brand-border-light dark:border-brand-border-dark text-[11px] text-slate-500 dark:text-slate-400 text-center leading-relaxed">
            Data aggregated automatically by local timestamp coordinates.
          </div>
        </div>

      </div>

    </div>
  );
};

export default Summary;
