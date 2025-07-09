import React from 'react';
import Header from '../components/Header';
import HeroPanel from '../components/HeroPanel';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fef4ea]">
      <Header />
      <main>
        <HeroPanel />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;