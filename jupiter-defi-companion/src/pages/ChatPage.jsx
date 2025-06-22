import React, { useState, useEffect, useRef } from 'react';
import { Send, ArrowRight, BookOpen, Shield, BarChart2, DollarSign, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Knowledge Base for the Chatbot
const CHATBOT_KNOWLEDGE = [
  {
    question: /(what|how).*portfolio risk/i,
    answer: "Our Portfolio Risk Analyzer evaluates your token balances using Shield API to give you a risk score: 🛡️ Normie (safe), ⚖️ Investor (balanced), or 🎯 Degen (high risk).",
    link: "/portfolio",
    icon: <Shield className="w-5 h-5 text-purple-400" />
  },
  {
    question: /(how.*swap|best route)/i,
    answer: "The Swap Route Visualizer shows you optimal paths across AMMs and pools with fee estimates. Try it in our Swap section!",
    link: "/swap",
    icon: <BarChart2 className="w-5 h-5 text-blue-400" />
  },
  {
    question: /(limit order|DCA|dollar cost averaging)/i,
    answer: "We support configurable limit orders and DCA strategies. Set your parameters and execute when conditions are met.",
    link: "/advanced",
    icon: <DollarSign className="w-5 h-5 text-green-400" />
  },
  {
    question: /(sentiment|market mood|news)/i,
    answer: "Real-time sentiment analysis tracks crypto news and social trends. Check the Sentiment dashboard for bullish/bearish signals.",
    link: "/sentiment",
    icon: <BookOpen className="w-5 h-5 text-amber-400" />
  },
  {
    question: /(features|what can you do)/i,
    answer: "I help with: Portfolio Risk Analysis, Swap Routing, Limit Orders, Market Sentiment, and answering trading questions!",
    link: null,
    icon: <HelpCircle className="w-5 h-5 text-cyan-400" />
  }
];

// Fallback learning resources
const LEARNING_RESOURCES = {
  risk: { url: "/learn/risk-management", title: "Risk Management Guide" },
  swaps: { url: "/learn/amm-mechanics", title: "AMM Swap Mechanics" },
  orders: { url: "/learn/advanced-trading", title: "Limit Order Strategies" },
  general: { url: "/learn/crypto-basics", title: "Crypto Trading 101" }
};

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hi! I'm your Crypto Trading Assistant. Ask me about portfolio risk, swaps, or market sentiment!", 
      sender: 'bot',
      icon: <HelpCircle className="w-5 h-5 text-cyan-400" />
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    // Add user message
    const userMsg = { 
      id: messages.length + 1, 
      text: input, 
      sender: 'user' 
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Bot response after delay
    setTimeout(() => {
      const botResponse = generateResponse(input);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const generateResponse = (query) => {
    // Check knowledge base first
    for (const item of CHATBOT_KNOWLEDGE) {
      if (item.question.test(query)) {
        return {
          id: messages.length + 2,
          text: item.answer,
          sender: 'bot',
          link: item.link,
          icon: item.icon
        };
      }
    }

    // Fallback response with learning resource
    const topic = 
      query.includes('risk') ? 'risk' :
      query.includes('swap') ? 'swaps' :
      query.includes('order') ? 'orders' : 'general';
    
    const resource = LEARNING_RESOURCES[topic];

    return {
      id: messages.length + 2,
      text: `I don't have a precise answer, but check out our ${resource.title} for detailed information.`,
      sender: 'bot',
      link: resource.url,
      icon: <BookOpen className="w-5 h-5 text-gray-400" />
    };
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 h-screen flex flex-col">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6">
        💬 Crypto Trading Assistant
      </h1>

      {/* Chat Container */}
      <div className="flex-1 flex flex-col bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden backdrop-blur-sm">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-4 py-3 flex items-start gap-3 ${
                    msg.sender === 'user'
                      ? 'bg-cyan-600/90 text-white'
                      : 'bg-gray-700/80 text-gray-100'
                  }`}
                >
                  {msg.icon && <div className="mt-0.5">{msg.icon}</div>}
                  <div>
                    <p>{msg.text}</p>
                    {msg.link && (
                      <a
                        href={msg.link}
                        className="mt-2 inline-flex items-center text-xs text-cyan-300 hover:text-cyan-200 transition"
                      >
                        Learn more <ArrowRight className="w-3 h-3 ml-1" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-gray-700/80 text-gray-100 rounded-xl px-4 py-3 flex items-center gap-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span>Thinking...</span>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form 
          onSubmit={handleSend} 
          className="border-t border-gray-700 p-4 bg-gray-800/30"
        >
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about swaps, risk, or market trends..."
              className="w-full bg-gray-700/50 border border-gray-600 rounded-full pl-5 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 transition"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full transition ${
                input.trim() 
                  ? 'bg-cyan-500 hover:bg-cyan-600 text-white'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;