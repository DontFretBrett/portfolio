# Design Document

## Overview

This feature modifies the existing theme system to default to dark mode when no system preference is available, while maintaining all existing functionality for system preference detection and manual theme selection. The change is minimal and focused on the theme initialization logic within the existing ThemeContext.

## Architecture

The current theme system uses a React Context (`ThemeContext`) with a provider that manages theme state and persistence. The architecture will remain the same, with only the default theme logic being modified.

### Current Flow
1. Check localStorage for saved theme preference
2. If no saved preference, check system preference via `prefers-color-scheme`
3. If no system preference, default to light mode
4. Apply theme to document and save to localStorage

### New Flow
1. Check localStorage for saved theme preference
2. If no saved preference, check system preference via `prefers-color-scheme`
3. If no system preference, default to **dark mode** (changed from light)
4. Apply theme to document and save to localStorage

## Components and Interfaces

### ThemeContext Changes

The `getInitialTheme` function in `src/contexts/ThemeContext.tsx` needs modification:

**Current Logic:**
```typescript
const getInitialTheme = (defaultTheme: Theme = 'light' as Theme): Theme => {
  // ... localStorage and system preference checks
  return defaultTheme; // Currently defaults to 'light'
};
```

**New Logic:**
```typescript
const getInitialTheme = (defaultTheme: Theme = 'dark' as Theme): Theme => {
  // ... same localStorage and system preference checks
  return defaultTheme; // Now defaults to 'dark'
};
```

### ThemeProvider Changes

The `ThemeProvider` component's default prop needs to be updated:

**Current:**
```typescript
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  defaultTheme = 'light' as Theme 
}) => {
```

**New:**
```typescript
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  defaultTheme = 'dark' as Theme 
}) => {
```

### No Changes Required

- **ThemeToggle Component**: No changes needed - it already works with any theme
- **App Component**: No changes needed - it doesn't specify a defaultTheme prop
- **CSS Classes**: No changes needed - Tailwind's dark mode classes already handle both themes
- **Analytics**: No changes needed - theme toggle tracking remains the same

## Data Models

No new data models are required. The existing `Theme` branded type remains unchanged:

```typescript
type Theme = ('light' | 'dark') & { [__themeBrand]: never };
```

## Error Handling

The existing error handling remains robust and unchanged:

- **localStorage Errors**: Already handled with try-catch and fallback to default
- **Invalid Theme Values**: Already validated with `createTheme` function
- **Media Query Errors**: Already handled with try-catch in `getInitialTheme`
- **SSR Compatibility**: Already handled with `typeof window` checks

## Testing Strategy

### Unit Tests
1. **Theme Initialization Tests**
   - Test default theme when no localStorage or system preference exists
   - Test system preference override of default
   - Test localStorage preference override of both default and system preference

2. **Regression Tests**
   - Verify existing functionality still works (system preference detection, manual toggle, persistence)
   - Verify no FOUC (Flash of Unstyled Content) occurs
   - Verify accessibility features remain intact

### Integration Tests
1. **Browser Compatibility**
   - Test in browsers with and without `prefers-color-scheme` support
   - Test localStorage availability and restrictions

2. **User Journey Tests**
   - First-time visitor with no system preference → should see dark mode
   - First-time visitor with light system preference → should see light mode
   - First-time visitor with dark system preference → should see dark mode
   - Returning visitor with saved preference → should see saved preference

### Manual Testing Scenarios
1. **Clear browser data** → Visit site → Should default to dark mode
2. **Set system to light mode** → Clear localStorage → Visit site → Should show light mode
3. **Set system to dark mode** → Clear localStorage → Visit site → Should show dark mode
4. **Manually toggle theme** → Refresh page → Should maintain manual selection

## Implementation Notes

### Minimal Change Approach
This design intentionally keeps changes minimal to reduce risk:
- Only two lines of code need modification
- No new functions or components required
- No changes to the public API or component interfaces
- No changes to styling or CSS

### Backward Compatibility
- Existing users with saved theme preferences will see no change
- The ThemeProvider still accepts a `defaultTheme` prop for flexibility
- All existing functionality (toggle, persistence, system preference) remains unchanged

### Performance Impact
- Zero performance impact - no additional code or logic
- Same initialization time and memory usage
- No additional network requests or computations