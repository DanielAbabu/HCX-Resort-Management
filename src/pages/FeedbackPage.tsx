
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import LiveFeedback from '@/components/dashboard/LiveFeedback';
import SentimentTrends from '@/components/dashboard/SentimentTrends';
import { motion } from 'framer-motion';

const FeedbackPage = () => {
  return (
    <DashboardLayout>
      <motion.div 
        className="flex items-center justify-between mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold tracking-tight">Live Feedback</h1>
      </motion.div>

      <div className="grid grid-cols-1 gap-6">
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
