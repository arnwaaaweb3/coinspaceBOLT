import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  Globe,
  LayoutDashboard,
  Library,
  DollarSign,
  Info,
  HelpCircle,
  BookOpen,
  Plus
} from 'lucide-react';
import { useLanguage, Language } from '../contexts/LanguageContext';
import CustomConnectButton from './CustomConnectButton';
import styles from '../styles/Header.module.css';

const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<any[]>([]);
  const [currentLogo, setCurrentLogo] = useState('/coinspace-normal-logo copy.png');
  
  // Tooltip states
  const [showMenuTooltip, setShowMenuTooltip] = useState(true);
  const [showCartTooltip, setShowCartTooltip] = useState(true);
  const [showLanguageTooltip, setShowLanguageTooltip] = useState(true);

  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const cartDropdownRef = useRef<HTMLDivElement>(null);
  const { t, setLanguage, currentLanguage } = useLanguage();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (cartDropdownRef.current && !cartDropdownRef.current.contains(event.target as Node)) {
        setIsCartDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = JSON.parse(localStorage.getItem('coinspace_cart') || '[]');
    setCart(savedCart);
  }, []);

  const handleLogoHover = (isHovering: boolean) => {
    setCurrentLogo(isHovering ? '/coinspace-light-logo copy.png' : '/coinspace-normal-logo copy.png');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/dashboard?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleMenuClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setShowMenuTooltip(false);
    setIsCartDropdownOpen(false);
  };

  const handleCartClick = () => {
    setIsCartDropdownOpen(!isCartDropdownOpen);
    setShowCartTooltip(false);
    setIsDropdownOpen(false);
  };

  const handleLanguageClick = () => {
    setIsLanguageModalOpen(true);
    setShowLanguageTooltip(false);
  };

  const handleLanguageSelect = (langCode: Language) => {
    setLanguage(langCode);
    setIsLanguageModalOpen(false);
  };

  const clearCart = () => {
    localStorage.removeItem('coinspace_cart');
    setCart([]);
    setIsCartDropdownOpen(false);
  };

  const removeFromCart = (arweaveId: string) => {
    const newCart = cart.filter(item => item.arweaveId !== arweaveId);
    localStorage.setItem('coinspace_cart', JSON.stringify(newCart));
    setCart(newCart);
  };

  const calculateCartTotal = () => {
    return cart.reduce((total, item) => {
      if (item.moduleType === 'Paid') {
        return total + (item.price / 1000000000); // Convert from MIST to SUI
      }
      return total;
    }, 0);
  };

  const languages = [
    { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
    { code: 'id' as Language, name: 'Bahasa Indonesia', flag: '🇮🇩' },
    { code: 'zh' as Language, name: '中文', flag: '🇨🇳' },
    { code: 'ja' as Language, name: '日本語', flag: '🇯🇵' },
    { code: 'ko' as Language, name: '한국어', flag: '🇰🇷' },
    { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
    { code: 'fr' as Language, name: 'Français', flag: '🇫🇷' },
    { code: 'de' as Language, name: 'Deutsch', flag: '🇩🇪' },
  ];

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          {/* Logo and Brand */}
          <div className={styles.brandSection}>
            <Link
              to="/about"
              onMouseEnter={() => handleLogoHover(true)}
              onMouseLeave={() => handleLogoHover(false)}
              className={styles.logoLink}
            >
              <img
                src={currentLogo}
                alt="Coinspace"
                className={styles.logo}
              />
              <div className={styles.tooltip}>{t('header.about')}</div>
            </Link>
            <h1 className={styles.brandName}>Coinspace</h1>
          </div>

          {/* Center Section - Search & Cart */}
          <div className={styles.centerSection}>
            <form onSubmit={handleSearch} className={styles.searchBar}>
              <Search className={styles.searchIcon} />
              <input
                type="text"
                placeholder={t('header.search.placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </form>
            
            {/* Cart Container with Tooltip and Dropdown */}
            <div
                className={styles.cartContainer}
                onMouseEnter={() => setShowCartTooltip(true)}
                onMouseLeave={() => setShowCartTooltip(false)}
                ref={cartDropdownRef}
            >
              <button className={styles.cartButton} onClick={handleCartClick}>
                <ShoppingCart size={20} />
                {cart.length > 0 && (
                  <span className={styles.cartBadge}>{cart.length}</span>
                )}
              </button>
              {showCartTooltip && !isCartDropdownOpen && (
                <div className={styles.tooltip}>{t('header.cart.tooltip')}</div>
              )}

              {/* Enhanced Cart Dropdown Menu */}
              <div className={`${styles.cartDropdown} ${isCartDropdownOpen ? styles.open : ''}`}>
                {cart.length === 0 ? (
                  <>
                    <p className={styles.cartEmptyText}>{t('header.cart.empty')}</p>
                    <Link to="/dashboard" className={styles.cartDropdownLink}>
                      {t('header.cart.findModules')}
                    </Link>
                  </>
                ) : (
                  <div className="w-80 max-h-96 overflow-y-auto">
                    <div className="flex justify-between items-center mb-3 pb-2 border-b">
                      <h3 className="font-semibold text-gray-900">Cart ({cart.length})</h3>
                      <button 
                        onClick={clearCart}
                        className="text-xs text-red-600 hover:text-red-800"
                      >
                        Clear All
                      </button>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      {cart.map((item, index) => (
                        <div key={`${item.arweaveId}-${index}`} className="flex items-start gap-3 p-2 bg-gray-50 rounded">
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 truncate">{item.moduleTitle}</h4>
                            <p className="text-xs text-gray-600">{item.authorName}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`text-xs px-2 py-0.5 rounded ${
                                item.moduleType === 'Free' 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-blue-100 text-blue-700'
                              }`}>
                                {item.moduleType}
                              </span>
                              {item.moduleType === 'Paid' && (
                                <span className="text-xs font-medium text-purple-700">
                                  {(item.price / 1000000000).toFixed(2)} SUI
                                </span>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.arweaveId)}
                            className="text-gray-400 hover:text-red-600 text-xs"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    {calculateCartTotal() > 0 && (
                      <div className="border-t pt-3 mb-3">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-900">Total:</span>
                          <span className="font-bold text-[#604cc3]">{calculateCartTotal().toFixed(2)} SUI</span>
                        </div>
                      </div>
                    )}
                    
                    <button className="w-full bg-[#604cc3] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#ff7f3e] transition-colors">
                      Checkout ({cart.length} items)
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right-most icons and Hamburger Menu */}
          <div className={styles.rightIconsSection}>
            {/* Language Switch Button */}
            <div
                className={styles.languageButtonContainer}
                onMouseEnter={() => setShowLanguageTooltip(true)}
                onMouseLeave={() => setShowLanguageTooltip(false)}
            >
                <button
                    className={styles.languageButton}
                    onClick={handleLanguageClick}
                >
                    <Globe size={20} />
                </button>
                {showLanguageTooltip && (
                    <div className={styles.tooltip}>{t('header.language.tooltip')}</div>
                )}
            </div>

            {/* Hamburger Menu */}
            <div className={styles.hamburgerContainer} ref={dropdownRef}>
              <button
                className={styles.hamburgerButton}
                onClick={handleMenuClick}
              >
                <Menu size={20} />
              </button>
              {showMenuTooltip && !isDropdownOpen && (
                <div className={styles.tooltip}>{t('header.menu.tooltip')}</div>
              )}
              
              <div className={`${styles.dropdown} ${isDropdownOpen ? styles.open : ''}`}>
                <div className={`${styles.dropdownItem} ${styles.connectWalletItem}`}>
                  <CustomConnectButton variant="primary" size="sm" />
                </div>
                
                <Link to="/dashboard" className={styles.dropdownItem}>
                  <LayoutDashboard size={18} />
                  {t('header.dashboard')}
                </Link>
                
                <Link to="/create" className={styles.dropdownItem}>
                  <Plus size={18} />
                  Create Module
                </Link>
                
                <Link to="/library" className={styles.dropdownItem}>
                  <Library size={18} />
                  {t('header.library')}
                </Link>
                
                <Link to="/pricing" className={styles.dropdownItem}>
                  <DollarSign size={18} />
                  {t('header.pricing')}
                </Link>
                
                <Link to="/about" className={styles.dropdownItem}>
                  <Info size={18} />
                  {t('header.about')}
                </Link>
                
                <Link to="/faq" className={styles.dropdownItem}>
                  <HelpCircle size={18} />
                  {t('header.faq')}
                </Link>
                
                <Link to="/tutorials" className={styles.dropdownItem}>
                  <BookOpen size={18} />
                  {t('header.tutorials')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Language Modal */}
      <div className={`${styles.languageModal} ${isLanguageModalOpen ? styles.open : ''}`}>
        <div className={styles.languageModalContent}>
          <div className={styles.languageModalHeader}>
            <div className={styles.languageModalTitleSection}>
              <Globe className={styles.languageModalIcon} size={24} />
              <h3 className={styles.languageModalTitle}>{t('header.languageModal.title')}</h3>
            </div>
            <button
              className={styles.closeButton}
              onClick={() => setIsLanguageModalOpen(false)}
            >
              <X size={20} />
            </button>
          </div>
          
          <div className={styles.languageGrid}>
            {languages.map((lang) => (
              <div
                key={lang.code}
                className={styles.languageCard}
                onClick={() => handleLanguageSelect(lang.code)}
              >
                <div className={styles.languageCardContent}>
                  <span className={styles.languageFlag}>{lang.flag}</span>
                  <div className={styles.languageInfo}>
                    <span className={styles.languageName}>{lang.name}</span>
                    <span className={styles.languageCode}>{lang.code.toUpperCase()}</span>
                  </div>
                </div>
                <div className={styles.languageCardHover}></div>
              </div>
            ))}
          </div>
          
          <div className={styles.languageModalFooter}>
            <p className={styles.languageModalNote}>
              {t('header.languageModal.footer')}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;