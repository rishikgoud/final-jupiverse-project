import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, TrendingUp, Layers3 } from 'lucide-react';

function WhyCoinVerse() {
  const points = [
    {
      icon: <ShieldCheck className="w-10 h-10 text-jupiterCyan mb-3" />,
      title: 'Secure & Verified',
      description: 'All tokens and routes are validated using Shield API for maximum safety.'
    },
    {
      icon: <Zap className="w-10 h-10 text-jupiterCyan mb-3" />,
      title: 'Lightning Fast Analytics',
      description: 'Instant portfolio analysis and swap visualization powered by Jupiter APIs.'
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-jupiterCyan mb-3" />,
      title: 'Smart Trading',
      description: 'Limit orders, DCA, and swap routing at your fingertips with a modern UI.'
    },
    {
      icon: <Layers3 className="w-10 h-10 text-jupiterCyan mb-3" />,
      title: 'Unified DeFi Experience',
      description: 'One app. All the power of Solana DeFi tools combined for you.'
    },
  ];

  return (
    <section className="max-w-7xl mx-auto mt-16 px-4">
      <h2 className="text-center text-3xl md:text-4xl font-bold mb-12 text-jupiterCyan">
        🌟 Why Choose CoinVerse?
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {points.map((point, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            // transition={{ duration: 0.6, delay: idx * 0.2 }}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 20px rgba(34, 211, 238, 0.3)',
            }}
            className="p-6 rounded-xl bg-gradient-to-br from-[#1e1b4b] to-[#111827] hover:from-jupiterHoverFrom hover:to-jupiterHoverTo shadow-lg flex flex-col items-center text-center transition"
          >
            {point.icon}
            <h4 className="text-xl font-bold mb-2 text-white">
              {point.title}
            </h4>
            <p className="text-gray-400">
              {point.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default WhyCoinVerse;
