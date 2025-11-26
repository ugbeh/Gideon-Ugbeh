
import React, { useState, useEffect } from 'react';
import { AppState, AudienceInsight } from './types';
import { generateAudienceInsights } from './services/geminiService';
import { Dashboard } from './components/Dashboard';
import { Search, Loader2, TrendingUp, Users, MapPin, ArrowRight, Lock, Mail, User as UserIcon, LogOut, X, LayoutGrid, HelpCircle, Info, Zap, Eye, Globe, Sun, Moon, CheckCircle2 } from 'lucide-react';

// --- Types ---
type PageView = 'HOME' | 'PRODUCT' | 'FAQ' | 'ABOUT' | 'CONTACT';

// --- Toast Notification Component ---
const Toast = ({ message, onClose }: { message: string, onClose: () => void }) => (
    <div className="fixed top-20 right-4 z-[100] animate-in slide-in-from-right-10 fade-in duration-300">
        <div className="bg-white dark:bg-slate-800 border border-nigeria-200 dark:border-nigeria-900 shadow-xl rounded-lg p-4 flex items-center gap-3 pr-10 relative overflow-hidden">
             <div className="absolute left-0 top-0 bottom-0 w-1 bg-nigeria-500"></div>
             <div className="w-8 h-8 rounded-full bg-nigeria-100 dark:bg-nigeria-900/50 flex items-center justify-center text-nigeria-600 dark:text-nigeria-400">
                 <CheckCircle2 size={18} />
             </div>
             <div>
                 <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Notification</h4>
                 <p className="text-sm text-slate-600 dark:text-slate-300">{message}</p>
             </div>
             <button onClick={onClose} className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                 <X size={14} />
             </button>
        </div>
    </div>
);

// --- Page Components ---

const ProductPage = () => (
  <div className="max-w-5xl mx-auto px-6 py-16 animate-in fade-in duration-500">
    <div className="text-center mb-16">
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">Built for Nigerian Marketers</h2>
      <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
        Insight NG gives you instant access to the digital habits of millions of Nigerians. From social media trends to website traffic, get the data you need.
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
      <div className="space-y-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center text-green-600 dark:text-green-400">
            <Users size={24} />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Demographic Intelligence</h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400">Understand the age, gender, and location distribution of your target audience across 36 states.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400">
            <LayoutGrid size={24} />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Media Consumption</h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400">Discover exactly which websites, podcasts, and YouTube channels your audience spends time on.</p>
          </div>
        </div>
         <div className="flex gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-400">
            <Zap size={24} />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Competitor Analysis</h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400">Benchmark your brand against competitors and find gaps in the market to exploit.</p>
          </div>
        </div>
      </div>
      <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-inner">
         <div className="bg-white dark:bg-slate-700 rounded-xl shadow-sm p-6 mb-4">
            <div className="h-4 w-1/3 bg-slate-100 dark:bg-slate-600 rounded mb-4"></div>
            <div className="space-y-2">
                <div className="h-2 w-full bg-slate-50 dark:bg-slate-600 rounded"></div>
                <div className="h-2 w-5/6 bg-slate-50 dark:bg-slate-600 rounded"></div>
            </div>
         </div>
         <div className="bg-white dark:bg-slate-700 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-600"></div>
                <div className="space-y-2 flex-1">
                    <div className="h-2 w-1/2 bg-slate-100 dark:bg-slate-600 rounded"></div>
                    <div className="h-2 w-1/4 bg-slate-50 dark:bg-slate-600 rounded"></div>
                </div>
            </div>
            <div className="h-20 bg-slate-50 dark:bg-slate-600 rounded w-full"></div>
         </div>
      </div>
    </div>
  </div>
);

const FaqPage = () => (
  <div className="max-w-3xl mx-auto px-6 py-16 animate-in fade-in duration-500">
    <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-12">Frequently Asked Questions</h2>
    <div className="space-y-6">
      {[
        { q: "Where does the data come from?", a: "We aggregate data from public social media profiles, search trends, website traffic estimators, and our proprietary Nigerian consumer panel." },
        { q: "Is Insight NG free to use?", a: "Yes, our basic plan is free forever. We offer a premium tier for agencies requiring bulk exports and API access." },
        { q: "How accurate is the location data?", a: "Our location data is estimated based on self-reported user profiles and IP geolocation trends, providing a high-confidence overview of state-level distribution." },
        { q: "Can I export the data?", a: "Absolutely. You can export all reports to CSV for use in Excel, Google Sheets, or your own internal dashboards." }
      ].map((item, idx) => (
        <div key={idx} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 hover:shadow-sm transition-shadow">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{item.q}</h3>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{item.a}</p>
        </div>
      ))}
    </div>
  </div>
);

