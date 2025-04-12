
export const colors = {
  // Black and white palette
  monochrome: {
    0: '#FFFFFF',   // Pure white
    100: '#F5F5F5', // Off white
    200: '#E5E5E5', // Light gray
    300: '#D4D4D4', // Medium light gray
    400: '#A3A3A3', // Medium gray
    500: '#737373', // Gray
    600: '#525252', // Medium dark gray
    700: '#404040', // Dark gray
    800: '#262626', // Very dark gray  
    900: '#171717', // Almost black
    1000: '#000000' // Pure black
  },
  // Custom colors
  primary: {
    blue: '#0369a1',    // Primary blue
    purple: '#8B5CF6',  // Vivid purple
    teal: '#0EA5E9',    // Ocean blue
    pink: '#D946EF',    // Magenta pink
    orange: '#F97316',  // Bright orange
  },
  // Status colors (using darker variations)
  status: {
    success: '#15803d', // Darker Green
    warning: '#b45309', // Darker Amber
    error: '#b91c1c',   // Darker Red
    info: '#0369a1',    // Darker Blue
  },
  // Sentiment colors
  sentiment: {
    positive: '#15803d', // Darker Green
    neutral: '#0369a1',  // Darker Blue
    negative: '#b91c1c', // Darker Red
  },
  // Chart colors
  chart: {
    blue: '#0EA5E9',     // Ocean blue
    purple: '#8B5CF6',   // Vivid purple
    pink: '#D946EF',     // Magenta pink
    orange: '#F97316',   // Bright orange
    green: '#4ade80',    // Soft green
    teal: '#2dd4bf',     // Teal
    indigo: '#818cf8',   // Indigo
    yellow: '#fbbf24',   // Yellow
  }
};

export const fonts = {
  body: 'Poppins, sans-serif',
  heading: 'Poppins, sans-serif',
  mono: 'monospace',
};

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
};

export const gradients = {
  blackToGray: 'linear-gradient(to right, #000000, #404040)',
  grayCard: 'linear-gradient(to bottom right, #262626, #000000)',
  blueToTeal: 'linear-gradient(to right, #0369a1, #0EA5E9)',
  purpleToBlue: 'linear-gradient(to right, #8B5CF6, #0EA5E9)',
  orangeToPink: 'linear-gradient(to right, #F97316, #D946EF)',
};
