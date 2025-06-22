import React from 'react';

const PortfolioTable = ({ solBalance, solPrice, tokens, customThresholds, onExportCSV, onExportPDF }) => (
  <div className="mt-8 bg-jupiterDark rounded-xl p-4 border border-jupiterCyan/20 shadow-lg overflow-x-auto">
    <div className="flex justify-between items-center mb-2">
      <h2 className="text-xl font-bold text-jupiterCyan">📋 Token Table</h2>
      <div className="flex gap-2">
        <button 
          onClick={onExportCSV} 
          className="text-sm px-3 py-1 bg-jupiterCyan text-jupiterDark rounded hover:bg-jupiterHoverTo"
        >
          Export CSV
        </button>
        <button 
          onClick={onExportPDF} 
          className="text-sm px-3 py-1 bg-jupiterCyan text-jupiterDark rounded hover:bg-jupiterHoverTo"
        >
          Export PDF
        </button>
      </div>
    </div>
    <table className="w-full text-sm text-left text-gray-300">
      <thead className="text-xs uppercase text-gray-400">
        <tr>
          <th className="py-2">Token</th>
          <th className="py-2">Balance</th>
          <th className="py-2">Price</th>
          <th className="py-2">Value</th>
        </tr>
      </thead>
      <tbody>
        <tr className={solPrice < (customThresholds.SOL || 0) ? 'bg-red-900/40' : ''}>
          <td>SOL</td>
          <td>{solBalance.toFixed(4)}</td>
          <td>${solPrice.toFixed(4)}</td>
          <td>${(solBalance * solPrice).toFixed(2)}</td>
        </tr>
        {tokens.map((t) => (
          <tr key={t.mint} className={customThresholds[t.symbol] && t.price < customThresholds[t.symbol] ? 'bg-red-900/40' : ''}>
            <td>{t.symbol}</td>
            <td>{t.balanceUi.toFixed(4)}</td>
            <td>${t.price.toFixed(4)}</td>
            <td>${t.value.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default PortfolioTable;
