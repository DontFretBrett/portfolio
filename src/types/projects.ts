export interface Project {
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

export interface ProjectMetadata {
  title: string;
  description: string;
  excerpt: string;
  date: string;
  tags?: string[];
  githubUrl?: string;
  liveUrl?: string;
  embedCode?: string;
}

// Legacy type alias for backward compatibility
export type AIProject = Project;
export type AIProjectMetadata = ProjectMetadata; 