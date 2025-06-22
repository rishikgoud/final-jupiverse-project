import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ScanSearch, Wallet, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function WalletQuickInput() {
  const [walletAddress, setWalletAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!walletAddress.trim()) {
      setError('Please enter a wallet address!');
      return;
    }

    // Basic validation for Solana address format
    if (!/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(walletAddress)) {
      setError('Please enter a valid Solana wallet address');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call/validation
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to portfolio page with wallet address as state
      navigate('/portfolio', { 
        state: { 
          walletAddress,
          timestamp: new Date().toISOString()
        } 
      });
      
    } catch (err) {
      setError('Failed to analyze wallet. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative mt-20 flex justify-center">
      {/* Background Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 max-w-xl mx-auto rounded-2xl bg-white/4 backdrop-blur-sm shadow-lg shadow-jupiterCyan/10 z-0"
      ></motion.div>

      {/* Decorative Icons */}
      <ScanSearch className="absolute top-4 left-4 w-8 h-8 text-jupiterCyan/30 animate-pulse" />
      <Wallet className="absolute bottom-4 right-4 w-8 h-8 text-jupiterCyan/30 animate-ping" />

      {/* Form Content */}
      <div className="relative z-10 w-full max-w-xl px-4 py-6">
        <h3 className="text-2xl md:text-3xl font-semibold text-jupiterCyan mb-4 text-center">
          Check Your Portfolio Risk Instantly
        </h3>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-4"
        >
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Enter your Solana wallet address..."
              className="w-full rounded-lg px-4 py-3 bg-jupiterDark text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-jupiterCyan transition"
              value={walletAddress}
              onChange={(e) => {
                setWalletAddress(e.target.value);
                setError('');
              }}
              disabled={isLoading}
            />
            {error && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-6 left-0 text-red-400 text-sm mt-1"
              >
                {error}
              </motion.p>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`px-6 py-3 rounded-lg bg-gradient-to-r from-jupiterHoverFrom to-jupiterHoverTo text-white shadow-lg transition min-w-[120px] flex items-center justify-center ${
              isLoading 
                ? 'opacity-70 cursor-not-allowed' 
                : 'hover:from-jupiterPurple hover:to-jupiterCyan'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Analyze 🚀'
            )}
          </button>
        </form>
        <p className="text-center text-gray-400 text-sm mt-6">
          We'll analyze your token holdings and calculate risk exposure
        </p>
      </div>
    </section>
  );
}

export default WalletQuickInput;