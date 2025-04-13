
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ClipboardList, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  Search,
  Filter,
  MoreHorizontal
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useData } from '@/context/DataContext';
import { ServiceRequest } from '@/data/mockData';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { colors } from '@/styles/theme';
import { motion } from 'framer-motion';

// Status icons map with color classes
const statusIcons = {
  'new': <Clock className="h-4 w-4 text-black" />,
  'in-progress': <Clock className="h-4 w-4 text-black" />,
  'resolved': <CheckCircle2 className="h-4 w-4 text-black" />,
  'escalated': <AlertTriangle className="h-4 w-4 text-black" />
};

// Type icons map
const typeIcons = {
  'cleaning': '🧹',
  'complaint': '⚠️',
  'food': '🍽️',
  'maintenance': '🔧',
  'amenities': '🛎️',
  'other': '📋'
};

// Priority level styling
const priorityStyles = {
  'low': 'bg-blue-50 text-blue-800 border-blue-200',
  'medium': 'bg-amber-50 text-amber-800 border-amber-200',
  'high': 'bg-orange-50 text-orange-800 border-orange-200',
  'urgent': 'bg-red-50 text-red-800 border-red-200'
};

const ServiceRequestCard = ({ request }: { request: ServiceRequest }) => {
  // Generate initials from guest name
  const getInitials = (name: string): string => {
    if (!name || name.trim() === '') return 'AN';
    if (name === 'Anonymous') return 'AN';
    
    const nameParts = name.split(' ').filter(Boolean);
    if (nameParts.length === 0) return 'AN';
    
    return nameParts
      .map(part => part && part[0] ? part[0].toUpperCase() : '')
      .filter(Boolean)
      .join('')
      .slice(0, 2) || 'AN';
  };

  return (
    <motion.div 
      className="p-4 rounded-lg mb-3 border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start gap-3">
        <Avatar className="mt-1 border border-gray-200">
          <AvatarImage src="/placeholder.svg" alt={request.guestName} />
          <AvatarFallback className="bg-gradient-to-br from-gray-100 to-gray-50">{getInitials(request.guestName)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="font-medium flex items-center">
              <span>{request.guestName}</span>
              {request.roomNumber && (
                <Badge variant="outline" className="ml-2 text-xs">
                  Room {request.roomNumber}
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-1">
              <Badge className={`px-2 py-0.5 text-xs ${priorityStyles[request.priority]}`}>
                {request.priority}
              </Badge>
              <span className="text-xs text-gray-500">
                {formatDistanceToNow(request.timestamp, { addSuffix: true })}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuItem>Assign Staff</DropdownMenuItem>
                  <DropdownMenuItem>Change Status</DropdownMenuItem>
                  <DropdownMenuItem>Change Priority</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className={`text-xs flex items-center gap-1 status-${request.status}`}>
              {statusIcons[request.status]}
              <span>{request.status.replace('-', ' ')}</span>
            </Badge>
            
            <Badge variant="outline" className="text-xs">
              <span className="mr-1">{typeIcons[request.type]}</span>
              {request.type}
            </Badge>
          </div>
          
          <p className="text-sm text-gray-600 mb-2">{request.description}</p>
          
          {request.assignedTo && (
            <div className="flex items-center mt-2">
              <span className="text-xs text-gray-500 mr-1">Assigned to:</span>
              <Badge variant="outline" className="text-xs bg-gray-50">
                {request.assignedTo}
              </Badge>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ServiceRequests: React.FC = () => {
  const { serviceRequests } = useData();
  const [filter, setFilter] = useState('all');
  
  // Filter requests based on selected status
  const filteredRequests = serviceRequests.filter(request => {
    if (filter === 'all') return true;
    return request.status === filter;
  });

  // Calculate count for each status
  const counts = {
    all: serviceRequests.length,
    new: serviceRequests.filter(r => r.status === 'new').length,
    'in-progress': serviceRequests.filter(r => r.status === 'in-progress').length,
    resolved: serviceRequests.filter(r => r.status === 'resolved').length,
    escalated: serviceRequests.filter(r => r.status === 'escalated').length,
  };

  return (
    <Card className="shadow-sm border-gray-200 bg-white">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-black" />
            <span>Service Requests</span>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center mb-4 gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input type="search" placeholder="Search requests..." className="pl-8" />
          </div>
          
          <div className="flex items-center gap-2">
            <Select defaultValue="newest">
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="gap-1 h-10">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="w-full" onValueChange={setFilter}>
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="all">
              All <Badge className="ml-1 bg-gray-800">{counts.all}</Badge>
            </TabsTrigger>
            <TabsTrigger value="new">
              New <Badge className="ml-1" style={{ backgroundColor: colors.primary.purple }}>{counts.new}</Badge>
            </TabsTrigger>
            <TabsTrigger value="in-progress">
              In Progress <Badge className="ml-1" style={{ backgroundColor: colors.primary.orange }}>{counts['in-progress']}</Badge>
            </TabsTrigger>
            <TabsTrigger value="resolved">
              Resolved <Badge className="ml-1" style={{ backgroundColor: colors.chart.green }}>{counts.resolved}</Badge>
            </TabsTrigger>
            <TabsTrigger value="escalated">
              Escalated <Badge className="ml-1" style={{ backgroundColor: colors.status.error }}>{counts.escalated}</Badge>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <div className="max-h-[600px] overflow-y-auto pr-1 scrollbar-thin">
              {filteredRequests.map((request) => (
                <ServiceRequestCard key={request.id} request={request} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="new" className="mt-0">
            <div className="max-h-[600px] overflow-y-auto pr-1 scrollbar-thin">
              {filteredRequests.map((request) => (
                <ServiceRequestCard key={request.id} request={request} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="in-progress" className="mt-0">
            <div className="max-h-[600px] overflow-y-auto pr-1 scrollbar-thin">
              {filteredRequests.map((request) => (
                <ServiceRequestCard key={request.id} request={request} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="resolved" className="mt-0">
            <div className="max-h-[600px] overflow-y-auto pr-1 scrollbar-thin">
              {filteredRequests.map((request) => (
                <ServiceRequestCard key={request.id} request={request} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="escalated" className="mt-0">
            <div className="max-h-[600px] overflow-y-auto pr-1 scrollbar-thin">
              {filteredRequests.map((request) => (
                <ServiceRequestCard key={request.id} request={request} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ServiceRequests;
