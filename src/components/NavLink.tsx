import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { startViewTransition } from '../utils/viewTransition';

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
  const navigate = useNavigate();
  const location = useLocation();

  const baseClasses = variant === 'header' 
    ? "px-4 py-2 bg-white/10 hover:bg-white/20 dark:bg-gray-800/30 dark:hover:bg-gray-700/40 backdrop-blur-sm rounded-full transition-all duration-200 text-gray-100 hover:text-white dark:text-gray-200 dark:hover:text-white border border-white/10 hover:border-white/20 dark:border-gray-600/30 dark:hover:border-gray-500/40"
    : "px-2 py-1.5 sm:px-3 bg-white/15 hover:bg-white/25 dark:bg-gray-800/30 dark:hover:bg-gray-700/40 backdrop-blur-sm rounded-full transition-all duration-200 text-white hover:text-white dark:text-gray-200 dark:hover:text-white border border-white/20 hover:border-white/30 dark:border-gray-600/30 dark:hover:border-gray-500/40 text-sm font-medium drop-shadow-sm";

  const combinedClassName = className ? `${baseClasses} ${className}` : baseClasses;

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Allow caller to run side effects (analytics, etc.)
    if (onClick) {
      onClick(event);
    }

    // Respect defaultPrevented or modifier keys (open in new tab, etc.)
    if (
      event.defaultPrevented ||
      event.button !== 0 || // Only left click
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return;
    }

    // Avoid redundant navigation (compare pathname, search, and hash)
    if (typeof window !== 'undefined') {
      try {
        const targetUrl = new URL(to, window.location.origin);
        const isSameLocation =
          location.pathname === targetUrl.pathname &&
          location.search === targetUrl.search &&
          location.hash === targetUrl.hash;

        if (isSameLocation) {
          return;
        }
      } catch {
        // If URL parsing fails for any reason, fall through and let navigation proceed.
      }
    }

    event.preventDefault();

    startViewTransition(() => {
      navigate(to);
    });
  };

  return (
    <Link
      to={to}
      onClick={handleClick}
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