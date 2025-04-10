
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { ServiceRequest } from '@/data/mockData';
import { formatDistanceToNow } from 'date-fns';
import { 
  ClipboardList, 
  MoreHorizontal, 
  UserCheck, 
  AlertCircle, 
  CheckCircle2, 
  Clock,
  MessageCircleHeart, 
  MessageCircleWarning, 
  MessageCircleX,
  Home,
  Utensils,
  Sparkles,
  Wrench,
  FileWarning,
  HelpCircle,
  CheckSquare
} from 'lucide-react';
import { toast } from 'sonner';
import { useData } from '@/context/DataContext';
import { motion, AnimatePresence } from 'framer-motion';

interface RequestItemCardProps {
  request: ServiceRequest;
}

const RequestItemCard: React.FC<RequestItemCardProps> = ({ request }) => {
  const { updateRequestStatus, assignRequestToStaff, staffMembers } = useData();

  const statusIcons = {
    'new': <Clock className="h-4 w-4" />,
    'in-progress': <UserCheck className="h-4 w-4" />,
    'resolved': <CheckCircle2 className="h-4 w-4" />,
    'escalated': <AlertCircle className="h-4 w-4" />
  };

  const statusText = {
    'new': 'New',
    'in-progress': 'In Progress',
    'resolved': 'Resolved',
    'escalated': 'Escalated'
  };

  const statusClasses = {
    'new': 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-900/50',
    'in-progress': 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-900/50',
    'resolved': 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-900/50',
    'escalated': 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-900/50'
  };

  const sentimentIcons = {
    positive: <MessageCircleHeart className="h-4 w-4 text-green-500" />,
    neutral: <MessageCircleWarning className="h-4 w-4 text-blue-500" />,
    negative: <MessageCircleX className="h-4 w-4 text-red-500" />
  };

  const typeIcons = {
    'cleaning': <Sparkles className="h-4 w-4" />,
    'complaint': <FileWarning className="h-4 w-4" />,
    'food': <Utensils className="h-4 w-4" />,
    'maintenance': <Wrench className="h-4 w-4" />,
    'amenities': <Home className="h-4 w-4" />,
    'other': <HelpCircle className="h-4 w-4" />
  };
  
  const priorityClasses = {
    'low': 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-900/50',
    'medium': 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-900/50',
    'high': 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-900/50',
    'urgent': 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-900/50'
  };

  const handleAssign = (staffId: string) => {
    assignRequestToStaff(request.id, staffId);
  };
  
  const isAssigned = !!request.assignedTo;
  const isResolved = request.status === 'resolved';

  const getInitials = (name: string) => {
    if (name === 'Anonymous') return 'AN';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <motion.div 
      className="p-4 border rounded-xl mb-3 card-gradient"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <div className="flex items-start gap-3">
        <Avatar className="border border-blue-200/50 dark:border-blue-800/50">
          <AvatarImage src="/placeholder.svg" alt={request.guestName} />
          <AvatarFallback className="bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-800/40 text-blue-800 dark:text-blue-300">{getInitials(request.guestName)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="font-medium flex items-center gap-2">
              {request.guestName}
              {request.roomNumber && (
                <Badge variant="outline" className="text-xs bg-background/50 dark:bg-background/30">
                  Room {request.roomNumber}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Badge className={statusClasses[request.status]}>
                <span className="flex items-center gap-1">
                  {statusIcons[request.status]}
                  {statusText[request.status]}
                </span>
              </Badge>
              <Badge variant="outline" className={priorityClasses[request.priority]}>
                {request.priority.toUpperCase()}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(request.timestamp, { addSuffix: true })}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              {typeIcons[request.type]}
              {request.type.charAt(0).toUpperCase() + request.type.slice(1)}
            </Badge>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              {sentimentIcons[request.sentiment]}
              {request.sentiment.charAt(0).toUpperCase() + request.sentiment.slice(1)}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{request.description}</p>
          <div className="flex items-center justify-between">
            <div>
              {request.assignedTo ? (
                <span className="text-xs flex items-center gap-1 text-muted-foreground">
                  <UserCheck className="h-3.5 w-3.5" />
                  Assigned to: {request.assignedTo}
                </span>
              ) : (
                <span className="text-xs text-muted-foreground">Unassigned</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {isResolved ? (
                <Button variant="outline" size="sm" className="task-completed gap-1">
                  <CheckSquare className="h-3.5 w-3.5" />
                  Completed
                </Button>
              ) : isAssigned ? (
                <Button variant="outline" size="sm" className="task-assigned gap-1">
                  <UserCheck className="h-3.5 w-3.5" />
                  Assigned
                </Button>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="sm">
                      Assign
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-card border border-border">
                    {staffMembers.map(staff => (
                      <DropdownMenuItem key={staff.id} onClick={() => handleAssign(staff.id)}>
                        {staff.name} - {staff.role}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-card border border-border">
                  {request.status !== 'in-progress' && !isResolved && (
                    <DropdownMenuItem onClick={() => updateRequestStatus(request.id, 'in-progress')}>
                      Mark as In Progress
                    </DropdownMenuItem>
                  )}
                  {!isResolved && (
                    <DropdownMenuItem onClick={() => updateRequestStatus(request.id, 'resolved')}>
                      Mark as Resolved
                    </DropdownMenuItem>
                  )}
                  {request.status !== 'escalated' && !isResolved && (
                    <DropdownMenuItem onClick={() => updateRequestStatus(request.id, 'escalated')}>
                      Escalate
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ServiceRequests: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const { serviceRequests } = useData();
  
  const filteredRequests = filter === 'all' 
    ? serviceRequests 
    : serviceRequests.filter(req => req.status === filter);

  const counts = {
    all: serviceRequests.length,
    new: serviceRequests.filter(r => r.status === 'new').length,
    'in-progress': serviceRequests.filter(r => r.status === 'in-progress').length,
    resolved: serviceRequests.filter(r => r.status === 'resolved').length,
    escalated: serviceRequests.filter(r => r.status === 'escalated').length
  };

  return (
    <Card className="shadow-md rounded-xl overflow-hidden border-blue-200/30 dark:border-blue-900/30">
      <CardHeader className="pb-3 bg-gradient-to-r from-blue-50/50 to-blue-100/30 dark:from-blue-900/20 dark:to-blue-800/10">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold flex items-center gap-2 text-blue-950 dark:text-blue-100">
            <ClipboardList className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Service Requests
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full" onValueChange={setFilter}>
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="all">
              All <Badge className="ml-1 bg-primary">{counts.all}</Badge>
            </TabsTrigger>
            <TabsTrigger value="new">
              New <Badge className="ml-1 bg-purple-500">{counts.new}</Badge>
            </TabsTrigger>
            <TabsTrigger value="in-progress">
              In Progress <Badge className="ml-1 bg-amber-500">{counts['in-progress']}</Badge>
            </TabsTrigger>
            <TabsTrigger value="resolved">
              Resolved <Badge className="ml-1 bg-green-500">{counts.resolved}</Badge>
            </TabsTrigger>
            <TabsTrigger value="escalated">
              Escalated <Badge className="ml-1 bg-red-500">{counts.escalated}</Badge>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <div className="max-h-[500px] overflow-y-auto pr-2">
              <AnimatePresence>
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => (
                    <RequestItemCard key={request.id} request={request} />
                  ))
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    No requests found
                  </div>
                )}
              </AnimatePresence>
            </div>
          </TabsContent>

          <TabsContent value="new" className="mt-0">
            <div className="max-h-[500px] overflow-y-auto pr-2">
              <AnimatePresence>
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => (
                    <RequestItemCard key={request.id} request={request} />
                  ))
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    No new requests found
                  </div>
                )}
              </AnimatePresence>
            </div>
          </TabsContent>

          <TabsContent value="in-progress" className="mt-0">
            <div className="max-h-[500px] overflow-y-auto pr-2">
              <AnimatePresence>
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => (
                    <RequestItemCard key={request.id} request={request} />
                  ))
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    No in-progress requests found
                  </div>
                )}
              </AnimatePresence>
            </div>
          </TabsContent>

          <TabsContent value="resolved" className="mt-0">
            <div className="max-h-[500px] overflow-y-auto pr-2">
              <AnimatePresence>
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => (
                    <RequestItemCard key={request.id} request={request} />
                  ))
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    No resolved requests found
                  </div>
                )}
              </AnimatePresence>
            </div>
          </TabsContent>

          <TabsContent value="escalated" className="mt-0">
            <div className="max-h-[500px] overflow-y-auto pr-2">
              <AnimatePresence>
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => (
                    <RequestItemCard key={request.id} request={request} />
                  ))
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    No escalated requests found
                  </div>
                )}
              </AnimatePresence>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ServiceRequests;
