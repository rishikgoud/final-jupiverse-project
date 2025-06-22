import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Info } from 'lucide-react';
import PropTypes from 'prop-types';

const coinOptions = [
  { value: 'So11111111111111111111111111111111111111112', label: 'SOL' },
  { value: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', label: 'USDC' },
  { value: '9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E', label: 'BTC' },
];

const RoutesDiagram = ({ route }) => {
  if (!route?.routePlan?.length) {
    return (
      <motion.div
        className="bg-jupiterDark rounded-xl p-6 border border-jupiterCyan/20 shadow-lg text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-gray-400 flex flex-col items-center">
          <Info className="w-8 h-8 mb-2 text-jupiterCyan" />
          <p>No route data available</p>
          <p className="text-sm mt-1">Enter swap details to visualize the route</p>
        </div>
      </motion.div>
    );
  }

  const resolveTokenName = (mint) => {
    const found = coinOptions.find(c => c.value === mint);
    return found ? found.label : `${mint.slice(0, 4)}...${mint.slice(-4)}`;
  };

  const formatNumber = (num) => {
    return num ? Number(num).toLocaleString() : 'N/A';
  };

  return (
    <motion.div
      className="bg-jupiterDark rounded-xl p-6 border border-jupiterCyan/20 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-xl font-bold text-jupiterCyan mb-4 flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        Swap Route Visualization
      </h3>

      <div className="overflow-x-auto py-2">
        <div className="flex items-center min-w-max gap-4">
          {route.routePlan.map((step, idx) => {
            const ammLabel = step?.swapInfo?.amm?.name || 'Unknown AMM';
            const inputName = resolveTokenName(step?.swapInfo?.inputMint);
            const outputName = resolveTokenName(step?.swapInfo?.outputMint);
            const feePct = step?.swapInfo?.lpFeePct ? (step.swapInfo.lpFeePct * 100).toFixed(2) : 'N/A';

            return (
              <React.Fragment key={`step-${idx}`}>
                <motion.div
                  className="flex-shrink-0"
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="bg-jupiterDarker border border-jupiterCyan/20 rounded-lg p-3 w-48">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-jupiterCyan">{ammLabel}</span>
                      <span className="text-xs bg-jupiterCyan/10 text-jupiterCyan px-2 py-1 rounded">
                        {feePct}% fee
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-2 py-1">
                      <span className="font-medium">{inputName}</span>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{outputName}</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {formatNumber(step?.swapInfo?.inAmount)} → {formatNumber(step?.swapInfo?.outAmount)}
                    </div>
                  </div>
                </motion.div>

                {idx < route.routePlan.length - 1 && (
                  <div className="text-gray-500 flex-shrink-0">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-400">
        <div className="flex justify-between">
          <span>Total Price Impact:</span>
          <span className={route.priceImpactPct > 0.05 ? 'text-red-400' : 'text-green-400'}>
            {(route.priceImpactPct * 100).toFixed(2)}%
          </span>
        </div>
        <div className="flex justify-between">
          <span>Estimated Output:</span>
          <span className="font-medium">
            {formatNumber(route.outAmount)} {resolveTokenName(route.routePlan[route.routePlan.length - 1]?.swapInfo?.outputMint)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

RoutesDiagram.propTypes = {
  route: PropTypes.shape({
    routePlan: PropTypes.array,
    priceImpactPct: PropTypes.number,
    outAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

export default RoutesDiagram;