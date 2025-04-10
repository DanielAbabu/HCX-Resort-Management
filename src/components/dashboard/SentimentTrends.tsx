
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, ResponsiveContainer, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { mockSentimentTrends } from '@/data/mockData';
import { BarChart3, ArrowUpIcon, ArrowDownIcon, Minus } from 'lucide-react';

const SentimentTrends: React.FC = () => {
  // Calculate today's overall sentiment
  const todayData = mockSentimentTrends.slice(-12);
  const totalFeedback = todayData.reduce(
    (sum, item) => sum + item.positive + item.neutral + item.negative, 
    0
  );
  const positivePercentage = Math.round(
    (todayData.reduce((sum, item) => sum + item.positive, 0) / totalFeedback) * 100
  );
  const negativePercentage = Math.round(
    (todayData.reduce((sum, item) => sum + item.negative, 0) / totalFeedback) * 100
  );

  // Compare with yesterday
  const yesterdayData = mockSentimentTrends.slice(0, 12);
  const yesterdayPositivePercentage = Math.round(
    (yesterdayData.reduce((sum, item) => sum + item.positive, 0) / 
    yesterdayData.reduce((sum, item) => sum + item.positive + item.neutral + item.negative, 0)) * 100
  );

  const positiveChange = positivePercentage - yesterdayPositivePercentage;

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Sentiment Trends
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-sm">
              <span className="font-medium">{positivePercentage}% Positive</span>
              {positiveChange > 0 ? (
                <span className="text-green-500 flex items-center">
                  <ArrowUpIcon className="h-4 w-4" />
                  {positiveChange}%
                </span>
              ) : positiveChange < 0 ? (
                <span className="text-red-500 flex items-center">
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
              <BarChart
                data={mockSentimentTrends.slice(-12)}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                <XAxis dataKey="timeLabel" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "rgba(255, 255, 255, 0.9)", 
                    border: "1px solid #e0e0e0",
                    borderRadius: "6px" 
                  }} 
                />
                <Legend />
                <Bar dataKey="positive" stackId="sentiment" name="Positive" fill="#4ade80" radius={[2, 2, 0, 0]} />
                <Bar dataKey="neutral" stackId="sentiment" name="Neutral" fill="#60a5fa" radius={[2, 2, 0, 0]} />
                <Bar dataKey="negative" stackId="sentiment" name="Negative" fill="#f87171" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="week" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mockSentimentTrends}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                <XAxis dataKey="timeLabel" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "rgba(255, 255, 255, 0.9)", 
                    border: "1px solid #e0e0e0",
                    borderRadius: "6px" 
                  }} 
                />
                <Legend />
                <Bar dataKey="positive" stackId="sentiment" name="Positive" fill="#4ade80" radius={[2, 2, 0, 0]} />
                <Bar dataKey="neutral" stackId="sentiment" name="Neutral" fill="#60a5fa" radius={[2, 2, 0, 0]} />
                <Bar dataKey="negative" stackId="sentiment" name="Negative" fill="#f87171" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SentimentTrends;
