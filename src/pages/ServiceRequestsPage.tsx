
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ServiceRequests from '@/components/dashboard/ServiceRequests';
import StatCards from '@/components/dashboard/StatCards';

const ServiceRequestsPage = () => {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Service Requests</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="col-span-1">
          <div className="bg-card p-4 rounded-lg border shadow-sm">
            <h3 className="font-medium mb-1">New Requests</h3>
            <div className="text-2xl font-bold text-purple-600">5</div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="bg-card p-4 rounded-lg border shadow-sm">
            <h3 className="font-medium mb-1">In Progress</h3>
            <div className="text-2xl font-bold text-amber-600">4</div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="bg-card p-4 rounded-lg border shadow-sm">
            <h3 className="font-medium mb-1">Resolved Today</h3>
            <div className="text-2xl font-bold text-green-600">3</div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="bg-card p-4 rounded-lg border shadow-sm">
            <h3 className="font-medium mb-1">Avg. Resolution Time</h3>
            <div className="text-2xl font-bold text-blue-600">28m</div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <ServiceRequests />
      </div>
    </DashboardLayout>
  );
};

export default ServiceRequestsPage;
