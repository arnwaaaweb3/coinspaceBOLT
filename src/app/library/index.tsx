import React, { useState, useEffect } from 'react';
import { Library, Grid, List, ExternalLink, Download, Calendar, User, Hash } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BackButton from '../../components/BackButton';
import { NFTMetadata } from '../../types/nft';

const LibraryPage: React.FC = () => {
  const [userNFTs, setUserNFTs] = useState<NFTMetadata[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    // For now, just show empty state since we removed wallet functionality
    setIsLoading(false);
  }, []);

  const handleViewContent = (nft: NFTMetadata) => {
    // Open Arweave content in new tab
    const arweaveUrl = `https://arweave.net/${nft.arweaveId}`;
    window.open(arweaveUrl, '_blank');
  };

  const categories = ['All', ...Array.from(new Set(userNFTs.map(nft => nft.category).filter(Boolean)))];
  const filteredNFTs = selectedCategory === 'All' 
    ? userNFTs 
    : userNFTs.filter(nft => nft.category === selectedCategory);

  const formatPrice = (price: number) => {
    return (price / 1000000000).toFixed(2);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fef4ea]">
        <Header />
        <BackButton />
        <div className="pt-20 flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#604cc3] border-t-transparent"></div>
        </div>
        <Footer />
      </div>
    );
  }

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
                <Library className="text-[#604cc3]" size={20} />
                <span className="text-[#604cc3] font-semibold">Your NFT Library</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#604cc3] to-[#ff7f3e] bg-clip-text text-transparent">
                Your Educational Collection
              </h1>
              
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Access and manage your <span className="font-semibold text-[#604cc3]">owned educational NFTs</span> stored permanently on Arweave
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          {/* Empty State */}
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl p-12 shadow-lg max-w-2xl mx-auto">
              <Library className="mx-auto h-20 w-20 text-gray-400 mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Connect Your Wallet</h2>
              <p className="text-gray-600 mb-8">
                Connect your wallet to view your NFT collection and access your educational modules.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/dashboard" className="btn btn-primary">
                  Explore Modules
                </a>
                <a href="/create" className="btn btn-outline">
                  Create Module
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LibraryPage;