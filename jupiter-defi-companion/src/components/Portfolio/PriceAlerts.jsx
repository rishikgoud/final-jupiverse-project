import React from 'react';

const PriceAlerts = ({ tokens, customThresholds, handleThresholdChange }) => (
  <div className="mt-6 bg-jupiterDark rounded-xl p-4 border border-jupiterCyan/20 shadow-lg">
    <h2 className="text-xl font-bold text-jupiterCyan mb-2">⚙️ Set Price Alerts</h2>
    {["SOL", ...tokens.map(t => t.symbol)].map(symbol => (
      <div key={symbol} className="flex items-center mb-2 gap-2">
        <span className="text-sm w-12 text-gray-300">{symbol}</span>
        <input
          type="number"
          step="0.0001"
          value={customThresholds[symbol] || ''}
          onChange={(e) => handleThresholdChange(symbol, e.target.value)}
          className="flex-1 px-2 py-1 rounded bg-jupiterDark border border-jupiterCyan/20 text-white text-sm"
          placeholder="Set alert threshold"
        />
      </div>
    ))}
  </div>
);

export default PriceAlerts;
