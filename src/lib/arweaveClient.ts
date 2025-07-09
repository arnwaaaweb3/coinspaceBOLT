import Arweave from 'arweave';

// Arweave Configuration
const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https'
});

// Alternative gateway for faster access
const ARWEAVE_GATEWAY = 'https://arweave.net/';

export interface ArweaveUploadResult {
  id: string;
  url: string;
  size: number;
}

// Upload file to Arweave
export const uploadFileToArweave = async (file: File, wallet?: any): Promise<string> => {
  try {
    console.log('Uploading file to Arweave:', file.name);
    
    // Convert file to buffer
    const buffer = await file.arrayBuffer();
    const data = new Uint8Array(buffer);
    
    // Create transaction
    const transaction = await arweave.createTransaction({
      data: data
    }, wallet);
    
    // Add tags for better organization
    transaction.addTag('Content-Type', file.type);
    transaction.addTag('App-Name', 'Coinspace');
    transaction.addTag('App-Version', '1.0.0');
    transaction.addTag('File-Name', file.name);
    transaction.addTag('Upload-Type', 'Educational-Content');
    
    // Sign and post transaction
    if (wallet) {
      await arweave.transactions.sign(transaction, wallet);
      const response = await arweave.transactions.post(transaction);
      
      if (response.status === 200) {
        console.log('File successfully uploaded to Arweave:', transaction.id);
        return transaction.id;
      } else {
        throw new Error(`Upload failed with status: ${response.status}`);
      }
    } else {
      // For demo purposes, return a mock transaction ID
      const mockId = 'AR_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      console.log('Mock Arweave upload (no wallet):', mockId);
      return mockId;
    }
  } catch (error) {
    console.error('Error uploading to Arweave:', error);
    throw new Error('Failed to upload file to Arweave');
  }
};

// Upload JSON metadata to Arweave
export const uploadMetadataToArweave = async (metadata: any, wallet?: any): Promise<string> => {
  try {
    console.log('Uploading metadata to Arweave:', metadata);
    
    const metadataString = JSON.stringify(metadata, null, 2);
    const data = new TextEncoder().encode(metadataString);
    
    const transaction = await arweave.createTransaction({
      data: data
    }, wallet);
    
    // Add tags for metadata
    transaction.addTag('Content-Type', 'application/json');
    transaction.addTag('App-Name', 'Coinspace');
    transaction.addTag('App-Version', '1.0.0');
    transaction.addTag('Data-Type', 'NFT-Metadata');
    transaction.addTag('Module-Title', metadata.moduleTitle || 'Unknown');
    
    if (wallet) {
      await arweave.transactions.sign(transaction, wallet);
      const response = await arweave.transactions.post(transaction);
      
      if (response.status === 200) {
        console.log('Metadata successfully uploaded to Arweave:', transaction.id);
        return transaction.id;
      } else {
        throw new Error(`Metadata upload failed with status: ${response.status}`);
      }
    } else {
      // Mock for demo
      const mockId = 'AR_META_' + Math.random().toString(36).substring(2, 15);
      console.log('Mock Arweave metadata upload:', mockId);
      return mockId;
    }
  } catch (error) {
    console.error('Error uploading metadata to Arweave:', error);
    throw new Error('Failed to upload metadata to Arweave');
  }
};

// Get file from Arweave
export const getFileFromArweave = async (transactionId: string): Promise<Uint8Array> => {
  try {
    const response = await fetch(`${ARWEAVE_GATEWAY}${transactionId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch from Arweave: ${response.status}`);
    }
    
    const arrayBuffer = await response.arrayBuffer();
    return new Uint8Array(arrayBuffer);
  } catch (error) {
    console.error('Error getting file from Arweave:', error);
    throw new Error('Failed to get file from Arweave');
  }
};

// Get Arweave URL
export const getArweaveUrl = (transactionId: string): string => {
  return `${ARWEAVE_GATEWAY}${transactionId}`;
};

// Validate Arweave transaction ID
export const isValidArweaveId = (id: string): boolean => {
  // Arweave transaction IDs are 43 characters long and base64url encoded
  return /^[A-Za-z0-9_-]{43}$/.test(id);
};

// Get transaction status
export const getTransactionStatus = async (transactionId: string): Promise<any> => {
  try {
    const status = await arweave.transactions.getStatus(transactionId);
    return status;
  } catch (error) {
    console.error('Error getting transaction status:', error);
    return null;
  }
};

// Get transaction data
export const getTransactionData = async (transactionId: string): Promise<any> => {
  try {
    const transaction = await arweave.transactions.get(transactionId);
    return transaction;
  } catch (error) {
    console.error('Error getting transaction data:', error);
    return null;
  }
};

// Calculate upload cost
export const calculateUploadCost = async (data: Uint8Array): Promise<string> => {
  try {
    const price = await arweave.transactions.getPrice(data.length);
    const ar = arweave.ar.winstonToAr(price);
    return ar;
  } catch (error) {
    console.error('Error calculating upload cost:', error);
    return '0';
  }
};

// Generate Arweave wallet (for testing)
export const generateArweaveWallet = async () => {
  try {
    const wallet = await arweave.wallets.generate();
    return wallet;
  } catch (error) {
    console.error('Error generating Arweave wallet:', error);
    return null;
  }
};