
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { DemographicData } from '../types';

const COLORS = ['#166534', '#22c55e', '#86efac', '#bbf7d0', '#f0fdf4'];
const GENDER_COLORS = ['#1e40af', '#ec4899']; // Blue for Male, Pink for Female

interface ChartProps {
  data: DemographicData[];
  isDarkMode: boolean;
}

export const LocationChart: React.FC<ChartProps> = ({ data, isDarkMode }) => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke={isDarkMode ? "#334155" : "#e2e8f0"} />
          <XAxis type="number" hide />
          <YAxis 
            type="category" 
            dataKey="name" 
            tick={{ fontSize: 12, fill: isDarkMode ? '#94a3b8' : '#475569' }} 
            width={80} 
          />
          <Tooltip 
            cursor={{ fill: isDarkMode ? '#334155' : '#f8fafc' }}
            contentStyle={{ 
              borderRadius: '8px', 
              border: isDarkMode ? '1px solid #334155' : 'none', 
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              backgroundColor: isDarkMode ? '#1e293b' : '#fff',
              color: isDarkMode ? '#fff' : '#000'
            }}
          />
          <Bar dataKey="value" fill="#166534" radius={[0, 4, 4, 0]} barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const GenericBarChart: React.FC<ChartProps & { color?: string }> = ({ data, isDarkMode, color = "#22c55e" }) => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 10, left: 80, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke={isDarkMode ? "#334155" : "#e2e8f0"} />
          <XAxis type="number" hide />
          <YAxis 
            type="category" 
            dataKey="name" 
            tick={{ fontSize: 11, fill: isDarkMode ? '#94a3b8' : '#475569' }} 
            width={80}
            interval={0}
          />
          <Tooltip 
            cursor={{ fill: isDarkMode ? '#334155' : '#f8fafc' }}
            contentStyle={{ 
              borderRadius: '8px', 
              border: isDarkMode ? '1px solid #334155' : 'none', 
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              backgroundColor: isDarkMode ? '#1e293b' : '#fff',
              color: isDarkMode ? '#fff' : '#000'
            }}
          />
          <Bar dataKey="value" fill={color} radius={[0, 4, 4, 0]} barSize={16} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const AgeChart: React.FC<ChartProps> = ({ data, isDarkMode }) => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "#334155" : "#e2e8f0"} />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: isDarkMode ? '#94a3b8' : '#475569' }} />
          <YAxis hide />
          <Tooltip 
            cursor={{ fill: isDarkMode ? '#334155' : '#f8fafc' }}
            contentStyle={{ 
              borderRadius: '8px', 
              border: isDarkMode ? '1px solid #334155' : 'none', 
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              backgroundColor: isDarkMode ? '#1e293b' : '#fff',
              color: isDarkMode ? '#fff' : '#000'
            }}
          />
          <Bar dataKey="value" fill="#22c55e" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const GenderChart: React.FC<ChartProps> = ({ data, isDarkMode }) => {
  return (
    <div className="h-64 w-full flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.name.toLowerCase().includes('female') ? GENDER_COLORS[1] : GENDER_COLORS[0]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              borderRadius: '8px', 
              border: isDarkMode ? '1px solid #334155' : 'none', 
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              backgroundColor: isDarkMode ? '#1e293b' : '#fff',
              color: isDarkMode ? '#fff' : '#000'
            }} 
          />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

// --- New Components for Social/AI Graphs with Logos ---

const getDomain = (name: string): string => {
  const n = name.toLowerCase().replace(/\s/g, '');
  if (n.includes('chatgpt') || n.includes('openai')) return 'openai.com';
  if (n.includes('google')) return 'google.com';
  if (n.includes('deepseek')) return 'deepseek.com';
  if (n.includes('midjourney')) return 'midjourney.com';
  if (n.includes('grammarly')) return 'grammarly.com';
  if (n.includes('twitter') || n.includes('x')) return 'twitter.com';
  if (n.includes('instagram')) return 'instagram.com';
  if (n.includes('facebook')) return 'facebook.com';
  if (n.includes('linkedin')) return 'linkedin.com';
  if (n.includes('tiktok')) return 'tiktok.com';
  if (n.includes('youtube')) return 'youtube.com';
  if (n.includes('pinterest')) return 'pinterest.com';
  if (n.includes('whatsapp')) return 'whatsapp.com';
  if (n.includes('snapchat')) return 'snapchat.com';
  if (n.includes('jasper')) return 'jasper.ai';
  if (n.includes('copyai')) return 'copy.ai';
  if (n.includes('quillbot')) return 'quillbot.com';
  if (n.includes('slack')) return 'slack.com';
  if (n.includes('trello')) return 'trello.com';
  if (n.includes('notion')) return 'notion.so';
  if (n.includes('canva')) return 'canva.com';
  if (n.includes('zoom')) return 'zoom.us';
  return `${n}.com`; // Fallback
};

const CustomTick = ({ x, y, payload, isDarkMode }: any) => {
  const domain = getDomain(payload.value);
  const logoUrl = `https://logo.clearbit.com/${domain}`;
  
  return (
    <g transform={`translate(${x},${y})`}>
       <foreignObject x={-140} y={-15} width={130} height={30}>
        <div className="flex items-center justify-end h-full gap-2 pr-2">
            <span className={`text-xs font-medium truncate text-right ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{payload.value}</span>
             <div className={`w-5 h-5 min-w-[20px] rounded-full shadow-sm border flex items-center justify-center overflow-hidden ${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-100'}`}>
                <img 
                    src={logoUrl} 
                    alt="" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                    }}
                />
            </div>
        </div>
      </foreignObject>
    </g>
  );
};

interface EntityBarChartProps {
    data: { name: string; value: number; color?: string }[];
    barColor: string;
    isDarkMode: boolean;
}

export const EntityBarChart: React.FC<EntityBarChartProps> = ({ data, barColor, isDarkMode }) => {
    return (
        <div className="h-full w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 140, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke={isDarkMode ? "#334155" : "#f1f5f9"} />
                    <XAxis type="number" hide domain={[0, 100]} />
                    <YAxis 
                        type="category" 
                        dataKey="name" 
                        tick={<CustomTick isDarkMode={isDarkMode} />}
                        width={140}
                        interval={0}
                    />
                    <Tooltip 
                         cursor={{ fill: isDarkMode ? '#334155' : '#f8fafc' }}
                         content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                                return (
                                    <div className={`p-2 border shadow-lg rounded-lg ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-100 text-slate-900'}`}>
                                        <p className="font-semibold text-sm">{payload[0].payload.name}</p>
                                        <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Relevance: {payload[0].value}%</p>
                                    </div>
                                )
                            }
                            return null;
                         }}
                    />
                    <Bar 
                        dataKey="value" 
                        fill={barColor} 
                        radius={[0, 4, 4, 0]} 
                        barSize={24} 
                        background={{ fill: isDarkMode ? '#1e293b' : '#f8fafc' }}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
