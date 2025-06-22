import React from 'react';
import HomeHero from '../components/Home/HomeHero';
import WalletQuickInput from '../components/Home/WalletQuickInput';
import WhyCoinVerse from '../components/Home/WhyCoinVerse';
import FeatureCards from '../components/Home/FeatureCards';
import Footer from '../components/Home/Footer';
function HomePage() {
  return (
    <div className="p-6">
      <HomeHero />
      <WalletQuickInput />
      <FeatureCards />
      <WhyCoinVerse />
      <Footer />
    </div>
  );
}

export default HomePage;
