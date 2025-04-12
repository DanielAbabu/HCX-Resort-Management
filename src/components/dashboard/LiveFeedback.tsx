
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FeedbackItem } from '@/data/mockData';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare, MessageCircleHeart, MessageCircleWarning, MessageCircleX, Image, Video, Mic } from 'lucide-react';
import { useData } from '@/context/DataContext';
import { motion, AnimatePresence } from 'framer-motion';
import { colors } from '@/styles/theme';

interface FeedbackItemCardProps {
  feedback: FeedbackItem;
}

const FeedbackItemCard: React.FC<FeedbackItemCardProps> = ({ feedback }) => {
  const sentimentIcons = {
    positive: <MessageCircleHeart className="h-4 w-4 text-green-500" />,
    neutral: <MessageCircleWarning className="h-4 w-4 text-blue-500" />,
    negative: <MessageCircleX className="h-4 w-4 text-red-500" />
  };

  const sentimentClasses = {
    positive: 'bg-green-50 text-green-700 border-green-200',
    neutral: 'bg-blue-50 text-blue-700 border-blue-200',
    negative: 'bg-red-50 text-red-700 border-red-200'
  };

  const mediaTypeIcons = {
    text: <MessageSquare className="h-4 w-4 text-gray-500" />,
    image: <Image className="h-4 w-4 text-indigo-500" />,
    voice: <Mic className="h-4 w-4 text-amber-500" />,
    video: <Video className="h-4 w-4 text-pink-500" />
  };

  // Determine the media type (defaulting to text if not specified)
  const mediaType = feedback.mediaType || 'text';

  const getInitials = (name: string): string => {
    // Safely handle undefined or empty names
    if (!name || name.trim() === '') return 'AN';
    if (name === 'Anonymous') return 'AN';
    
    // Split the name and safely get initials
    const nameParts = name.split(' ').filter(Boolean);
    if (nameParts.length === 0) return 'AN';
    
    return nameParts
      .map(part => part && part[0] ? part[0].toUpperCase() : '')
      .filter(Boolean)
      .join('')
      .slice(0, 2) || 'AN';
  };

  // Handle rendering media content based on type
  const renderMediaContent = () => {
    if (!feedback.mediaUrl) return null;
    
    switch (mediaType) {
      case 'image':
        return (
          <div className="mt-2 rounded-md overflow-hidden">
            <img 
              src={feedback.mediaUrl} 
              alt="Feedback image" 
              className="w-full h-auto max-h-44 object-cover rounded-md"
            />
          </div>
        );
      case 'video':
        return (
          <div className="mt-2 rounded-md overflow-hidden">
            <video 
              controls 
              className="w-full h-auto max-h-44 object-cover rounded-md"
            >
              <source src={feedback.mediaUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        );
      case 'voice':
        return (
          <div className="mt-2">
            <audio controls className="w-full">
              <source src={feedback.mediaUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div 
      className="p-4 border border-border/50 rounded-lg mb-3 bg-gradient-to-br from-card to-background shadow-sm hover:shadow-md transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <div className="flex items-start gap-3">
        <Avatar className="border border-border/20">
          <AvatarImage src="/placeholder.svg" alt={feedback.guestName} />
          <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10">{getInitials(feedback.guestName)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="font-medium">{feedback.guestName}</div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={sentimentClasses[feedback.sentiment]}>
                <span className="flex items-center gap-1">
                  {sentimentIcons[feedback.sentiment]}
                  {feedback.sentiment.charAt(0).toUpperCase() + feedback.sentiment.slice(1)}
                </span>
              </Badge>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(feedback.timestamp, { addSuffix: true })}
              </span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{feedback.message}</p>
          
          {/* Render any media content */}
          {renderMediaContent()}
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {mediaType !== 'text' && (
              <Badge variant="outline" className="text-xs flex items-center gap-1">
                {mediaTypeIcons[mediaType as keyof typeof mediaTypeIcons]}
                {mediaType.charAt(0).toUpperCase() + mediaType.slice(1)}
              </Badge>
            )}
            {feedback.location && (
              <Badge variant="outline" className="text-xs">
                {feedback.location}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const LiveFeedback: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const { feedback } = useData();
  
  const filteredFeedback = feedback.filter(
    item => filter === 'all' || item.sentiment === filter
  );

  const counts = {
    all: feedback.length,
    positive: feedback.filter(f => f.sentiment === 'positive').length,
    neutral: feedback.filter(f => f.sentiment === 'neutral').length,
    negative: feedback.filter(f => f.sentiment === 'negative').length
  };

  return (
    <Card className="shadow-sm border-border/50 bg-gradient-to-br from-card to-background">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Live Feedback
            </span>
          </CardTitle>
          <Badge 
            variant="outline" 
            className="ml-2 border-primary/30 bg-primary/5 text-primary animate-pulse"
          >
            LIVE
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full" onValueChange={setFilter}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all">
              All <Badge className="ml-1 bg-primary">{counts.all}</Badge>
            </TabsTrigger>
            <TabsTrigger value="positive">
              Positive <Badge className="ml-1 bg-green-500">{counts.positive}</Badge>
            </TabsTrigger>
            <TabsTrigger value="neutral">
              Neutral <Badge className="ml-1" style={{ backgroundColor: colors.chart.blue }}>{counts.neutral}</Badge>
            </TabsTrigger>
            <TabsTrigger value="negative">
              Negative <Badge className="ml-1" style={{ backgroundColor: colors.primary.orange }}>{counts.negative}</Badge>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <div className="max-h-[400px] overflow-y-auto pr-1 scrollbar-thin">
              <AnimatePresence>
                {filteredFeedback.map((feedback) => (
                  <FeedbackItemCard key={feedback.id} feedback={feedback} />
                ))}
              </AnimatePresence>
            </div>
          </TabsContent>
          
          <TabsContent value="positive" className="mt-0">
            <div className="max-h-[400px] overflow-y-auto pr-1 scrollbar-thin">
              <AnimatePresence>
                {filteredFeedback.map((feedback) => (
                  <FeedbackItemCard key={feedback.id} feedback={feedback} />
                ))}
              </AnimatePresence>
            </div>
          </TabsContent>
          
          <TabsContent value="neutral" className="mt-0">
            <div className="max-h-[400px] overflow-y-auto pr-1 scrollbar-thin">
              <AnimatePresence>
                {filteredFeedback.map((feedback) => (
                  <FeedbackItemCard key={feedback.id} feedback={feedback} />
                ))}
              </AnimatePresence>
            </div>
          </TabsContent>
          
          <TabsContent value="negative" className="mt-0">
            <div className="max-h-[400px] overflow-y-auto pr-1 scrollbar-thin">
              <AnimatePresence>
                {filteredFeedback.map((feedback) => (
                  <FeedbackItemCard key={feedback.id} feedback={feedback} />
                ))}
              </AnimatePresence>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LiveFeedback;
