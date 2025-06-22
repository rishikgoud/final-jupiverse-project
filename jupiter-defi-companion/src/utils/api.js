import axios from 'axios';

const API_BASE = 'https://coinverse-backend.onrender.com/api';  

export async function fetchWalletTokens(wallet) {
  const { data } = await axios.get(`${API_BASE}/wallet-tokens`, {
    params: { wallet }
  });
  return data;
}

export async function fetchTokenInfo(mint) {
  const { data } = await axios.get(`${API_BASE}/token-info/${mint}`);
  return data;
}

export async function fetchTokenPrices(mints) {
  const { data } = await axios.get(`${API_BASE}/token-prices`, {
    params: { mints: mints.join(',') }
  });
  return data;
}
