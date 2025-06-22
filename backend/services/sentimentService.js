const axios = require('axios');
require('dotenv').config();

const CRYPTO_COMPARE_API_KEY = process.env.CRYPTO_COMPARE_API_KEY;
const NEWS_API_KEY = process.env.NEWS_API_KEY;

async function getMarketSentiment() {
  try {
    // Using CryptoCompare API for sentiment data
    const response = await axios.get(
      'https://min-api.cryptocompare.com/data/tradingsignals/intotheblock/latest',
      {
        params: {
          fsym: 'SOL',
          api_key: CRYPTO_COMPARE_API_KEY
        }
      }
    );
    
    const sentimentData = response.data.Data;
    return {
      overallSentiment: sentimentData.sentiment > 0.5 ? 'positive' : 
                       sentimentData.sentiment < -0.5 ? 'negative' : 'neutral',
      score: sentimentData.sentiment,
      timestamp: Date.now()
    };
  } catch (error) {
    console.error('Error fetching sentiment:', error);
    throw new Error('Failed to fetch market sentiment');
  }
}

async function getCryptoNews() {
  try {
    // Using NewsAPI for crypto news
    const response = await axios.get(
      'https://newsapi.org/v2/everything',
      {
        params: {
          q: 'Solana OR SOL',
          apiKey: NEWS_API_KEY,
          sortBy: 'publishedAt',
          pageSize: 5
        }
      }
    );
    
    return response.data.articles.map(article => ({
      title: article.title,
      description: article.description,
      url: article.url,
      source: article.source.name,
      publishedAt: article.publishedAt,
      imageUrl: article.urlToImage
    }));
  } catch (error) {
    console.error('Error fetching news:', error);
    throw new Error('Failed to fetch crypto news');
  }
}

module.exports = {
  getMarketSentiment,
  getCryptoNews
};
