import { logEvent } from '../config/analytics';

// Navigation Events
export const trackNavigation = (destination: string, source?: string) => {
  logEvent('page_navigation', {
    destination,
    source: source || 'unknown'
  });
};

// Theme Toggle Events
export const trackThemeToggle = (newTheme: 'light' | 'dark') => {
  logEvent('theme_change', {
    theme: newTheme
  });
};

// Social Link Events
export const trackSocialClick = (platform: string) => {
  logEvent('social_click', {
    platform
  });
};

// Blog Interaction Events
export const trackBlogInteraction = (action: 'view' | 'tag_click' | 'comment', detail: string) => {
  logEvent('blog_interaction', {
    action,
    detail
  });
};

// Gear Page Events
export const trackGearInteraction = (action: 'category_view' | 'image_view', detail: string) => {
  logEvent('gear_interaction', {
    action,
    detail
  });
};

// Chat Events
export const trackChatInteraction = (action: 'open' | 'close' | 'message') => {
  logEvent('chat_interaction', {
    action
  });
};

// Back to Top Events
export const trackBackToTop = () => {
  logEvent('back_to_top_click');
};

// Error Events
export const trackError = (errorType: string, errorMessage: string) => {
  logEvent('error_occurred', {
    error_type: errorType,
    error_message: errorMessage
  });
}; 