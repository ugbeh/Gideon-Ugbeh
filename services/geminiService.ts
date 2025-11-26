
import { GoogleGenAI, Type } from "@google/genai";
import { AudienceInsight } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAudienceInsights = async (query: string): Promise<AudienceInsight> => {
  const modelId = "gemini-2.5-flash"; 

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      summary: { type: Type.STRING },
      estimatedSize: { type: Type.STRING },
      averageSearchesPerMonth: { type: Type.STRING },
      demographics: {
        type: Type.OBJECT,
        properties: {
          age: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: { name: { type: Type.STRING }, value: { type: Type.NUMBER } },
            },
          },
          gender: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: { name: { type: Type.STRING }, value: { type: Type.NUMBER } },
            },
          },
          locations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: { name: { type: Type.STRING }, value: { type: Type.NUMBER } },
            },
          },
          salary: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: { name: { type: Type.STRING, description: "Monthly Salary Range in Naira" }, value: { type: Type.NUMBER } },
            },
          },
          education: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: { name: { type: Type.STRING }, value: { type: Type.NUMBER } },
            },
          },
          skills: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: { name: { type: Type.STRING }, value: { type: Type.NUMBER } },
            },
          },
          profiles: {
            type: Type.ARRAY,
            items: { type: Type.STRING, description: "Typical persona or job title (e.g. 'Senior Dev', 'Student')" },
          },
        },
      },
      social: {
        type: Type.OBJECT,
        properties: {
          influencers: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                handle: { type: Type.STRING },
                platform: { type: Type.STRING, enum: ["Twitter", "Instagram", "LinkedIn", "YouTube", "TikTok"] },
                relevance: { type: Type.NUMBER },
              },
            },
          },
          hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
          topPlatforms: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    shareOfVisits: { type: Type.NUMBER },
                }
            }
          }
        },
      },
      media: {
        type: Type.OBJECT,
        properties: {
          websites: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                domain: { type: Type.STRING },
                category: { type: Type.STRING },
                affinity: { type: Type.STRING },
                domainAuthority: { type: Type.NUMBER },
                visitsPerMonth: { type: Type.STRING },
              },
            },
          },
          podcasts: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                host: { type: Type.STRING },
                relevance: { type: Type.NUMBER },
              },
            },
          },
          youtube: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                viewsPerMonth: { type: Type.STRING },
                mostWatchedVideo: { type: Type.STRING },
                relevance: { type: Type.NUMBER },
              },
            },
          },
          topAiTools: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                usageContext: { type: Type.STRING },
                relevance: { type: Type.NUMBER }
              },
            },
          },
          productivityApps: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                usageContext: { type: Type.STRING, description: "e.g. 'Project Management'" },
                relevance: { type: Type.NUMBER }
              },
            },
          },
          entertainment: { type: Type.ARRAY, items: { type: Type.STRING } },
          lifestyle: { type: Type.ARRAY, items: { type: Type.STRING } },
          sports: { type: Type.ARRAY, items: { type: Type.STRING } },
          ecommerce: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
      },
      keywords: {
        type: Type.OBJECT,
        properties: {
            topSearchKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
            trendingKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
            searchModifiers: { type: Type.ARRAY, items: { type: Type.STRING } },
            serpFeatures: { type: Type.ARRAY, items: { type: Type.STRING } },
        }
      },
      topics: {
        type: Type.OBJECT,
        properties: {
            relevantTopics: { type: Type.ARRAY, items: { type: Type.STRING } },
            contentIdeas: { type: Type.ARRAY, items: { type: Type.STRING } },
            broadInterests: { type: Type.ARRAY, items: { type: Type.STRING } },
            relatedQuestions: { type: Type.ARRAY, items: { type: Type.STRING } },
            rankingPages: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING },
                        url: { type: Type.STRING }
                    }
                }
            }
        }
      },
      behaviors: { type: Type.ARRAY, items: { type: Type.STRING } },
    },
    required: ["summary", "estimatedSize", "averageSearchesPerMonth", "demographics", "social", "media", "keywords", "topics", "behaviors"],
  };

  const systemInstruction = `
    You are an expert audience intelligence researcher specializing in the Nigerian market (similar to Sparktoro but for Nigeria).
    
    When a user provides a keyword, analyze the digital footprint of Nigerians who engage with that topic.
    
    CRITICAL INSTRUCTIONS:
    1. **Context**: Focus STRICTLY on the Nigerian context. Use Naira (₦) for money.
    2. **Demographics**: 
       - Salary: Use realistic Nigerian monthly salary ranges (e.g. ₦100k-₦300k).
       - Locations: Focus on Nigerian states/cities.
       - Education: Nigerian degrees (B.Sc, HND, SSCE).
       - Profiles: Typical personas (e.g., 'Tech Bro', 'Market Woman', 'Undergrad').
    3. **Media**:
       - Ecommerce: Mention sites like Jumia, Konga, Jiji, or niche stores.
       - Productivity: Apps used in Nigeria (Slack, WhatsApp Business, Canva).
       - Entertainment: BBNaija, Afrobeats, Netflix Naija, etc.
    4. **Keywords & Topics**:
       - Search Modifiers: What do they add to queries? (e.g. "price in Nigeria", "how to buy").
       - Ranking Pages: Invent plausible titles/URLs for top ranking content.
    5. **Estimates**: Provide realistic numbers for all percentages and metrics.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: `Generate detailed audience insights for the query: "${query}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        systemInstruction: systemInstruction,
        temperature: 0.4, 
      },
    });

    const jsonText = response.text || "{}";
    const data = JSON.parse(jsonText);
    return { ...data, query };

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate insights. Please try again.");
  }
};
