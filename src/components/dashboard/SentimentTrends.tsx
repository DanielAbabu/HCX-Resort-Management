
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, ResponsiveContainer, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Area, AreaChart } from 'recharts';
import { BarChart3, ArrowUpIcon, ArrowDownIcon, Minus } from 'lucide-react';
import { useData } from '@/context/DataContext';
import { motion } from 'framer-motion';

const SentimentTrends: React.FC = () => {
  const { sentimentTrends } = useData();
  const [trendData, setTrendData] = useState(sentimentTrends);

  // Update trend data when sentimentTrends changes
  useEffect(() => {
    setTrendData(sentimentTrends);
  }, [sentimentTrends]);

  // Calculate today's overall sentiment
  const todayData = trendData.slice(-12);
  const totalFeedback = todayData.reduce(
    (sum, item) => sum + item.positive + item.neutral + item.negative, 
    0
  );
  const positivePercentage = totalFeedback > 0 ? Math.round(
    (todayData.reduce((sum, item) => sum + item.positive, 0) / totalFeedback) * 100
  ) : 0;
  const negativePercentage = totalFeedback > 0 ? Math.round(
    (todayData.reduce((sum, item) => sum + item.negative, 0) / totalFeedback) * 100
  ) : 0;

  // Compare with yesterday
  const yesterdayData = trendData.slice(0, 12);
  const yesterdayTotalFeedback = yesterdayData.reduce(
    (sum, item) => sum + item.positive + item.neutral + item.negative, 
    0
  );
  const yesterdayPositivePercentage = yesterdayTotalFeedback > 0 ? Math.round(
    (yesterdayData.reduce((sum, item) => sum + item.positive, 0) / yesterdayTotalFeedback) * 100
  ) : 0;

  const positiveChange = positivePercentage - yesterdayPositivePercentage;

  // Custom tooltip styles
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-background/95 border border-border p-3 rounded-lg shadow-lg">
          <p className="font-medium text-sm mb-1">{`${label}`}</p>
          <div className="flex flex-col gap-1">
            {payload.map((entry: any, index: number) => (
              <div key={`item-${index}`} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.fill }}
                />
                <p className="text-xs">
                  <span className="text-muted-foreground">{entry.name}: </span>
                  <span className="font-medium">{entry.value}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-sm overflow-hidden border-border/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-black" />
              <span className="text-black">
                Sentiment Trends
              </span>
            </CardTitle>
            <div className="flex items-center gap-2 bg-card p-2 rounded-full shadow-sm">
              <div className="flex items-center gap-1 text-sm">
                <span className="font-medium">{positivePercentage}% Positive</span>
                {positiveChange > 0 ? (
                  <span className="text-green-600 flex items-center">
                    <ArrowUpIcon className="h-4 w-4" />
                    {positiveChange}%
                  </span>
                ) : positiveChange < 0 ? (
                  <span className="text-red-600 flex items-center">
                    <ArrowDownIcon className="h-4 w-4" />
                    {Math.abs(positiveChange)}%
                  </span>
                ) : (
                  <span className="text-muted-foreground flex items-center">
                    <Minus className="h-4 w-4" />
                    0%
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="today">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="week">This Week</TabsTrigger>
            </TabsList>
            
            <TabsContent value="today" className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={trendData.slice(-12)}
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorPositive" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#000000" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#000000" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorNeutral" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#525252" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#525252" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorNegative" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                  <XAxis 
                    dataKey="timeLabel" 
                    tick={{ fontSize: 12 }} 
                    axisLine={{ stroke: '#e5e5e5', strokeWidth: 0.5 }}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }} 
                    axisLine={{ stroke: '#e5e5e5', strokeWidth: 0.5 }}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    iconType="circle" 
                    wrapperStyle={{ 
                      paddingTop: 10, 
                      fontSize: 12 
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="positive" 
                    name="Positive" 
                    strokeWidth={2}
                    stroke="#000000" 
                    fillOpacity={1}
                    fill="url(#colorPositive)" 
                    animationDuration={1000}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="neutral" 
                    name="Neutral" 
                    strokeWidth={2}
                    stroke="#525252" 
                    fillOpacity={1}
                    fill="url(#colorNeutral)" 
                    animationDuration={1200}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="negative" 
                    name="Negative" 
                    strokeWidth={2} 
                    stroke="#ef4444" 
                    fillOpacity={1}
                    fill="url(#colorNegative)" 
                    animationDuration={1400}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="week" className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={trendData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorPositiveWeek" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#000000" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#000000" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorNeutralWeek" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#525252" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#525252" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorNegativeWeek" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                  <XAxis 
                    dataKey="timeLabel" 
                    tick={{ fontSize: 12 }} 
                    axisLine={{ stroke: '#e5e5e5', strokeWidth: 0.5 }} 
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }} 
                    axisLine={{ stroke: '#e5e5e5', strokeWidth: 0.5 }} 
                    tickLine={false} 
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    iconType="circle" 
                    wrapperStyle={{ 
                      paddingTop: 10, 
                      fontSize: 12 
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="positive" 
                    name="Positive" 
                    strokeWidth={2}
                    stroke="#000000" 
                    fillOpacity={1}
                    fill="url(#colorPositiveWeek)" 
                    animationDuration={1000}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="neutral" 
                    name="Neutral" 
                    strokeWidth={2}
                    stroke="#525252" 
                    fillOpacity={1}
                    fill="url(#colorNeutralWeek)" 
                    animationDuration={1200}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="negative" 
                    name="Negative" 
                    strokeWidth={2}
                    stroke="#ef4444" 
                    fillOpacity={1}
                    fill="url(#colorNegativeWeek)" 
                    animationDuration={1400}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SentimentTrends;
