import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client';
import { Transaction } from '@mysten/sui.js/transactions';

// Sui Network Configuration
export const NETWORK = 'testnet'; // Change to 'mainnet' for production
export const SUI_CLIENT = new SuiClient({ url: getFullnodeUrl(NETWORK) });

// Smart Contract Configuration
export const PACKAGE_ID = '0x...'; // Will be filled after contract deployment
export const MODULE_NAME = 'coinspace_nft';

// Contract Functions
export const CONTRACT_FUNCTIONS = {
  MINT_FREE_MODULE: 'mint_free_module',
  MINT_PAID_MODULE: 'mint_paid_module',
  CREATE_MODULE: 'create_module',
  TRANSFER_MODULE: 'transfer_module',
  GET_MODULE_INFO: 'get_module_info'
};

// Gas Budget Configuration
export const GAS_BUDGET = 10000000; // 0.01 SUI

// Helper function to get wallet balance
export const getWalletBalance = async (address: string): Promise<string> => {
  try {
    const balance = await SUI_CLIENT.getBalance({
      owner: address,
      coinType: '0x2::sui::SUI'
    });
    return balance.totalBalance;
  } catch (error) {
    console.error('Error getting wallet balance:', error);
    return '0';
  }
};

// Helper function to get owned objects
export const getOwnedNFTs = async (address: string): Promise<any[]> => {
  try {
    const objects = await SUI_CLIENT.getOwnedObjects({
      owner: address,
      filter: {
        StructType: `${PACKAGE_ID}::${MODULE_NAME}::CoinspaceModule`
      },
      options: {
        showContent: true,
        showDisplay: true,
        showType: true
      }
    });
    return objects.data;
  } catch (error) {
    console.error('Error getting owned NFTs:', error);
    return [];
  }
};

// Create transaction for minting free module
export const createMintFreeTransaction = (
  moduleTitle: string,
  authorName: string,
  arweaveId: string,
  description: string,
  category: string
): Transaction => {
  const tx = new Transaction();
  
  tx.moveCall({
    target: `${PACKAGE_ID}::${MODULE_NAME}::${CONTRACT_FUNCTIONS.MINT_FREE_MODULE}`,
    arguments: [
      tx.pure.string(moduleTitle),
      tx.pure.string(authorName),
      tx.pure.string(arweaveId),
      tx.pure.string(description),
      tx.pure.string(category)
    ]
  });
  
  tx.setGasBudget(GAS_BUDGET);
  return tx;
};

// Create transaction for minting paid module
export const createMintPaidTransaction = (
  moduleTitle: string,
  authorName: string,
  arweaveId: string,
  description: string,
  category: string,
  price: number,
  creatorAddress: string
): Transaction => {
  const tx = new Transaction();
  
  // Split coin for payment
  const [coin] = tx.splitCoins(tx.gas, [tx.pure.u64(price)]);
  
  tx.moveCall({
    target: `${PACKAGE_ID}::${MODULE_NAME}::${CONTRACT_FUNCTIONS.MINT_PAID_MODULE}`,
    arguments: [
      tx.pure.string(moduleTitle),
      tx.pure.string(authorName),
      tx.pure.string(arweaveId),
      tx.pure.string(description),
      tx.pure.string(category),
      coin,
      tx.pure.address(creatorAddress)
    ]
  });
  
  tx.setGasBudget(GAS_BUDGET);
  return tx;
};

// Validate transaction result
export const validateTransactionResult = (result: any): boolean => {
  return result?.effects?.status?.status === 'success';
};

// Get transaction details
export const getTransactionDetails = async (digest: string) => {
  try {
    const txDetails = await SUI_CLIENT.getTransactionBlock({
      digest,
      options: {
        showInput: true,
        showEffects: true,
        showEvents: true,
        showObjectChanges: true,
        showBalanceChanges: true
      }
    });
    return txDetails;
  } catch (error) {
    console.error('Error getting transaction details:', error);
    return null;
  }
};