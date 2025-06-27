export interface AIProject {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  date: string;
  tags?: string[];
  githubUrl?: string;
  liveUrl?: string;
  embedCode?: string;
  content: string;
}

export interface AIProjectMetadata {
  title: string;
  description: string;
  excerpt: string;
  date: string;
  tags?: string[];
  githubUrl?: string;
  liveUrl?: string;
  embedCode?: string;
} 