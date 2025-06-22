const axios = require('axios');
const RPC_URL = 'https://api.mainnet-beta.solana.com'; // You can replace with Helius if needed

async function getWalletTokens(walletAddress) {
  const body = {
    jsonrpc: "2.0",
    id: 1,
    method: "getTokenAccountsByOwner",
    params: [
      walletAddress,
      { programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA" },
      { encoding: "jsonParsed", commitment: "confirmed" }
    ]
  };

  try {
    const { data } = await axios.post(RPC_URL, body);

    console.log("📌 RPC raw response:", JSON.stringify(data, null, 2));

    const accounts = data.result?.value || [];

    return accounts.map(acc => {
      const info = acc.account?.data?.parsed?.info;
      const mint = info?.mint || "Unknown";
      const balanceUi = info?.tokenAmount?.uiAmount || 0;

      return { mint, balanceUi };
    }).filter(t => t.mint !== "Unknown");
    
  } catch (err) {
    console.error("❌ RPC call failed:", err);
    return [];
  }
}
async function getSolBalance(walletAddress) {
  const body = {
    jsonrpc: "2.0",
    id: 1,
    method: "getBalance",
    params: [walletAddress, { commitment: "confirmed" }]
  };

  const { data } = await axios.post(RPC_URL, body);
  const lamports = data.result?.value || 0;
  const sol = lamports / 1e9;
  return sol;
}

module.exports = { getWalletTokens, getSolBalance  };
