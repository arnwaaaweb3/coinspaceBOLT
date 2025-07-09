import React, { useState } from 'react';
import { Upload, FileText, DollarSign, User, Hash, BookOpen, Zap, Shield, Globe, CheckCircle, Info } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BackButton from '../../components/BackButton';
import CustomConnectButton from '../../components/CustomConnectButton';
import { uploadFileToArweave, uploadMetadataToArweave } from '../../lib/arweaveClient';
import { useWallet } from '../../contexts/WalletProvider';
import { NFTMetadata } from '../../types/nft';

const CreateModulePage: React.FC = () => {
  const [formData, setFormData] = useState({
    moduleTitle: '',
    authorName: '',
    description: '',
    category: '',
    moduleType: 'Free' as 'Free' | 'Paid',
    price: '',
    mintingType: 'unique' as 'unique' | 'editioned',
    totalEditions: ''
  });
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [arweaveId, setArweaveId] = useState<string | null>(null);

  const { connected, address } = useWallet();

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
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/epub+zip', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please select a PDF, EPUB, DOC, DOCX, or text file');
        return;
      }
      
      // Validate file size (max 100MB for Arweave)
      if (file.size > 100 * 1024 * 1024) {
        alert('File size must be less than 100MB');
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const calculateServiceFee = () => {
    return 0.01; // 0.01 SUI service fee
  };

  const calculateTotalCost = () => {
    const serviceFee = calculateServiceFee();
    const estimatedGasFee = 0.005; // Estimated gas fee
    return serviceFee + estimatedGasFee;
  };

  const handleUploadToArweave = async () => {
    if (!selectedFile) {
      alert('Please select a file first');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setCurrentStep(2);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + Math.random() * 15;
        });
      }, 300);

      // Upload to Arweave
      const uploadedArweaveId = await uploadFileToArweave(selectedFile);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      setArweaveId(uploadedArweaveId);
      setCurrentStep(3);
      
      console.log('File uploaded to Arweave:', uploadedArweaveId);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload file to Arweave. Please try again.');
      setCurrentStep(1);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCreateModule = async () => {
    if (!connected) {
      alert('Please connect your wallet first');
      return;
    }

    if (!arweaveId) {
      alert('Please complete the upload process first');
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

    if (formData.mintingType === 'editioned' && (!formData.totalEditions || parseInt(formData.totalEditions) <= 0)) {
      alert('Please enter a valid number of editions');
      return;
    }

    setCurrentStep(4);

    try {
      // Prepare metadata
      const metadata: NFTMetadata = {
        moduleTitle: formData.moduleTitle,
        authorName: formData.authorName,
        arweaveId: arweaveId,
        moduleType: formData.moduleType,
        originalCreatorAddress: address || 'demo-address',
        price: formData.moduleType === 'Paid' ? parseFloat(formData.price) * 1000000000 : 0,
        description: formData.description,
        category: formData.category
      };

      // Add minting type specific metadata
      const extendedMetadata = {
        ...metadata,
        mintingType: formData.mintingType,
        totalEditions: formData.mintingType === 'editioned' ? parseInt(formData.totalEditions) : 1,
        serviceFee: calculateServiceFee(),
        createdAt: new Date().toISOString()
      };

      // Upload metadata to Arweave
      const metadataArweaveId = await uploadMetadataToArweave(extendedMetadata);
      console.log('Metadata uploaded to Arweave:', metadataArweaveId);

      alert(`🎉 Module successfully created!\n\nArweave ID: ${arweaveId}\nMetadata ID: ${metadataArweaveId}`);
      
      // Reset form
      setFormData({
        moduleTitle: '',
        authorName: '',
        description: '',
        category: '',
        moduleType: 'Free',
        price: '',
        mintingType: 'unique',
        totalEditions: ''
      });
      setSelectedFile(null);
      setArweaveId(null);
      setCurrentStep(1);
    } catch (error) {
      console.error('Error during creation process:', error);
      alert('An error occurred during the creation process. Please try again.');
      setCurrentStep(3);
    }
  };

  const getStepStatus = (step: number) => {
    if (step < currentStep) return 'completed';
    if (step === currentStep) return 'active';
    return 'pending';
  };

  return (
    <div className="min-h-screen bg-[#fef4ea]">
      <Header />
      <BackButton />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-orange-50 to-blue-50 opacity-60"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23604cc3%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-purple-200 mb-8">
                <BookOpen className="text-[#604cc3]" size={20} />
                <span className="text-[#604cc3] font-semibold">Create Educational Module</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#604cc3] to-[#ff7f3e] bg-clip-text text-transparent">
                Share Your Knowledge with the World
              </h1>
              
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Transform your educational content into <span className="font-semibold text-[#604cc3]">permanent, decentralized NFTs</span> stored on Arweave
              </p>

              {/* Wallet Connection Section */}
              {!connected && (
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-purple-100 shadow-lg mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Connect Your Wallet to Get Started</h3>
                  <p className="text-gray-600 mb-4">You need to connect your Sui wallet to create and mint educational modules.</p>
                  <CustomConnectButton variant="primary" size="lg" />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Progress Steps */}
        <section className="py-8 bg-white/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                {[
                  { step: 1, title: 'Upload Content', icon: Upload },
                  { step: 2, title: 'Arweave Storage', icon: Globe },
                  { step: 3, title: 'Module Details', icon: FileText },
                  { step: 4, title: 'Create Module', icon: Zap }
                ].map(({ step, title, icon: Icon }) => {
                  const status = getStepStatus(step);
                  return (
                    <div key={step} className="flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                        status === 'completed' ? 'bg-green-500 text-white' :
                        status === 'active' ? 'bg-[#604cc3] text-white' :
                        'bg-gray-200 text-gray-500'
                      }`}>
                        {status === 'completed' ? <CheckCircle size={20} /> : <Icon size={20} />}
                      </div>
                      <span className={`text-sm font-medium ${
                        status === 'active' ? 'text-[#604cc3]' : 'text-gray-600'
                      }`}>
                        {title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Step 1: File Upload */}
            {currentStep === 1 && (
              <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Upload className="text-[#604cc3]" size={28} />
                  Upload Your Educational Content
                </h2>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#604cc3] transition-colors mb-6">
                  <input
                    type="file"
                    onChange={handleFileSelect}
                    accept=".pdf,.epub,.txt,.doc,.docx"
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                    <p className="text-lg text-gray-600 mb-2">
                      {selectedFile ? selectedFile.name : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-sm text-gray-500">
                      PDF, EPUB, DOC, DOCX, TXT up to 100MB
                    </p>
                  </label>
                </div>

                {selectedFile && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="text-green-600" size={20} />
                      <div>
                        <p className="font-medium text-green-800">File Selected</p>
                        <p className="text-sm text-green-600">
                          {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleUploadToArweave}
                  disabled={!selectedFile || isUploading}
                  className="btn btn-primary w-full text-lg py-3"
                >
                  {isUploading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                      Uploading to Arweave...
                    </>
                  ) : (
                    <>
                      <Globe size={20} />
                      Upload to Arweave
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Step 2: Upload Progress */}
            {currentStep === 2 && (
              <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Globe className="text-[#604cc3]" size={28} />
                  Uploading to Arweave
                </h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Uploading {selectedFile?.name}...</span>
                    <span>{Math.round(uploadProgress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-[#604cc3] to-[#ff7f3e] h-3 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Info className="text-blue-600 mt-0.5" size={20} />
                      <div>
                        <p className="font-medium text-blue-800">Permanent Storage</p>
                        <p className="text-sm text-blue-600">
                          Your content is being stored permanently on Arweave's decentralized network. 
                          This ensures your educational material will be accessible forever.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Module Details Form */}
            {currentStep >= 3 && (
              <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <FileText className="text-[#604cc3]" size={28} />
                  Module Information
                </h2>

                {arweaveId && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="text-green-600" size={20} />
                      <div>
                        <p className="font-medium text-green-800">Successfully uploaded to Arweave!</p>
                        <p className="text-sm text-green-600 font-mono">ID: {arweaveId}</p>
                      </div>
                    </div>
                  </div>
                )}

                <form className="space-y-6">
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
                      <option value="Programming">Programming</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Science">Science</option>
                      <option value="Business">Business</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Module Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Module Type *
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#604cc3] transition-colors">
                        <input
                          type="radio"
                          name="moduleType"
                          value="Free"
                          checked={formData.moduleType === 'Free'}
                          onChange={handleInputChange}
                          className="mr-3"
                        />
                        <div>
                          <span className="font-medium">Free Module</span>
                          <p className="text-sm text-gray-600">Users pay only gas fees</p>
                        </div>
                      </label>
                      <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#604cc3] transition-colors">
                        <input
                          type="radio"
                          name="moduleType"
                          value="Paid"
                          checked={formData.moduleType === 'Paid'}
                          onChange={handleInputChange}
                          className="mr-3"
                        />
                        <div>
                          <span className="font-medium">Paid Module</span>
                          <p className="text-sm text-gray-600">Set your own price</p>
                        </div>
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

                  {/* Minting Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      NFT Minting Type *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label className="flex items-start p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#604cc3] transition-colors">
                        <input
                          type="radio"
                          name="mintingType"
                          value="unique"
                          checked={formData.mintingType === 'unique'}
                          onChange={handleInputChange}
                          className="mr-3 mt-1"
                        />
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Shield className="text-[#604cc3]" size={16} />
                            <span className="font-medium">Unique Module NFT</span>
                          </div>
                          <p className="text-sm text-gray-600">Only one instance can ever be minted globally. Maximum exclusivity.</p>
                        </div>
                      </label>
                      <label className="flex items-start p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#604cc3] transition-colors">
                        <input
                          type="radio"
                          name="mintingType"
                          value="editioned"
                          checked={formData.mintingType === 'editioned'}
                          onChange={handleInputChange}
                          className="mr-3 mt-1"
                        />
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Hash className="text-[#ff7f3e]" size={16} />
                            <span className="font-medium">Editioned Module NFT</span>
                          </div>
                          <p className="text-sm text-gray-600">Multiple copies can be minted. Set your edition limit.</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Total Editions (if Editioned) */}
                  {formData.mintingType === 'editioned' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Total Editions *
                      </label>
                      <div className="relative">
                        <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="number"
                          name="totalEditions"
                          value={formData.totalEditions}
                          onChange={handleInputChange}
                          className="input pl-10"
                          placeholder="e.g., 100"
                          min="1"
                          max="10000"
                          required
                        />
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Maximum 10,000 editions</p>
                    </div>
                  )}
                </form>
              </div>
            )}

            {/* Action Buttons */}
            {currentStep >= 3 && (
              <div className="flex gap-4">
                {currentStep === 3 && (
                  <button
                    onClick={handleCreateModule}
                    disabled={!connected}
                    className="btn btn-primary flex-1 text-lg py-3"
                  >
                    {!connected ? (
                      'Connect Wallet to Create Module'
                    ) : (
                      <>
                        <Zap size={20} />
                        Create Module
                      </>
                    )}
                  </button>
                )}
                
                {currentStep === 4 && (
                  <div className="flex-1 bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="text-green-600" size={24} />
                      <div>
                        <p className="font-medium text-green-800">Module Created Successfully!</p>
                        <p className="text-sm text-green-600">Your educational content is now stored on Arweave</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Info Section */}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <Info size={20} />
                Important Information
              </h3>
              <ul className="text-sm text-blue-800 space-y-2">
                <li>• Content is stored permanently on Arweave's decentralized network</li>
                <li>• Service fee helps maintain the platform and covers Arweave storage costs</li>
                <li>• Unique NFTs can only be minted once globally</li>
                <li>• Editioned NFTs allow multiple copies up to your specified limit</li>
                <li>• All payments for paid modules go directly to your wallet</li>
                <li>• Gas fees vary based on network congestion</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreateModulePage;