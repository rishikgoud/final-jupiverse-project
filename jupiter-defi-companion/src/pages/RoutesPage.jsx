import React, { useState } from 'react';
import { motion } from 'framer-motion';
import RoutesForm from '../components/Routes/RoutesForm';
import RoutesDiagram from '../components/Routes/RoutesDiagram';
import RoutesSummary from '../components/Routes/RoutesSummary';

const RoutesPage = () => {
  const [routeData, setRouteData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleQuoteFetch = (data) => {
    setRouteData(data);
    setError('');
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 py-10"
    >
      <div className="text-center mb-10">
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-3xl md:text-4xl font-bold text-jupiterCyan mb-2"
        >
          🔄 Advanced Swap Visualizer
        </motion.h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Analyze and visualize the optimal swap routes across Solana's liquidity pools
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <RoutesForm 
            onQuoteFetch={handleQuoteFetch}
            setLoading={setLoading}
            setError={setError}
          />
        </div>

        <div className="lg:col-span-2 space-y-6">
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-jupiterDark rounded-xl p-6 border border-jupiterCyan/20 shadow-lg text-center"
            >
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-jupiterCyan"></div>
                <p className="text-jupiterCyan">Finding optimal route...</p>
                <p className="text-sm text-gray-400">Analyzing liquidity across all pools</p>
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-400/20 rounded-xl p-4 shadow-lg"
            >
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="font-medium text-red-300">Route Error</h3>
                  <p className="text-sm text-red-400/80">{error}</p>
                </div>
              </div>
            </motion.div>
          )}

          {!loading && routeData && (
            <>
              <RoutesDiagram route={routeData} />
              <RoutesSummary route={routeData} />
            </>
          )}

          {!loading && !routeData && !error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-jupiterDark rounded-xl p-6 border border-jupiterCyan/20 shadow-lg text-center"
            >
              <div className="text-gray-400 flex flex-col items-center gap-2">
                <svg className="w-10 h-10 text-jupiterCyan/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <p>Enter swap details to visualize the optimal route</p>
                <p className="text-sm text-gray-500">Supports SOL, USDC, BTC and other SPL tokens</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default RoutesPage;