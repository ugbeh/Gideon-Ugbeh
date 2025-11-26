
export interface DemographicData {
  name: string;
  value: number;
}

export interface Influencer {
  name: string;
  handle: string;
  platform: 'Twitter' | 'Instagram' | 'LinkedIn' | 'YouTube' | 'TikTok';
  relevance: number; // 0-100
  avatar?: string;
}

export interface Website {
  domain: string;
  category: string;
  affinity: string; // e.g., "Very High", "High"
  domainAuthority: number; // 0-100
  visitsPerMonth: string; // e.g., "2.5M"
}

export interface Podcast {
  name: string;
  host: string;
  relevance: number;
}

export interface YouTubeChannel {
  name: string;
  viewsPerMonth: string;
  mostWatchedVideo: string;
  relevance: number;
}

export interface SocialPlatform {
  name: string;
  shareOfVisits: number; // 0-100
}

export interface AiTool {
  name: string;
  usageContext: string; // e.g., "Content Creation"
  relevance: number; // 0-100
}

export interface KeywordData {
    topSearchKeywords: string[];
    trendingKeywords: string[];
    searchModifiers: string[]; // e.g. "price of...", "how to..."
    serpFeatures: string[]; // e.g. "Featured Snippet", "Video Pack"
}

export interface TopicData {
    relevantTopics: string[];
    contentIdeas: string[];
    broadInterests: string[];
    rankingPages: { title: string; url: string }[];
    relatedQuestions: string[];
}

export interface AudienceInsight {
  query: string;
  summary: string;
  estimatedSize: string;
  averageSearchesPerMonth: string;
  demographics: {
    age: DemographicData[];
    gender: DemographicData[];
    locations: DemographicData[];
    salary: DemographicData[]; // e.g. "₦100k-250k"
    education: DemographicData[]; // e.g. "B.Sc", "Masters"
    skills: DemographicData[]; // e.g. "Digital Marketing", "Python"
    profiles: string[]; // Personas / Job Titles
  };
  social: {
    influencers: Influencer[];
    hashtags: string[];
    topPlatforms: SocialPlatform[];
  };
  media: {
    websites: Website[];
    podcasts: Podcast[];
    youtube: YouTubeChannel[];
    topAiTools: AiTool[];
    productivityApps: AiTool[]; // Reuse AiTool structure for generic apps
    entertainment: string[]; // Movies, Shows, Music genres
    lifestyle: string[]; // Fashion brands, hangouts
    sports: string[]; // Teams, Sports
    ecommerce: string[]; // Shopping sites
  };
  keywords: KeywordData;
  topics: TopicData;
  behaviors: string[];
}

export enum AppState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  RESULTS = 'RESULTS',
  ERROR = 'ERROR'
}
