
export type Sentiment = 'positive' | 'neutral' | 'negative';
export type RequestStatus = 'new' | 'in-progress' | 'resolved' | 'escalated';
export type RequestType = 'cleaning' | 'complaint' | 'food' | 'maintenance' | 'amenities' | 'other';
export type FeedbackSource = 'chatbot' | 'kiosk' | 'app';

export interface FeedbackItem {
  id: string;
  timestamp: Date;
  guestName: string | 'Anonymous';
  message: string;
  sentiment: Sentiment;
  source: FeedbackSource;
  location?: string;
}

export interface ServiceRequest {
  id: string;
  timestamp: Date;
  guestName: string | 'Anonymous';
  type: RequestType;
  description: string;
  sentiment: Sentiment;
  status: RequestStatus;
  roomNumber?: string;
  assignedTo?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export interface AiSuggestion {
  id: string;
  suggestion: string;
  category: string;
  relatedFeedbackCount: number;
  generatedAt: Date;
  impact: 'low' | 'medium' | 'high';
}

export interface SentimentTrend {
  timeLabel: string;
  positive: number;
  neutral: number;
  negative: number;
}

// Generate mock feedback data
const generateFeedback = (): FeedbackItem[] => {
  const sentiments: Sentiment[] = ['positive', 'neutral', 'negative'];
  const sources: FeedbackSource[] = ['chatbot', 'kiosk', 'app'];
  const locations = ['Lobby', 'Restaurant', 'Pool', 'Room', 'Gym', 'Spa', null];
  const positiveMessages = [
    "The staff was incredibly helpful and friendly!",
    "Room service was quick and the food was delicious!",
    "Our room was spotless and comfortable. Great stay!",
    "The check-in process was seamless, thank you!",
    "Loved the pool area, very clean and relaxing.",
    "The concierge gave excellent restaurant recommendations.",
    "WiFi worked perfectly throughout my stay.",
    "The bed was so comfortable, I slept like a baby!"
  ];
  const neutralMessages = [
    "Room was okay, but a bit smaller than I expected.",
    "Breakfast was standard, nothing special.",
    "Check-in was a bit slow, but staff was nice.",
    "The gym has basic equipment, works for a quick workout.",
    "Shower pressure was inconsistent but manageable.",
    "Room service menu was limited but food quality was good.",
    "Temperature control in the room was a bit tricky to figure out."
  ];
  const negativeMessages = [
    "The WiFi connection kept dropping in our room.",
    "Our room wasn't properly cleaned when we arrived.",
    "The air conditioning wasn't working properly.",
    "We waited over 30 minutes for room service.",
    "The staff at the front desk was very unfriendly.",
    "There was a lot of noise from the street all night.",
    "The shower in our bathroom had very little water pressure.",
    "Found hair in the bathtub upon check-in. Gross!"
  ];

  const guestNames = [
    "John Smith", "Maria Garcia", "Wei Chen", "Priya Patel", 
    "Michael Johnson", "Sofia Rodriguez", "Anonymous", "Anonymous",
    "David Kim", "Fatima Ahmed", "Anonymous", "James Wilson"
  ];

  const feedback: FeedbackItem[] = [];
  
  // Create more positive than negative feedback
  for (let i = 0; i < 20; i++) {
    const sentimentType: Sentiment = Math.random() < 0.7 
      ? (Math.random() < 0.6 ? 'positive' : 'neutral')
      : 'negative';
    
    let message = '';
    switch (sentimentType) {
      case 'positive':
        message = positiveMessages[Math.floor(Math.random() * positiveMessages.length)];
        break;
      case 'neutral':
        message = neutralMessages[Math.floor(Math.random() * neutralMessages.length)];
        break;
      case 'negative':
        message = negativeMessages[Math.floor(Math.random() * negativeMessages.length)];
        break;
    }

    const hoursAgo = Math.floor(Math.random() * 24);
    const minutesAgo = Math.floor(Math.random() * 60);
    const timestamp = new Date();
    timestamp.setHours(timestamp.getHours() - hoursAgo);
    timestamp.setMinutes(timestamp.getMinutes() - minutesAgo);

    feedback.push({
      id: `fb-${i}`,
      timestamp,
      guestName: guestNames[Math.floor(Math.random() * guestNames.length)],
      message,
      sentiment: sentimentType,
      source: sources[Math.floor(Math.random() * sources.length)],
      location: locations[Math.floor(Math.random() * locations.length)]
    });
  }

  // Sort by timestamp descending (newest first)
  return feedback.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

// Generate mock service requests
const generateServiceRequests = (): ServiceRequest[] => {
  const requestTypes: RequestType[] = ['cleaning', 'complaint', 'food', 'maintenance', 'amenities', 'other'];
  const statuses: RequestStatus[] = ['new', 'in-progress', 'resolved', 'escalated'];
  const priorities = ['low', 'medium', 'high', 'urgent'];
  const roomNumbers = ['101', '203', '307', '418', '520', '604', '712', '825', '916', '1004'];
  const staff = ['Alex M.', 'Taylor S.', 'Jordan C.', 'Morgan L.', 'Casey R.', null, null];
  
  const cleaningRequests = [
    "Need extra towels please.",
    "Room needs to be cleaned, please.",
    "Spill on carpet needs cleaning.",
    "Please empty trash bins.",
    "Need bed sheets changed."
  ];
  
  const complaintsRequests = [
    "Noise from neighboring room is too loud.",
    "Room temperature is not adjusting properly.",
    "TV remote not working.",
    "Found hair in the bathtub.",
    "Pillows are too hard/uncomfortable."
  ];
  
  const foodRequests = [
    "Would like to order room service, menu missing.",
    "Breakfast order is incomplete.",
    "Food arrived cold.",
    "Dietary restrictions not accommodated.",
    "Need more coffee pods for the machine."
  ];
  
  const maintenanceRequests = [
    "Sink is leaking water.",
    "Light bulb needs replacement.",
    "Air conditioning not working properly.",
    "Shower drain is clogged.",
    "Toilet keeps running."
  ];
  
  const amenitiesRequests = [
    "Need more shampoo and conditioner.",
    "Iron and ironing board requested.",
    "Extra blanket needed.",
    "Baby crib requested.",
    "Phone charger needed."
  ];
  
  const otherRequests = [
    "Late checkout request.",
    "Need directions to local attractions.",
    "Lost and found inquiry.",
    "Wake-up call request.",
    "Need assistance with luggage."
  ];

  const guestNames = [
    "John Smith", "Maria Garcia", "Wei Chen", "Priya Patel", 
    "Michael Johnson", "Sofia Rodriguez", "Anonymous", "Anonymous",
    "David Kim", "Fatima Ahmed", "Anonymous", "James Wilson"
  ];

  const requests: ServiceRequest[] = [];
  
  for (let i = 0; i < 15; i++) {
    const type: RequestType = requestTypes[Math.floor(Math.random() * requestTypes.length)];
    let description = '';
    
    switch (type) {
      case 'cleaning':
        description = cleaningRequests[Math.floor(Math.random() * cleaningRequests.length)];
        break;
      case 'complaint':
        description = complaintsRequests[Math.floor(Math.random() * complaintsRequests.length)];
        break;
      case 'food':
        description = foodRequests[Math.floor(Math.random() * foodRequests.length)];
        break;
      case 'maintenance':
        description = maintenanceRequests[Math.floor(Math.random() * maintenanceRequests.length)];
        break;
      case 'amenities':
        description = amenitiesRequests[Math.floor(Math.random() * amenitiesRequests.length)];
        break;
      case 'other':
        description = otherRequests[Math.floor(Math.random() * otherRequests.length)];
        break;
    }

    const hoursAgo = Math.floor(Math.random() * 48);
    const minutesAgo = Math.floor(Math.random() * 60);
    const timestamp = new Date();
    timestamp.setHours(timestamp.getHours() - hoursAgo);
    timestamp.setMinutes(timestamp.getMinutes() - minutesAgo);

    // Determine sentiment based on request content
    let sentiment: Sentiment = 'neutral';
    if (type === 'complaint' || description.includes('not working') || description.includes('missing')) {
      sentiment = Math.random() < 0.7 ? 'negative' : 'neutral';
    } else if (description.includes('please') || type === 'amenities') {
      sentiment = Math.random() < 0.7 ? 'neutral' : 'positive';
    }

    // Determine priority based on sentiment and request type
    let priority: 'low' | 'medium' | 'high' | 'urgent' = 'medium';
    if (sentiment === 'negative' || type === 'complaint') {
      priority = Math.random() < 0.6 ? 'high' : 'urgent';
    } else if (type === 'maintenance' || type === 'food') {
      priority = Math.random() < 0.7 ? 'medium' : 'high';
    } else {
      priority = Math.random() < 0.7 ? 'low' : 'medium';
    }

    // Determine status (weighted to have more new/in-progress than resolved/escalated)
    let status: RequestStatus;
    const statusRand = Math.random();
    if (statusRand < 0.4) {
      status = 'new';
    } else if (statusRand < 0.7) {
      status = 'in-progress';
    } else if (statusRand < 0.9) {
      status = 'resolved';
    } else {
      status = 'escalated';
    }

    requests.push({
      id: `req-${i}`,
      timestamp,
      guestName: guestNames[Math.floor(Math.random() * guestNames.length)],
      type,
      description,
      sentiment,
      status,
      roomNumber: roomNumbers[Math.floor(Math.random() * roomNumbers.length)],
      assignedTo: status === 'in-progress' || status === 'resolved' ? staff[Math.floor(Math.random() * staff.length)] : undefined,
      priority
    });
  }

  // Sort by priority (urgent first) and then by timestamp (newest first)
  return requests.sort((a, b) => {
    const priorityOrder = { 'urgent': 0, 'high': 1, 'medium': 2, 'low': 3 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return b.timestamp.getTime() - a.timestamp.getTime();
  });
};

// Generate AI suggestions
const generateAiSuggestions = (): AiSuggestion[] => {
  const suggestions = [
    {
      suggestion: "Improve Wi-Fi coverage on 3rd floor",
      category: "Facilities",
      impact: "high"
    },
    {
      suggestion: "Train staff on faster check-in procedures",
      category: "Training",
      impact: "medium"
    },
    {
      suggestion: "Increase room service staff during peak hours (6-8 PM)",
      category: "Staffing",
      impact: "high"
    },
    {
      suggestion: "Add more vegetarian options to breakfast menu",
      category: "Food & Beverage",
      impact: "medium"
    },
    {
      suggestion: "Replace shower heads in west wing rooms",
      category: "Maintenance",
      impact: "medium"
    },
    {
      suggestion: "Consider upgrading to smart thermostats for better room temperature control",
      category: "Amenities",
      impact: "high"
    },
    {
      suggestion: "Implement daily cleaning checks for common areas",
      category: "Housekeeping",
      impact: "medium"
    },
    {
      suggestion: "Add more charging stations in lobby area",
      category: "Facilities",
      impact: "low"
    }
  ];

  const result: AiSuggestion[] = [];
  
  // Generate one suggestion per day for the past week
  for (let i = 0; i < suggestions.length; i++) {
    const daysAgo = i % suggestions.length;
    const generatedAt = new Date();
    generatedAt.setDate(generatedAt.getDate() - daysAgo);
    
    result.push({
      id: `sug-${i}`,
      suggestion: suggestions[i].suggestion,
      category: suggestions[i].category,
      relatedFeedbackCount: Math.floor(Math.random() * 10) + 1,
      generatedAt,
      impact: suggestions[i].impact as 'low' | 'medium' | 'high'
    });
  }

  // Sort by generatedAt (newest first)
  return result.sort((a, b) => b.generatedAt.getTime() - a.generatedAt.getTime());
};

// Generate sentiment trend data
export const generateSentimentTrends = (): SentimentTrend[] => {
  const result: SentimentTrend[] = [];
  
  // Generate hourly data for the past 24 hours
  for (let i = 23; i >= 0; i--) {
    const hour = new Date().getHours() - i;
    const formattedHour = `${(hour >= 0 ? hour : 24 + hour) % 24}:00`;
    
    // More positive than negative, with some variation
    const positive = Math.floor(Math.random() * 5) + 3;
    const neutral = Math.floor(Math.random() * 3) + 1;
    const negative = Math.floor(Math.random() * 3);
    
    result.push({
      timeLabel: formattedHour,
      positive,
      neutral,
      negative
    });
  }
  
  return result;
};

// Export the mock data
export const mockFeedback = generateFeedback();
export const mockServiceRequests = generateServiceRequests();
export const mockAiSuggestions = generateAiSuggestions();
export const mockSentimentTrends = generateSentimentTrends();
