import  { useState } from 'react';
import { motion,  } from 'framer-motion';
import { 
   Clock, ArrowUpDown, Shield, Trophy, BarChart2, 
   Calendar, TrendingUp, Sparkles, BadgeCheck 
} from 'lucide-react';

const AdvancedPage = () => {
  // Limit Order State
  const [limitOrder, setLimitOrder] = useState({
    tokenIn: 'SOL',
    tokenOut: 'USDC',
    amount: '',
    price: '',
    expiry: '7d'
  });

  // DCA Strategy State
  const [dcaConfig, setDcaConfig] = useState({
    baseToken: 'ETH',
    targetToken: 'BTC',
    totalAmount: '',
    portions: 5,
    interval: '24h',
    startDate: new Date().toISOString().split('T')[0]
  });

  // Leaderboard Data
  const leaderboard = [
    { rank: 1, address: '0x892...1d4f', score: 98, badge: '😎 Normie', profit: '+12.4%' },
    { rank: 2, address: '0x341...9a2b', score: 87, badge: '🧠 Investor', profit: '+8.7%' },
    { rank: 3, address: '0x756...3e8c', score: 76, badge: '🧠 Investor', profit: '+5.2%' },
    { rank: 4, address: '0xfa2...7b1d', score: 62, badge: '🚀 Degen', profit: '-3.5%' },
    { rank: 5, address: '0xc34...5d9e', score: 55, badge: '🚀 Degen', profit: '-7.8%' }
  ];

  const handleLimitSubmit = (e) => {
    e.preventDefault();
    alert(`Limit order set: ${limitOrder.amount} ${limitOrder.tokenIn} → ${limitOrder.tokenOut} @ ${limitOrder.price}`);
  };

  const handleDcaSubmit = (e) => {
    e.preventDefault();
    alert(`DCA scheduled: ${dcaConfig.totalAmount} ${dcaConfig.baseToken} → ${dcaConfig.targetToken} in ${dcaConfig.portions} portions`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            ⚡ Advanced Trading Tools
          </h1>
          <p className="text-gray-400 mt-2">
            Professional strategies for sophisticated traders
          </p>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <Sparkles className="text-yellow-400 w-5 h-5" />
          <span className="text-sm text-yellow-400">Live Market Data</span>
        </div>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Limit Order */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="lg:col-span-1 bg-gray-800/50 border border-gray-700 rounded-2xl p-6 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3 mb-6">
            <ArrowUpDown className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-semibold">Limit Order</h2>
          </div>
          
          <form onSubmit={handleLimitSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Token Pair</label>
                <div className="flex items-center gap-2">
                  <select
                    value={limitOrder.tokenIn}
                    onChange={(e) => setLimitOrder({...limitOrder, tokenIn: e.target.value})}
                    className="flex-1 bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                  >
                    <option>SOL</option>
                    <option>ETH</option>
                    <option>BTC</option>
                    <option>USDC</option>
                  </select>
                  <span className="text-gray-400">→</span>
                  <select
                    value={limitOrder.tokenOut}
                    onChange={(e) => setLimitOrder({...limitOrder, tokenOut: e.target.value})}
                    className="flex-1 bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                  >
                    <option>USDC</option>
                    <option>BTC</option>
                    <option>ETH</option>
                    <option>SOL</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Amount ({limitOrder.tokenIn})</label>
                <input
                  type="number"
                  value={limitOrder.amount}
                  onChange={(e) => setLimitOrder({...limitOrder, amount: e.target.value})}
                  placeholder="0.0"
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Price Target ({limitOrder.tokenOut})</label>
                <input
                  type="number"
                  value={limitOrder.price}
                  onChange={(e) => setLimitOrder({...limitOrder, price: e.target.value})}
                  placeholder={`Current: 42.3 ${limitOrder.tokenOut}`}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Expiry</label>
                <select
                  value={limitOrder.expiry}
                  onChange={(e) => setLimitOrder({...limitOrder, expiry: e.target.value})}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                >
                  <option value="1d">1 Day</option>
                  <option value="7d">7 Days</option>
                  <option value="30d">30 Days</option>
                  <option value="custom">Custom</option>
                </select>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full mt-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"
              >
                <BadgeCheck className="w-5 h-5" />
                Place Limit Order
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Middle Column - DCA */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="lg:col-span-1 bg-gray-800/50 border border-gray-700 rounded-2xl p-6 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-semibold">DCA Strategy</h2>
          </div>
          
          <form onSubmit={handleDcaSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Convert</label>
                <div className="flex items-center gap-2">
                  <select
                    value={dcaConfig.baseToken}
                    onChange={(e) => setDcaConfig({...dcaConfig, baseToken: e.target.value})}
                    className="flex-1 bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                  >
                    <option>ETH</option>
                    <option>BTC</option>
                    <option>SOL</option>
                    <option>USDC</option>
                  </select>
                  <span className="text-gray-400">→</span>
                  <select
                    value={dcaConfig.targetToken}
                    onChange={(e) => setDcaConfig({...dcaConfig, targetToken: e.target.value})}
                    className="flex-1 bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                  >
                    <option>BTC</option>
                    <option>ETH</option>
                    <option>SOL</option>
                    <option>USDC</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Total Amount ({dcaConfig.baseToken})</label>
                <input
                  type="number"
                  value={dcaConfig.totalAmount}
                  onChange={(e) => setDcaConfig({...dcaConfig, totalAmount: e.target.value})}
                  placeholder="0.0"
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Portions</label>
                  <input
                    type="number"
                    value={dcaConfig.portions}
                    onChange={(e) => setDcaConfig({...dcaConfig, portions: e.target.value})}
                    min="2"
                    max="20"
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Interval</label>
                  <select
                    value={dcaConfig.interval}
                    onChange={(e) => setDcaConfig({...dcaConfig, interval: e.target.value})}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                  >
                    <option value="1h">1 Hour</option>
                    <option value="6h">6 Hours</option>
                    <option value="24h">24 Hours</option>
                    <option value="7d">7 Days</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Start Date</label>
                <input
                  type="date"
                  value={dcaConfig.startDate}
                  onChange={(e) => setDcaConfig({...dcaConfig, startDate: e.target.value})}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Schedule DCA
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Right Column - Leaderboard */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-1 bg-gray-800/50 border border-gray-700 rounded-2xl p-6 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl font-semibold">Safety Leaderboard</h2>
          </div>

          <div className="space-y-4">
            {leaderboard.map((user) => (
              <motion.div
                key={user.rank}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-xl flex items-center gap-4 ${
                  user.rank === 1 
                    ? 'bg-gradient-to-r from-yellow-900/30 to-amber-800/30 border border-amber-700/50 shadow-lg shadow-amber-500/10'
                    : 'bg-gray-700/40 border border-gray-600/50'
                }`}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  user.rank === 1 ? 'bg-yellow-500/20 text-yellow-400' :
                  user.rank === 2 ? 'bg-gray-500/20 text-gray-400' :
                  user.rank === 3 ? 'bg-amber-700/20 text-amber-400' : 'bg-gray-700/20 text-gray-400'
                }`}>
                  {user.rank}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{user.address}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Shield className={`w-3 h-3 ${
                      user.score > 85 ? 'text-green-400' :
                      user.score > 60 ? 'text-yellow-400' : 'text-red-400'
                    }`} />
                    <span className="text-xs text-gray-400">Safety: {user.score}/100</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className={`text-sm font-medium ${
                    user.profit.startsWith('+') ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {user.profit}
                  </span>
                  <span className="text-xs mt-1 px-2 py-0.5 rounded-full bg-gray-700/50">
                    {user.badge}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-700/50">
            <h3 className="flex items-center gap-2 text-sm font-medium mb-3">
              <BarChart2 className="w-4 h-4 text-purple-400" />
              Key Metrics
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-700/30 rounded-lg p-3">
                <p className="text-xs text-gray-400">Avg. Safety</p>
                <p className="text-lg font-medium">75.6</p>
              </div>
              <div className="bg-gray-700/30 rounded-lg p-3">
                <p className="text-xs text-gray-400">Top Profit</p>
                <p className="text-lg font-medium text-green-400">+12.4%</p>
              </div>
              <div className="bg-gray-700/30 rounded-lg p-3">
                <p className="text-xs text-gray-400">Degen Ratio</p>
                <p className="text-lg font-medium text-red-400">40%</p>
              </div>
              <div className="bg-gray-700/30 rounded-lg p-3">
                <p className="text-xs text-gray-400">Active Users</p>
                <p className="text-lg font-medium">1,429</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Market Data Footer */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-12 bg-gray-800/50 border border-gray-700 rounded-2xl p-6 backdrop-blur-sm"
      >
        <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
          <TrendingUp className="w-5 h-5 text-green-400" />
          Live Market Summary
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { token: 'BTC', price: '$42,385', change: '+2.4%' },
            { token: 'ETH', price: '$2,342', change: '+1.8%' },
            { token: 'SOL', price: '$102.64', change: '+5.2%' },
            { token: 'Fear/Greed', price: '72', change: 'Greed' }
          ].map((item) => (
            <div key={item.token} className="bg-gray-700/30 rounded-xl p-4 border border-gray-600/50">
              <p className="text-sm text-gray-400">{item.token}</p>
              <div className="flex items-end gap-2 mt-1">
                <p className="text-lg font-medium">{item.price}</p>
                <p className={`text-sm ${
                  item.change.startsWith('+') ? 'text-green-400' :
                  item.change.startsWith('-') ? 'text-red-400' : 'text-yellow-400'
                }`}>
                  {item.change}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AdvancedPage;