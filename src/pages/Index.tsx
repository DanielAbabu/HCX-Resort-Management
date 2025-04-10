
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCards from '@/components/dashboard/StatCards';
import LiveFeedback from '@/components/dashboard/LiveFeedback';
import ServiceRequests from '@/components/dashboard/ServiceRequests';
import SentimentTrends from '@/components/dashboard/SentimentTrends';
import AiSuggestions from '@/components/dashboard/AiSuggestions';

const Index = () => {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Hotel Grand Plaza</span>
          <span className="inline-flex h-2 w-2 rounded-full bg-green-500"></span>
        </div>
      </div>

      <StatCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <LiveFeedback />
        <SentimentTrends />
      </div>

      <div className="mt-6">
        <ServiceRequests />
      </div>

      <div className="mt-6">
        <AiSuggestions />
      </div>
    </DashboardLayout>
  );
};

export default Index;
