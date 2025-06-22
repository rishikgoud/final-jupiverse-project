import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Mail } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-jupiterDark text-gray-300 pt-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 grid gap-8 md:grid-cols-3">
        
        {/* Logo + Tagline */}
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-jupiterCyan bg-clip-text text-transparent">
            CoinVerse
          </h2>
          <p className="mt-2 text-sm">
            Your gateway to safe and smart Solana DeFi trading.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col space-y-2">
          <Link to="/" className="hover:text-jupiterCyan transition">Home</Link>
          <Link to="/portfolio" className="hover:text-jupiterCyan transition">Portfolio</Link>
          <Link to="/routes" className="hover:text-jupiterCyan transition">Routes</Link>
          <Link to="/advanced" className="hover:text-jupiterCyan transition">Advanced</Link>
          <Link to="/chat" className="hover:text-jupiterCyan transition">Chat</Link>
        </div>

        {/* Contact + Social */}
        <div>
          <p className="mb-2">Contact us:</p>
          <a href="mailto:support@coinverse.com" className="flex items-center gap-2 hover:text-jupiterCyan transition">
            <Mail className="w-4 h-4" /> support@coinverse.com
          </a>
          <div className="flex space-x-4 mt-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-jupiterCyan transition">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-jupiterCyan transition">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>

      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} CoinVerse. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
