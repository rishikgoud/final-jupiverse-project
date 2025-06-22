// src/pages/SentimentPage.jsx
import React, { useState, useEffect } from 'react';
import { RotateCw } from 'lucide-react';

// Mock data generators
const generateSentiment = () => {
  const baseScore = Math.random() * 0.3 + 0.5; // Between 0.5-0.8
  const volatility = (Math.random() - 0.5) * 0.1;
  const score = Math.min(Math.max(baseScore + volatility, 0.3), 0.9);
  
  return {
    score: parseFloat(score.toFixed(2)),
    label: score > 0.7 ? "Bullish" : score > 0.5 ? "Neutral" : "Bearish",
    indicators: {
      fear_greed: Math.floor(score * 100),
      rsi: Math.floor(40 + score * 30), // 40-70 RSI
      macd: score > 0.65 ? "Bullish" : score > 0.45 ? "Neutral" : "Bearish",
      volume: `${(Math.random() * 200 + 50).toFixed(0)}B`,
      dominance: {
        btc: (35 + Math.random() * 10).toFixed(1),
        eth: (18 + Math.random() * 5).toFixed(1)
      }
    },
    signal: score > 0.75 ? "Strong Buy" : 
            score > 0.6 ? "Buy" : 
            score > 0.45 ? "Hold" : "Sell"
  };
};

const NEWS_SOURCES = [
  "Coindesk", "Cointelegraph", "Decrypt", "The Block", 
  "CryptoSlate", "Bitcoin Magazine", "Bankless"
];

const generateNews = () => {
  const topics = [
    "Bitcoin ETF", "Ethereum Upgrade", "Regulation News", 
    "DeFi Protocol", "NFT Market", "Layer 2", "CBDC"
  ];
  const sentiments = ["positive", "neutral", "negative"];
  
  return Array.from({ length: 8 }, (_, i) => ({
    id: Date.now() + i,
    title: `${topics[Math.floor(Math.random() * topics.length)]} ${
      ["approval", "rejection", "launch", "delay", "surge", "drop"][Math.floor(Math.random() * 6)]
    } expected as ${["SEC", "FED", "EU", "China"][Math.floor(Math.random() * 4)]} ${
      ["comments", "decides", "warns", "approves"][Math.floor(Math.random() * 4)]
    }`,
    source: NEWS_SOURCES[Math.floor(Math.random() * NEWS_SOURCES.length)],
    time: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
    sentiment: sentiments[Math.floor(Math.random() * sentiments.length)],
    url: "#"
  }));
};

const SentimentPage = () => {
  const [data, setData] = useState(generateSentiment());
  const [news, setNews] = useState(generateNews());
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
      setData(generateSentiment());
      setNews(generateNews());
      setLastUpdated(new Date());
      setLoading(false);
    }, 800);
  };

  // Auto-refresh every 2 minutes
  useEffect(() => {
    const interval = setInterval(refreshData, 120000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            📊 Real-Time Crypto Sentiment
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
        <button
          onClick={refreshData}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition"
        >
          <RotateCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Metrics */}
        <div className="space-y-6">
          {/* Sentiment Card */}
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              Market Sentiment
              <span className={`text-xs px-2 py-1 rounded ${
                data.label === "Bullish" ? 'bg-green-900/50 text-green-300' :
                data.label === "Bearish" ? 'bg-red-900/50 text-red-300' :
                'bg-gray-700 text-gray-300'
              }`}>
                {data.label}
              </span>
            </h2>
            <div className="flex items-end gap-2">
              <div className={`text-5xl font-bold ${
                data.score > 0.7 ? 'text-green-400' : 
                data.score < 0.4 ? 'text-red-400' : 'text-yellow-400'
              }`}>
                {(data.score * 100).toFixed(0)}
              </div>
              <div className="text-2xl text-gray-400 mb-1">/100</div>
            </div>
            <div className="mt-4">
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-red-400 via-yellow-400 to-green-400" 
                  style={{ width: `${data.score * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Bearish</span>
                <span>Neutral</span>
                <span>Bullish</span>
              </div>
            </div>
          </div>

          {/* Indicators Card */}
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-4">Market Indicators</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-gray-400 mb-1">
                  <span>Fear & Greed Index</span>
                  <span className="font-medium">{data.indicators.fear_greed}/100</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      data.indicators.fear_greed > 75 ? 'bg-green-500' :
                      data.indicators.fear_greed > 50 ? 'bg-yellow-500' :
                      data.indicators.fear_greed > 25 ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${data.indicators.fear_greed}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-gray-400 mb-1">
                  <span>RSI (14-day)</span>
                  <span className={`font-medium ${
                    data.indicators.rsi > 70 ? 'text-red-400' :
                    data.indicators.rsi < 30 ? 'text-green-400' : 'text-gray-300'
                  }`}>
                    {data.indicators.rsi}
                  </span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      data.indicators.rsi > 70 ? 'bg-red-500' :
                      data.indicators.rsi < 30 ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${(data.indicators.rsi / 100) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Oversold</span>
                  <span>Overbought</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-gray-400">24h Volume</div>
                  <div className="font-medium">{data.indicators.volume}</div>
                </div>
                <div>
                  <div className="text-gray-400">BTC Dominance</div>
                  <div className="font-medium">{data.indicators.dominance.btc}%</div>
                </div>
                <div>
                  <div className="text-gray-400">ETH Dominance</div>
                  <div className="font-medium">{data.indicators.dominance.eth}%</div>
                </div>
                <div>
                  <div className="text-gray-400">MACD</div>
                  <div className={`font-medium ${
                    data.indicators.macd === "Bullish" ? 'text-green-400' :
                    data.indicators.macd === "Bearish" ? 'text-red-400' : 'text-yellow-400'
                  }`}>
                    {data.indicators.macd}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trading Signal */}
          <div className={`rounded-xl p-6 border backdrop-blur-sm ${
            data.signal.includes('Buy') ? 'bg-green-900/20 border-green-700' :
            data.signal.includes('Sell') ? 'bg-red-900/20 border-red-700' :
            'bg-gray-800/50 border-gray-700'
          }`}>
            <h2 className="text-xl font-semibold mb-2">Trading Signal</h2>
            <div className="flex items-center justify-between">
              <div className={`text-2xl ${
                data.signal.includes('Buy') ? 'text-green-400' : 
                data.signal.includes('Sell') ? 'text-red-400' : 'text-yellow-400'
              } font-bold`}>
                {data.signal}
              </div>
              <div className="text-sm text-gray-400">
                {data.signal.includes('Buy') ? 'Accumulation Zone' :
                 data.signal.includes('Sell') ? 'Distribution Zone' : 'Neutral Territory'}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - News */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 backdrop-blur-sm h-full">
            <h2 className="text-xl font-semibold mb-4">Latest Market News</h2>
            <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2">
              {news.map(item => (
                <div key={item.id} className="pb-4 border-b border-gray-700 last:border-0 group">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-start gap-2">
                        <h3 className="font-medium group-hover:text-cyan-400 transition">
                          <a href={item.url} target="_blank" rel="noopener noreferrer">
                            {item.title}
                          </a>
                        </h3>
                        <span className={`px-2 py-1 text-xs rounded-full flex-shrink-0 ${
                          item.sentiment === 'positive' ? 'bg-green-900/50 text-green-300' :
                          item.sentiment === 'negative' ? 'bg-red-900/50 text-red-300' :
                          'bg-gray-700 text-gray-300'
                        }`}>
                          {item.sentiment}
                        </span>
                      </div>
                      <div className="mt-1 text-sm text-gray-400 flex items-center gap-2">
                        <span>{item.source}</span>
                        <span className="text-gray-600">•</span>
                        <span>{item.time}</span>
                      </div>
                    </div>
                    <button className="text-xs text-cyan-400 hover:text-cyan-300 transition sm:mt-0.5">
                      Read Full Story →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentimentPage;