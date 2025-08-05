export interface MusicVideo {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  publishedDate: string;
  tags: string[];
  genre: string;
  duration?: string;
  thumbnail?: string;
}

export const musicVideos: MusicVideo[] = [
  {
    id: "video-5",
    title: "My Vices (Unplugged)",
    description: "An intimate acoustic arrangement featuring creative AI-generated visual storytelling and cinematography.",
    youtubeId: "tGBDga2NGko",
    publishedDate: "2025-08-04",
    tags: ["Indie", "Alternative", "Acoustic"],
    genre: "Indie",
    duration: "3:28"
  },
  {
    id: "video-6",
    title: "Right Now",
    description: "An electronic track brought to life through innovative AI-powered video creation and visual effects.",
    youtubeId: "KTHqBUERSvk",
    publishedDate: "2025-08-04",
    tags: ["Electronic"],
    genre: "Electronic",
    duration: "3:15"
  },
  {
    id: "video-1",
    title: "Nothing Ever Changes",
    description: "An experimental electronic track presented through an AI-generated music video.",
    youtubeId: "aSxjm5d1gM4",
    publishedDate: "2025-01-15",
    tags: ["Electronic"],
    genre: "Electronic",
    duration: "3:45"
  },
  {
    id: "video-2", 
    title: "Stutter",
    description: "An energetic electronic track with dynamic visuals created using artificial intelligence.",
    youtubeId: "HY3-0SoWLjU",
    publishedDate: "2025-01-14",
    tags: ["Electronic"],
    genre: "Electronic",
    duration: "4:12"
  },
  {
    id: "video-3",
    title: "Slippin", 
    description: "An indie track featuring creative AI-generated visual storytelling and cinematography.",
    youtubeId: "lb1mGIQedi4",
    publishedDate: "2025-01-13",
    tags: ["Indie", "Alternative"],
    genre: "Indie",
    duration: "2:58"
  },
  {
    id: "video-4",
    title: "Not For You",
    description: "A pop track brought to life through innovative AI-powered video creation and visual effects.",
    youtubeId: "TJA3JRXjD_k", 
    publishedDate: "2025-01-12",
    tags: ["Pop", "Contemporary"],
    genre: "Pop",
    duration: "3:22"
  }
];

export const musicCategories = [
  "All",
  "Electronic", 
  "Indie",
  "Pop"
];