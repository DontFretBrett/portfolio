import { Link } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'header' | 'compact';
  shortText?: string;
}

export default function NavLink({ 
  to, 
  children, 
  onClick, 
  className,
  variant = 'header',
  shortText 
}: NavLinkProps) {
  const baseClasses = variant === 'header' 
    ? "px-4 py-2 bg-white/10 hover:bg-white/20 dark:bg-gray-800/30 dark:hover:bg-gray-700/40 backdrop-blur-sm rounded-full transition-all duration-200 text-gray-100 hover:text-white dark:text-gray-200 dark:hover:text-white border border-white/10 hover:border-white/20 dark:border-gray-600/30 dark:hover:border-gray-500/40"
    : "px-2 py-1.5 sm:px-3 bg-white/15 hover:bg-white/25 dark:bg-gray-800/30 dark:hover:bg-gray-700/40 backdrop-blur-sm rounded-full transition-all duration-200 text-white hover:text-white dark:text-gray-200 dark:hover:text-white border border-white/20 hover:border-white/30 dark:border-gray-600/30 dark:hover:border-gray-500/40 text-sm font-medium drop-shadow-sm";

  const combinedClassName = className ? `${baseClasses} ${className}` : baseClasses;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={combinedClassName}
    >
      {variant === 'compact' && shortText ? (
        <>
          <span className="hidden sm:inline">{children}</span>
          <span className="sm:hidden">{shortText}</span>
        </>
      ) : (
        children
      )}
    </Link>
  );
}