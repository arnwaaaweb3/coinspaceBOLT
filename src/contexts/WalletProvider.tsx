import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WalletKitProvider, ConnectModal, useWalletKit } from '@mysten/wallet-kit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a query client
const queryClient = new QueryClient();

interface WalletContextType {
  connected: boolean;
  address: string | null;
  balance: string;
  connect: () => void;
  disconnect: () => void;
  showWalletModal: boolean;
  setShowWalletModal: (show: boolean) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

// Inner provider that uses wallet kit hooks
const InnerWalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [balance, setBalance] = useState('0');
  
  const { currentAccount, disconnect } = useWalletKit();
  
  const connected = !!currentAccount;
  const address = currentAccount?.address || null;

  // Update balance when account changes
  useEffect(() => {
    if (address) {
      // In a real app, you'd fetch the actual balance here
      setBalance('0.00');
    } else {
      setBalance('0');
    }
  }, [address]);

  const handleConnect = () => {
    setShowWalletModal(true);
  };

  const handleDisconnect = () => {
    disconnect();
    setBalance('0');
  };

  const handleCloseModal = () => {
    setShowWalletModal(false);
  };

  const value: WalletContextType = {
    connected,
    address,
    balance,
    connect: handleConnect,
    disconnect: handleDisconnect,
    showWalletModal,
    setShowWalletModal
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
      <ConnectModal 
        open={showWalletModal} 
        onOpenChange={setShowWalletModal}
        onClose={handleCloseModal}
      />
    </WalletContext.Provider>
  );
};

// Main provider that wraps everything
export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <WalletKitProvider>
        <InnerWalletProvider>
          {children}
        </InnerWalletProvider>
      </WalletKitProvider>
    </QueryClientProvider>
  );
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};