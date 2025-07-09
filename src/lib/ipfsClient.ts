import { create, IPFSHTTPClient } from 'ipfs-http-client';

// IPFS Configuration
const IPFS_GATEWAY = 'https://ipfs.io/ipfs/';
const PINATA_API_KEY = process.env.VITE_PINATA_API_KEY;
const PINATA_SECRET_KEY = process.env.VITE_PINATA_SECRET_KEY;

// Initialize IPFS client (using Pinata for production)
let ipfsClient: IPFSHTTPClient | null = null;

if (PINATA_API_KEY && PINATA_SECRET_KEY) {
  // Production: Use Pinata
  ipfsClient = create({
    host: 'api.pinata.cloud',
    port: 443,
    protocol: 'https',
    headers: {
      'pinata_api_key': PINATA_API_KEY,
      'pinata_secret_api_key': PINATA_SECRET_KEY
    }
  });
} else {
  // Development: Use local IPFS node or public gateway
  ipfsClient = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https'
  });
}

// Upload file to IPFS
export const uploadFileToIPFS = async (file: File): Promise<string> => {
  if (!ipfsClient) {
    throw new Error('IPFS client not initialized');
  }

  try {
    console.log('Uploading file to IPFS:', file.name);
    
    // Convert file to buffer
    const buffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(buffer);
    
    // Upload to IPFS
    const result = await ipfsClient.add(uint8Array, {
      pin: true,
      wrapWithDirectory: false
    });
    
    console.log('File uploaded to IPFS:', result.path);
    return result.path;
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    throw new Error('Failed to upload file to IPFS');
  }
};

// Upload JSON metadata to IPFS
export const uploadMetadataToIPFS = async (metadata: any): Promise<string> => {
  if (!ipfsClient) {
    throw new Error('IPFS client not initialized');
  }

  try {
    console.log('Uploading metadata to IPFS:', metadata);
    
    const metadataString = JSON.stringify(metadata, null, 2);
    const buffer = new TextEncoder().encode(metadataString);
    
    const result = await ipfsClient.add(buffer, {
      pin: true,
      wrapWithDirectory: false
    });
    
    console.log('Metadata uploaded to IPFS:', result.path);
    return result.path;
  } catch (error) {
    console.error('Error uploading metadata to IPFS:', error);
    throw new Error('Failed to upload metadata to IPFS');
  }
};

// Get file from IPFS
export const getFileFromIPFS = async (hash: string): Promise<Uint8Array> => {
  if (!ipfsClient) {
    throw new Error('IPFS client not initialized');
  }

  try {
    const chunks = [];
    for await (const chunk of ipfsClient.cat(hash)) {
      chunks.push(chunk);
    }
    
    // Combine chunks
    const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
    const result = new Uint8Array(totalLength);
    let offset = 0;
    
    for (const chunk of chunks) {
      result.set(chunk, offset);
      offset += chunk.length;
    }
    
    return result;
  } catch (error) {
    console.error('Error getting file from IPFS:', error);
    throw new Error('Failed to get file from IPFS');
  }
};

// Get IPFS gateway URL
export const getIPFSUrl = (hash: string): string => {
  return `${IPFS_GATEWAY}${hash}`;
};

// Validate IPFS hash
export const isValidIPFSHash = (hash: string): boolean => {
  // Basic validation for IPFS hash format
  return /^Qm[1-9A-HJ-NP-Za-km-z]{44}$/.test(hash) || 
         /^bafy[a-z2-7]{55}$/.test(hash);
};

// Pin file to IPFS (for persistence)
export const pinFileToIPFS = async (hash: string): Promise<boolean> => {
  if (!ipfsClient) {
    return false;
  }

  try {
    await ipfsClient.pin.add(hash);
    console.log('File pinned to IPFS:', hash);
    return true;
  } catch (error) {
    console.error('Error pinning file to IPFS:', error);
    return false;
  }
};

// Check if file is pinned
export const isFilePinned = async (hash: string): Promise<boolean> => {
  if (!ipfsClient) {
    return false;
  }

  try {
    for await (const pin of ipfsClient.pin.ls({ paths: [hash] })) {
      if (pin.cid.toString() === hash) {
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error('Error checking pin status:', error);
    return false;
  }
};