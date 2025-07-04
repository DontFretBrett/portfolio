/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

// Branded type for theme safety
declare const __themeBrand: unique symbol;
type Theme = ('light' | 'dark') & { [__themeBrand]: never };

// Result type for error handling
type ThemeResult<T> = 
  | { success: true; data: T }
  | { success: false; error: string };

interface ThemeContextType {
  readonly theme: Theme;
  readonly toggleTheme: () => void;
  readonly isSystemDark: boolean;
  readonly setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider. Make sure your component is wrapped with ThemeProvider.');
  }
  return context;
};

interface ThemeProviderProps {
  readonly children: ReactNode;
  readonly defaultTheme?: Theme;
}

// Type-safe theme creation
function createTheme(value: string): ThemeResult<Theme> {
  if (value === 'light' || value === 'dark') {
    return { success: true, data: value as Theme };
  }
  return { success: false, error: `Invalid theme value: ${value}` };
}

// Enhanced function to get initial theme with better error handling
const getInitialTheme = (defaultTheme: Theme = 'light' as Theme): Theme => {
  if (typeof window === 'undefined') {
    return defaultTheme;
  }

  try {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      const themeResult = createTheme(savedTheme);
      if (themeResult.success) {
        return themeResult.data;
      }
      console.warn(`Invalid theme in localStorage: ${savedTheme}`);
    }
    
    // If no saved theme, check OS preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    if (mediaQuery.matches) {
      return 'dark' as Theme;
    }
  } catch (error) {
    console.warn('Failed to get initial theme:', error);
  }
  
  return defaultTheme;
};

// Enhanced media query listener with proper cleanup
const useSystemTheme = () => {
  const [isSystemDark, setIsSystemDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setIsSystemDark(e.matches);
    };

    // Use addEventListener for better browser support
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return isSystemDark;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  defaultTheme = 'light' as Theme 
}) => {
  const [theme, setThemeState] = useState<Theme>(() => getInitialTheme(defaultTheme));
  const isSystemDark = useSystemTheme();

  // Type-safe theme setter with validation
  const setTheme = React.useCallback((newTheme: Theme): void => {
    const themeResult = createTheme(newTheme);
    if (!themeResult.success) {
      console.error('Invalid theme:', themeResult.error);
      return;
    }
    setThemeState(themeResult.data);
  }, []);

  useEffect(() => {
    // Apply theme to document immediately
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Save to localStorage with error handling
    try {
      localStorage.setItem('theme', theme);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
  }, [theme]);

  const toggleTheme = React.useCallback((): void => {
    const newTheme = theme === 'light' ? ('dark' as Theme) : ('light' as Theme);
    setTheme(newTheme);
  }, [theme, setTheme]);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue: ThemeContextType = React.useMemo(() => ({
    theme,
    toggleTheme,
    isSystemDark,
    setTheme,
  }), [theme, toggleTheme, isSystemDark, setTheme]);

  // React 19 simplified provider syntax - use Context directly
  return (
    <ThemeContext value={contextValue}>
      {children}
    </ThemeContext>
  );
}; 