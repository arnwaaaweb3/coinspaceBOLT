import { NFTMetadata } from '../types/nft';
import { uploadFileToIPFS, uploadMetadataToIPFS } from './ipfsClient';
import { 
  createMintFreeTransaction, 
  createMintPaidTransaction, 
  validateTransactionResult,
  getTransactionDetails,
  SUI_CLIENT 
} from './suiClient';

export interface RealMintNFTParams {
  metadata: NFTMetadata;
  file: File;
  walletAddress: string;
  signAndExecuteTransaction: (transaction: any) => Promise<any>;
}

export interface RealMintResult {
  success: boolean;
  transactionDigest?: string;
  nftId?: string;
  ipfsHash?: string;
  error?: string;
}

// Real IPFS upload function
export const realUploadToIPFS = async (file: File): Promise<string> => {
  try {
    console.log('Starting IPFS upload for file:', file.name);
    
    // Upload file to IPFS
    const ipfsHash = await uploadFileToIPFS(file);
    
    console.log('File successfully uploaded to IPFS:', ipfsHash);
    return ipfsHash;
  } catch (error) {
    console.error('IPFS upload failed:', error);
    throw new Error(`IPFS upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Check if IPFS hash already exists on blockchain
export const checkDuplicateHashOnChain = async (ipfsHash: string): Promise<boolean> => {
  try {
    // Query the blockchain for existing modules with this IPFS hash
    // This would use the smart contract's registry
    // For now, we'll implement a basic check
    
    // TODO: Implement actual blockchain query
    console.log('Checking for duplicate IPFS hash on blockchain:', ipfsHash);
    
    return false; // Assume no duplicates for now
  } catch (error) {
    console.error('Error checking duplicate hash:', error);
    return false;
  }
};

// Validate payment amount for paid modules
const validatePaymentAmount = (moduleType: string, price: number, walletBalance: string): boolean => {
  if (moduleType === 'Free') return true;
  
  const balanceInSui = parseInt(walletBalance) / 1000000000; // Convert from MIST to SUI
  const priceInSui = price / 1000000000;
  
  return balanceInSui >= priceInSui;
};

// Main real minting function
export const realMintNFT = async (params: RealMintNFTParams): Promise<RealMintResult> => {
  const { metadata, file, walletAddress, signAndExecuteTransaction } = params;

  try {
    console.log('Starting real NFT minting process...');

    // Step 1: Upload file to IPFS
    console.log('Step 1: Uploading file to IPFS...');
    const ipfsHash = await realUploadToIPFS(file);

    // Step 2: Check for duplicate IPFS hash
    console.log('Step 2: Checking for duplicate IPFS hash...');
    const isDuplicate = await checkDuplicateHashOnChain(ipfsHash);
    if (isDuplicate) {
      return {
        success: false,
        error: 'This content has already been minted as an NFT on the blockchain'
      };
    }

    // Step 3: Create metadata with IPFS hash
    const completeMetadata = {
      ...metadata,
      ipfsHash,
      createdAt: new Date().toISOString()
    };

    // Step 4: Upload metadata to IPFS
    console.log('Step 4: Uploading metadata to IPFS...');
    const metadataHash = await uploadMetadataToIPFS(completeMetadata);

    // Step 5: Create blockchain transaction
    console.log('Step 5: Creating blockchain transaction...');
    let transaction;

    if (metadata.moduleType === 'Free') {
      transaction = createMintFreeTransaction(
        metadata.moduleTitle,
        metadata.authorName,
        ipfsHash,
        metadata.description || '',
        metadata.category || ''
      );
    } else {
      transaction = createMintPaidTransaction(
        metadata.moduleTitle,
        metadata.authorName,
        ipfsHash,
        metadata.description || '',
        metadata.category || '',
        metadata.price,
        metadata.originalCreatorAddress
      );
    }

    // Step 6: Execute transaction
    console.log('Step 6: Executing transaction on Sui blockchain...');
    const result = await signAndExecuteTransaction(transaction);

    // Step 7: Validate transaction result
    console.log('Step 7: Validating transaction result...');
    if (validateTransactionResult(result)) {
      // Get detailed transaction info
      const txDetails = await getTransactionDetails(result.digest);
      
      // Extract NFT ID from transaction effects
      let nftId = null;
      if (txDetails?.effects?.created) {
        const createdObjects = txDetails.effects.created;
        const nftObject = createdObjects.find((obj: any) => 
          obj.owner && typeof obj.owner === 'object' && 'AddressOwner' in obj.owner
        );
        if (nftObject) {
          nftId = nftObject.reference.objectId;
        }
      }

      console.log('NFT minted successfully!', {
        transactionDigest: result.digest,
        nftId,
        ipfsHash,
        metadataHash
      });

      return {
        success: true,
        transactionDigest: result.digest,
        nftId: nftId || 'Unknown',
        ipfsHash
      };
    } else {
      return {
        success: false,
        error: 'Transaction failed on blockchain'
      };
    }

  } catch (error) {
    console.error('Real minting error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred during minting'
    };
  }
};

// Get user's real NFTs from blockchain
export const getRealUserNFTs = async (walletAddress: string): Promise<NFTMetadata[]> => {
  try {
    console.log('Fetching real NFTs for address:', walletAddress);
    
    // Query blockchain for user's NFTs
    const ownedObjects = await SUI_CLIENT.getOwnedObjects({
      owner: walletAddress,
      filter: {
        StructType: `${process.env.VITE_PACKAGE_ID}::coinspace_nft::CoinspaceModule`
      },
      options: {
        showContent: true,
        showDisplay: true,
        showType: true
      }
    });

    const nfts: NFTMetadata[] = [];

    for (const obj of ownedObjects.data) {
      if (obj.data?.content && 'fields' in obj.data.content) {
        const fields = obj.data.content.fields as any;
        
        const nft: NFTMetadata = {
          moduleTitle: fields.module_title,
          authorName: fields.author_name,
          ipfsHash: fields.ipfs_hash,
          moduleType: fields.module_type as 'Free' | 'Paid',
          originalCreatorAddress: fields.creator,
          price: parseInt(fields.price),
          description: fields.description,
          category: fields.category,
          createdAt: new Date(parseInt(fields.created_at) * 1000).toISOString()
        };

        nfts.push(nft);
      }
    }

    console.log('Found NFTs:', nfts);
    return nfts;
  } catch (error) {
    console.error('Error fetching real NFTs:', error);
    return [];
  }
};

// Save user's NFT after successful mint (for local cache)
export const saveRealUserNFT = (walletAddress: string, nft: NFTMetadata, transactionDigest: string) => {
  const userNFTs = JSON.parse(localStorage.getItem(`real_user_nfts_${walletAddress}`) || '[]');
  userNFTs.push({
    ...nft,
    transactionDigest,
    mintedAt: new Date().toISOString()
  });
  localStorage.setItem(`real_user_nfts_${walletAddress}`, JSON.stringify(userNFTs));
};