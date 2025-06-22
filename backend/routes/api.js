const express = require('express');
const router = express.Router();

const { getWalletTokens, getSolBalance } = require('../services/solana');
const { getTokenInfo, getTokenPrices } = require('../services/jupiter');

router.get('/wallet-tokens', async (req, res) => {
  const { wallet } = req.query;
  if (!wallet) return res.status(400).send("Missing wallet address");

  try {
    const [tokens, solBalance] = await Promise.all([
      getWalletTokens(wallet),
      getSolBalance(wallet)
    ]);

    res.json({ tokens, solBalance });
  } catch (err) {
    console.error("❌ Error in /wallet-tokens:", err);
    res.status(500).send("Error fetching wallet tokens");
  }
});

router.get('/token-info/:mint', async (req, res) => {
  try {
    const info = await getTokenInfo(req.params.mint);
    res.json(info);
  } catch (err) {
    console.error("❌ Error in /token-info:", err);
    res.status(500).send("Error fetching token info");
  }
});

router.get('/token-prices', async (req, res) => {
  const { mints } = req.query;
  if (!mints || mints.trim() === "") {
  return res.status(400).send("Missing or empty mints");
}

  try {
    const prices = await getTokenPrices(mints.split(','));
    res.json(prices);
  } catch (err) {
    console.error("❌ Error in /token-prices:", err);
    res.status(500).send("Error fetching token prices");
  }
});

module.exports = router;
