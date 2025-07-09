import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'id' | 'zh' | 'ja' | 'ko' | 'es' | 'fr' | 'de';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionary
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    'header.search.placeholder': 'What do you want to learn now?',
    'header.cart.tooltip': 'Cart',
    'header.menu.tooltip': 'Menu',
    'header.language.tooltip': 'Language',
    'header.cart.empty': 'Your cart is empty.',
    'header.cart.findModules': 'Find your modules here',
    'header.connectWallet': 'Connect Wallet',
    'header.dashboard': 'Dashboard',
    'header.library': 'Library',
    'header.pricing': 'Pricing',
    'header.about': 'About Us',
    'header.faq': 'FAQ',
    'header.tutorials': 'Tutorials',
    'header.languageModal.title': 'Choose Your Language',
    'header.languageModal.footer': 'More languages coming soon! 🌍',
    
    // Hero Panel
    'hero.title': 'Freedom to Learn, Decentralize your Future',
    'hero.subtitle': 'Learn, grow and take control of your future.',
    'hero.description': 'In Coinspace, you don\'t just study Web3 - you become part of the revolution.',
    'hero.connectWallet': 'Connect Wallet',
    'hero.searchModule': 'Search Module',
    
    // Running Text
    'runningText.message': 'Ready to learn, earn and explore? Welcome to Coinspace! Before we kick things off, don\'t forget to check our',
    'runningText.terms': 'Terms and Conditions',
    
    // Footer
    'footer.brand.description': 'Revolutionizing education through blockchain technology. Learn, earn, and own your educational journey in the decentralized future.',
    'footer.platform': 'Platform',
    'footer.resources': 'Resources',
    'footer.stayUpdated': 'Stay Updated',
    'footer.newsletter.description': 'Get the latest updates on new features and educational content.',
    'footer.newsletter.placeholder': 'Enter your email',
    'footer.newsletter.subscribe': 'We care about your data in our privacy policy.',
    'footer.newsletter.successMessage': 'Thank you for subscribing! Please check your email for confirmation.',
    'footer.newsletter.errorMessage': 'Failed to subscribe. Please try again.',
    'footer.newsletter.networkError': 'Network error. Please check your internet connection.',
    'footer.newsletter.invalidEmail': 'Please enter a valid email address.',
    'footer.copyright': '© 2024 Coinspace. All rights reserved.',
    'footer.poweredBy': 'Powered by Sui',
  },
  
  id: {
    // Header
    'header.search.placeholder': 'Apa yang ingin Anda pelajari sekarang?',
    'header.cart.tooltip': 'Keranjang',
    'header.menu.tooltip': 'Menu',
    'header.language.tooltip': 'Bahasa',
    'header.cart.empty': 'Keranjang Anda kosong.',
    'header.cart.findModules': 'Temukan modul Anda di sini',
    'header.connectWallet': 'Hubungkan Dompet',
    'header.dashboard': 'Dasbor',
    'header.library': 'Perpustakaan',
    'header.pricing': 'Harga',
    'header.about': 'Tentang Kami',
    'header.faq': 'FAQ',
    'header.tutorials': 'Tutorial',
    'header.languageModal.title': 'Pilih Bahasa Anda',
    'header.languageModal.footer': 'Lebih banyak bahasa segera hadir! 🌍',
    
    // Hero Panel
    'hero.title': 'Kebebasan untuk Belajar, Desentralisasi Masa Depan Anda',
    'hero.subtitle': 'Belajar, berkembang dan kendalikan masa depan Anda.',
    'hero.description': 'Di Coinspace, Anda tidak hanya mempelajari Web3 - Anda menjadi bagian dari revolusi.',
    'hero.connectWallet': 'Hubungkan Dompet',
    'hero.searchModule': 'Cari Modul',
    
    // Running Text
    'runningText.message': 'Siap untuk belajar, mendapatkan, dan menjelajahi? Selamat datang di Coinspace! Sebelum kita mulai, jangan lupa untuk memeriksa',
    'runningText.terms': 'Syarat dan Ketentuan',
    
    // Footer
    'footer.brand.description': 'Merevolusi pendidikan melalui teknologi blockchain. Belajar, dapatkan, dan miliki perjalanan pendidikan Anda di masa depan yang terdesentralisasi.',
    'footer.platform': 'Platform',
    'footer.resources': 'Sumber Daya',
    'footer.stayUpdated': 'Tetap Terkini',
    'footer.newsletter.description': 'Dapatkan pembaruan terbaru tentang fitur baru dan konten pendidikan.',
    'footer.newsletter.placeholder': 'Masukkan email Anda',
    'footer.newsletter.subscribe': 'Kami peduli tentang data Anda dalam kebijakan privasi kami.',
    'footer.newsletter.successMessage': 'Terima kasih telah berlangganan! Mohon periksa email Anda untuk konfirmasi.',
    'footer.newsletter.errorMessage': 'Gagal berlangganan. Mohon coba lagi.',
    'footer.newsletter.networkError': 'Error jaringan. Mohon periksa koneksi internet Anda.',
    'footer.newsletter.invalidEmail': 'Mohon masukkan alamat email yang valid.',
    'footer.copyright': '© 2024 Coinspace. Semua hak dilindungi.',
    'footer.poweredBy': 'Didukung oleh Sui',
  },
  
  zh: {
    // Header
    'header.search.placeholder': '您现在想学什么？',
    'header.cart.tooltip': '购物车',
    'header.menu.tooltip': '菜单',
    'header.language.tooltip': '语言',
    'header.cart.empty': '您的购物车是空的。',
    'header.cart.findModules': '在这里找到您的模块',
    'header.connectWallet': '连接钱包',
    'header.dashboard': '仪表板',
    'header.library': '图书馆',
    'header.pricing': '定价',
    'header.about': '关于我们',
    'header.faq': '常见问题',
    'header.tutorials': '教程',
    'header.languageModal.title': '选择您的语言',
    'header.languageModal.footer': '更多语言即将推出！🌍',
    
    // Hero Panel
    'hero.title': '学习自由，去中心化您的未来',
    'hero.subtitle': '学习、成长并掌控您的未来。',
    'hero.description': '在Coinspace，您不仅仅是学习Web3 - 您成为革命的一部分。',
    'hero.connectWallet': '连接钱包',
    'hero.searchModule': '搜索模块',
    
    // Running Text
    'runningText.message': '准备好学习、赚取和探索了吗？欢迎来到Coinspace！在我们开始之前，别忘了查看我们的',
    'runningText.terms': '条款和条件',
    
    // Footer
    'footer.brand.description': '通过区块链技术革命教育。在去中心化的未来中学习、赚取并拥有您的教育之旅。',
    'footer.platform': '平台',
    'footer.resources': '资源',
    'footer.stayUpdated': '保持更新',
    'footer.newsletter.description': '获取有关新功能和教育内容的最新更新。',
    'footer.newsletter.placeholder': '输入您的邮箱',
    'footer.newsletter.subscribe': '我们在隐私政策中关心您的数据。',
    'footer.newsletter.successMessage': '感谢您的订阅！请查看您的邮箱进行确认。',
    'footer.newsletter.errorMessage': '订阅失败。请重试。',
    'footer.newsletter.networkError': '网络错误。请检查您的网络连接。',
    'footer.newsletter.invalidEmail': '请输入有效的邮箱地址。',
    'footer.copyright': '© 2024 Coinspace. 保留所有权利。',
    'footer.poweredBy': '由Sui提供支持',
  },
  
  ja: {
    // Header
    'header.search.placeholder': '今何を学びたいですか？',
    'header.cart.tooltip': 'カート',
    'header.menu.tooltip': 'メニュー',
    'header.language.tooltip': '言語',
    'header.cart.empty': 'カートは空です。',
    'header.cart.findModules': 'ここでモジュールを見つける',
    'header.connectWallet': 'ウォレット接続',
    'header.dashboard': 'ダッシュボード',
    'header.library': 'ライブラリ',
    'header.pricing': '価格',
    'header.about': '私たちについて',
    'header.faq': 'よくある質問',
    'header.tutorials': 'チュートリアル',
    'header.languageModal.title': '言語を選択',
    'header.languageModal.footer': 'より多くの言語が近日公開！🌍',
    
    // Hero Panel
    'hero.title': '学習の自由、未来の分散化',
    'hero.subtitle': '学び、成長し、未来をコントロールしましょう。',
    'hero.description': 'Coinspaceでは、Web3を学ぶだけでなく、革命の一部になります。',
    'hero.connectWallet': 'ウォレット接続',
    'hero.searchModule': 'モジュール検索',
    
    // Running Text
    'runningText.message': '学習、獲得、探索の準備はできましたか？Coinspaceへようこそ！始める前に、私たちの',
    'runningText.terms': '利用規約',
    
    // Footer
    'footer.brand.description': 'ブロックチェーン技術を通じて教育を革命化。分散化された未来で学習、獲得、そして教育の旅を所有しましょう。',
    'footer.platform': 'プラットフォーム',
    'footer.resources': 'リソース',
    'footer.stayUpdated': '最新情報を入手',
    'footer.newsletter.description': '新機能と教育コンテンツの最新アップデートを入手。',
    'footer.newsletter.placeholder': 'メールアドレスを入力',
    'footer.newsletter.subscribe': 'プライバシーポリシーでデータを大切にしています。',
    'footer.newsletter.successMessage': '購読ありがとうございます！確認のためメールをご確認ください。',
    'footer.newsletter.errorMessage': '購読に失敗しました。もう一度お試しください。',
    'footer.newsletter.networkError': 'ネットワークエラー。インターネット接続をご確認ください。',
    'footer.newsletter.invalidEmail': '有効なメールアドレスを入力してください。',
    'footer.copyright': '© 2024 Coinspace. 全著作権所有。',
    'footer.poweredBy': 'Suiによって提供',
  },
  
  ko: {
    // Header
    'header.search.placeholder': '지금 무엇을 배우고 싶으신가요?',
    'header.cart.tooltip': '장바구니',
    'header.menu.tooltip': '메뉴',
    'header.language.tooltip': '언어',
    'header.cart.empty': '장바구니가 비어있습니다.',
    'header.cart.findModules': '여기서 모듈을 찾으세요',
    'header.connectWallet': '지갑 연결',
    'header.dashboard': '대시보드',
    'header.library': '라이브러리',
    'header.pricing': '가격',
    'header.about': '회사 소개',
    'header.faq': '자주 묻는 질문',
    'header.tutorials': '튜토리얼',
    'header.languageModal.title': '언어 선택',
    'header.languageModal.footer': '더 많은 언어가 곧 출시됩니다! 🌍',
    
    // Hero Panel
    'hero.title': '학습의 자유, 미래의 탈중앙화',
    'hero.subtitle': '배우고, 성장하고, 미래를 통제하세요.',
    'hero.description': 'Coinspace에서는 Web3를 배우는 것뿐만 아니라 혁명의 일부가 됩니다.',
    'hero.connectWallet': '지갑 연결',
    'hero.searchModule': '모듈 검색',
    
    // Running Text
    'runningText.message': '배우고, 얻고, 탐험할 준비가 되셨나요? Coinspace에 오신 것을 환영합니다! 시작하기 전에 우리의',
    'runningText.terms': '이용약관',
    
    // Footer
    'footer.brand.description': '블록체인 기술을 통해 교육을 혁신합니다. 탈중앙화된 미래에서 학습하고, 얻고, 교육 여정을 소유하세요.',
    'footer.platform': '플랫폼',
    'footer.resources': '리소스',
    'footer.stayUpdated': '최신 정보 받기',
    'footer.newsletter.description': '새로운 기능과 교육 콘텐츠에 대한 최신 업데이트를 받으세요.',
    'footer.newsletter.placeholder': '이메일을 입력하세요',
    'footer.newsletter.subscribe': '개인정보 보호정책에서 귀하의 데이터를 소중히 여깁니다.',
    'footer.newsletter.successMessage': '구독해 주셔서 감사합니다! 확인을 위해 이메일을 확인해 주세요.',
    'footer.newsletter.errorMessage': '구독에 실패했습니다. 다시 시도해 주세요.',
    'footer.newsletter.networkError': '네트워크 오류입니다. 인터넷 연결을 확인해 주세요.',
    'footer.newsletter.invalidEmail': '유효한 이메일 주소를 입력해 주세요.',
    'footer.copyright': '© 2024 Coinspace. 모든 권리 보유.',
    'footer.poweredBy': 'Sui로 구동',
  },
  
  es: {
    // Header
    'header.search.placeholder': '¿Qué quieres aprender ahora?',
    'header.cart.tooltip': 'Carrito',
    'header.menu.tooltip': 'Menú',
    'header.language.tooltip': 'Idioma',
    'header.cart.empty': 'Tu carrito está vacío.',
    'header.cart.findModules': 'Encuentra tus módulos aquí',
    'header.connectWallet': 'Conectar Billetera',
    'header.dashboard': 'Panel',
    'header.library': 'Biblioteca',
    'header.pricing': 'Precios',
    'header.about': 'Acerca de',
    'header.faq': 'Preguntas Frecuentes',
    'header.tutorials': 'Tutoriales',
    'header.languageModal.title': 'Elige tu Idioma',
    'header.languageModal.footer': '¡Más idiomas próximamente! 🌍',
    
    // Hero Panel
    'hero.title': 'Libertad para Aprender, Descentraliza tu Futuro',
    'hero.subtitle': 'Aprende, crece y toma control de tu futuro.',
    'hero.description': 'En Coinspace, no solo estudias Web3 - te conviertes en parte de la revolución.',
    'hero.connectWallet': 'Conectar Billetera',
    'hero.searchModule': 'Buscar Módulo',
    
    // Running Text
    'runningText.message': '¿Listo para aprender, ganar y explorar? ¡Bienvenido a Coinspace! Antes de comenzar, no olvides revisar nuestros',
    'runningText.terms': 'Términos y Condiciones',
    
    // Footer
    'footer.brand.description': 'Revolucionando la educación a través de la tecnología blockchain. Aprende, gana y posee tu viaje educativo en el futuro descentralizado.',
    'footer.platform': 'Plataforma',
    'footer.resources': 'Recursos',
    'footer.stayUpdated': 'Mantente Actualizado',
    'footer.newsletter.description': 'Obtén las últimas actualizaciones sobre nuevas características y contenido educativo.',
    'footer.newsletter.placeholder': 'Ingresa tu email',
    'footer.newsletter.subscribe': 'Nos importan tus datos en nuestra política de privacidad.',
    'footer.newsletter.successMessage': '¡Gracias por suscribirte! Por favor revisa tu email para confirmación.',
    'footer.newsletter.errorMessage': 'Error al suscribirse. Por favor intenta de nuevo.',
    'footer.newsletter.networkError': 'Error de red. Por favor verifica tu conexión a internet.',
    'footer.newsletter.invalidEmail': 'Por favor ingresa una dirección de email válida.',
    'footer.copyright': '© 2024 Coinspace. Todos los derechos reservados.',
    'footer.poweredBy': 'Impulsado por Sui',
  },
  
  fr: {
    // Header
    'header.search.placeholder': 'Que voulez-vous apprendre maintenant?',
    'header.cart.tooltip': 'Panier',
    'header.menu.tooltip': 'Menu',
    'header.language.tooltip': 'Langue',
    'header.cart.empty': 'Votre panier est vide.',
    'header.cart.findModules': 'Trouvez vos modules ici',
    'header.connectWallet': 'Connecter Portefeuille',
    'header.dashboard': 'Tableau de bord',
    'header.library': 'Bibliothèque',
    'header.pricing': 'Tarifs',
    'header.about': 'À propos',
    'header.faq': 'FAQ',
    'header.tutorials': 'Tutoriels',
    'header.languageModal.title': 'Choisissez votre Langue',
    'header.languageModal.footer': 'Plus de langues bientôt disponibles! 🌍',
    
    // Hero Panel
    'hero.title': 'Liberté d\'Apprendre, Décentralisez votre Avenir',
    'hero.subtitle': 'Apprenez, grandissez et prenez le contrôle de votre avenir.',
    'hero.description': 'Chez Coinspace, vous n\'étudiez pas seulement Web3 - vous devenez partie de la révolution.',
    'hero.connectWallet': 'Connecter Portefeuille',
    'hero.searchModule': 'Rechercher Module',
    
    // Running Text
    'runningText.message': 'Prêt à apprendre, gagner et explorer? Bienvenue à Coinspace! Avant de commencer, n\'oubliez pas de vérifier nos',
    'runningText.terms': 'Termes et Conditions',
    
    // Footer
    'footer.brand.description': 'Révolutionner l\'éducation grâce à la technologie blockchain. Apprenez, gagnez et possédez votre parcours éducatif dans l\'avenir décentralisé.',
    'footer.platform': 'Plateforme',
    'footer.resources': 'Ressources',
    'footer.stayUpdated': 'Restez à Jour',
    'footer.newsletter.description': 'Obtenez les dernières mises à jour sur les nouvelles fonctionnalités et le contenu éducatif.',
    'footer.newsletter.placeholder': 'Entrez votre email',
    'footer.newsletter.subscribe': 'Nous nous soucions de vos données dans notre politique de confidentialité.',
    'footer.newsletter.successMessage': 'Merci de vous être abonné! Veuillez vérifier votre email pour confirmation.',
    'footer.newsletter.errorMessage': 'Échec de l\'abonnement. Veuillez réessayer.',
    'footer.newsletter.networkError': 'Erreur réseau. Veuillez vérifier votre connexion internet.',
    'footer.newsletter.invalidEmail': 'Veuillez entrer une adresse email valide.',
    'footer.copyright': '© 2024 Coinspace. Tous droits réservés.',
    'footer.poweredBy': 'Alimenté par Sui',
  },
  
  de: {
    // Header
    'header.search.placeholder': 'Was möchten Sie jetzt lernen?',
    'header.cart.tooltip': 'Warenkorb',
    'header.menu.tooltip': 'Menü',
    'header.language.tooltip': 'Sprache',
    'header.cart.empty': 'Ihr Warenkorb ist leer.',
    'header.cart.findModules': 'Finden Sie Ihre Module hier',
    'header.connectWallet': 'Wallet Verbinden',
    'header.dashboard': 'Dashboard',
    'header.library': 'Bibliothek',
    'header.pricing': 'Preise',
    'header.about': 'Über uns',
    'header.faq': 'FAQ',
    'header.tutorials': 'Tutorials',
    'header.languageModal.title': 'Wählen Sie Ihre Sprache',
    'header.languageModal.footer': 'Weitere Sprachen kommen bald! 🌍',
    
    // Hero Panel
    'hero.title': 'Freiheit zu Lernen, Dezentralisieren Sie Ihre Zukunft',
    'hero.subtitle': 'Lernen, wachsen und übernehmen Sie die Kontrolle über Ihre Zukunft.',
    'hero.description': 'Bei Coinspace studieren Sie nicht nur Web3 - Sie werden Teil der Revolution.',
    'hero.connectWallet': 'Wallet Verbinden',
    'hero.searchModule': 'Modul Suchen',
    
    // Running Text
    'runningText.message': 'Bereit zu lernen, verdienen und erkunden? Willkommen bei Coinspace! Bevor wir loslegen, vergessen Sie nicht, unsere',
    'runningText.terms': 'Geschäftsbedingungen',
    
    // Footer
    'footer.brand.description': 'Revolutionierung der Bildung durch Blockchain-Technologie. Lernen, verdienen und besitzen Sie Ihre Bildungsreise in der dezentralisierten Zukunft.',
    'footer.platform': 'Plattform',
    'footer.resources': 'Ressourcen',
    'footer.stayUpdated': 'Bleiben Sie auf dem Laufenden',
    'footer.newsletter.description': 'Erhalten Sie die neuesten Updates zu neuen Funktionen und Bildungsinhalten.',
    'footer.newsletter.placeholder': 'Geben Sie Ihre E-Mail ein',
    'footer.newsletter.subscribe': 'Wir kümmern uns um Ihre Daten in unserer Datenschutzrichtlinie.',
    'footer.newsletter.successMessage': 'Danke für Ihr Abonnement! Bitte überprüfen Sie Ihre E-Mail zur Bestätigung.',
    'footer.newsletter.errorMessage': 'Abonnement fehlgeschlagen. Bitte versuchen Sie es erneut.',
    'footer.newsletter.networkError': 'Netzwerkfehler. Bitte überprüfen Sie Ihre Internetverbindung.',
    'footer.newsletter.invalidEmail': 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
    'footer.copyright': '© 2024 Coinspace. Alle Rechte vorbehalten.',
    'footer.poweredBy': 'Angetrieben von Sui',
  },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    localStorage.setItem('coinspace_language', lang);
  };

  const t = (key: string): string => {
    return translations[currentLanguage][key] || translations.en[key] || key;
  };

  // Load saved language on mount
  React.useEffect(() => {
    const savedLanguage = localStorage.getItem('coinspace_language') as Language;
    if (savedLanguage && translations[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};