const AboutPage = () => (
  <div className="max-w-5xl mx-auto px-6 py-16 animate-in fade-in duration-500">
    {/* Header Section */}
    <div className="text-center mb-16 max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">Empowering African Business with Data</h2>
        <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
            We are building the definitive audience intelligence engine for the continent, starting with its biggest market.
        </p>
    </div>

    {/* Mission & Vision Cards */}
    <div className="grid md:grid-cols-2 gap-8 mb-20">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm relative overflow-hidden group hover:border-nigeria-200 dark:hover:border-nigeria-700 transition-all">
            <div className="absolute top-0 right-0 p-8 opacity-5 text-nigeria-900 dark:text-nigeria-500 group-hover:scale-110 transition-transform duration-500">
                <TrendingUp size={120} />
            </div>
            <div className="relative z-10">
                <div className="w-12 h-12 bg-nigeria-50 dark:bg-nigeria-900/30 text-nigeria-600 dark:text-nigeria-400 rounded-xl flex items-center justify-center mb-6">
                    <Zap size={24} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Our Mission</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    To democratize access to consumer intelligence in Nigeria. We believe every business, from local startups to multinational corporations, deserves actionable, transparent data to make better decisions.
                </p>
            </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm relative overflow-hidden group hover:border-blue-200 dark:hover:border-blue-700 transition-all">
             <div className="absolute top-0 right-0 p-8 opacity-5 text-blue-900 dark:text-blue-500 group-hover:scale-110 transition-transform duration-500">
                <Globe size={120} />
            </div>
             <div className="relative z-10">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-6">
                    <Eye size={24} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Our Vision</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    To become the standard operating system for African marketing. We envision a future where "guessing" is replaced by "knowing," and where Nigerian businesses can compete globally using world-class insights.
                </p>
            </div>
        </div>
    </div>

    {/* The Screenshot Section */}
    <div className="mb-20">
         <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">See it in action</h3>
        </div>
        <div className="rounded-2xl border-[8px] border-slate-900 bg-slate-900 shadow-2xl overflow-hidden relative max-w-4xl mx-auto">
            {/* Browser Bar Mockup */}
            <div className="bg-slate-800 px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="ml-4 flex-1 bg-slate-900/50 h-6 rounded-md flex items-center px-3 text-xs text-slate-400 font-mono">
                    insightng.com/dashboard/analysis
                </div>
            </div>
            {/* The "Image" - UI Representation */}
            <div className="bg-slate-50 dark:bg-slate-950 p-6 md:p-8 overflow-hidden aspect-video relative">
                 {/* Abstract UI representation */}
                 <div className="space-y-6 opacity-90">
                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <div className="space-y-2">
                            <div className="h-6 w-48 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                            <div className="h-3 w-64 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                        </div>
                         <div className="flex gap-2">
                            <div className="h-8 w-24 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                        </div>
                    </div>
                    {/* Stats */}
                    <div className="flex gap-4">
                        <div className="flex-1 h-24 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4">
                             <div className="h-3 w-16 bg-slate-100 dark:bg-slate-700 rounded mb-2"></div>
                             <div className="h-8 w-24 bg-nigeria-100/50 dark:bg-nigeria-900/30 rounded-lg"></div>
                        </div>
                        <div className="flex-1 h-24 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4">
                              <div className="h-3 w-16 bg-slate-100 dark:bg-slate-700 rounded mb-2"></div>
                              <div className="h-8 w-24 bg-blue-100/50 dark:bg-blue-900/30 rounded-lg"></div>
                        </div>
                        <div className="flex-1 h-24 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4">
                              <div className="h-3 w-16 bg-slate-100 dark:bg-slate-700 rounded mb-2"></div>
                              <div className="h-8 w-24 bg-slate-100 dark:bg-slate-700 rounded-lg"></div>
                        </div>
                    </div>
                    {/* Charts */}
                    <div className="grid grid-cols-3 gap-4">
                         <div className="col-span-2 h-48 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 relative overflow-hidden">
                             <div className="h-3 w-32 bg-slate-100 dark:bg-slate-700 rounded mb-4"></div>
                            <div className="flex items-end justify-between gap-2 h-32 px-2">
                                <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-t-sm h-[40%]"></div>
                                <div className="w-full bg-nigeria-200 dark:bg-nigeria-800 rounded-t-sm h-[70%]"></div>
                                <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-t-sm h-[50%]"></div>
                                <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-t-sm h-[30%]"></div>
                                <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-t-sm h-[60%]"></div>
                                <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-t-sm h-[45%]"></div>
                            </div>
                         </div>
                         <div className="h-48 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 flex flex-col items-center justify-center">
                             <div className="w-24 h-24 rounded-full border-[12px] border-slate-100 dark:border-slate-700 border-t-nigeria-500 border-r-nigeria-300 mb-2"></div>
                             <div className="h-2 w-16 bg-slate-100 dark:bg-slate-700 rounded"></div>
                         </div>
                    </div>
                 </div>
            </div>
        </div>
    </div>

    {/* Team Section */}
    <div className="max-w-3xl mx-auto">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">Built by Experts</h3>
        <div className="grid sm:grid-cols-2 gap-8">
             <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-700 flex-shrink-0 flex items-center justify-center text-slate-400 dark:text-slate-500">
                    <Users size={24} />
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Data Science Team</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        Our engineers specialize in natural language processing and African demographic modeling.
                    </p>
                </div>
             </div>
             <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-700 flex-shrink-0 flex items-center justify-center text-slate-400 dark:text-slate-500">
                    <TrendingUp size={24} />
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Market Researchers</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        Veterans from top Lagos agencies who understand the heartbeat of the streets.
                    </p>
                </div>
             </div>
        </div>
    </div>
  </div>
);

