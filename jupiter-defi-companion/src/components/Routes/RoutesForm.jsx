import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import PropTypes from 'prop-types';

const DEFAULT_TOKENS = [
  { value: 'So11111111111111111111111111111111111111112', label: 'SOL', decimals: 9 },
  { value: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', label: 'USDC', decimals: 6 },
  { value: '9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E', label: 'BTC', decimals: 6 },
];

const RoutesForm = ({ onQuoteFetch, setLoading, setError }) => {
  const [fromMint, setFromMint] = useState(DEFAULT_TOKENS[0].value);
  const [toMint, setToMint] = useState(DEFAULT_TOKENS[1].value);
  const [amount, setAmount] = useState('');
  const [localLoading, setLocalLoading] = useState(false);
  const [tokenList, setTokenList] = useState(DEFAULT_TOKENS);
  const [tokensLoading, setTokensLoading] = useState(true);
  const [isFromDropdownOpen, setIsFromDropdownOpen] = useState(false);
  const [isToDropdownOpen, setIsToDropdownOpen] = useState(false);

  // Fetch token list from Jupiter API
  useEffect(() => {
    const fetchTokenList = async () => {
      try {
        const response = await fetch('https://token.jup.ag/strict');
        const tokens = await response.json();
        
        const formattedTokens = tokens.map(token => ({
          value: token.address,
          label: token.symbol,
          decimals: token.decimals,
          name: token.name,
          logoURI: token.logoURI
        }));

        // Merge with default tokens to ensure SOL, USDC, BTC are included
        const mergedTokens = [
          ...DEFAULT_TOKENS,
          ...formattedTokens.filter(
            token => !DEFAULT_TOKENS.some(t => t.value === token.value)
          )
        ];

        setTokenList(mergedTokens);
      } catch (error) {
        console.error('Failed to fetch token list:', error);
        // Fallback to default tokens if API fails
        setTokenList(DEFAULT_TOKENS);
      } finally {
        setTokensLoading(false);
      }
    };

    fetchTokenList();
  }, []);

  const fromToken = tokenList.find(c => c.value === fromMint);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!amount || isNaN(amount)) {
      setError("Please enter a valid amount");
      return;
    }

    if (fromMint === toMint) {
      setError("From and To tokens must be different");
      return;
    }

    setLoading(true);
    setLocalLoading(true);

    try {
      const amountInBaseUnits = Math.floor(Number(amount) * 10 ** fromToken.decimals);
      const res = await fetch(
        `https://quote-api.jup.ag/v6/quote?inputMint=${fromMint}&outputMint=${toMint}&amount=${amountInBaseUnits}`
      );
      
      if (!res.ok) {
        throw new Error(`API Error: ${res.status}`);
      }

      const data = await res.json();

      if (!data?.routePlan?.length) {
        throw new Error("No available route found");
      }

      onQuoteFetch(data);
    } catch (err) {
      console.error("Route fetch error:", err);
      setError(err.message || "Failed to fetch route");
    } finally {
      setLoading(false);
      setLocalLoading(false);
    }
  };

  return (
    <motion.div
      className="bg-gray-900 rounded-xl p-6 border border-cyan-400/20 shadow-lg max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold text-cyan-400 text-center mb-6">🔄 Swap Route</h2>

      {tokensLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-400"></div>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* From Token */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-200">From Token</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsFromDropdownOpen(!isFromDropdownOpen)}
                className="w-full bg-gray-800 text-gray-100 border border-cyan-400/30 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 outline-none flex justify-between items-center"
              >
                {tokenList.find(token => token.value === fromMint)?.label}
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 10l5 5 5-5" />
                </svg>
              </button>
              {isFromDropdownOpen && (
                <div className="absolute z-10 w-full bg-gray-800 border border-cyan-400 rounded-lg mt-1 max-h-60 overflow-y-auto">
                  {tokenList.map(opt => (
                    <button
                      key={`from-${opt.value}`}
                      onClick={() => {
                        setFromMint(opt.value);
                        setIsFromDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-cyan-400/20"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* To Token */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-200">To Token</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsToDropdownOpen(!isToDropdownOpen)}
                className="w-full bg-gray-800 text-gray-100 border border-cyan-400/30 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 outline-none flex justify-between items-center"
              >
                {tokenList.find(token => token.value === toMint)?.label}
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 10l5 5 5-5" />
                </svg>
              </button>
              {isToDropdownOpen && (
                <div className="absolute z-10 w-full bg-gray-800 border border-cyan-400 rounded-lg mt-1 max-h-60 overflow-y-auto">
                  {tokenList.map(opt => (
                    <button
                      key={`to-${opt.value}`}
                      onClick={() => {
                        setToMint(opt.value);
                        setIsToDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-cyan-400/20"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-200">
              Amount ({fromToken?.label})
            </label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0"
              className="w-full bg-gray-800 text-gray-100 border border-cyan-400/30 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 outline-none"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={localLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-gray-900 font-bold py-3 rounded-lg transition-all ${localLoading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-cyan-400/20 hover:shadow-lg'}`}
          >
            {localLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-gray-900" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Finding Route...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Find Best Route <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </motion.button>
        </form>
      )}
    </motion.div>
  );
};

RoutesForm.propTypes = {
  onQuoteFetch: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
};

export default RoutesForm;
