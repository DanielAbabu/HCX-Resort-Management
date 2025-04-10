
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import LiveFeedback from '@/components/dashboard/LiveFeedback';
import SentimentTrends from '@/components/dashboard/SentimentTrends';

const FeedbackPage = () => {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Live Feedback</h1>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <SentimentTrends />
        <LiveFeedback />
      </div>
    </DashboardLayout>
  );
};

export default FeedbackPage;