const ContactPage = () => (
  <div className="max-w-xl mx-auto px-6 py-16 animate-in fade-in duration-500">
    <div className="text-center mb-10">
        <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail size={32} />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Get in touch</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Have a question or enterprise inquiry? We'd love to hear from you.</p>
    </div>
    
    <form className="space-y-4 bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm" onSubmit={(e) => e.preventDefault()}>
        <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name</label>
            <input type="text" className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-nigeria-500 dark:text-white" placeholder="Your name" />
        </div>
        <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
            <input type="email" className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-nigeria-500 dark:text-white" placeholder="you@company.com" />
        </div>
         <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Message</label>
            <textarea className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-nigeria-500 dark:text-white h-32 resize-none" placeholder="How can we help?"></textarea>
        </div>
        <button className="w-full bg-nigeria-700 hover:bg-nigeria-800 text-white font-semibold py-3 rounded-lg transition-colors">
            Send Message
        </button>
    </form>
    
    <div className="mt-8 text-center">
        <p className="text-sm text-slate-500">Or email us directly at <a href="#" className="text-nigeria-600 dark:text-nigeria-400 font-medium">hello@insightng.com</a></p>
    </div>
  </div>
);


// --- Auth & Main App Components ---

interface AuthFormProps {
  onLogin: (name: string, isSignUp: boolean, email: string) => void;
  onCancel: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onLogin, onCancel }) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
      onLogin(name || 'User', isSignUp, email);
    }, 1000);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden relative animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={onCancel}
        type="button" 
        className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors z-10"
      >
        <X size={20} />
      </button>

      <div className="p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
            {isSignUp 
              ? 'Sign up to unlock detailed audience insights.' 
              : 'Sign in to continue your research.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Full Name</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-3 text-slate-400" size={18} />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-nigeria-500 focus:border-transparent dark:text-white transition-all"
                  placeholder="e.g. Chukwudi Doe"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-nigeria-500 focus:border-transparent dark:text-white transition-all"
                placeholder="name@company.com"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-nigeria-500 focus:border-transparent dark:text-white transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-nigeria-600 hover:bg-nigeria-700 text-white py-3 rounded-lg font-semibold shadow-lg shadow-nigeria-600/20 transition-all transform active:scale-95 flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                {isSignUp ? 'Get Started Free' : 'Sign In'}
                {!loading && <ArrowRight size={18} />}
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-semibold text-nigeria-700 dark:text-nigeria-500 hover:text-nigeria-800 transition-colors"
            >
              {isSignUp ? 'Sign in' : 'Sign up'}
            </button>
          </p>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-nigeria-500 to-green-400"></div>
    </div>
  );
};

