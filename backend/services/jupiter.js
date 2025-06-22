const axios = require('axios');

async function getTokenInfo(mint) {
  const { data } = await axios.get(`https://lite-api.jup.ag/tokens/v1/token/${mint}`);
  return data;
}

async function getTokenPrices(mints) {
  const { data } = await axios.get(`https://lite-api.jup.ag/price/v2`, {
    params: { ids: mints.join(',') }
  });
  return data;
}

module.exports = { getTokenInfo, getTokenPrices };
