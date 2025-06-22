import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Shuffle, TrendingUp, Smile } from 'lucide-react';
import { motion } from 'framer-motion';

function FeatureCards() {
  const features = [
    {
      title: 'Portfolio Analyzer',
      description: 'Assess your portfolio risk and token safety at a glance.',
      link: '/portfolio',
      icon: <ShieldCheck className="w-10 h-10 text-jupiterCyan mb-3" />
    },
    {
      title: 'Route Visualizer',
      description: 'See the exact swap routes and liquidity pools used.',
      link: '/routes',
      icon: <Shuffle className="w-10 h-10 text-jupiterCyan mb-3" />
    },
    {
      title: 'Advanced Trading',
      description: 'Place limit orders and set up DCA easily.',
      link: '/advanced',
      icon: <TrendingUp className="w-10 h-10 text-jupiterCyan mb-3" />
    },
    {
      title: 'Sentiment Insights',
      description: 'Analyze market sentiment from news & social trends.',
      link: '/sentiment',
      icon: <Smile className="w-10 h-10 text-jupiterCyan mb-3" />
    },
  ];

  return (

    <section id="features" className="max-w-7xl mx-auto mt-20">
  {/* Section title outside the grid */}
  <h2 className="text-center text-3xl md:text-4xl font-bold mb-8 text-jupiterCyan">
  🚀 Key Features of CoinVerse
</h2>


  {/* Grid of cards */}
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
    {features.map((feature) => (
      <Link key={feature.title} to={feature.link}>
        <motion.div
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 20px rgba(34, 211, 238, 0.3)",
          }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 200, damping: 10 }}
          className="p-6 rounded-xl bg-gradient-to-br from-[#1e1b4b] to-[#111827] hover:from-jupiterHoverFrom hover:to-jupiterHoverTo shadow-lg flex flex-col items-center text-center"
        >
          {feature.icon}
          <h4 className="text-xl font-bold mb-2 text-white">
            {feature.title}
          </h4>
          <p className="text-gray-400">
            {feature.description}
          </p>
        </motion.div>
      </Link>
    ))}
  </div>
</section>
  );
}

export default FeatureCards;
