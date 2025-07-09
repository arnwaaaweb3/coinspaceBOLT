import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Github, 
  Linkedin, 
  Send,
  ArrowRight,
  Instagram,
  CheckCircle,
  AlertCircle,
  Loader
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import styles from '../styles/Footer.module.css';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useLanguage();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setMessageType(null);
    setIsSubmitting(true);

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage(t('footer.newsletter.invalidEmail'));
      setMessageType('error');
      setIsSubmitting(false);
      return;
    }

    try {
      // For now, we'll simulate a successful subscription
      // In production, this would call your actual backend API
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call

      // Simulate success response
      const success = Math.random() > 0.2; // 80% success rate for demo

      if (success) {
        setMessage(t('footer.newsletter.successMessage'));
        setMessageType('success');
        setEmail(''); // Clear input on success
        
        // Store subscription locally for demo purposes
        const subscriptions = JSON.parse(localStorage.getItem('newsletter_subscriptions') || '[]');
        subscriptions.push({
          email,
          subscribedAt: new Date().toISOString(),
          status: 'confirmed'
        });
        localStorage.setItem('newsletter_subscriptions', JSON.stringify(subscriptions));
        
        console.log('Newsletter subscription successful:', email);
      } else {
        setMessage(t('footer.newsletter.errorMessage'));
        setMessageType('error');
      }

      /* 
      // Real API call would look like this:
      const response = await fetch('/api/subscribe-newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(t('footer.newsletter.successMessage'));
        setMessageType('success');
        setEmail('');
      } else {
        setMessage(data.message || t('footer.newsletter.errorMessage'));
        setMessageType('error');
      }
      */
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      setMessage(t('footer.newsletter.networkError'));
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // X (Twitter) SVG Icon Component
  const XIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );

  // Discord SVG Icon Component
  const DiscordIcon = () => (
    <svg width="20" height="20" viewBox="0 -28.5 256 256" fill="currentColor">
      <path d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z"/>
    </svg>
  );

  // Sui Logo SVG Component
  const SuiIcon = () => (
    <svg width="20" height="20" viewBox="0 0 200 200" fill="currentColor">
      <path d="M100 0C44.77 0 0 44.77 0 100s44.77 100 100 100 100-44.77 100-100S155.23 0 100 0zm0 180c-44.18 0-80-35.82-80-80s35.82-80 80-80 80 35.82 80 80-35.82 80-80 80z"/>
      <path d="M100 40c-33.14 0-60 26.86-60 60s26.86 60 60 60 60-26.86 60-60-26.86-60-60-60zm0 100c-22.09 0-40-17.91-40-40s17.91-40 40-40 40 17.91 40 40-17.91 40-40 40z"/>
      <circle cx="100" cy="100" r="20"/>
    </svg>
  );

  return (
    <footer className={styles.footer}>
      <div className={styles.footerBackground}></div>
      
      <div className={styles.footerContent}>
        <div className={styles.footerGrid}>
          {/* Brand Section */}
          <div className={styles.brandSection}>
            <div className={styles.brandLogo}>
              <div className={styles.logoIcon}>
                <img 
                  src="/coinspace-normal-logo copy.png" 
                  alt="Coinspace" 
                  className={styles.logoImage}
                />
              </div>
              <h2 className={styles.brandName}>Coinspace</h2>
            </div>
            
            <p className={styles.brandDescription}>
              {t('footer.brand.description')}
            </p>
            
            <div className={styles.socialLinks}>
              <a href="https://x.com/rnawaaaaa" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="X (Twitter)">
                <XIcon />
              </a>
              <a href="https://github.com/coinspace" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/arnawa-ugra-39277a21b/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="https://www.instagram.com/arnawa.sui" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://discord.gg/coinspace" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Discord">
                <DiscordIcon />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div className={styles.footerSection}>
            <h3>{t('footer.platform')}</h3>
            <div className={styles.footerLinks}>
              <Link to="/dashboard" className={styles.footerLink}>
                <span>{t('header.dashboard')}</span>
                <ArrowRight size={14} className={styles.linkArrow} />
              </Link>
              <Link to="/library" className={styles.footerLink}>
                <span>{t('header.library')}</span>
                <ArrowRight size={14} className={styles.linkArrow} />
              </Link>
              <Link to="/create" className={styles.footerLink}>
                <span>Create Module</span>
                <ArrowRight size={14} className={styles.linkArrow} />
              </Link>
              <Link to="/marketplace" className={styles.footerLink}>
                <span>Marketplace</span>
                <ArrowRight size={14} className={styles.linkArrow} />
              </Link>
              <Link to="/creators" className={styles.footerLink}>
                <span>For Creators</span>
                <ArrowRight size={14} className={styles.linkArrow} />
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div className={styles.footerSection}>
            <h3>{t('footer.resources')}</h3>
            <div className={styles.footerLinks}>
              <Link to="/tutorials" className={styles.footerLink}>
                <span>{t('header.tutorials')}</span>
                <ArrowRight size={14} className={styles.linkArrow} />
              </Link>
              <Link to="/faq" className={styles.footerLink}>
                <span>{t('header.faq')}</span>
                <ArrowRight size={14} className={styles.linkArrow} />
              </Link>
              <Link to="/docs" className={styles.footerLink}>
                <span>Documentation</span>
                <ArrowRight size={14} className={styles.linkArrow} />
              </Link>
              <Link to="/blog" className={styles.footerLink}>
                <span>Blog</span>
                <ArrowRight size={14} className={styles.linkArrow} />
              </Link>
              <Link to="/support" className={styles.footerLink}>
                <span>Support</span>
                <ArrowRight size={14} className={styles.linkArrow} />
              </Link>
            </div>
          </div>

          {/* Enhanced Newsletter */}
          <div className={styles.footerSection}>
            <div className={styles.newsletterHeader}>
              <h3>Subscribe to our Newsletter</h3>
            </div>
            <p className={styles.newsletterDescription}>
              {t('footer.newsletter.description')}
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className={styles.newsletterForm}>
              <div className={styles.inputWrapper}>
                <input
                  type="email"
                  placeholder={t('footer.newsletter.placeholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.newsletterInput}
                  required
                  disabled={isSubmitting}
                />
                <button 
                  type="submit" 
                  className={styles.newsletterButton} 
                  disabled={isSubmitting || !email.trim()}
                >
                  {isSubmitting ? (
                    <Loader size={14} className="animate-spin" />
                  ) : (
                    <Send size={14} />
                  )}
                </button>
              </div>
              
              {message && (
                <div className={`${styles.feedbackMessage} ${messageType === 'success' ? styles.successMessage : styles.errorMessage}`}>
                  <div className={styles.messageContent}>
                    {messageType === 'success' ? (
                      <CheckCircle size={16} />
                    ) : (
                      <AlertCircle size={16} />
                    )}
                    <span>{message}</span>
                  </div>
                </div>
              )}
              
              <div className={styles.subscribeText}>
                {t('footer.newsletter.subscribe')}
              </div>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={styles.footerBottom}>
          <div className={styles.copyright}>
            {t('footer.copyright')}
          </div>
          
          <div className={styles.footerBottomLinks}>
            <Link to="/privacy" className={styles.footerBottomLink}>Privacy Policy</Link>
            <Link to="/terms-conditions" className={styles.footerBottomLink}>Terms of Service</Link>
            <Link to="/cookies" className={styles.footerBottomLink}>Cookie Policy</Link>
          </div>
          
          <div className={styles.web3Badge}>
            <div className={styles.web3Icon}>
              <SuiIcon />
            </div>
            <span>{t('footer.poweredBy')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;