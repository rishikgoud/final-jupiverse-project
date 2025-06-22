  import React, { useState, useEffect } from 'react';
  import { fetchWalletTokens, fetchTokenInfo, fetchTokenPrices } from '../utils/api';
  import WalletQuickInput from '../components/Portfolio/WalletQuickInput';
  import SolCard from '../components/Portfolio/SolCard';
  import TokenCard from '../components/Portfolio/TokenCard';
  import PortfolioPieChart from '../components/Portfolio/PortfolioPieChart';
  import PortfolioHistoryChart from '../components/Portfolio/PortfolioHistoryChart';
  import PortfolioTable from '../components/Portfolio/PortfolioTable';
  import PriceAlerts from '../components/Portfolio/PriceAlerts';
  import { RotateCw } from 'lucide-react';
  import { exportCSV, exportPDF } from '../utils/exportUtils';

  const defaultThresholds = { SOL: 100, USDC: 1, BTC: 30000 };

  function PortfolioPage() {
    const [wallet, setWallet] = useState('');
    const [tokens, setTokens] = useState([]);
    const [solBalance, setSolBalance] = useState(0);
    const [solPrice, setSolPrice] = useState(0);
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState([]);
    const [customThresholds, setCustomThresholds] = useState(defaultThresholds);
    const [hasTriedLoading, setHasTriedLoading] = useState(false);

    const handleThresholdChange = (symbol, value) => {
      setCustomThresholds(prev => ({
        ...prev,
        [symbol]: parseFloat(value) || 0
      }));
    };

    const loadTokens = async () => {
      if (!wallet) return;
      setLoading(true);
      setHasTriedLoading(true);
      try {
        const { tokens: rawTokens, solBalance: fetchedSolBalance } = await fetchWalletTokens(wallet);
        setSolBalance(Number(fetchedSolBalance) || 0);

        const solPriceData = await fetchTokenPrices(["So11111111111111111111111111111111111111112"]);
        const fetchedSolPrice = Number(solPriceData["So11111111111111111111111111111111111111112"]?.price) || 0;
        setSolPrice(fetchedSolPrice);

        const mints = rawTokens.map(t => t.mint);
        let priceData = {};
        let tokenInfoList = [];

        if (mints.length > 0) {
          [priceData, tokenInfoList] = await Promise.all([
            fetchTokenPrices(mints),
            Promise.all(mints.map(fetchTokenInfo))
          ]);
        }

        const enrichedTokens = rawTokens.map((t, i) => {
          const price = Number(priceData[t.mint]?.price) || 0;
          const symbol = tokenInfoList[i]?.symbol || "Unknown";
          const name = tokenInfoList[i]?.name || "Unknown Token";

          return {
            ...t,
            symbol,
            name,
            price,
            value: price * (t.balanceUi || 0),
            riskLabel: price < 0.001 ? 'Degen' : price > 10 ? 'Investor' : 'Normie'
          };
        });

        setTokens(enrichedTokens);

        const total = (fetchedSolBalance * fetchedSolPrice) + enrichedTokens.reduce((sum, t) => sum + (t.value || 0), 0);
        setHistory(prev => [
          ...prev.slice(-19),
          { time: Math.floor(Date.now() / 1000), value: total }
        ]);
      } catch (err) {
        console.error("❌ Error loading tokens", err);
        setTokens([]);
        setSolBalance(0);
        setSolPrice(0);
      } finally {
        setLoading(false);
      }
    };

    const pollPrices = async () => {
      try {
        const solPriceData = await fetchTokenPrices(["So11111111111111111111111111111111111111112"]);
        const fetchedSolPrice = Number(solPriceData["So11111111111111111111111111111111111111112"]?.price) || 0;
        setSolPrice(fetchedSolPrice);

        if (tokens.length > 0) {
          const mints = tokens.map(t => t.mint);
          const priceData = await fetchTokenPrices(mints);

          const updatedTokens = tokens.map(t => {
            const newPrice = Number(priceData[t.mint]?.price) || t.price || 0;
            return {
              ...t,
              price: newPrice,
              value: newPrice * (t.balanceUi || 0),
              riskLabel: newPrice < 0.001 ? 'Degen' : newPrice > 10 ? 'Investor' : 'Normie'
            };
          });

          setTokens(updatedTokens);

          const total = (solBalance * fetchedSolPrice) + updatedTokens.reduce((sum, t) => sum + (t.value || 0), 0);
          setHistory(prev => [
            ...prev.slice(-19),
            { time: Math.floor(Date.now() / 1000), value: total }
          ]);
        }
      } catch (err) {
        console.error("❌ Error polling prices", err);
      }
    };

    useEffect(() => {
      if (!wallet) return;
      loadTokens();
      const tokenInterval = setInterval(loadTokens, 60000);
      const priceInterval = setInterval(pollPrices, 5000);
      return () => {
        clearInterval(tokenInterval);
        clearInterval(priceInterval);
      };
    }, [wallet,loadTokens, pollPrices]);

    const totalValue = (solBalance * solPrice) + tokens.reduce((sum, t) => sum + (t.value || 0), 0);
    const pieData = [
      { name: "SOL", value: Math.max(solBalance * solPrice, 0.01), realValue: solBalance * solPrice },
      ...tokens.map(t => ({
        name: t.symbol,
        value: Math.max(t.value, 0.01),
        realValue: t.value
      }))
    ];
    const riskSummary = tokens.reduce((acc, t) => {
      acc[t.riskLabel] = (acc[t.riskLabel] || 0) + 1;
      return acc;
    }, {});

    return (
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-jupiterCyan">📊 Your Portfolio Overview</h1>
          <button
            type="button"
            onClick={loadTokens}
            disabled={loading}
            className="flex items-center gap-1 px-3 py-1 bg-jupiterCyan/20 text-jupiterCyan rounded hover:bg-jupiterCyan/30 transition"
          >
            <RotateCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        <WalletQuickInput onWalletSubmit={setWallet} />

        {loading && <p className="text-gray-400 mt-4">Loading token data...</p>}

        {!loading && hasTriedLoading && tokens.length === 0 && solBalance === 0 ? (
          <>
            <div className="bg-jupiterDark rounded-xl p-6 shadow-lg border border-jupiterCyan/20 text-center text-gray-400">
              <h2 className="text-xl font-bold text-jupiterCyan mb-2">No data found</h2>
              <p>Please enter a valid wallet or refresh to try again.</p>
              <button
                onClick={loadTokens}
                className="mt-3 inline-block px-3 py-1 bg-jupiterCyan/20 text-jupiterCyan rounded hover:bg-jupiterCyan/30 transition"
              >
                Retry
              </button>
            </div>
            <PortfolioPieChart data={[]} />
            <PortfolioHistoryChart history={[]} />
          </>
        ) : null}

        {!loading && tokens.length + solBalance > 0 && (
          <>
            <div className="mt-4 text-white">
              <p className="text-lg">
                💼 Total Portfolio Value:
                <span className="text-jupiterCyan ml-1">${Number(totalValue).toFixed(2)}</span>
              </p>
              <p className="text-sm text-gray-400">
                Assets: {tokens.length + 1} (including SOL)
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
              <SolCard solBalance={solBalance} solPrice={solPrice} wallet={wallet} alertThreshold={customThresholds.SOL} />
              {tokens.map((t) => (
                <TokenCard key={t.mint} token={t} wallet={wallet} alertThreshold={customThresholds[t.symbol]} />
              ))}
            </div>

            <PortfolioPieChart data={pieData} />

            <div className="text-sm text-gray-400 mt-2">
              {Object.entries(riskSummary).map(([key, count]) => (
                <span key={key} className="inline-block bg-jupiterCyan/20 text-jupiterCyan px-2 py-1 rounded-full mr-2 mb-1">
                  {key}: {count} token{count > 1 ? 's' : ''}
                </span>
              ))}
            </div>

            <PortfolioHistoryChart history={history} />

            <PortfolioTable 
              solBalance={solBalance}
              solPrice={solPrice}
              tokens={tokens}
              customThresholds={customThresholds}
              onExportCSV={() => exportCSV(solBalance, solPrice, tokens)}
              onExportPDF={() => exportPDF(solBalance, solPrice, tokens, customThresholds, totalValue)}
            />

            <PriceAlerts 
              tokens={tokens} 
              customThresholds={customThresholds}
              handleThresholdChange={handleThresholdChange}
            />
          </>
        )}
      </section>
    );
  }

  export default PortfolioPage;
