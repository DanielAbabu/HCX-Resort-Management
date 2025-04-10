
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FeedbackItem, mockFeedback } from '@/data/mockData';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare, MessageCircleHeart, MessageCircleWarning, MessageCircleX } from 'lucide-react';

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

  const getInitials = (name: string) => {
    if (name === 'Anonymous') return 'AN';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="p-4 border rounded-lg mb-3 bg-card animate-fade-in">
      <div className="flex items-start gap-3">
        <Avatar>
          <AvatarImage src="/placeholder.svg" alt={feedback.guestName} />
          <AvatarFallback>{getInitials(feedback.guestName)}</AvatarFallback>
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
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Badge variant="secondary" className="text-xs">
              {feedback.source.toUpperCase()}
            </Badge>
            {feedback.location && (
              <Badge variant="outline" className="text-xs">
                {feedback.location}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const LiveFeedback: React.FC = () => {
  const [filter, setFilter] = useState('all');
  
  const filteredFeedback = mockFeedback.filter(
    feedback => filter === 'all' || feedback.sentiment === filter
  );

  const counts = {
    all: mockFeedback.length,
    positive: mockFeedback.filter(f => f.sentiment === 'positive').length,
    neutral: mockFeedback.filter(f => f.sentiment === 'neutral').length,
    negative: mockFeedback.filter(f => f.sentiment === 'negative').length
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Live Feedback
          </CardTitle>
          <Badge variant="outline" className="ml-2">
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
              Neutral <Badge className="ml-1 bg-blue-500">{counts.neutral}</Badge>
            </TabsTrigger>
            <TabsTrigger value="negative">
              Negative <Badge className="ml-1 bg-red-500">{counts.negative}</Badge>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <div className="max-h-[400px] overflow-y-auto">
              {filteredFeedback.map((feedback) => (
                <FeedbackItemCard key={feedback.id} feedback={feedback} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="positive" className="mt-0">
            <div className="max-h-[400px] overflow-y-auto">
              {filteredFeedback.map((feedback) => (
                <FeedbackItemCard key={feedback.id} feedback={feedback} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="neutral" className="mt-0">
            <div className="max-h-[400px] overflow-y-auto">
              {filteredFeedback.map((feedback) => (
                <FeedbackItemCard key={feedback.id} feedback={feedback} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="negative" className="mt-0">
            <div className="max-h-[400px] overflow-y-auto">
              {filteredFeedback.map((feedback) => (
                <FeedbackItemCard key={feedback.id} feedback={feedback} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LiveFeedback;
