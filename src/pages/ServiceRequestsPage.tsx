
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ServiceRequests from '@/components/dashboard/ServiceRequests';
import { useData } from '@/context/DataContext';
import { motion } from 'framer-motion';

const ServiceRequestsPage = () => {
  const { serviceRequests } = useData();
  
  // Calculate statistics
  const newRequests = serviceRequests.filter(r => r.status === 'new').length;
  const inProgressRequests = serviceRequests.filter(r => r.status === 'in-progress').length;
  const resolvedToday = serviceRequests.filter(r => {
    const today = new Date();
    const requestDate = new Date(r.timestamp);
    return r.status === 'resolved' && 
      requestDate.getDate() === today.getDate() &&
      requestDate.getMonth() === today.getMonth() &&
      requestDate.getFullYear() === today.getFullYear();
  }).length;
  
  // Calculate average resolution time (mock data for now)
  const avgResolutionTime = "28m";

  return (
    <DashboardLayout>
      <motion.div 
        className="flex items-center justify-between mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold tracking-tight">Service Requests</h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div 
          className="col-span-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="bg-card p-4 rounded-lg border shadow-sm">
            <h3 className="font-medium mb-1">New Requests</h3>
            <div className="text-2xl font-bold text-purple-600">{newRequests}</div>
          </div>
        </motion.div>
        <motion.div 
          className="col-span-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="bg-card p-4 rounded-lg border shadow-sm">
            <h3 className="font-medium mb-1">In Progress</h3>
            <div className="text-2xl font-bold text-amber-600">{inProgressRequests}</div>
          </div>
        </motion.div>
        <motion.div 
          className="col-span-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="bg-card p-4 rounded-lg border shadow-sm">
            <h3 className="font-medium mb-1">Resolved Today</h3>
            <div className="text-2xl font-bold text-green-600">{resolvedToday}</div>
          </div>
        </motion.div>
        <motion.div 
          className="col-span-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <div className="bg-card p-4 rounded-lg border shadow-sm">
            <h3 className="font-medium mb-1">Avg. Resolution Time</h3>
            <div className="text-2xl font-bold text-blue-600">{avgResolutionTime}</div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <ServiceRequests />
      </motion.div>
    </DashboardLayout>
  );
};

export default ServiceRequestsPage;
