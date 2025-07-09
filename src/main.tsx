import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { WalletProvider } from './contexts/WalletProvider';
import App from './App';
import './styles/globals.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <WalletProvider>
          <App />
        </WalletProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>
);