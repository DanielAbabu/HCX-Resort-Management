
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, ResponsiveContainer, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { BarChart3, ArrowUpIcon, ArrowDownIcon, Minus } from 'lucide-react';
import { useData } from '@/context/DataContext';
import { motion } from 'framer-motion';

const SentimentTrends: React.FC = () => {
  const { sentimentTrends } = useData();

  // Calculate today's overall sentiment
  const todayData = sentimentTrends.slice(-12);
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
  const yesterdayData = sentimentTrends.slice(0, 12);
  const yesterdayTotalFeedback = yesterdayData.reduce(
    (sum, item) => sum + item.positive + item.neutral + item.negative, 
    0
  );
  const yesterdayPositivePercentage = yesterdayTotalFeedback > 0 ? Math.round(
    (yesterdayData.reduce((sum, item) => sum + item.positive, 0) / yesterdayTotalFeedback) * 100
  ) : 0;

  const positiveChange = positivePercentage - yesterdayPositivePercentage;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
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
                  data={sentimentTrends.slice(-12)}
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
                    animationDuration={300}
                  />
                  <Legend />
                  <Bar dataKey="positive" stackId="sentiment" name="Positive" fill="#4ade80" radius={[2, 2, 0, 0]} animationDuration={1000} />
                  <Bar dataKey="neutral" stackId="sentiment" name="Neutral" fill="#60a5fa" radius={[2, 2, 0, 0]} animationDuration={1000} />
                  <Bar dataKey="negative" stackId="sentiment" name="Negative" fill="#f87171" radius={[2, 2, 0, 0]} animationDuration={1000} />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="week" className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={sentimentTrends}
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
                    animationDuration={300}
                  />
                  <Legend />
                  <Bar dataKey="positive" stackId="sentiment" name="Positive" fill="#4ade80" radius={[2, 2, 0, 0]} animationDuration={1000} />
                  <Bar dataKey="neutral" stackId="sentiment" name="Neutral" fill="#60a5fa" radius={[2, 2, 0, 0]} animationDuration={1000} />
                  <Bar dataKey="negative" stackId="sentiment" name="Negative" fill="#f87171" radius={[2, 2, 0, 0]} animationDuration={1000} />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SentimentTrends;
