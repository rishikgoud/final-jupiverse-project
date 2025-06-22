import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

function TokenCard({ token, wallet }) {
  console.log("📌 Tokens Array:", token);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-jupiterDark rounded-xl p-4 shadow-lg border border-jupiterCyan/20 transition w-full"
    >
      <div className="flex flex-wrap items-center gap-3">
        {token.logoURI ? (
          <img
            src={token.logoURI}
            alt={token.symbol}
            className="w-10 h-10 rounded-full shadow-md"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-jupiterCyan/20 flex items-center justify-center text-jupiterCyan">
            {token.symbol?.charAt(0)}
          </div>
        )}
        <div className="min-w-0">
          <h3 className="text-lg font-bold text-white truncate">{token.symbol || 'Unknown'}</h3>
          <p className="text-sm text-gray-400 truncate">{token.name || 'N/A'}</p>
        </div>
      </div>

      <div className="mt-3 text-gray-300 text-sm space-y-1">
        <p>💰 <span className="text-white">{token.balanceUi?.toFixed(4) || 0}</span></p>
        <p>💵 <span className="text-white">${token.value?.toFixed(2) || 0}</span></p>
        <p>📈 <span className="text-white">${token.price?.toFixed(4) || 'N/A'}</span></p>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <span className="inline-block px-2 py-1 text-xs rounded-full bg-jupiterCyan/20 text-jupiterCyan">
          {token.riskLabel || 'Investor'}
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

export default TokenCard;
