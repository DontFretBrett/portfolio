import { Lightbulb } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { trackThemeToggle } from '../utils/analytics';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    toggleTheme();
    trackThemeToggle(newTheme);
  };

  return (
    <button
      onClick={handleThemeToggle}
      className="p-2 rounded-full bg-white/10 hover:bg-white/20 dark:bg-gray-800/50 dark:hover:bg-gray-700/50 backdrop-blur-sm transition-all duration-200 border border-white/10 hover:border-white/20 dark:border-gray-600/50 dark:hover:border-gray-500/50 cursor-pointer"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <Lightbulb 
        size={20} 
        className={`transition-all duration-200 ${
          theme === 'light' 
            ? 'text-yellow-300 hover:text-yellow-200' 
            : 'text-gray-300 hover:text-white'
        }`}
        fill={theme === 'light' ? 'currentColor' : 'none'}
      />
    </button>
  );
} 