interface HomeViewProps {
  user: { name: string } | null;
  query: string;
  setQuery: (q: string) => void;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  error: string | null;
  showAuth: boolean;
  setShowAuth: (v: boolean) => void;
  onLogin: (name: string, isSignUp: boolean, email: string) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ 
  user, query, setQuery, loading, onSubmit, error, showAuth, setShowAuth, onLogin 
}) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 relative">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-1 gap-12 text-center relative z-10">
        
        {/* Hero Text */}
        <div className="space-y-6 max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Understand your <span className="text-nigeria-700 dark:text-nigeria-500">Nigerian Audience</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Discover what your customers in Nigeria read, watch, listen to, and follow. 
            Enter a keyword below to start your research.
          </p>
        </div>

        {/* Interaction Area */}
        <div className="w-full max-w-2xl mx-auto min-h-[160px]">
          {showAuth && !user ? (
              <AuthForm onLogin={onLogin} onCancel={() => setShowAuth(false)} />
          ) : (
            <div className="relative group animate-in fade-in zoom-in-95 duration-500">
              <div className="absolute -inset-1 bg-gradient-to-r from-nigeria-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-200"></div>
              <form onSubmit={onSubmit} className="relative bg-white dark:bg-slate-800 p-2 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center">
                <Search className="ml-4 text-slate-400" size={24} />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g., Crypto, Fintech, Burna Boy, Skincare..."
                  className="flex-1 p-4 bg-transparent border-none outline-none text-lg text-slate-900 dark:text-white placeholder:text-slate-400"
                  disabled={loading}
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={loading || !query.trim()}
                  className="bg-nigeria-700 hover:bg-nigeria-800 text-white px-8 py-3 rounded-xl font-semibold text-lg transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Analyzing
                    </>
                  ) : (
                    "Search"
                  )}
                </button>
              </form>
              {error && (
                <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-sm border border-red-100 dark:border-red-800 text-left">
                  {error}
                </div>
              )}
              {!user && !showAuth && query.length > 2 && (
                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                    Press Enter to see insights (Login required)
                </p>
              )}
            </div>
          )}
        </div>

        {/* Features Grid */}
        {!showAuth && (
            <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-100 dark:border-slate-700 hover:border-nigeria-200 dark:hover:border-nigeria-700 transition-colors">
                <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center mx-auto mb-3">
                <TrendingUp size={20} />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Behaviors</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">What they do online</p>
            </div>
            <div className="p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-100 dark:border-slate-700 hover:border-nigeria-200 dark:hover:border-nigeria-700 transition-colors">
                <div className="w-10 h-10 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users size={20} />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Demographics</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Age, Gender & Job Titles</p>
            </div>
            <div className="p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-100 dark:border-slate-700 hover:border-nigeria-200 dark:hover:border-nigeria-700 transition-colors">
                <div className="w-10 h-10 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg flex items-center justify-center mx-auto mb-3">
                <MapPin size={20} />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Locations</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Top Cities & States</p>
            </div>
            </div>
        )}
      </div>

       {/* Background decorative elements */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-nigeria-50 to-slate-50 dark:from-slate-900 dark:to-slate-950 transition-colors duration-500"></div>
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-nigeria-100 dark:bg-nigeria-900/20 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute top-[20%] left-[-5%] w-72 h-72 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-40"></div>
      </div>
    </div>
  );
}


