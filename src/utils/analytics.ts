import { logEvent } from '../config/analytics';

// Navigation Events
export const trackNavigation = (destination: string, source?: string) => {
  logEvent('Navigation', 'Click', `${source || 'Unknown'} to ${destination}`);
};

// Theme Toggle Events
export const trackThemeToggle = (newTheme: 'light' | 'dark') => {
  logEvent('Theme', 'Toggle', newTheme);
};

// Social Link Events
export const trackSocialClick = (platform: string) => {
  logEvent('Social', 'Click', platform);
};

// Blog Interaction Events
export const trackBlogInteraction = (action: 'View' | 'Tag Click' | 'Comment', detail: string) => {
  logEvent('Blog', action, detail);
};

// Gear Page Events
export const trackGearInteraction = (action: 'Category Click' | 'Image View', detail: string) => {
  logEvent('Gear', action, detail);
};

// Chat Events
export const trackChatInteraction = (action: 'Open' | 'Close' | 'Message') => {
  logEvent('Chat', action);
};

// Back to Top Events
export const trackBackToTop = () => {
  logEvent('Navigation', 'Back to Top');
};

// Error Events
export const trackError = (errorType: string, errorMessage: string) => {
  logEvent('Error', errorType, errorMessage);
}; 