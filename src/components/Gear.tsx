import { useState, useEffect } from 'react';
import { Star, ShoppingCart, Check, X } from 'lucide-react';
import type { GearItem, GearCategory } from '../types/gear';

interface GearProps {
  items: GearItem[];
  categories: GearCategory[];
  showCategories?: boolean;
  limit?: number;
}

interface ImageModalProps {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}

function ImageModal({ src, alt, isOpen, onClose }: ImageModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div className="relative max-w-4xl max-h-full">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-8 h-8" />
        </button>
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-full object-contain rounded-lg"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
  }
  
  if (hasHalfStar) {
    stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />);
  }
  
  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300 dark:text-gray-600" />);
  }
  
  return <div className="flex items-center gap-1">{stars}</div>;
}

function GearCard({ item, category, onImageClick }: { item: GearItem; category: GearCategory; onImageClick: (src: string, alt: string) => void }) {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* Product Image */}
      {item.image && (
        <div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-contain p-6 transition-transform hover:scale-105 cursor-pointer"
            loading="lazy"
            onClick={() => onImageClick(item.image!, item.name)}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          {/* Subtle overlay for better image presentation */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/5 dark:to-black/5 pointer-events-none"></div>
        </div>
      )}
      
      <div className="p-6">
        {/* Header with category and rating */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl" aria-label={category.name}>{category.icon}</span>
            <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">{category.name}</span>
          </div>
          {item.rating && (
            <div className="flex items-center gap-1">
              <StarRating rating={item.rating} />
              <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">({item.rating})</span>
            </div>
          )}
        </div>

      {/* Product info */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.name}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-3">{item.description}</p>
        <div className="flex items-center gap-4 mb-3">
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{item.price}</span>
          {item.inStock && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-sm font-medium rounded">
              <Check className="w-3 h-3" />
              In Stock
            </span>
          )}
        </div>
      </div>

      {/* Key features */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Key Features</h4>
        <ul className="space-y-1">
          {item.features.slice(0, 3).map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Check className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
          {item.features.length > 3 && (
            <li className="text-sm text-gray-500 dark:text-gray-500 ml-5">
              +{item.features.length - 3} more features
            </li>
          )}
        </ul>
      </div>

      {/* Pros and Cons */}
      {(item.pros || item.cons) && (
        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {item.pros && (
            <div>
              <h4 className="text-sm font-semibold text-green-800 dark:text-green-400 mb-2">Pros</h4>
              <ul className="space-y-1">
                {item.pros.slice(0, 2).map((pro, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Check className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {item.cons && (
            <div>
              <h4 className="text-sm font-semibold text-red-800 dark:text-red-400 mb-2">Cons</h4>
              <ul className="space-y-1">
                {item.cons.slice(0, 2).map((con, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <X className="w-3 h-3 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Tags */}
      {item.tags && item.tags.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {item.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={item.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          aria-label={`Buy ${item.name} on Amazon (affiliate link)`}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Buy on Amazon</span>
        </a>
      </div>

        {/* Affiliate disclaimer */}
        <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            <span className="font-medium">Affiliate Link:</span> I may earn a commission from purchases made through this link at no extra cost to you.
          </p>
        </div>
      </div>
    </article>
  );
}

export default function Gear({ items, categories, showCategories = false, limit }: GearProps) {
  const [modalImage, setModalImage] = useState<{ src: string; alt: string } | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const handleImageClick = (src: string, alt: string) => {
    setModalImage({ src, alt });
  };

  const handleCloseModal = () => {
    setModalImage(null);
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  // Filter items based on selected category
  const filteredItems = selectedCategory 
    ? items.filter(item => item.category === selectedCategory)
    : items;

  const displayItems = limit ? filteredItems.slice(0, limit) : filteredItems;
  
  return (
    <section id="gear" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            My Gear & Recommendations
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Tools and equipment I use daily for software development, productivity, and content creation. 
            These are genuine recommendations from my personal experience.
          </p>
        </div>

        {/* Category overview */}
        {showCategories && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Browse by Category
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`bg-white dark:bg-gray-800 rounded-lg p-4 text-center border transition-all hover:shadow-md ${
                    selectedCategory === category.id
                      ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{category.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{category.description}</p>
                </button>
              ))}
            </div>
            {selectedCategory && (
              <div className="mt-4 text-center">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
                >
                  Clear filter
                </button>
              </div>
            )}
          </div>
        )}

        {/* Results info */}
        {selectedCategory && (
          <div className="mb-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Showing {displayItems.length} {displayItems.length === 1 ? 'item' : 'items'} 
              {selectedCategory && (
                <span> in <span className="font-medium">{categories.find(cat => cat.id === selectedCategory)?.name}</span></span>
              )}
            </p>
          </div>
        )}

        {/* Gear items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayItems.map((item) => {
            const category = categories.find(cat => cat.id === item.category);
            return category ? (
              <GearCard key={item.id} item={item} category={category} onImageClick={handleImageClick} />
            ) : null;
          })}
        </div>

        {/* No results message */}
        {displayItems.length === 0 && selectedCategory && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No gear found in this category yet.
            </p>
            <button
              onClick={() => setSelectedCategory(null)}
              className="mt-4 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
            >
              View all gear
            </button>
          </div>
        )}

        {/* Image Modal */}
        {modalImage && (
          <ImageModal
            src={modalImage.src}
            alt={modalImage.alt}
            isOpen={!!modalImage}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </section>
  );
} 