const App: React.FC = () => {
  const [view, setView] = useState<PageView>('HOME');
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [query, setQuery] = useState('');
  const [data, setData] = useState<AudienceInsight | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Toggle Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Toast Timer
  useEffect(() => {
    if (toastMessage) {
        const timer = setTimeout(() => setToastMessage(null), 5000);
        return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const executeSearch = async (searchQuery: string) => {
    setState(AppState.LOADING);
    setError(null);
    try {
      const result = await generateAudienceInsights(searchQuery);
      setData(result);
      setState(AppState.RESULTS);
    } catch (err) {
      console.error(err);
      setError("We couldn't generate insights for that query right now. Please try a different term.");
      setState(AppState.IDLE);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    if (!user) {
      setShowAuth(true);
    } else {
      executeSearch(query);
    }
  };

  const handleLogin = (name: string, isSignUp: boolean, email: string) => {
    setUser({ name });
    setShowAuth(false);
    
    if (isSignUp) {
        setToastMessage(`Welcome email sent to ${email}`);
    } else {
        setToastMessage(`Welcome back, ${name}`);
    }

    if (query.trim()) {
      executeSearch(query);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setState(AppState.IDLE);
    setQuery('');
    setData(null);
    setShowAuth(false);
    setView('HOME');
  };

  const handleNewSearch = () => {
    setState(AppState.IDLE);
    setQuery('');
    setData(null);
    setView('HOME');
  };

  const navLinkClass = (v: PageView) => 
    `text-sm font-medium transition-colors cursor-pointer ${view === v ? 'text-nigeria-700 dark:text-nigeria-400 font-semibold' : 'text-slate-600 dark:text-slate-300 hover:text-nigeria-700 dark:hover:text-nigeria-400'}`;

  // Helper to trigger login from nav
  const handleNavSignIn = () => {
    setView('HOME');
    setShowAuth(true);
  };

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans text-slate-900 dark:text-white transition-colors duration-300`}>
      
      {/* Toast Notification */}
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}

      {/* Global Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('HOME')}>
            <div className="w-8 h-8 bg-nigeria-800 rounded-lg flex items-center justify-center text-white font-bold shadow-sm">
              IN
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">Insight NG</span>
          </div>

          {/* Center Links (Desktop) */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => setView('PRODUCT')} className={navLinkClass('PRODUCT')}>Product</button>
            <button onClick={() => setView('FAQ')} className={navLinkClass('FAQ')}>FAQ</button>
            <button onClick={() => setView('ABOUT')} className={navLinkClass('ABOUT')}>About</button>
            <button onClick={() => setView('CONTACT')} className={navLinkClass('CONTACT')}>Contact</button>
          </div>

          {/* Auth Actions & Dark Mode Toggle */}
          <div className="flex items-center gap-4">
            
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {user ? (
               <div className="flex items-center gap-4">
                 <span className="text-sm font-medium text-slate-700 dark:text-slate-300 hidden sm:block">Hi, {user.name}</span>
                 <button 
                  onClick={handleLogout}
                  className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 flex items-center gap-1 transition-colors"
                 >
                   <LogOut size={16} />
                   <span className="hidden sm:inline">Sign Out</span>
                 </button>
               </div>
            ) : (
                <button 
                    onClick={handleNavSignIn}
                    className="text-sm font-semibold text-white bg-slate-900 dark:bg-slate-700 px-4 py-2 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors"
                >
                    Sign In
                </button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content Router */}
      <div className="flex-1 flex flex-col">
        {(() => {
            // Priority: Static Pages > Dashboard > Home
            if (view === 'PRODUCT') return <ProductPage />;
            if (view === 'FAQ') return <FaqPage />;
            if (view === 'ABOUT') return <AboutPage />;
            if (view === 'CONTACT') return <ContactPage />;

            // Home View Logic (includes Dashboard if state matches)
            if (user && state === AppState.RESULTS && data) {
                return <Dashboard data={data} onNewSearch={handleNewSearch} isDarkMode={darkMode} />;
            }
            
            return (
                <HomeView 
                    user={user} 
                    query={query} 
                    setQuery={setQuery} 
                    loading={state === AppState.LOADING}
                    onSubmit={handleSearchSubmit}
                    error={error}
                    showAuth={showAuth}
                    setShowAuth={setShowAuth}
                    onLogin={handleLogin}
                />
            );
        })()}
      </div>

      <footer className="py-8 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 text-center text-slate-400 dark:text-slate-500 text-sm transition-colors">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>&copy; {new Date().getFullYear()} Insight NG. All rights reserved.</div>
            <div className="flex gap-6">
                <button onClick={() => setView('PRODUCT')} className="hover:text-slate-600 dark:hover:text-slate-300">Product</button>
                <button onClick={() => setView('FAQ')} className="hover:text-slate-600 dark:hover:text-slate-300">FAQ</button>
                <button onClick={() => setView('ABOUT')} className="hover:text-slate-600 dark:hover:text-slate-300">About</button>
            </div>
        </div>
      </footer>

    </div>
  );
};

export default App;
