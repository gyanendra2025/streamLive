// API response types
export const API_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

// Friend request status
export const FRIEND_REQUEST_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
};

// Call states
export const CALL_STATE = {
  IDLE: 'idle',
  RINGING: 'ringing',
  JOINED: 'joined',
  LEFT: 'left',
  ERROR: 'error',
};

// Toast messages
export const TOAST_MESSAGES = {
  // Auth
  SIGNUP_SUCCESS: 'Account created successfully!',
  LOGIN_SUCCESS: 'Welcome back!',
  LOGOUT_SUCCESS: 'Logged out successfully',
  
  // Onboarding
  ONBOARDING_SUCCESS: 'Profile completed successfully!',
  AVATAR_GENERATED: 'Random profile picture generated!',
  
  // Friends
  FRIEND_REQUEST_SENT: 'Friend request sent!',
  FRIEND_REQUEST_ACCEPTED: 'Friend request accepted!',
  
  // Chat
  CALL_LINK_SENT: 'Video call link sent successfully!',
  
  // Errors
  GENERIC_ERROR: 'Something went wrong. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  AUTH_ERROR: 'Authentication failed. Please login again.',
};

// Validation
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 6,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  MIN_BIO_LENGTH: 10,
  MAX_BIO_LENGTH: 500,
};

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  ONBOARDING: '/onboarding',
  FRIENDS: '/friends',
  NOTIFICATIONS: '/notifications',
  CHAT: (id) => `/chat/${id}`,
  CALL: (id) => `/call/${id}`,
};
