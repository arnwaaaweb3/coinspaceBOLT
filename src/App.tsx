import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './app/page';
import Dashboard from './app/dashboard';
import MintPage from './app/mint';
import CreateModulePage from './app/create';
import LibraryPage from './app/library';
import AboutPage from './app/about';
import FAQPage from './app/faq';
import BackButton from './components/BackButton';

// Placeholder components for other routes
const PricingPage = () => (
  <div className="min-h-screen bg-[#fef4ea] flex items-center justify-center">
    <BackButton />
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Pricing</h1>
      <p className="text-gray-600">Pricing plans coming soon</p>
    </div>
  </div>
);

const TutorialsPage = () => (
  <div className="min-h-screen bg-[#fef4ea] flex items-center justify-center">
    <BackButton />
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Tutorials</h1>
      <p className="text-gray-600">Learning tutorials coming soon</p>
    </div>
  </div>
);

const TermsPage = () => (
  <div className="min-h-screen bg-[#fef4ea] flex items-center justify-center">
    <BackButton />
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Terms and Conditions</h1>
      <p className="text-gray-600">Terms and conditions will be displayed here</p>
    </div>
  </div>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/mint" element={<MintPage />} />
      <Route path="/create" element={<CreateModulePage />} />
      <Route path="/library" element={<LibraryPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/tutorials" element={<TutorialsPage />} />
      <Route path="/terms-conditions" element={<TermsPage />} />
    </Routes>
  );
}

export default App;