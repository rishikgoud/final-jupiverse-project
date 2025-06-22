import React from 'react';
import { CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import PropTypes from 'prop-types';

const RoutesSummary = ({ route }) => {
  if (!route) return null;

  const formatAmount = (amt, decimals = 0) => {
    if (!amt) return 'N/A';
    const num = Number(amt);
    return isNaN(num) ? amt : (num / 10 ** decimals).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    });
  };

  const getTokenFromMint = (mint) => {
    switch (mint) {
      case 'So11111111111111111111111111111111111111112':
        return { symbol: 'SOL', decimals: 9 };
      case 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v':
        return { symbol: 'USDC', decimals: 6 };
      case '9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E':
        return { symbol: 'BTC', decimals: 6 };
      default:
        return { symbol: 'TOK', decimals: 0 };
    }
  };

  const inputToken = getTokenFromMint(route.routePlan[0]?.swapInfo?.inputMint);
  const outputToken = getTokenFromMint(route.routePlan[route.routePlan.length - 1]?.swapInfo?.outputMint);

  return (
    <div className="bg-jupiterDark rounded-xl border border-jupiterCyan/20 shadow-lg p-6">
      <h2 className="text-xl font-bold text-jupiterCyan mb-4 flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        Swap Summary
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-jupiterDarker/50 p-4 rounded-lg border border-jupiterCyan/10">
            <h3 className="text-sm font-medium text-gray-400 mb-2">INPUT/OUTPUT</h3>
            <div className="flex items-center justify-between py-2 border-b border-jupiterCyan/5">
              <span className="text-gray-300">Input Amount</span>
              <span className="font-medium">
                {formatAmount(route.inAmount, inputToken.decimals)} {inputToken.symbol}
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-jupiterCyan/5">
              <span className="text-gray-300">Estimated Output</span>
              <span className="font-medium text-jupiterCyan">
                {formatAmount(route.outAmount, outputToken.decimals)} {outputToken.symbol}
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-300">Rate</span>
              <span className="font-medium">
                1 {inputToken.symbol} = {(route.outAmount / route.inAmount * (10 ** (inputToken.decimals - outputToken.decimals))).toFixed(6)} {outputToken.symbol}
              </span>
            </div>
          </div>

          <div className="bg-jupiterDarker/50 p-4 rounded-lg border border-jupiterCyan/10">
            <h3 className="text-sm font-medium text-gray-400 mb-2">FEES & SLIPPAGE</h3>
            <div className="flex items-center justify-between py-2 border-b border-jupiterCyan/5">
              <span className="text-gray-300">Price Impact</span>
              <span className={route.priceImpactPct > 0.05 ? 'text-red-400' : 'text-green-400'}>
                {(route.priceImpactPct * 100).toFixed(2)}%
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-jupiterCyan/5">
              <span className="text-gray-300">Slippage Tolerance</span>
              <span className="text-yellow-400">
                {(route.slippageBps / 100).toFixed(2)}%
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-300">Total Fees</span>
              <span className="text-gray-300">
                {route.marketInfos?.reduce((sum, info) => sum + (info.feeAmount || 0), 0)} {outputToken.symbol}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-jupiterDarker/50 p-4 rounded-lg border border-jupiterCyan/10">
          <h3 className="text-sm font-medium text-gray-400 mb-2">ROUTE DETAILS</h3>
          <div className="space-y-3">
            {route.routePlan.map((step, idx) => (
              <div key={`step-detail-${idx}`} className="border-b border-jupiterCyan/5 pb-3 last:border-0">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 font-medium">
                    Step {idx + 1}: {step?.swapInfo?.amm?.name || 'Unknown AMM'}
                  </span>
                  <span className="text-xs bg-jupiterCyan/10 text-jupiterCyan px-2 py-1 rounded">
                    {step?.swapInfo?.lpFeePct ? (step.swapInfo.lpFeePct * 100).toFixed(2) : 'N/A'}% fee
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm mt-1">
                  <span>{formatAmount(step?.swapInfo?.inAmount, inputToken.decimals)} {inputToken.symbol}</span>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                  <span>{formatAmount(step?.swapInfo?.outAmount, outputToken.decimals)} {outputToken.symbol}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2 text-xs text-gray-500">
        {route.error ? (
          <>
            <AlertCircle className="w-4 h-4 text-yellow-400" />
            <span>Route may have estimation errors</span>
          </>
        ) : (
          <>
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span>Route provided by Jupiter Aggregator</span>
          </>
        )}
      </div>
    </div>
  );
};

RoutesSummary.propTypes = {
  route: PropTypes.shape({
    inAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    outAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    priceImpactPct: PropTypes.number,
    slippageBps: PropTypes.number,
    marketInfos: PropTypes.array,
    routePlan: PropTypes.array.isRequired,
    error: PropTypes.string,
  }),
};

export default RoutesSummary;