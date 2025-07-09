import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react'; // Pastikan Plus sudah dihapus
import { useLanguage } from '../contexts/LanguageContext';
import CustomConnectButton from './CustomConnectButton';
import styles from '../styles/HeroPanel.module.css';

const HeroPanel: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className={styles.heroSection}>
      <div className={styles.overlay}></div>
      
      {/* Bolt Logo */}
      <div className={styles.boltLogo}>
        <img 
          src="/black_circle_360x360.png" 
          alt="Powered by Bolt" 
          className={styles.boltLogoImage}
        />
      </div>
      
      <div className={styles.content}>
        <h1 className={styles.mainTitle}>
          {t('hero.title')}
        </h1>
        
        <div className={styles.descriptionContainer}>
          <p className={styles.description}>
            {t('hero.subtitle')} {t('hero.description')}
          </p>
        </div>
        
        <div className={styles.actionButtons}>
          {/* Tombol Connect Wallet */}
          <CustomConnectButton variant="primary" size="lg" className={styles.primaryButton} />
          
          {/* Tombol Search Module - Menggunakan styles.primaryButton */}
          <Link to="/dashboard" className={styles.primaryButton}>
            <Search size={20} />
            <span>{t('hero.searchModule')}</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroPanel;