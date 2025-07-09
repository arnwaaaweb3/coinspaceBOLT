import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Rocket, 
  Wallet, 
  BookOpen, 
  Users, 
  Shield, 
  Zap,
  Globe,
  Target,
  ExternalLink
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BackButton from '../../components/BackButton';

interface FAQItem {
  id: number;
  question: string;
  answer: string | JSX.Element;
  category: string;
}

const FAQPage: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([1]); // First item open by default
  const [selectedCategory, setSelectedCategory] = useState('All');

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "What is Coinspace?",
      answer: "Coinspace is a Web3-based decentralized learning platform that uses NFTs as educational modules. It allows anyone to access, collect, and even resell learning materials through blockchain technology — no institutions, no permission required.",
      category: "General"
    },
    {
      id: 2,
      question: "Who created Coinspace?",
      answer: (
        <div>
          <p className="mb-3">Coinspace was created by Arnawa (Nawa), a college student from Diponegoro University, Indonesia, majoring in Information and PR Communications.</p>
          <p>He started diving into AI, blockchain, and smart contracts at 21, driven by a mission to disrupt the status quo of education.</p>
        </div>
      ),
      category: "General"
    },
    {
      id: 3,
      question: "What is the main purpose of Coinspace?",
      answer: "We aim to build a permissionless and borderless learning ecosystem, where anyone can learn based on passion — not institutions. You don't need degrees, passports, or paperwork. All you need is a wallet to start your learning journey on your own terms.",
      category: "General"
    },
    {
      id: 4,
      question: "How do I use Coinspace?",
      answer: (
        <div>
          <p className="mb-3 font-semibold text-[#604cc3]">Super simple:</p>
          <ol className="space-y-2 list-decimal list-inside">
            <li>Connect your Web3 wallet to our platform</li>
            <li>Explore the module marketplace</li>
            <li>Choose what you want to learn</li>
            <li>Add it to cart and complete the checkout</li>
            <li className="font-semibold text-[#ff7f3e]">Boom — your module is in your personal NFT library, ready to learn anytime!</li>
          </ol>
        </div>
      ),
      category: "Getting Started"
    },
    {
      id: 5,
      question: "Do I really need a Web3 wallet?",
      answer: (
        <div>
          <p className="mb-3">Yes, you'll need a Web3 wallet (like Suiet, Martian, or Metamask for other chains).</p>
          <p className="mb-3">Coinspace runs on blockchain — your wallet is your ID, access key, and vault.</p>
          <p>Whether it's free or paid content, you'll need to sign a transaction and pay gas fees to mint the module NFT to your library.</p>
        </div>
      ),
      category: "Wallet & Technical"
    },
    {
      id: 6,
      question: "What's the difference between free and paid modules?",
      answer: (
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">Free Modules:</h4>
            <p className="text-green-700">These are community-owned. Anyone can mint and learn from them. You'll just need to cover the gas fee (usually just cents).</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">Paid Modules:</h4>
            <p className="text-blue-700">Created by individual authors/teachers. Buying one means you're supporting a creator directly, and you'll gain exclusive access to the content. The payment + gas fee will go directly to the creator's wallet.</p>
          </div>
        </div>
      ),
      category: "Modules & Content"
    },
    {
      id: 7,
      question: "Can I resell modules after I'm done learning?",
      answer: (
        <div>
          <p className="mb-3 font-semibold text-[#ff7f3e]">Yes! That's one of the coolest parts.</p>
          <p className="mb-3">Once you mint a module as an NFT, you fully own it. If it's resellable (depending on the creator's settings), you can list it again on the Coinspace Marketplace.</p>
          <p className="font-semibold text-[#604cc3]">Learn it → Own it → Resell it. It's like turning learning into an asset.</p>
        </div>
      ),
      category: "NFT & Ownership"
    },
    {
      id: 8,
      question: "Is there a tutorial or guide available?",
      answer: (
        <div>
          <p className="mb-3">Absolutely.</p>
          <p className="mb-3">We provide a full walkthrough and video tutorial on how to connect your wallet, mint modules, and navigate the platform.</p>
          <p>Just click on the menu icon at the top-right corner, and head to the "How It Works" section.</p>
        </div>
      ),
      category: "Getting Started"
    },
    {
      id: 9,
      question: "Who can become a creator on Coinspace?",
      answer: (
        <div>
          <p className="mb-3 font-semibold text-[#604cc3]">Anyone. Literally.</p>
          <p className="mb-3">You can be a teacher, author, student, researcher, hobbyist, or just someone with knowledge to share.</p>
          <p>As long as you have valuable content — you can turn it into an NFT-based module, publish it, and earn directly from learners. No middlemen. No platforms eating your cut.</p>
        </div>
      ),
      category: "Creators"
    },
    {
      id: 10,
      question: "Can I publish research papers or journals here?",
      answer: (
        <div>
          <p className="mb-3 font-semibold text-[#ff7f3e]">Yes! Coinspace is also a decentralized publishing platform.</p>
          <p>You can publish research papers, journals, or academic materials without fees or intermediaries, and make them free or monetized — your call.</p>
        </div>
      ),
      category: "Creators"
    },
    {
      id: 11,
      question: "Is Coinspace safe and secure?",
      answer: (
        <div>
          <p className="mb-3">We utilize the Sui Blockchain and IPFS, ensuring that all transactions are cryptographically secure, tamper-proof, and fully transparent.</p>
          <p className="font-semibold text-[#604cc3]">Plus, because it's decentralized — your data and ownership are always in your hands, not ours.</p>
        </div>
      ),
      category: "Security"
    },
    {
      id: 12,
      question: "Do modules ever expire?",
      answer: (
        <div>
          <p className="mb-3 font-semibold text-[#ff7f3e]">Nope. Once you mint a module, it's yours forever.</p>
          <p>It lives in your wallet — on-chain and censorship-resistant.</p>
        </div>
      ),
      category: "NFT & Ownership"
    },
    {
      id: 13,
      question: "What's the roadmap of Coinspace?",
      answer: (
        <div>
          <p className="mb-4 font-semibold text-[#604cc3]">We're constantly evolving. Here's a quick snapshot:</p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <span>Launch of NFT module minting system</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <span>IPFS integration for decentralized storage</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-[#ff7f3e] rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">🔜</span>
              </div>
              <span>Creator dashboard + analytics</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-[#ff7f3e] rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">🔜</span>
              </div>
              <span>Resale royalty system for module creators</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-[#ff7f3e] rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">🔜</span>
              </div>
              <span>Token-based ecosystem for incentives</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-[#ff7f3e] rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">🔜</span>
              </div>
              <span>DAO governance model for the community</span>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-600">Stay tuned via our socials or join the Coinspace Discord!</p>
        </div>
      ),
      category: "Roadmap"
    }
  ];

  const categories = ['All', ...Array.from(new Set(faqData.map(item => item.category)))];

  const filteredFAQs = selectedCategory === 'All' 
    ? faqData 
    : faqData.filter(item => item.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'General': return <Globe size={16} />;
      case 'Getting Started': return <Rocket size={16} />;
      case 'Wallet & Technical': return <Wallet size={16} />;
      case 'Modules & Content': return <BookOpen size={16} />;
      case 'NFT & Ownership': return <Shield size={16} />;
      case 'Creators': return <Users size={16} />;
      case 'Security': return <Shield size={16} />;
      case 'Roadmap': return <Target size={16} />;
      default: return <HelpCircle size={16} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#fef4ea]">
      <Header />
      <BackButton />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-orange-50 to-blue-50 opacity-60"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23604cc3%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-purple-200 mb-8">
                <HelpCircle className="text-[#604cc3]" size={20} />
                <span className="text-[#604cc3] font-semibold">Frequently Asked Questions</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#604cc3] to-[#ff7f3e] bg-clip-text text-transparent">
                Got Questions? We've Got Answers!
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
                These are the most essential questions to help you understand what <span className="font-semibold text-[#604cc3]">Coinspace</span> is all about!
              </p>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-white/50">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-[#604cc3] text-white shadow-lg'
                      : 'bg-white text-[#604cc3] border border-[#604cc3] hover:bg-[#604cc3] hover:text-white'
                  }`}
                >
                  {category !== 'All' && getCategoryIcon(category)}
                  <span>{category}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-4">
                {filteredFAQs.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md"
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-[#604cc3]">
                          {getCategoryIcon(item.category)}
                          <span className="text-sm font-medium opacity-70">{item.category}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 flex-1">
                          {item.question}
                        </h3>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        {openItems.includes(item.id) ? (
                          <ChevronUp className="text-[#604cc3]" size={24} />
                        ) : (
                          <ChevronDown className="text-[#604cc3]" size={24} />
                        )}
                      </div>
                    </button>
                    
                    {openItems.includes(item.id) && (
                      <div className="px-6 pb-6">
                        <div className="border-t border-gray-100 pt-4">
                          <div className="text-gray-700 leading-relaxed">
                            {item.answer}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-16 bg-white/50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-gradient-to-br from-[#604cc3] to-[#ff7f3e] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Fast & Simple</h3>
                  <p className="text-gray-600">Connect wallet, mint modules, start learning in minutes</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-gradient-to-br from-[#ff7f3e] to-[#604cc3] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Secure & Owned</h3>
                  <p className="text-gray-600">Your modules are NFTs - truly owned, forever accessible</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-gradient-to-br from-[#604cc3] to-[#ff7f3e] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Global & Open</h3>
                  <p className="text-gray-600">Learn from creators worldwide, no borders or restrictions</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Still Have Questions CTA */}
        <section className="py-20 bg-gradient-to-br from-[#604cc3] to-[#ff7f3e] text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Still Have Questions?
              </h2>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                We're here to help! Join our community or reach out directly.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href="/dashboard" 
                  className="inline-flex items-center gap-3 bg-white text-[#604cc3] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                >
                  <Rocket size={24} />
                  Start Learning Now
                </a>
                
                <a 
                  href="https://discord.gg/coinspace" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/30 transition-colors border border-white/30"
                >
                  <Users size={24} />
                  Join Discord
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQPage;