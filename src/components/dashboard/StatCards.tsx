
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  MessageSquare, 
  ClipboardList, 
  Clock, 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';
import { mockFeedback, mockServiceRequests } from '@/data/mockData';

const StatCards: React.FC = () => {
  // Calculate metrics
  const totalFeedback = mockFeedback.length;
  const totalServiceRequests = mockServiceRequests.length;
  const pendingRequests = mockServiceRequests.filter(r => r.status === 'new' || r.status === 'in-progress').length;
  const urgentRequests = mockServiceRequests.filter(r => r.priority === 'urgent' || r.priority === 'high').length;
  
  // Sample change percentages (in a real app, these would be calculated from historical data)
  const feedbackChange = 12;
  const serviceRequestsChange = -5;
  const pendingChange = 8;
  const urgentChange = -15;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalFeedback}</div>
          <p className="text-xs text-muted-foreground flex items-center mt-1">
            {feedbackChange > 0 ? (
              <>
                <TrendingUp className="h-3.5 w-3.5 mr-1 text-green-500" />
                <span className="text-green-500">{feedbackChange}% increase</span>
              </>
            ) : feedbackChange < 0 ? (
              <>
                <TrendingDown className="h-3.5 w-3.5 mr-1 text-red-500" />
                <span className="text-red-500">{Math.abs(feedbackChange)}% decrease</span>
              </>
            ) : (
              <>
                <Minus className="h-3.5 w-3.5 mr-1" />
                <span>No change</span>
              </>
            )}
            <span className="ml-1">from last week</span>
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Service Requests</CardTitle>
          <ClipboardList className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalServiceRequests}</div>
          <p className="text-xs text-muted-foreground flex items-center mt-1">
            {serviceRequestsChange > 0 ? (
              <>
                <TrendingUp className="h-3.5 w-3.5 mr-1 text-red-500" />
                <span className="text-red-500">{serviceRequestsChange}% increase</span>
              </>
            ) : serviceRequestsChange < 0 ? (
              <>
                <TrendingDown className="h-3.5 w-3.5 mr-1 text-green-500" />
                <span className="text-green-500">{Math.abs(serviceRequestsChange)}% decrease</span>
              </>
            ) : (
              <>
                <Minus className="h-3.5 w-3.5 mr-1" />
                <span>No change</span>
              </>
            )}
            <span className="ml-1">from last week</span>
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingRequests}</div>
          <p className="text-xs text-muted-foreground flex items-center mt-1">
            {pendingChange > 0 ? (
              <>
                <TrendingUp className="h-3.5 w-3.5 mr-1 text-red-500" />
                <span className="text-red-500">{pendingChange}% increase</span>
              </>
            ) : pendingChange < 0 ? (
              <>
                <TrendingDown className="h-3.5 w-3.5 mr-1 text-green-500" />
                <span className="text-green-500">{Math.abs(pendingChange)}% decrease</span>
              </>
            ) : (
              <>
                <Minus className="h-3.5 w-3.5 mr-1" />
                <span>No change</span>
              </>
            )}
            <span className="ml-1">from last week</span>
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Urgent Requests</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{urgentRequests}</div>
          <p className="text-xs text-muted-foreground flex items-center mt-1">
            {urgentChange > 0 ? (
              <>
                <TrendingUp className="h-3.5 w-3.5 mr-1 text-red-500" />
                <span className="text-red-500">{urgentChange}% increase</span>
              </>
            ) : urgentChange < 0 ? (
              <>
                <TrendingDown className="h-3.5 w-3.5 mr-1 text-green-500" />
                <span className="text-green-500">{Math.abs(urgentChange)}% decrease</span>
              </>
            ) : (
              <>
                <Minus className="h-3.5 w-3.5 mr-1" />
                <span>No change</span>
              </>
            )}
            <span className="ml-1">from last week</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatCards;
