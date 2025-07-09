import React, { useState } from 'react';
import { Wallet, Copy, ExternalLink, LogOut, ChevronDown } from 'lucide-react';
import { useWallet } from '../contexts/WalletProvider';

interface CustomConnectButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showBalance?: boolean;
}

const CustomConnectButton: React.FC<CustomConnectButtonProps> = ({ 
  variant = 'primary',
  size = 'md',
  className = '',
  showBalance = false
}) => {
  const { connected, address, balance, connect, disconnect } = useWallet();
  const [copied, setCopied] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleCopyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-2 text-sm';
      case 'lg':
        return 'px-6 py-3 text-lg';
      default:
        return 'px-4 py-2.5 text-base';
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-[#ff7f3e] hover:bg-gradient-to-r hover:from-[#604cc3] hover:to-[#ff7f3e] text-white';
      case 'outline':
        return 'bg-transparent border-2 border-[#604cc3] text-[#604cc3] hover:bg-gradient-to-r hover:from-[#604cc3] hover:to-[#ff7f3e] hover:text-white hover:border-transparent';
      default:
        return 'bg-[#604cc3] hover:bg-gradient-to-r hover:from-[#604cc3] hover:to-[#ff7f3e] text-white';
    }
  };

  if (connected && address) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className={`
            inline-flex items-center gap-2 rounded-lg font-semibold transition-all duration-300 
            bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 text-green-700
            hover:from-green-100 hover:to-blue-100 hover:border-green-300
            ${getSizeClasses()} ${className}
          `}
        >
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="font-mono">{formatAddress(address)}</span>
          {showBalance && (
            <span className="text-xs opacity-75">({balance} SUI)</span>
          )}
          <ChevronDown size={16} className={`transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown Menu */}
        {showDropdown && (
          <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Connected</span>
              </div>
              <div className="font-mono text-sm text-gray-600 break-all">
                {address}
              </div>
              {showBalance && (
                <div className="text-sm text-gray-500 mt-1">
                  Balance: {balance} SUI
                </div>
              )}
            </div>
            
            <div className="p-2">
              <button
                onClick={handleCopyAddress}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Copy size={16} />
                {copied ? 'Copied!' : 'Copy Address'}
              </button>
              
              <button
                onClick={() => window.open(`https://suiexplorer.com/address/${address}`, '_blank')}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <ExternalLink size={16} />
                View on Explorer
              </button>
              
              <hr className="my-2" />
              
              <button
                onClick={() => {
                  disconnect();
                  setShowDropdown(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut size={16} />
                Disconnect
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={connect}
      className={`
        inline-flex items-center gap-2 rounded-lg font-semibold transition-all duration-300 
        transform hover:scale-105 hover:shadow-lg group overflow-hidden relative
        ${getVariantClasses()} ${getSizeClasses()} ${className}
      `}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#604cc3] to-[#ff7f3e] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center gap-2">
        <Wallet size={size === 'lg' ? 20 : size === 'sm' ? 16 : 18} />
        <span className="transform group-hover:translate-x-1 transition-transform duration-300">
          Connect Wallet
        </span>
      </div>
      
      {/* Slide effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
    </button>
  );
};

export default CustomConnectButton;