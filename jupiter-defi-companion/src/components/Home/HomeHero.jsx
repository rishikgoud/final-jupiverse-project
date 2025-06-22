import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Zap } from 'lucide-react';  // Decorative icons

function HomeHero() {
  return (
    <section className="relative py-16 flex justify-center mt-14">
      {/* Light Background Box */}
      <div className="absolute inset-0 max-w-5xl mx-auto rounded-2xl bg-white/4 backdrop-blur-sm shadow-lg shadow-jupiterCyan/10 z-0"></div>

      {/* Decorative Icons */}
      <Star className="absolute top-6 left-6 w-10 h-10 text-jupiterCyan/20 animate-pulse" />
      <Zap className="absolute bottom-6 right-6 w-10 h-10 text-jupiterCyan/20 animate-ping" />
      <Star className="absolute top-6 right-20 w-10 h-10 text-jupiterCyan/20 animate-ping" />
      <Zap className="absolute bottom-6 left-20 w-10 h-10 text-jupiterCyan/20 animate-pulse" />
      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl px-4">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-jupiterHoverFrom to-jupiterHoverTo bg-clip-text text">
          Welcome to CoinVerse
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-300">
          Visualize. Analyze. Trade. Stay safe in Solana DeFi.
        </p>
        <div className="mt-6 flex flex-col md:flex-row justify-center gap-4">
  <Link to="/portfolio">
    <button className="px-6 py-3 bg-gradient-to-r from-jupiterHoverFrom to-jupiterHoverTo hover:from-jupiterPurple hover:to-jupiterCyan text-white rounded-xl transition duration-300 shadow-lg">
      Start Exploring 🚀
    </button>
  </Link>

  <a href="#features">
    <button className="px-6 py-3 bg-gradient-to-r from-jupiterHoverFrom to-jupiterHoverTo hover:from-jupiterPurple hover:to-jupiterCyan text-white rounded-xl transition duration-300 shadow-lg">
      Explore Features ↓
    </button>
  </a>
</div>
      </div>
    </section>
  );
}

export default HomeHero;
