
import React from 'react';
import { AudienceInsight } from '../types';
import { LocationChart, AgeChart, GenderChart, EntityBarChart, GenericBarChart } from './Charts';
import { Users, Hash, Globe, Radio, Twitter, Instagram, Linkedin, Youtube, ExternalLink, CheckCircle, Download, Search as SearchIcon, Cpu, BarChart3, Video, Briefcase, GraduationCap, DollarSign, Smartphone, ShoppingCart, Tv, Target, FileText, Search, HelpCircle, Link as LinkIcon, TrendingUp } from 'lucide-react';

interface DashboardProps {
  data: AudienceInsight;
  onNewSearch: () => void;
  isDarkMode: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({ data, onNewSearch, isDarkMode }) => {

  const handleExportCSV = () => {
    // Helper to escape CSV fields
    const escape = (text: string | number | undefined | null) => {
      if (text === undefined || text === null) return '';
      const str = String(text);
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const rows: string[] = [];

    // --- Header / Summary ---
    rows.push(`Report,Insight NG Audience Analysis`);
    rows.push(`Query,${escape(data.query)}`);
    rows.push(`Date,${new Date().toLocaleDateString()}`);
    rows.push(`Estimated Audience Size,${escape(data.estimatedSize)}`);
    rows.push(`Avg. Google Searches/Mo,${escape(data.averageSearchesPerMonth)}`);
    rows.push(`Summary,${escape(data.summary)}`);
    rows.push(''); 

    // --- Demographics ---
    rows.push('--- DEMOGRAPHICS ---');
    rows.push('Type,Name,Value');
    data.demographics.locations.forEach(i => rows.push(`Location,${escape(i.name)},${i.value}`));
    data.demographics.age.forEach(i => rows.push(`Age,${escape(i.name)},${i.value}`));
    data.demographics.gender.forEach(i => rows.push(`Gender,${escape(i.name)},${i.value}`));
    data.demographics.salary.forEach(i => rows.push(`Salary,${escape(i.name)},${i.value}`));
    data.demographics.education.forEach(i => rows.push(`Education,${escape(i.name)},${i.value}`));
    data.demographics.skills.forEach(i => rows.push(`Skills,${escape(i.name)},${i.value}`));
    data.demographics.profiles.forEach(i => rows.push(`Persona,${escape(i)},`));
    rows.push('');

    // --- Digital Habits ---
    rows.push('--- DIGITAL HABITS ---');
    rows.push('Category,Name,Metric');
    data.social.topPlatforms?.forEach(p => rows.push(`Social Platform,${escape(p.name)},${p.shareOfVisits}%`));
    data.media.websites.forEach(s => rows.push(`Website,${escape(s.domain)},${s.visitsPerMonth} visits`));
    data.media.productivityApps.forEach(a => rows.push(`Productivity App,${escape(a.name)},${a.relevance}`));
    data.media.entertainment.forEach(i => rows.push(`Entertainment,${escape(i)},`));
    data.media.lifestyle.forEach(i => rows.push(`Lifestyle,${escape(i)},`));
    data.media.sports.forEach(i => rows.push(`Sports,${escape(i)},`));
    data.media.ecommerce.forEach(i => rows.push(`Ecommerce,${escape(i)},`));
    rows.push('');

    // --- Keywords & Topics ---
    rows.push('--- KEYWORDS & TOPICS ---');
    rows.push('Category,Item');
    data.keywords.topSearchKeywords.forEach(i => rows.push(`Top Keyword,${escape(i)}`));
    data.keywords.trendingKeywords.forEach(i => rows.push(`Trending Keyword,${escape(i)}`));
    data.keywords.searchModifiers.forEach(i => rows.push(`Modifier,${escape(i)}`));
    data.topics.contentIdeas.forEach(i => rows.push(`Content Idea,${escape(i)}`));
    data.topics.rankingPages.forEach(i => rows.push(`Ranking Page,${escape(i.title)} (${escape(i.url)})`));
    
    const csvContent = rows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `insight_ng_${data.query.replace(/\s+/g, '_').toLowerCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Prepare data for graphs
  const socialGraphData = data.social.topPlatforms?.map(p => ({
    name: p.name,
    value: p.shareOfVisits
  })) || [];

  const aiGraphData = data.media.topAiTools?.map(t => ({
    name: t.name,
    value: t.relevance
  })) || [];

  const productivityGraphData = data.media.productivityApps?.map(t => ({
      name: t.name,
      value: t.relevance
  })) || [];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 pb-20 pt-6 transition-colors duration-300">
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Actions Toolbar */}
        <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
           <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              Researching: <span className="text-slate-900 dark:text-white font-bold">{data.query}</span>
           </div>
           <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nigeria-500"
            >
              <Download size={16} />
              Export CSV
            </button>
            <button 
              onClick={onNewSearch}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-slate-900 dark:bg-slate-700 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors"
            >
              <SearchIcon size={16} />
              New Search
            </button>
          </div>
        </div>

        {/* Overview Banner */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-1">
                <Users size={16} />
                <span>Audience Analysis for</span>
              </div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">"{data.query}"</h1>
              <p className="mt-2 text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                {data.summary}
              </p>
            </div>
            <div className="flex gap-4">
                <div className="bg-nigeria-50 dark:bg-nigeria-900/30 px-5 py-4 rounded-xl border border-nigeria-100 dark:border-nigeria-800 min-w-[160px]">
                    <div className="text-xs font-semibold text-nigeria-800 dark:text-nigeria-400 uppercase tracking-wide">Est. Size</div>
                    <div className="text-2xl font-bold text-nigeria-700 dark:text-nigeria-400 mt-1">{data.estimatedSize}</div>
                    <div className="text-xs text-nigeria-600 dark:text-nigeria-500 mt-1">Monthly Active Users</div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 px-5 py-4 rounded-xl border border-blue-100 dark:border-blue-800 min-w-[160px]">
                    <div className="text-xs font-semibold text-blue-800 dark:text-blue-400 uppercase tracking-wide flex items-center gap-1">
                        <SearchIcon size={12} /> Google Searches
                    </div>
                    <div className="text-2xl font-bold text-blue-700 dark:text-blue-400 mt-1">{data.averageSearchesPerMonth}</div>
                    <div className="text-xs text-blue-600 dark:text-blue-500 mt-1">Avg per month</div>
                </div>
            </div>
          </div>
          
          <div className="mt-6 flex flex-wrap gap-2">
            {data.behaviors.map((behavior, idx) => (
              <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium">
                <CheckCircle size={14} className="text-nigeria-600 dark:text-nigeria-500" />
                {behavior}
              </span>
            ))}
          </div>
        </div>

        {/* --- SECTION 1: AUDIENCE PROFILE --- */}
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Briefcase className="text-nigeria-600" /> Audience Profile
            </h2>
            
            {/* Personas & Skills */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                     <h3 className="text-sm font-bold uppercase text-slate-500 dark:text-slate-400 mb-4">Common Personas</h3>
                     <div className="flex flex-wrap gap-2">
                        {data.demographics.profiles.map((p, idx) => (
                            <div key={idx} className="px-3 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium border border-blue-100 dark:border-blue-800">
                                {p}
                            </div>
                        ))}
                     </div>
                </div>
                 <div className="md:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                     <h3 className="text-sm font-bold uppercase text-slate-500 dark:text-slate-400 mb-4">Top Skills</h3>
                     <div className="flex flex-wrap gap-3">
                        {data.demographics.skills.map((p, idx) => (
                            <div key={idx} className="flex flex-col gap-1">
                                <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">{p.name}</div>
                                <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-500" style={{ width: `${p.value}%` }}></div>
                                </div>
                            </div>
                        ))}
                     </div>
                </div>
            </div>

            {/* Demographics Charts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Top Locations</h3>
                    <LocationChart data={data.demographics.locations} isDarkMode={isDarkMode} />
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Age Distribution</h3>
                    <AgeChart data={data.demographics.age} isDarkMode={isDarkMode} />
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Gender Split</h3>
                    <GenderChart data={data.demographics.gender} isDarkMode={isDarkMode} />
                </div>
                 <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <DollarSign size={18} /> Salary Range (Monthly)
                    </h3>
                    <GenericBarChart data={data.demographics.salary} isDarkMode={isDarkMode} color="#16a34a" />
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <GraduationCap size={18} /> Education Level
                    </h3>
                    <GenericBarChart data={data.demographics.education} isDarkMode={isDarkMode} color="#6366f1" />
                </div>
            </div>
        </div>

        {/* --- SECTION 2: DIGITAL HABITS --- */}
        <div className="space-y-6 pt-8 border-t border-slate-200 dark:border-slate-800">
             <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Smartphone className="text-blue-600" /> Digital Ecosystem
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Social Networks Graph */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col h-96">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-700">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                            <BarChart3 className="text-indigo-600 dark:text-indigo-400" size={20} />
                            Social Network Usage
                        </h3>
                    </div>
                    <div className="flex-1 p-4">
                        <EntityBarChart data={socialGraphData} barColor="#6366f1" isDarkMode={isDarkMode} />
                    </div>
                </div>

                {/* Productivity Apps */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col h-96">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-700">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                            <Cpu className="text-orange-600 dark:text-orange-400" size={20} />
                            Top Productivity Apps
                        </h3>
                    </div>
                    <div className="flex-1 p-4">
                         {productivityGraphData.length > 0 ? (
                            <EntityBarChart data={productivityGraphData} barColor="#f97316" isDarkMode={isDarkMode} />
                         ) : (
                            <div className="flex items-center justify-center h-full text-slate-400 italic">No app data available</div>
                         )}
                    </div>
                </div>
            </div>
            
            {/* Lifestyle Lists Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { title: 'Entertainment', icon: <Tv size={18} />, items: data.media.entertainment, color: 'text-pink-600' },
                    { title: 'Lifestyle', icon: <Users size={18} />, items: data.media.lifestyle, color: 'text-purple-600' },
                    { title: 'Sports', icon: <Target size={18} />, items: data.media.sports, color: 'text-green-600' },
                    { title: 'Ecommerce', icon: <ShoppingCart size={18} />, items: data.media.ecommerce, color: 'text-yellow-600' },
                ].map((cat, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                        <h3 className={`text-sm font-bold uppercase mb-4 flex items-center gap-2 ${cat.color} dark:text-white`}>
                            {cat.icon} {cat.title}
                        </h3>
                        <ul className="space-y-2">
                            {cat.items.map((item, i) => (
                                <li key={i} className="text-sm text-slate-700 dark:text-slate-300 pb-2 border-b border-slate-50 dark:border-slate-700 last:border-0 last:pb-0">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* AI Tools Graph */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col h-96">
                <div className="p-6 border-b border-slate-100 dark:border-slate-700">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                        <Cpu className="text-teal-600 dark:text-teal-400" size={20} />
                        Top AI Tools Cited
                    </h3>
                </div>
                <div className="flex-1 p-4">
                     {aiGraphData.length > 0 ? (
                        <EntityBarChart data={aiGraphData} barColor="#0d9488" isDarkMode={isDarkMode} />
                     ) : (
                        <div className="flex items-center justify-center h-full text-slate-400 italic">No AI data available</div>
                     )}
                </div>
            </div>
        </div>

        {/* --- SECTION 3: CONTENT STRATEGY & SEO --- */}
        <div className="space-y-6 pt-8 border-t border-slate-200 dark:border-slate-800">
             <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Search size={20} className="text-red-600" /> Content & SEO Strategy
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Keywords Columns */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Top Search Keywords</h3>
                    <div className="flex flex-wrap gap-2">
                        {data.keywords.topSearchKeywords.map((k, i) => (
                            <span key={i} className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-xs border border-slate-200 dark:border-slate-600">{k}</span>
                        ))}
                    </div>
                </div>
                 <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <TrendingUp size={16} className="text-green-500" /> Trending Now
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {data.keywords.trendingKeywords.map((k, i) => (
                            <span key={i} className="px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded text-xs border border-green-100 dark:border-green-800">{k}</span>
                        ))}
                    </div>
                </div>
                 <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Search Modifiers</h3>
                    <div className="flex flex-wrap gap-2">
                        {data.keywords.searchModifiers.map((k, i) => (
                            <span key={i} className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded text-xs border border-slate-200 dark:border-slate-600 border-dashed">{k}</span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 {/* Ranking Pages */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                     <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <LinkIcon size={16} /> Top Ranking Content
                    </h3>
                    <div className="space-y-3">
                        {data.topics.rankingPages.map((page, i) => (
                            <div key={i} className="flex gap-3 items-start">
                                <div className="mt-1 w-6 h-6 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center text-xs font-bold text-slate-500">{i+1}</div>
                                <div className="min-w-0">
                                    <div className="text-sm font-medium text-blue-600 dark:text-blue-400 truncate">{page.title}</div>
                                    <div className="text-xs text-slate-400 truncate">{page.url}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                 {/* Content Ideas & Questions */}
                 <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                     <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <FileText size={16} /> Content Ideas & Questions
                    </h3>
                     <div className="space-y-4">
                        <div>
                             <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">Content Ideas</h4>
                             <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-300 space-y-1">
                                {data.topics.contentIdeas.slice(0, 3).map((idea, i) => <li key={i}>{idea}</li>)}
                             </ul>
                        </div>
                        <div>
                             <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">People Also Ask</h4>
                             <ul className="space-y-2">
                                {data.topics.relatedQuestions.slice(0, 3).map((q, i) => (
                                    <li key={i} className="text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2">
                                        <HelpCircle size={14} className="mt-0.5 text-slate-400" /> {q}
                                    </li>
                                ))}
                             </ul>
                        </div>
                     </div>
                 </div>
            </div>
        </div>


        {/* Social Influencers & Websites Grid (Existing) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8 border-t border-slate-200 dark:border-slate-800">
          
          {/* Social Influencers */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <Users className="text-nigeria-600 dark:text-nigeria-500" size={20} />
                Who They Follow
              </h3>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-700">
              {data.social.influencers.map((inf, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center text-slate-500 dark:text-slate-300 text-sm font-bold">
                      {inf.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white">{inf.name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        {getPlatformIcon(inf.platform)}
                        {inf.handle}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-600 rounded-full overflow-hidden">
                      <div className="h-full bg-nigeria-500" style={{ width: `${inf.relevance}%` }}></div>
                    </div>
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{inf.relevance}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Websites Table (Detailed) */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col transition-colors">
              <div className="p-6 border-b border-slate-100 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <Globe className="text-blue-600 dark:text-blue-400" size={20} />
                  Top Websites Visited
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
                    <thead className="bg-slate-50 dark:bg-slate-700 text-xs uppercase font-semibold text-slate-500 dark:text-slate-400">
                        <tr>
                            <th className="px-6 py-3">Domain</th>
                            <th className="px-6 py-3 text-center">Affinity</th>
                            <th className="px-6 py-3 text-center">DA</th>
                            <th className="px-6 py-3 text-right">Visits/Mo</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                        {data.media.websites.map((site, idx) => (
                            <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white flex items-center gap-2">
                                    {site.domain}
                                    <ExternalLink size={12} className="text-slate-400" />
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${site.affinity.toLowerCase().includes('very') ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300'}`}>
                                        {site.affinity}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">{site.domainAuthority}</td>
                                <td className="px-6 py-4 text-right">{site.visitsPerMonth}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
              </div>
          </div>
        </div>

        {/* YouTube & Podcasts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* YouTube Channels */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors">
                <div className="p-6 border-b border-slate-100 dark:border-slate-700">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                        <Video className="text-red-600 dark:text-red-400" size={20} />
                        YouTube Channels
                    </h3>
                </div>
                 <div className="divide-y divide-slate-100 dark:divide-slate-700">
                    {data.media.youtube?.map((yt, idx) => (
                        <div key={idx} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                            <div className="flex items-center justify-between mb-2">
                                <div className="font-medium text-slate-900 dark:text-white">{yt.name}</div>
                                <div className="text-xs font-semibold text-red-600 dark:text-red-300 bg-red-50 dark:bg-red-900/30 px-2 py-1 rounded-full">{yt.viewsPerMonth} views</div>
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                                <span className="font-medium text-slate-700 dark:text-slate-300">Top Video:</span> {yt.mostWatchedVideo}
                            </div>
                        </div>
                    ))}
                    {(!data.media.youtube || data.media.youtube.length === 0) && (
                         <div className="p-4 text-slate-500 text-sm italic">No specific YouTube data available.</div>
                    )}
                </div>
            </div>

             {/* Podcasts */}
             <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors">
              <div className="p-6 border-b border-slate-100 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <Radio className="text-purple-600 dark:text-purple-400" size={20} />
                  Top Podcasts
                </h3>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-700">
                {data.media.podcasts.map((pod, idx) => (
                  <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white">{pod.name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Host: {pod.host}</div>
                    </div>
                     <div className="flex items-center gap-2">
                        <div className="w-12 h-1 bg-slate-100 dark:bg-slate-600 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500" style={{ width: `${pod.relevance}%` }}></div>
                        </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
        </div>

      </main>
    </div>
  );
};

// Helper for icons (kept for Fallbacks in other lists)
const getPlatformIcon = (platform: string) => {
  const p = platform.toLowerCase();
  if (p.includes('twitter') || p.includes('x')) return <Twitter size={16} className="text-blue-400" />;
  if (p.includes('instagram')) return <Instagram size={16} className="text-pink-600" />;
  if (p.includes('linkedin')) return <Linkedin size={16} className="text-blue-700" />;
  if (p.includes('youtube')) return <Youtube size={16} className="text-red-600" />;
  if (p.includes('tiktok')) return <span className="font-bold text-xs text-black dark:text-white">TT</span>;
  if (p.includes('facebook')) return <span className="font-bold text-xs text-blue-600">FB</span>;
  return <Globe size={16} className="text-slate-400" />;
};
