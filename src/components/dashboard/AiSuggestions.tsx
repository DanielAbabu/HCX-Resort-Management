
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Lightbulb, 
  ThumbsUp, 
  ThumbsDown,
  Sparkles,
  Tag
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useData } from '@/context/DataContext';
import { motion } from 'framer-motion';

const AiSuggestions: React.FC = () => {
  const { aiSuggestions, markSuggestionHelpful, markSuggestionUnhelpful, refreshAiSuggestions } = useData();

  const impactColors = {
    low: "bg-blue-50 text-blue-700 border-blue-200",
    medium: "bg-amber-50 text-amber-700 border-amber-200",
    high: "bg-red-50 text-red-700 border-red-200"
  };

  return (
    <Card className="shadow-sm overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500" />
            AI Suggestions
          </CardTitle>
          <Button 
            size="sm" 
            variant="outline" 
            className="gap-1 text-primary"
            onClick={refreshAiSuggestions}
          >
            <Lightbulb className="h-4 w-4" />
            Refresh Insights
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
          {aiSuggestions.map((suggestion, index) => (
            <motion.div 
              key={suggestion.id} 
              className="p-4 border rounded-lg bg-card relative overflow-hidden"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
              <div className="pl-2">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium">{suggestion.suggestion}</h3>
                  <Badge variant="outline" className={impactColors[suggestion.impact]}>
                    {suggestion.impact.toUpperCase()} IMPACT
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Badge variant="secondary" className="gap-1">
                    <Tag className="h-3.5 w-3.5" />
                    {suggestion.category}
                  </Badge>
                  <span>Based on {suggestion.relatedFeedbackCount} pieces of feedback</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Generated {formatDistanceToNow(suggestion.generatedAt, { addSuffix: true })}
                  </span>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 text-muted-foreground hover:text-green-600 hover:bg-green-50"
                      onClick={() => markSuggestionHelpful(suggestion.id)}
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Helpful
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 text-muted-foreground hover:text-red-600 hover:bg-red-50"
                      onClick={() => markSuggestionUnhelpful(suggestion.id)}
                    >
                      <ThumbsDown className="h-4 w-4 mr-1" />
                      Not Helpful
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AiSuggestions;
