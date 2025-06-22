import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import RoutesPage from './pages/RoutesPage';
import SentimentPage from './pages/SentimentPage';
import AdvancedPage from './pages/AdvancedPage';
import ChatPage from './pages/ChatPage';

function App() {
  return (
    <Router>
      <div className="bg-jupiterDark min-h-screen text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/routes" element={<RoutesPage />} />
          <Route path="/sentiment" element={<SentimentPage />} />
          <Route path="/advanced" element={<AdvancedPage />} />
          <Route path='/chat' element={<ChatPage />}></Route>
          {/* Later we will add: /portfolio, /routes, /advanced, /sentiment, /chat */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
