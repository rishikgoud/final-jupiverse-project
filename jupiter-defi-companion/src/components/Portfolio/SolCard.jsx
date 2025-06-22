import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

function SolCard({ solBalance, solPrice, wallet }) {
  const safeBalance = Number(solBalance) || 0;
  const safePrice = Number(solPrice) || 0;
  const value = (safeBalance * safePrice).toFixed(2);

  console.log("📌 SOL Balance:", safeBalance);
  console.log("📌 SOL Price:", safePrice);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-jupiterDark rounded-xl p-4 shadow-lg border border-jupiterCyan/20 transition w-full"
    >
      <div className="flex items-center space-x-3">
        <img
          src="https://imgs.search.brave.com/YS5SRSKbf78_O4KiIy_a1knTHJmKdeoCr1cEr9JiXqI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vYkRoeG5i/OXhYM2ZhX0RCQlpr/NV9xYVhmRFp4Q09N/bTlQSGtxbWNFekFF/cy9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTlw/Yldkei9Mbk5sWVhK/amFDNWljbUYyL1pT/NWpiMjB2VkdkaVdW/ZGovZEUxQlVISkpY/MWRUYkd4MS9OM0Ez/YmxBNWMwbFpVVkJ0/L1EzTmpXbTVFUjNs/RlJITTUvVFM5eWN6/cG1hWFE2TlRZdy9P/ak15TURveE9qQXZa/enBqL1pTOWhTRkl3/WTBoTk5reDUvT1RG/alIzaDJMMWxYVVhW/ay9NbXh5WVZjeGJG/cEhiR2d2L1RHMDVl/VnA1T1ROaFYzUncv/WTBkV2F5OWhWMFYy/V2xjMC9kbGxwT1ds/UFV6bFVMMkl5L2VH/aGliVVptWWtjNWJt/SjUvTlhjdlltMWou/anBlZw"
          alt="SOL"
          className="w-10 h-10 rounded-full shadow-md"
        />
        <div>
          <h3 className="text-lg font-bold text-white">SOL</h3>
          <p className="text-sm text-gray-400">Solana</p>
        </div>
      </div>

      <div className="mt-3 text-gray-300 text-sm">
        <p>💰 <span className="text-white">{safeBalance.toFixed(4)} SOL</span></p>
        <p>💵 <span className="text-white">${value}</span></p>
        <p>📈 <span className="text-white">${safePrice.toFixed(4)}</span></p>
      </div>

      <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <span className="inline-block px-2 py-1 text-xs rounded-full bg-jupiterCyan/20 text-jupiterCyan w-fit">
          Investor
        </span>

        {wallet && (
          <a
            href={`https://solscan.io/account/${wallet}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center text-jupiterCyan text-xs hover:underline"
          >
            Solscan <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default SolCard;
