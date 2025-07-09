import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Grid, List, ShoppingCart } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BackButton from '../../components/BackButton';
import NFTCard from '../../components/NFTCard';
import { getAvailableModules } from '../../lib/mintNFT';
import { NFTMetadata } from '../../types/nft';

const Dashboard: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [modules, setModules] = useState<NFTMetadata[]>([]);
  const [filteredModules, setFilteredModules] = useState<NFTMetadata[]>([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState<NFTMetadata[]>([]);

  // Memoize filter function to prevent infinite re-renders
  const filterModules = useCallback(() => {
    let filtered = modules;

    if (searchQuery) {
      filtered = filtered.filter(module =>
        module.moduleTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(module => module.category === selectedCategory);
    }

    if (selectedType !== 'All') {
      filtered = filtered.filter(module => module.moduleType === selectedType);
    }

    setFilteredModules(filtered);
  }, [modules, searchQuery, selectedCategory, selectedType]);

  useEffect(() => {
    loadModules();
    loadCart();
  }, []);

  useEffect(() => {
    filterModules();
  }, [filterModules]);

  const loadModules = async () => {
    try {
      const availableModules = getAvailableModules();
      setModules(availableModules);
    } catch (error) {
      console.error('Error loading modules:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadCart = () => {
    const savedCart = JSON.parse(localStorage.getItem('coinspace_cart') || '[]');
    setCart(savedCart);
  };

  const saveCart = (newCart: NFTMetadata[]) => {
    localStorage.setItem('coinspace_cart', JSON.stringify(newCart));
    setCart(newCart);
  };

  const handleAddToCart = (module: NFTMetadata) => {
    const isAlreadyInCart = cart.some(item => item.arweaveId === module.arweaveId);
    
    if (isAlreadyInCart) {
      alert('This module is already in your cart!');
      return;
    }

    const newCart = [...cart, module];
    saveCart(newCart);
    alert(`"${module.moduleTitle}" added to cart!`);
  };

  const categories = ['All', ...Array.from(new Set(modules.map(m => m.category).filter(Boolean)))];

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
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Dashboard</h1>
            <p className="text-gray-600">Discover and collect educational NFT modules stored on Arweave</p>
          </div>

          {/* Enhanced Filters and Search */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search Section */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Modules
                </label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search modules..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input pl-12 pr-4"
                  />
                </div>
              </div>

              {/* Filters Section */}
              <div className="flex flex-col sm:flex-row gap-4 lg:w-auto">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="input min-w-[140px]"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="input min-w-[120px]"
                  >
                    <option value="All">All Types</option>
                    <option value="Free">Free</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    View
                  </label>
                  <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-3 transition-colors ${
                        viewMode === 'grid' 
                          ? 'bg-[#604cc3] text-white' 
                          : 'bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                      title="Grid View"
                    >
                      <Grid size={20} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-3 transition-colors ${
                        viewMode === 'list' 
                          ? 'bg-[#604cc3] text-white' 
                          : 'bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                      title="List View"
                    >
                      <List size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Header */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Showing {filteredModules.length} of {modules.length} modules
            </p>
            
            {cart.length > 0 && (
              <div className="flex items-center gap-2 bg-[#604cc3] text-white px-4 py-2 rounded-lg">
                <ShoppingCart size={16} />
                <span className="font-medium">{cart.length} items in cart</span>
              </div>
            )}
          </div>

          {/* Modules Grid/List */}
          {filteredModules.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search size={48} className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No modules found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }>
              {filteredModules.map((module) => (
                <NFTCard
                  key={module.arweaveId}
                  nft={module}
                  viewMode={viewMode}
                  showCartButton={true}
                  onAddToCart={() => handleAddToCart(module)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;