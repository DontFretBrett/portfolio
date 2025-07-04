import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface BreadcrumbItem {
  label: string;
  href?: string;
  isLast?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  // Add home as the first item if not already present
  const allItems = items[0]?.href === '/' ? items : [
    { label: 'Home', href: '/' },
    ...items
  ];

  // Generate structured data for breadcrumbs
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": allItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": item.href ? `https://www.brettsanders.com${item.href}` : undefined
    }))
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbStructuredData)}
        </script>
      </Helmet>
      
      <nav 
        className={`flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 ${className}`}
        aria-label="Breadcrumb"
        itemScope 
        itemType="https://schema.org/BreadcrumbList"
      >
        {allItems.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <ChevronRight 
                className="w-4 h-4 text-gray-400 dark:text-gray-500" 
                aria-hidden="true"
              />
            )}
            
            <div 
              itemScope 
              itemType="https://schema.org/ListItem"
              itemProp="itemListElement"
            >
              <meta itemProp="position" content={String(index + 1)} />
              
              {item.href && !item.isLast ? (
                <Link
                  to={item.href}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center"
                  itemProp="item"
                >
                  {index === 0 && (
                    <Home className="w-4 h-4 mr-1" aria-hidden="true" />
                  )}
                  <span itemProp="name">{item.label}</span>
                </Link>
              ) : (
                <span 
                  className={`inline-flex items-center ${
                    item.isLast ? 'text-gray-900 dark:text-gray-100 font-medium' : ''
                  }`}
                  itemProp="name"
                >
                  {index === 0 && (
                    <Home className="w-4 h-4 mr-1" aria-hidden="true" />
                  )}
                  {item.label}
                </span>
              )}
            </div>
          </React.Fragment>
        ))}
      </nav>
    </>
  );
} 