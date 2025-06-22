import React, { useState } from 'react';

function WalletQuickInput({ onWalletSubmit }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onWalletSubmit(input.trim());
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex flex-col sm:flex-row gap-2 mt-4"
    >
      <input
        type="text"
        placeholder="Enter Solana Wallet Address"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full sm:flex-1 px-4 py-2 rounded-lg bg-jupiterDark text-white placeholder-gray-500 border border-jupiterCyan focus:outline-none"
      />
      <button
        type="submit"
        className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-jupiterHoverFrom to-jupiterHoverTo text-white rounded-lg hover:from-jupiterPurple hover:to-jupiterCyan transition"
      >
        Load
      </button>
    </form>
  );
}

export default WalletQuickInput;
