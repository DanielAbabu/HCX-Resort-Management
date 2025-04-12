
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AiSuggestions from '@/components/dashboard/AiSuggestions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  PieChart, 
  Pie, 
  ResponsiveContainer, 
  Cell, 
  Legend, 
  Tooltip
} from 'recharts';
import { 
  Lightbulb, 
  BarChart3,
  BrainCircuit,
  TrendingUp
} from 'lucide-react';
import { motion } from 'framer-motion';
import { colors } from '@/styles/theme';

const InsightsPage = () => {
  // Mock data for the keyword analysis
  const keywordData = [
    { name: 'Wi-Fi', value: 32, color: colors.status.info },
    { name: 'Check-in', value: 18, color: colors.primary[600] },
    { name: 'Breakfast', value: 24, color: colors.sentiment.positive },
    { name: 'Room Service', value: 14, color: colors.primary[400] },
    { name: 'Cleanliness', value: 22, color: colors.primary[700] },
    { name: 'Noise', value: 12, color: colors.sentiment.negative },
  ];

  // Mock data for sentiment by area
  const areaData = [
    { name: 'Rooms', positive: 65, neutral: 25, negative: 10, color: colors.sentiment.positive },
    { name: 'Restaurant', positive: 72, neutral: 18, negative: 10, color: colors.primary[400] },
    { name: 'Lobby', positive: 85, neutral: 10, negative: 5, color: colors.primary[600] },
    { name: 'Pool', positive: 90, neutral: 8, negative: 2, color: colors.status.info },
    { name: 'Gym', positive: 60, neutral: 30, negative: 10, color: colors.primary[700] },
  ];

  // Custom tooltip component with bolder text
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-md shadow-md">
          <p className="font-semibold">{payload[0].name}</p>
          <p className="font-bold text-lg">{`${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <DashboardLayout>
      <motion.div 
        className="flex items-center justify-between mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold tracking-tight">AI Insights</h1>
        <Badge variant="outline" className="bg-primary/10 text-primary">
          <BrainCircuit className="h-3.5 w-3.5 mr-1" />
          AI Powered
        </Badge>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Top Mentioned Keywords
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={keywordData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                      animationDuration={1000}
                      animationBegin={200}
                    >
                      {keywordData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend formatter={(value) => <span className="font-semibold">{value}</span>} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Sentiment by Area
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="chart">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="chart">Chart View</TabsTrigger>
                  <TabsTrigger value="list">List View</TabsTrigger>
                </TabsList>
                
                <TabsContent value="chart" className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    {/* This would be a stacked bar chart in a real implementation */}
                    <PieChart>
                      <Pie
                        data={areaData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="positive"
                        label={({name, positive}) => `${name} ${positive}%`}
                        labelLine={false}
                        animationDuration={1000}
                        animationBegin={200}
                      >
                        {areaData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend formatter={(value) => <span className="font-semibold">{value}</span>} />
                    </PieChart>
                  </ResponsiveContainer>
                </TabsContent>
                
                <TabsContent value="list">
                  <div className="space-y-3">
                    {areaData.map((area, index) => (
                      <motion.div 
                        key={area.name} 
                        className="p-3 border rounded-md"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold">{area.name}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-green-50 text-green-700 font-semibold">
                              {area.positive}% Positive
                            </Badge>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                          <motion.div 
                            className="bg-green-500 h-2.5 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${area.positive}%` }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div 
        className="mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <AiSuggestions />
      </motion.div>

      <motion.div 
        className="mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-amber-500" />
                Automated Action Items
              </CardTitle>
              <Badge>BETA</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <motion.div 
                className="border rounded-md p-4 bg-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <h3 className="font-bold mb-2">Schedule Staff Training: Guest Check-in Efficiency</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Based on recent feedback about slow check-in processes, we recommend scheduling a staff training session focused on streamlining the check-in process.
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 font-semibold">TRAINING</Badge>
                  <button className="text-sm text-primary font-medium">
                    Schedule Now
                  </button>
                </div>
              </motion.div>
              
              <motion.div 
                className="border rounded-md p-4 bg-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <h3 className="font-bold mb-2">Maintenance Request: Wi-Fi Router Replacement (3rd Floor)</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Multiple guests have reported weak Wi-Fi signal on the 3rd floor. Our analysis suggests replacing the router could resolve 85% of these complaints.
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="bg-orange-50 text-orange-700 font-semibold">MAINTENANCE</Badge>
                  <button className="text-sm text-primary font-medium">
                    Create Work Order
                  </button>
                </div>
              </motion.div>
              
              <motion.div 
                className="border rounded-md p-4 bg-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <h3 className="font-bold mb-2">Menu Update: Add More Vegetarian Options</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Guest feedback shows increasing demand for vegetarian options. Adding 3-4 new vegetarian items could boost dining satisfaction scores by approximately 12%.
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="bg-green-50 text-green-700 font-semibold">FOOD & BEVERAGE</Badge>
                  <button className="text-sm text-primary font-medium">
                    Review Suggestions
                  </button>
                </div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
};

export default InsightsPage;
