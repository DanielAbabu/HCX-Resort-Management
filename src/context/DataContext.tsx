
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  FeedbackItem, 
  ServiceRequest, 
  AiSuggestion,
  SentimentTrend,
  mockFeedback as initialFeedback,
  mockServiceRequests as initialServiceRequests,
  mockAiSuggestions as initialAiSuggestions,
  mockSentimentTrends as initialSentimentTrends,
} from '@/data/mockData';
import { toast } from 'sonner';

// Define staff members
export interface StaffMember {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar?: string;
}

const initialStaffMembers: StaffMember[] = [
  { id: 'staff-1', name: 'Alex Morgan', role: 'Concierge', department: 'Front Desk' },
  { id: 'staff-2', name: 'Taylor Swift', role: 'Housekeeper', department: 'Housekeeping' },
  { id: 'staff-3', name: 'Jordan Chen', role: 'Maintenance', department: 'Facilities' },
  { id: 'staff-4', name: 'Morgan Lee', role: 'Room Service', department: 'Food & Beverage' },
  { id: 'staff-5', name: 'Casey Rodriguez', role: 'Manager', department: 'Management' },
];

interface DataContextType {
  feedback: FeedbackItem[];
  serviceRequests: ServiceRequest[];
  aiSuggestions: AiSuggestion[];
  sentimentTrends: SentimentTrend[];
  staffMembers: StaffMember[];
  
  // Methods for updating data
  markSuggestionHelpful: (id: string) => void;
  markSuggestionUnhelpful: (id: string) => void;
  updateRequestStatus: (id: string, status: 'new' | 'in-progress' | 'resolved' | 'escalated') => void;
  assignRequestToStaff: (requestId: string, staffId: string) => void;
  refreshAiSuggestions: () => void;
  addStaffMember: (staff: StaffMember) => void;
  getAssignedRequestsCount: (staffName: string) => number;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [feedback, setFeedback] = useState<FeedbackItem[]>(initialFeedback);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>(initialServiceRequests);
  const [aiSuggestions, setAiSuggestions] = useState<AiSuggestion[]>(initialAiSuggestions);
  const [sentimentTrends, setSentimentTrends] = useState<SentimentTrend[]>(initialSentimentTrends);
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>(initialStaffMembers);

  // Get assigned requests for each staff member
  const getAssignedRequestsCount = (staffName: string) => {
    return serviceRequests.filter(request => request.assignedTo === staffName).length;
  };

  // Mock API function for adding staff member
  const addStaffMember = (staff: StaffMember) => {
    // In a real app, this would be an API call
    setStaffMembers(prev => [...prev, staff]);
    
    toast.success("Staff member added", {
      description: `${staff.name} has been added as ${staff.role} in ${staff.department}.`
    });
  };

  // Mock API function for suggestion feedback
  const markSuggestionHelpful = (id: string) => {
    // In a real app, this would be an API call
    setTimeout(() => {
      toast.success("Suggestion marked as helpful", {
        description: "Thanks for your feedback! This helps our AI learn."
      });
    }, 300);
  };

  const markSuggestionUnhelpful = (id: string) => {
    // In a real app, this would be an API call
    setTimeout(() => {
      toast.success("Suggestion marked as not helpful", {
        description: "Thanks for your feedback. We'll improve our suggestions."
      });
    }, 300);
  };

  // Mock API function for updating request status
  const updateRequestStatus = (id: string, status: 'new' | 'in-progress' | 'resolved' | 'escalated') => {
    // In a real app, this would be an API call
    setTimeout(() => {
      setServiceRequests(prevRequests => 
        prevRequests.map(request => 
          request.id === id ? { ...request, status } : request
        )
      );
      
      toast.success("Status updated", {
        description: `Request has been marked as ${status}`
      });
    }, 300);
  };

  // Mock API function for assigning request to staff
  const assignRequestToStaff = (requestId: string, staffId: string) => {
    // In a real app, this would be an API call
    const staff = staffMembers.find(s => s.id === staffId);
    if (!staff) return;
    
    setTimeout(() => {
      setServiceRequests(prevRequests => 
        prevRequests.map(request => 
          request.id === requestId ? { ...request, assignedTo: staff.name } : request
        )
      );
      
      toast.success("Request assigned", {
        description: `Request has been assigned to ${staff.name}`
      });
    }, 300);
  };

  // Mock API function for refreshing AI suggestions
  const refreshAiSuggestions = () => {
    // In a real app, this would be an API call
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: "Generating new AI insights...",
        success: "AI suggestions refreshed",
        error: "Failed to generate insights",
      }
    );
  };

  // Simulate real-time updates
  useEffect(() => {
    // Add a new feedback item every 30 seconds
    const feedbackInterval = setInterval(() => {
      const sources = ['chatbot', 'kiosk', 'app'] as const;
      const sentiments = ['positive', 'neutral', 'negative'] as const;
      const names = ["John Smith", "Maria Garcia", "Wei Chen", "Anonymous"];
      
      const messages = [
        "The room service was excellent!",
        "Check-in was a bit slow today.",
        "The AC isn't working properly in my room.",
        "Loved the breakfast options!",
        "The pool area could use more towels."
      ];
      
      const newFeedback: FeedbackItem = {
        id: `fb-${Date.now()}`,
        timestamp: new Date(),
        guestName: names[Math.floor(Math.random() * names.length)],
        message: messages[Math.floor(Math.random() * messages.length)],
        sentiment: sentiments[Math.floor(Math.random() * sentiments.length)],
        source: sources[Math.floor(Math.random() * sources.length)]
      };
      
      setFeedback(prev => [newFeedback, ...prev].slice(0, 30)); // Keep only 30 most recent
      
      // Also update sentiment trends
      setSentimentTrends(prev => {
        const updatedTrends = [...prev];
        const lastTrend = updatedTrends[updatedTrends.length - 1];
        
        // Increment the appropriate sentiment count
        if (newFeedback.sentiment === 'positive') {
          lastTrend.positive += 1;
        } else if (newFeedback.sentiment === 'neutral') {
          lastTrend.neutral += 1;
        } else {
          lastTrend.negative += 1;
        }
        
        return updatedTrends;
      });
      
    }, 30000); // Every 30 seconds
    
    return () => {
      clearInterval(feedbackInterval);
    };
  }, []);

  return (
    <DataContext.Provider 
      value={{
        feedback,
        serviceRequests,
        aiSuggestions,
        sentimentTrends,
        staffMembers,
        markSuggestionHelpful,
        markSuggestionUnhelpful,
        updateRequestStatus,
        assignRequestToStaff,
        refreshAiSuggestions,
        addStaffMember,
        getAssignedRequestsCount
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
