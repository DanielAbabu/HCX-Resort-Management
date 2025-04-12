
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import LiveFeedback from '@/components/dashboard/LiveFeedback';
import SentimentTrends from '@/components/dashboard/SentimentTrends';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Mic, Video, Image, Upload } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const FeedbackPage = () => {
  return (
    <DashboardLayout>
      <motion.div 
        className="flex items-center justify-between mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent font-poppins">
          Live Guest Feedback
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="border border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Submit Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="text" className="w-full">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="text" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>Text</span>
                  </TabsTrigger>
                  <TabsTrigger value="voice" className="flex items-center gap-2">
                    <Mic className="h-4 w-4" />
                    <span>Voice</span>
                  </TabsTrigger>
                  <TabsTrigger value="image" className="flex items-center gap-2">
                    <Image className="h-4 w-4" />
                    <span>Image</span>
                  </TabsTrigger>
                  <TabsTrigger value="video" className="flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    <span>Video</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="text">
                  <div className="space-y-4">
                    <textarea 
                      className="w-full min-h-[120px] p-3 rounded-md border border-border bg-background/50"
                      placeholder="Enter your feedback here..."
                    />
                    <div className="flex justify-end">
                      <Button className="bg-primary text-white hover:bg-primary/80">
                        Submit Feedback
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="voice">
                  <div className="p-8 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center space-y-4">
                    <Mic className="h-12 w-12 text-muted-foreground" />
                    <p className="text-muted-foreground text-center">Click to record your voice feedback</p>
                    <Button variant="outline" className="rounded-full w-16 h-16 flex items-center justify-center">
                      <Mic className="h-6 w-6" />
                    </Button>
                    <p className="text-xs text-muted-foreground">or</p>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      <span>Upload Audio</span>
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="image">
                  <div className="p-8 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center space-y-4">
                    <Image className="h-12 w-12 text-muted-foreground" />
                    <p className="text-muted-foreground text-center">Drag and drop image, or click to browse</p>
                    <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto">
                      <div className="aspect-square bg-muted rounded-md overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9" alt="Example" className="w-full h-full object-cover" />
                      </div>
                      <div className="aspect-square bg-muted rounded-md overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1721322800607-8c38375eef04" alt="Example" className="w-full h-full object-cover" />
                      </div>
                      <div className="aspect-square flex items-center justify-center border-2 border-dashed border-border rounded-md">
                        <Upload className="h-6 w-6 text-muted-foreground" />
                      </div>
                    </div>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      <span>Upload Images</span>
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="video">
                  <div className="p-8 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center space-y-4">
                    <Video className="h-12 w-12 text-muted-foreground" />
                    <p className="text-muted-foreground text-center">Record a short video with your feedback</p>
                    <div className="w-full max-w-lg bg-black/5 aspect-video rounded-lg flex items-center justify-center">
                      <Button variant="outline" className="rounded-full w-16 h-16 flex items-center justify-center">
                        <Video className="h-6 w-6" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">or</p>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      <span>Upload Video</span>
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <SentimentTrends />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <LiveFeedback />
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default FeedbackPage;
