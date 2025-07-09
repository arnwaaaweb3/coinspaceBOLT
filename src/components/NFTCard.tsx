import React from 'react';
import { ExternalLink, User, Hash, DollarSign, Download, ShoppingCart, Bookmark } from 'lucide-react';
import { NFTMetadata } from '../types/nft';

interface NFTCardProps {
  nft: NFTMetadata;
  onMint?: () => void;
  onView?: () => void;
  onAddToCart?: () => void;
  showMintButton?: boolean;
  showViewButton?: boolean;
  showCartButton?: boolean;
  viewMode?: 'grid' | 'list';
}

const NFTCard: React.FC<NFTCardProps> = ({ 
  nft, 
  onMint, 
  onView, 
  onAddToCart,
  showMintButton = false,
  showViewButton = false,
  showCartButton = true,
  viewMode = 'grid'
}) => {
  const formatPrice = (price: number) => {
    return (price / 1000000000).toFixed(2); // Convert from smallest unit to SUI
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
        <div className="flex items-center gap-6">
          {/* Module Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-1">
                  {nft.moduleTitle}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <User size={14} />
                  <span>{nft.authorName}</span>
                </div>
              </div>
              
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                nft.moduleType === 'Free' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-blue-100 text-blue-700'
              }`}>
                {nft.moduleType}
              </div>
            </div>

            {nft.description && (
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {nft.description}
              </p>
            )}

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Hash size={12} />
                <span className="font-mono">
                  {nft.arweaveId.substring(0, 12)}...
                </span>
              </div>
              
              {nft.category && (
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                  {nft.category}
                </span>
              )}
            </div>
          </div>

          {/* Price & Actions */}
          <div className="flex items-center gap-4">
            {nft.moduleType === 'Paid' && (
              <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-50 to-orange-50 rounded-lg">
                <DollarSign size={16} className="text-purple-600" />
                <span className="font-semibold text-purple-700">
                  {formatPrice(nft.price)} SUI
                </span>
              </div>
            )}

            <div className="flex gap-2">
              {showCartButton && (
                <button
                  onClick={onAddToCart}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                  title="Save to Cart"
                >
                  <Bookmark size={16} />
                </button>
              )}
              
              {showMintButton && (
                <button
                  onClick={onMint}
                  className={`btn ${
                    nft.moduleType === 'Free' ? 'btn-outline' : 'btn-primary'
                  } flex items-center gap-2`}
                >
                  <Download size={16} />
                  {nft.moduleType === 'Free' ? 'Mint Free' : 'Add to Cart'}
                </button>
              )}
              
              {showViewButton && (
                <button
                  onClick={onView}
                  className="btn btn-secondary flex items-center gap-2"
                >
                  <ExternalLink size={16} />
                  View
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view (default)
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden h-full">
      <div className="flex flex-col h-full p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-h-[60px]">
            <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-2 leading-tight">
              {nft.moduleTitle}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User size={14} />
              <span className="truncate">{nft.authorName}</span>
            </div>
          </div>
          
          <div className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ml-2 ${
            nft.moduleType === 'Free' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-blue-100 text-blue-700'
          }`}>
            {nft.moduleType}
          </div>
        </div>

        {/* Description */}
        <div className="flex-1 mb-4">
          {nft.description && (
            <p className="text-sm text-gray-600 line-clamp-3 mb-3">
              {nft.description}
            </p>
          )}

          {/* Metadata */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Hash size={12} />
              <span className="font-mono truncate">
                {nft.arweaveId.substring(0, 20)}...
              </span>
            </div>
            
            {nft.category && (
              <div className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                {nft.category}
              </div>
            )}
          </div>
        </div>

        {/* Price */}
        {nft.moduleType === 'Paid' && (
          <div className="flex items-center gap-2 mb-4 p-3 bg-gradient-to-r from-purple-50 to-orange-50 rounded-lg">
            <DollarSign size={16} className="text-purple-600" />
            <span className="font-semibold text-purple-700">
              {formatPrice(nft.price)} SUI
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          {showCartButton && (
            <button
              onClick={onAddToCart}
              className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex-shrink-0"
              title="Save to Cart"
            >
              <Bookmark size={16} />
            </button>
          )}
          
          {showMintButton && (
            <button
              onClick={onMint}
              className={`btn flex-1 ${
                nft.moduleType === 'Free' ? 'btn-outline' : 'btn-primary'
              } flex items-center justify-center gap-2`}
            >
              <Download size={16} />
              <span>{nft.moduleType === 'Free' ? 'Mint Free' : 'Add to Cart'}</span>
            </button>
          )}
          
          {showViewButton && (
            <button
              onClick={onView}
              className="btn btn-secondary flex-1 flex items-center justify-center gap-2"
            >
              <ExternalLink size={16} />
              <span>View</span>
            </button>
          )}
        </div>

        {/* Creator Address */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>Creator:</span>
            <span className="font-mono truncate">
              {nft.originalCreatorAddress.substring(0, 8)}...
              {nft.originalCreatorAddress.substring(nft.originalCreatorAddress.length - 6)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;