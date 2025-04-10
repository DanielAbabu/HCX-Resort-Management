
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserRoundCog, Search, Users, UserCheck, UserPlus, ListFilter } from 'lucide-react';
import { useData } from '@/context/DataContext';
import { motion } from 'framer-motion';

const StaffPage = () => {
  const { staffMembers, serviceRequests } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Get assigned requests for each staff member
  const getAssignedRequestsCount = (staffName: string) => {
    return serviceRequests.filter(request => request.assignedTo === staffName).length;
  };
  
  // Filter staff based on search query
  const filteredStaff = staffMembers.filter(staff => 
    staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Staff Management</h1>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Add Staff Member
        </Button>
      </div>
      
      <div className="flex items-center space-x-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search staff by name, role or department..." 
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon" className="shrink-0">
          <ListFilter className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Staff</TabsTrigger>
          <TabsTrigger value="front-desk">Front Desk</TabsTrigger>
          <TabsTrigger value="housekeeping">Housekeeping</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="food">Food & Beverage</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStaff.map((staff, index) => (
              <motion.div
                key={staff.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <StaffCard 
                  staff={staff} 
                  assignedRequests={getAssignedRequestsCount(staff.name)} 
                />
              </motion.div>
            ))}
          </div>
        </TabsContent>
        
        {/* Similar content for other tabs, filtered by department */}
        <TabsContent value="front-desk" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStaff
              .filter(staff => staff.department === 'Front Desk')
              .map((staff, index) => (
                <motion.div
                  key={staff.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <StaffCard 
                    staff={staff} 
                    assignedRequests={getAssignedRequestsCount(staff.name)} 
                  />
                </motion.div>
              ))}
          </div>
        </TabsContent>
        
        {/* Repeat for other departments */}
        <TabsContent value="housekeeping" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStaff
              .filter(staff => staff.department === 'Housekeeping')
              .map((staff, index) => (
                <motion.div
                  key={staff.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <StaffCard 
                    staff={staff} 
                    assignedRequests={getAssignedRequestsCount(staff.name)} 
                  />
                </motion.div>
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="maintenance" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStaff
              .filter(staff => staff.department === 'Facilities')
              .map((staff, index) => (
                <motion.div
                  key={staff.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <StaffCard 
                    staff={staff} 
                    assignedRequests={getAssignedRequestsCount(staff.name)} 
                  />
                </motion.div>
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="food" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStaff
              .filter(staff => staff.department === 'Food & Beverage')
              .map((staff, index) => (
                <motion.div
                  key={staff.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <StaffCard 
                    staff={staff} 
                    assignedRequests={getAssignedRequestsCount(staff.name)} 
                  />
                </motion.div>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

interface StaffCardProps {
  staff: {
    id: string;
    name: string;
    role: string;
    department: string;
    avatar?: string;
  };
  assignedRequests: number;
}

const StaffCard = ({ staff, assignedRequests }: StaffCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardContent className="p-0">
        <div className="bg-primary/5 p-6 flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary/20">
            <AvatarImage src={staff.avatar || "/placeholder.svg"} />
            <AvatarFallback className="text-lg">{staff.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg">{staff.name}</h3>
            <p className="text-muted-foreground text-sm">{staff.role}</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline">{staff.department}</Badge>
              {assignedRequests > 0 && (
                <Badge variant="secondary" className="gap-1">
                  <UserCheck className="h-3 w-3" />
                  {assignedRequests} assigned
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <div className="p-4 flex justify-between">
          <Button variant="outline" size="sm" className="gap-1">
            <UserCheck className="h-3.5 w-3.5" />
            Assign Tasks
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <UserRoundCog className="h-3.5 w-3.5" />
            Manage
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StaffPage;
