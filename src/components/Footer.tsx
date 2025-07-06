import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full py-6 flex justify-center items-center bg-transparent text-xs text-gray-500 dark:text-gray-400">
      <Link to="/legal" className="hover:underline">
        Legal & Privacy
      </Link>
    </footer>
  );
} 