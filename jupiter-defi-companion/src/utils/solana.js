import axios from 'axios';

// Use a public RPC or your preferred Solana RPC provider
const RPC_URL = 'https://api.mainnet-beta.solana.com';

export async function getWalletTokens(walletAddress) {
  const body = {
    jsonrpc: "2.0",
    id: 1,
    method: "getTokenAccountsByOwner",
    params: [
      walletAddress,
      { programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA" },
      { encoding: "jsonParsed" }
    ]
  };

  const { data } = await axios.post(RPC_URL, body);
  const accounts = data.result?.value || [];

  return accounts.map(acc => ({
    mint: acc.account.data.parsed.info.mint,
    balanceUi: acc.account.data.parsed.info.tokenAmount.uiAmount
  }));
}
