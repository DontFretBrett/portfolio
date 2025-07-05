export interface GearItem {
  id: string;
  name: string;
  description: string;
  category: string;
  price: string;
  affiliateUrl: string;
  productUrl?: string;
  image?: string;
  features: string[];
  specifications?: {
    [key: string]: string;
  };
  pros?: string[];
  cons?: string[];
  rating?: number;
  dateAdded: string;
  tags?: string[];
  inStock?: boolean;
  discontinued?: boolean;
}

export interface GearCategory {
  id: string;
  name: string;
  description: string;
  icon?: string;
} 