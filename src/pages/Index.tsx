
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCards from '@/components/dashboard/StatCards';
import LiveFeedback from '@/components/dashboard/LiveFeedback';
import ServiceRequests from '@/components/dashboard/ServiceRequests';
import SentimentTrends from '@/components/dashboard/SentimentTrends';
import AiSuggestions from '@/components/dashboard/AiSuggestions';
import { motion } from 'framer-motion';

const Index = () => {
  return (
    <DashboardLayout>
      <motion.div 
        className="flex items-center justify-between mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <div className="flex items-center gap-2 bg-card p-2 rounded-full shadow-sm">
          <span className="text-sm text-muted-foreground">Hotel Grand Plaza</span>
          <span className="inline-flex h-2 w-2 rounded-full bg-green-500"></span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <StatCards />
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <LiveFeedback />
        <SentimentTrends />
      </motion.div>

      <motion.div 
        className="mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <ServiceRequests />
      </motion.div>

      <motion.div 
        className="mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <AiSuggestions />
      </motion.div>
    </DashboardLayout>
  );
};

export default Index;
