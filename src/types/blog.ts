export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readingTime: number;
  tags?: string[];
}

export interface BlogMetadata {
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
} 