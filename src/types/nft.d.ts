export interface NFTMetadata {
  moduleTitle: string;
  authorName: string;
  arweaveId: string; // Changed from ipfsHash to arweaveId
  moduleType: 'Free' | 'Paid';
  originalCreatorAddress: string;
  price: number; // in Sui's smallest unit (MIST)
  description?: string;
  category?: string;
  createdAt?: string;
}

export interface MintedNFT extends NFTMetadata {
  id: string;
  owner: string;
  mintedAt: string;
  transactionDigest?: string;
}

export interface WalletContextType {
  connected: boolean;
  address: string | null;
  balance: string;
  connect: () => void;
  disconnect: () => void;
  showWalletModal: boolean;
  setShowWalletModal: (show: boolean) => void;
}

export interface TransactionResult {
  success: boolean;
  digest?: string;
  error?: string;
  effects?: any;
}

export interface ArweaveUploadResult {
  id: string;
  size: number;
  url: string;
}

export interface ContractConfig {
  packageId: string;
  moduleName: string;
  network: 'testnet' | 'mainnet';
}