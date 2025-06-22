const express = require('express');
const router = express.Router();
const sentimentService = require('../services/sentimentService');

router.get('/sentiment', async (req, res) => {
  try {
    const sentiment = await sentimentService.getMarketSentiment();
    res.json(sentiment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/news', async (req, res) => {
  try {
    const news = await sentimentService.getCryptoNews();
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;