import React, { useState } from 'react';
import { Upload, FileText, DollarSign, User, Hash } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { uploadToArweave, mintNFT, saveUserNFT } from '../../lib/mintNFT';
import { NFTMetadata } from '../../types/nft';

const MintPage: React.FC = () => {
  const [formData, setFormData] = useState({
    moduleTitle: '',
    authorName: '',
    description: '',
    category: '',
    moduleType: 'Free' as 'Free' | 'Paid',
    price: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Placeholder wallet functionality - replace with actual wallet integration
  const connected = false;
  const address = '';
  const connect = async () => {
    alert('Wallet connection not implemented yet');
  };
  const signAndExecuteTransactionBlock = async () => {
    throw new Error('Transaction signing not implemented yet');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type (PDF, EPUB, etc.)
      const allowedTypes = ['application/pdf', 'application/epub+zip', 'text/plain'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please select a PDF, EPUB, or text file');
        return;
      }
      
      // Validate file size (max 50MB)
      if (file.size > 50 * 1024 * 1024) {
        alert('File size must be less than 50MB');
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!connected) {
      await connect();
      return;
    }

    if (!address) {
      alert('Please connect your wallet first');
      return;
    }

    if (!selectedFile) {
      alert('Please select a file to upload');
      return;
    }

    if (!formData.moduleTitle || !formData.authorName) {
      alert('Please fill in all required fields');
      return;
    }

    if (formData.moduleType === 'Paid' && (!formData.price || parseFloat(formData.price) <= 0)) {
      alert('Please enter a valid price for paid modules');
      return;
    }

    try {
      // Upload file to Arweave
      setIsUploading(true);
      setUploadProgress(0);
      
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      const arweaveId = await uploadToArweave(selectedFile);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      setIsUploading(false);

      // Prepare NFT metadata
      const metadata: NFTMetadata = {
        moduleTitle: formData.moduleTitle,
        authorName: formData.authorName,
        arweaveId: arweaveId,
        moduleType: formData.moduleType,
        originalCreatorAddress: address,
        price: formData.moduleType === 'Paid' ? parseFloat(formData.price) * 1000000000 : 0, // Convert to smallest unit
        description: formData.description,
        category: formData.category
      };

      // Mint NFT
      setIsMinting(true);
      const result = await mintNFT({
        metadata,
        walletAddress: address,
        signAndExecuteTransaction: signAndExecuteTransactionBlock
      });

      if (result.success) {
        saveUserNFT(address, metadata);
        alert(`Successfully minted "${metadata.moduleTitle}"!\nTransaction: ${result.transactionDigest}\nNFT ID: ${result.nftId}`);
        
        // Reset form
        setFormData({
          moduleTitle: '',
          authorName: '',
          description: '',
          category: '',
          moduleType: 'Free',
          price: ''
        });
        setSelectedFile(null);
      } else {
        alert(`Minting failed: ${result.error}`);
      }
    } catch (error) {
      console.error('Error during minting process:', error);
      alert('An error occurred during the minting process. Please try again.');
    } finally {
      setIsUploading(false);
      setIsMinting(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-[#fef4ea]">
      <Header />
      
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Mint Educational NFT</h1>
              <p className="text-gray-600">Upload your educational content to Arweave and mint it as an NFT</p>
            </div>

            {/* Mint Form */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Content File *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#604cc3] transition-colors">
                    <input
                      type="file"
                      onChange={handleFileSelect}
                      accept=".pdf,.epub,.txt"
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-sm text-gray-600">
                        {selectedFile ? selectedFile.name : 'Click to upload or drag and drop'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PDF, EPUB, TXT up to 50MB
                      </p>
                    </label>
                  </div>
                  
                  {isUploading && (
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Uploading to Arweave...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-[#604cc3] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Module Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Module Title *
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      name="moduleTitle"
                      value={formData.moduleTitle}
                      onChange={handleInputChange}
                      className="input pl-10"
                      placeholder="Enter module title"
                      required
                    />
                  </div>
                </div>

                {/* Author Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      name="authorName"
                      value={formData.authorName}
                      onChange={handleInputChange}
                      className="input pl-10"
                      placeholder="Enter author name"
                      required
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="input resize-none"
                    placeholder="Describe your educational content..."
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="input"
                  >
                    <option value="">Select a category</option>
                    <option value="Blockchain Basics">Blockchain Basics</option>
                    <option value="Smart Contracts">Smart Contracts</option>
                    <option value="DeFi">DeFi</option>
                    <option value="NFTs">NFTs</option>
                    <option value="Web3 Development">Web3 Development</option>
                    <option value="Cryptocurrency">Cryptocurrency</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Module Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Module Type *
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="moduleType"
                        value="Free"
                        checked={formData.moduleType === 'Free'}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Free (Gas fees only)</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="moduleType"
                        value="Paid"
                        checked={formData.moduleType === 'Paid'}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span>Paid</span>
                    </label>
                  </div>
                </div>

                {/* Price (if Paid) */}
                {formData.moduleType === 'Paid' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price (SUI) *
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="input pl-10"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isUploading || isMinting || !connected}
                    className="btn btn-primary w-full text-lg py-3"
                  >
                    {!connected ? (
                      'Connect Wallet to Mint'
                    ) : isUploading ? (
                      'Uploading to Arweave...'
                    ) : isMinting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                        Minting NFT...
                      </>
                    ) : (
                      `Mint ${formData.moduleType} NFT`
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Info Section */}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-2">Important Information</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Free modules: Users pay only gas fees to mint</li>
                <li>• Paid modules: Users pay your set price + gas fees</li>
                <li>• All payments go directly to your wallet address</li>
                <li>• Content is stored permanently on Arweave</li>
                <li>• Each Arweave transaction ID can only be minted once</li>
                <li>• Arweave provides permanent, immutable storage</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MintPage;