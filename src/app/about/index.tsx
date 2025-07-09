import React from 'react';
import { 
  Rocket, 
  Globe, 
  Users, 
  BookOpen, 
  Zap, 
  Shield, 
  Heart,
  Target,
  Eye,
  Linkedin,
  Twitter,
  Instagram,
  ExternalLink
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BackButton from '../../components/BackButton';

const AboutPage: React.FC = () => {
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
                <Rocket className="text-[#604cc3]" size={20} />
                <span className="text-[#604cc3] font-semibold">About Coinspace</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#604cc3] to-[#ff7f3e] bg-clip-text text-transparent">
                Hey there! We're Coinspace.
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
                We're building this space to <span className="font-semibold text-[#604cc3]">accelerate and decentralize education</span> for everyone, everywhere.
              </p>
              
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-purple-100 shadow-lg">
                <p className="text-lg text-gray-800 leading-relaxed">
                  From day one, our mission has been loud and clear: <span className="font-bold text-[#ff7f3e]">education is a human right, not a privilege.</span> No one should gatekeep or capitalize on knowledge that's meant to be distributed freely.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-16 bg-white/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-[#604cc3] mb-8">
                Our Philosophy
              </h2>
              <div className="bg-gradient-to-r from-[#604cc3]/10 to-[#ff7f3e]/10 rounded-2xl p-8 border border-purple-100">
                <p className="text-lg text-gray-800 leading-relaxed mb-6">
                  This belief aligns perfectly with the spirit of Web3 — <span className="font-semibold">decentralization, freedom, and ownership.</span>
                </p>
                <p className="text-lg text-gray-800 leading-relaxed">
                  As the world slowly transforms from corporate-controlled Web2 to a permissionless, user-owned Web3, we're not sitting on the sidelines. <span className="font-bold text-[#604cc3]">We're stepping into the arena — to redefine education itself.</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What We're Creating */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-[#604cc3] text-white px-6 py-3 rounded-full mb-6">
                <Target size={20} />
                <span className="font-semibold">What We're Creating</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                A New Way to Learn
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                With the power of blockchain, IPFS, and NFT-based modules, Coinspace introduces revolutionary learning experiences.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                { icon: Zap, title: "Fast-delivered", desc: "Instant access to knowledge" },
                { icon: Heart, title: "Low-cost", desc: "Just gas fees!" },
                { icon: Globe, title: "Borderless", desc: "Learn from anywhere" },
                { icon: Shield, title: "No gatekeeping", desc: "Open to everyone" },
                { icon: BookOpen, title: "Self-paced", desc: "Your rhythm, your rules" },
                { icon: Users, title: "Truly owned", desc: "Assets you control" }
              ].map((feature, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-purple-100">
                  <div className="bg-gradient-to-br from-[#604cc3] to-[#ff7f3e] w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="text-white" size={24} />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* For Different Users */}
        <section className="py-16 bg-white/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#604cc3] mb-16">
              Built for Everyone
            </h2>

            <div className="space-y-16 max-w-6xl mx-auto">
              {/* Students */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4">
                    <BookOpen size={18} />
                    <span className="font-semibold">For Students & Learners</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Learn Without Limits</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#604cc3] rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Affordable Learning</h4>
                        <p className="text-gray-600">Say goodbye to overpriced education. Just pay a small gas fee.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#ff7f3e] rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Follow Your Curiosity</h4>
                        <p className="text-gray-600">No more "wrong major." Learn whatever interests you.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#604cc3] rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Resell What You've Learned</h4>
                        <p className="text-gray-600">Your learning module is an NFT asset. Sell it and earn from learning.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
                  <div className="text-6xl mb-4">👩‍🎓</div>
                  <p className="text-lg text-gray-700 italic">
                    "Whether you're chilling at home or traveling the world, Coinspace goes with you."
                  </p>
                </div>
              </div>

              {/* Educators */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 border border-green-100 lg:order-1">
                  <div className="text-6xl mb-4">👩‍🏫</div>
                  <p className="text-lg text-gray-700 italic">
                    "Be a full-time educator and a Web3 creator. Passive income, global reach."
                  </p>
                </div>
                <div className="lg:order-2">
                  <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-4">
                    <Users size={18} />
                    <span className="font-semibold">For Teachers & Educators</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Monetize Your Knowledge</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#604cc3] rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Direct Royalties</h4>
                        <p className="text-gray-600">Create NFT modules and earn from learners worldwide.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#ff7f3e] rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Free Academic Publishing</h4>
                        <p className="text-gray-600">Post research without restrictions. No fees. No filters.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Authors */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-4">
                    <BookOpen size={18} />
                    <span className="font-semibold">For Authors & Writers</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">A New Publishing Frontier</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#604cc3] rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Web3 Bookstore</h4>
                        <p className="text-gray-600">Publish eBooks as NFTs, sell directly to readers.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#ff7f3e] rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-gray-900">100% Royalty. No Cuts.</h4>
                        <p className="text-gray-600">No publishers, no agents. Everything goes to your wallet.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
                  <div className="text-6xl mb-4">📚</div>
                  <p className="text-lg text-gray-700 italic">
                    "With non-mintable NFTs, your work is protected — verified, trackable, and uncopiable."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Vision */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-purple-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-br from-[#604cc3] to-[#ff7f3e] w-12 h-12 rounded-lg flex items-center justify-center">
                    <Eye className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#604cc3]">Vision</h3>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  To create a world where knowledge is truly free, borderless, and owned by the people.
                </p>
                <p className="text-gray-600">
                  We envision a future where high-quality education is no longer a privilege, but a basic right — accessible to anyone, anywhere, without institutional gatekeeping.
                </p>
              </div>

              {/* Mission */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-orange-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-br from-[#ff7f3e] to-[#604cc3] w-12 h-12 rounded-lg flex items-center justify-center">
                    <Target className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#ff7f3e]">Mission</h3>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  To decentralize education through blockchain, NFT, and Web3 infrastructure — making learning affordable, accessible, and creator-owned.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#ff7f3e] rounded-full"></div>
                    <span>Unlocking global access to affordable learning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#604cc3] rounded-full"></div>
                    <span>Empowering educators to monetize knowledge directly</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#ff7f3e] rounded-full"></div>
                    <span>Disrupting traditional publishing models</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section className="py-16 bg-white/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#604cc3] mb-4">
                Meet Our Founder
              </h2>
              <p className="text-lg text-gray-700">
                The visionary behind the educational revolution
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-purple-100">
                <div className="grid lg:grid-cols-3 gap-8 items-center">
                  <div className="lg:col-span-1">
                    <div className="relative">
                      <div className="bg-gradient-to-br from-[#ff7f3e] to-[#ff7f3e]/80 rounded-2xl p-4">
                        <img 
                          src="/WhatsApp_Image_2025-06-13_at_14.34.44_60f7477b-removebg-preview.png" 
                          alt="Arnawa Ugra Wicaksana"
                          className="w-full max-w-xs mx-auto rounded-xl shadow-lg"
                        />
                      </div>
                      <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-[#604cc3] to-[#ff7f3e] w-16 h-16 rounded-full flex items-center justify-center">
                        <Rocket className="text-white" size={24} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-2">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Arnawa Ugra Wicaksana</h3>
                      <div className="inline-flex items-center gap-2 bg-[#604cc3] text-white px-4 py-2 rounded-full text-sm font-semibold">
                        <Globe size={16} />
                        CEO/Founder • Indonesia
                      </div>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed mb-6">
                      Arnawa (Nawa) is a young visionary from Indonesia who believes in blockchain transparency and its distributed system to shape the new modern face of the world. He studies Information and PR communications and has developed a deep passion for AI, Blockchain, and Smart-Contract technology.
                    </p>
                    
                    <div className="flex gap-4">
                      <a 
                        href="https://www.linkedin.com/in/arnawa-ugra-39277a21b/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Linkedin size={18} />
                        <span>LinkedIn</span>
                        <ExternalLink size={14} />
                      </a>
                      <a 
                        href="https://x.com/rnawaaaaa" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-[#ff7f3e] text-white px-4 py-2 rounded-lg hover:bg-[#e6722e] transition-colors"
                      >
                        <Twitter size={18} />
                        <span>X (Twitter)</span>
                        <ExternalLink size={14} />
                      </a>
                      <a 
                        href="https://www.instagram.com/arnawa.sui?igsh=eTlhbmphc3JieG1x&utm_source=qr" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors"
                      >
                        <Instagram size={18} />
                        <span>Instagram</span>
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-br from-[#604cc3] to-[#ff7f3e] text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Join the Movement
              </h2>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                At Coinspace, we're not just building a platform — we're launching a movement.
              </p>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 mb-8">
                <p className="text-lg leading-relaxed">
                  A movement where knowledge is decentralized, educators are empowered, learners are free, and information is unstoppable.
                </p>
              </div>
              <div className="space-y-4 text-lg font-semibold">
                <p>No more overpriced degrees.</p>
                <p>No more locked libraries.</p>
                <p>No more permission slips.</p>
                <p className="text-2xl font-bold">Just you, the knowledge, and the freedom to grow.</p>
              </div>
              <div className="mt-12">
                <a 
                  href="/dashboard" 
                  className="inline-flex items-center gap-3 bg-white text-[#604cc3] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                >
                  <Rocket size={24} />
                  Let's decentralize education, together.
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

export default AboutPage;