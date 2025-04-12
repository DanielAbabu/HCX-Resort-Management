
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Search, UserPlus, ListFilter } from 'lucide-react';
import { useData } from '@/context/DataContext';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { StaffMember } from '@/context/DataContext';

const StaffPage = () => {
  const { staffMembers, addStaffMember } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newStaff, setNewStaff] = useState<Partial<StaffMember>>({
    name: '',
    role: '',
    department: 'Front Desk'
  });
  
  // Filter staff based on search query
  const filteredStaff = staffMembers.filter(staff => 
    staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddStaff = () => {
    if (!newStaff.name || !newStaff.role) {
      toast.error("Please fill all required fields");
      return;
    }
    
    addStaffMember({
      id: `staff-${Date.now()}`,
      name: newStaff.name,
      role: newStaff.role,
      department: newStaff.department || 'Front Desk'
    });
    
    setDialogOpen(false);
    setNewStaff({
      name: '',
      role: '',
      department: 'Front Desk'
    });
  };

  return (
    <DashboardLayout>
      <motion.div 
        className="flex items-center justify-between mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
          Staff Management
        </h1>
        <Button 
          className="gap-2 bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-500 dark:to-blue-400 hover:from-blue-700 hover:to-blue-600 text-white"
          onClick={() => setDialogOpen(true)}
        >
          <UserPlus className="h-4 w-4" />
          Add Staff Member
        </Button>
      </motion.div>
      
      <motion.div 
        className="flex items-center space-x-2 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search staff by name, role or department..." 
            className="pl-8 border-border/50 bg-background/50 focus-visible:ring-primary/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon" className="shrink-0">
          <ListFilter className="h-4 w-4" />
        </Button>
      </motion.div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Staff</TabsTrigger>
          <TabsTrigger value="front-desk">Front Desk</TabsTrigger>
          <TabsTrigger value="housekeeping">Housekeeping</TabsTrigger>
          <TabsTrigger value="maintenance">Facilities</TabsTrigger>
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
                <StaffCard staff={staff} />
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
                  <StaffCard staff={staff} />
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
                  <StaffCard staff={staff} />
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
                  <StaffCard staff={staff} />
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
                  <StaffCard staff={staff} />
                </motion.div>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Staff Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-card border border-blue-100/30 dark:border-blue-900/30">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-blue-900 dark:text-blue-100">Add New Staff Member</DialogTitle>
            <DialogDescription>
              Fill in the details below to add a new staff member to the system.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                value={newStaff.name}
                onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
                placeholder="John Smith"
                className="border-blue-100/50 dark:border-blue-900/50"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Input 
                id="role" 
                value={newStaff.role}
                onChange={(e) => setNewStaff({...newStaff, role: e.target.value})}
                placeholder="Concierge"
                className="border-blue-100/50 dark:border-blue-900/50"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="department">Department</Label>
              <Select 
                value={newStaff.department}
                onValueChange={(value) => setNewStaff({...newStaff, department: value})}
              >
                <SelectTrigger className="border-blue-100/50 dark:border-blue-900/50">
                  <SelectValue placeholder="Select a department" />
                </SelectTrigger>
                <SelectContent className="bg-card border border-blue-100/30 dark:border-blue-900/30">
                  <SelectItem value="Front Desk">Front Desk</SelectItem>
                  <SelectItem value="Housekeeping">Housekeeping</SelectItem>
                  <SelectItem value="Facilities">Facilities</SelectItem>
                  <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
                  <SelectItem value="Management">Management</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleAddStaff}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Add Staff Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
}

const StaffCard = ({ staff }: StaffCardProps) => {
  const { getAssignedRequestsCount } = useData();
  const assignedRequests = getAssignedRequestsCount(staff.name);

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md border-blue-100/30 dark:border-blue-900/30 card-gradient">
      <CardContent className="p-0">
        <div className="bg-gradient-to-br from-blue-50/70 to-blue-100/30 dark:from-blue-900/30 dark:to-blue-800/20 p-6 flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-blue-200/40 dark:border-blue-700/40">
            <AvatarImage src={staff.avatar || "/placeholder.svg"} />
            <AvatarFallback className="text-lg bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-800/40 text-blue-800 dark:text-blue-300">
              {staff.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg text-blue-900 dark:text-blue-100">{staff.name}</h3>
            <p className="text-muted-foreground text-sm">{staff.role}</p>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <Badge variant="outline" className="bg-background/50 dark:bg-background/20 border-blue-100/50 dark:border-blue-900/50">
                {staff.department}
              </Badge>
              {assignedRequests > 0 && (
                <Badge variant="secondary" className="gap-1 bg-blue-100/50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                  {assignedRequests} assigned tasks
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StaffPage;
