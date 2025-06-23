export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readingTime: number;
  tags?: string[];
  description?: string;
  keywords?: string;
}

export interface BlogMetadata {
  title: string;
  date: string;
  excerpt?: string;
  description?: string;
  keywords?: string;
  tags?: string[];
} 