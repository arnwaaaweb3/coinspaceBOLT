import { NFTMetadata } from '../types/nft';

export interface MintNFTParams {
  metadata: NFTMetadata;
  walletAddress: string;
  signAndExecuteTransaction: (transaction: any) => Promise<any>;
}

export interface MintResult {
  success: boolean;
  transactionDigest?: string;
  nftId?: string;
  error?: string;
}

// Mock Arweave upload function
export const uploadToArweave = async (file: File): Promise<string> => {
  // In a real implementation, this would upload to Arweave
  // For now, we'll return a mock transaction ID
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockArweaveId = 'AR_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      resolve(mockArweaveId);
    }, 2000);
  });
};

// Check if Arweave transaction ID already exists (prevent duplicates)
export const checkDuplicateArweaveId = async (arweaveId: string): Promise<boolean> => {
  // In a real implementation, this would query the blockchain
  // For now, we'll simulate the check
  const existingIds = JSON.parse(localStorage.getItem('minted_arweave_ids') || '[]');
  return existingIds.includes(arweaveId);
};

// Store minted Arweave ID to prevent duplicates
const storeMintedArweaveId = (arweaveId: string) => {
  const existingIds = JSON.parse(localStorage.getItem('minted_arweave_ids') || '[]');
  existingIds.push(arweaveId);
  localStorage.setItem('minted_arweave_ids', JSON.stringify(existingIds));
};

// Validate payment amount for paid modules
const validatePayment = (moduleType: string, price: number, paidAmount: number): boolean => {
  if (moduleType === 'Free') return true;
  return paidAmount >= price;
};

// Create Move transaction for minting NFT
const createMintTransaction = (metadata: NFTMetadata, walletAddress: string) => {
  // This would create the actual Move transaction
  // For now, we'll return a mock transaction object
  return {
    kind: 'moveCall',
    data: {
      packageObjectId: '0x...', // Package ID would be deployed contract
      module: 'coinspace_nft',
      function: metadata.moduleType === 'Free' ? 'mint_free_module' : 'mint_paid_module',
      typeArguments: [],
      arguments: [
        metadata.moduleTitle,
        metadata.authorName,
        metadata.arweaveId, // Changed from ipfsHash to arweaveId
        metadata.originalCreatorAddress,
        metadata.price.toString(),
        walletAddress
      ]
    }
  };
};

// Main minting function
export const mintNFT = async (params: MintNFTParams): Promise<MintResult> => {
  const { metadata, walletAddress, signAndExecuteTransaction } = params;

  try {
    // 1. Check for duplicate Arweave ID
    const isDuplicate = await checkDuplicateArweaveId(metadata.arweaveId);
    if (isDuplicate) {
      return {
        success: false,
        error: 'This content has already been minted as an NFT'
      };
    }

    // 2. Validate payment for paid modules
    if (metadata.moduleType === 'Paid') {
      // In a real implementation, this would check the transaction amount
      const isValidPayment = validatePayment(metadata.moduleType, metadata.price, metadata.price);
      if (!isValidPayment) {
        return {
          success: false,
          error: 'Insufficient payment amount'
        };
      }
    }

    // 3. Create and execute transaction
    const transaction = createMintTransaction(metadata, walletAddress);
    const result = await signAndExecuteTransaction(transaction);

    // 4. Check transaction status
    if (result.effects?.status?.status === 'success') {
      // Store the Arweave ID to prevent future duplicates
      storeMintedArweaveId(metadata.arweaveId);

      // Generate mock NFT ID
      const nftId = '0x' + Math.random().toString(16).substr(2, 40);

      return {
        success: true,
        transactionDigest: result.digest,
        nftId: nftId
      };
    } else {
      return {
        success: false,
        error: 'Transaction failed'
      };
    }

  } catch (error) {
    console.error('Minting error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

// Get user's minted NFTs
export const getUserNFTs = async (walletAddress: string): Promise<NFTMetadata[]> => {
  // In a real implementation, this would query the blockchain
  // For now, we'll return mock data from localStorage
  const userNFTs = JSON.parse(localStorage.getItem(`user_nfts_${walletAddress}`) || '[]');
  return userNFTs;
};

// Save user's NFT after successful mint
export const saveUserNFT = (walletAddress: string, nft: NFTMetadata) => {
  const userNFTs = JSON.parse(localStorage.getItem(`user_nfts_${walletAddress}`) || '[]');
  userNFTs.push({
    ...nft,
    mintedAt: new Date().toISOString()
  });
  localStorage.setItem(`user_nfts_${walletAddress}`, JSON.stringify(userNFTs));
};

// Mock data for available modules (updated with Arweave IDs)
export const getAvailableModules = (): NFTMetadata[] => {
  return [
    {
      moduleTitle: "Introduction to Blockchain Technology",
      authorName: "Dr. Sarah Chen",
      arweaveId: "AR_YwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
      moduleType: "Free",
      originalCreatorAddress: "0x1234567890abcdef1234567890abcdef12345678",
      price: 0,
      description: "A comprehensive introduction to blockchain technology, covering fundamentals, consensus mechanisms, and real-world applications.",
      category: "Blockchain Basics"
    },
    {
      moduleTitle: "Smart Contract Development with Move",
      authorName: "Alex Rodriguez",
      arweaveId: "AR_PK1s3pNYLi9ERiq3BDxKa4XosgWwFRQUydHUtz4YgpqB",
      moduleType: "Paid",
      originalCreatorAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
      price: 2000000000, // 2 SUI in smallest unit
      description: "Learn to develop smart contracts using the Move programming language on the Sui blockchain.",
      category: "Smart Contracts"
    },
    {
      moduleTitle: "DeFi Fundamentals and Protocols",
      authorName: "Maria Gonzalez",
      arweaveId: "AR_NLei78zWmzUdbeRB3CiUfAizWUrbeeZh5K1rhAQKCh51",
      moduleType: "Paid",
      originalCreatorAddress: "0x9876543210fedcba9876543210fedcba98765432",
      price: 1500000000, // 1.5 SUI in smallest unit
      description: "Explore decentralized finance protocols, yield farming, liquidity mining, and DeFi investment strategies.",
      category: "DeFi"
    },
    {
      moduleTitle: "NFT Creation and Marketplace Strategies",
      authorName: "David Kim",
      arweaveId: "AR_RAQB6YaCyidP37UdDnjFY5vQuiBrcqdyoW1CuDgwxkD4",
      moduleType: "Free",
      originalCreatorAddress: "0x5555666677778888999900001111222233334444",
      price: 0,
      description: "Learn how to create, mint, and market NFTs effectively in the digital marketplace.",
      category: "NFTs"
    }
  ];
};