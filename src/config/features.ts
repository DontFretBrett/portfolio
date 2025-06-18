/**
 * Feature Flags Configuration
 * 
 * Simple boolean flags to enable/disable features.
 * Requires redeploy to take effect.
 */

export const FEATURE_FLAGS = {
  // Chatbot feature - set to false to completely disable the chatbot
  ENABLE_CHATBOT: true,
} as const;

export default FEATURE_FLAGS; 