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
    id: "video-13",
    title: "Zero Point",
    description: "An atmospheric electronic track with immersive AI-generated visuals exploring themes of transcendence and connection.",
    youtubeId: "BE9pfwX88ns",
    publishedDate: "2025-11-01",
    tags: ["Electronic"],
    genre: "Electronic",
    duration: "3:34"
  },
  {
    id: "video-12",
    title: "Chasing Sounds",
    description: "An electronic track featuring dynamic AI-generated visuals and innovative sound design.",
    youtubeId: "9rTNfSCAKvA",
    publishedDate: "2025-11-01",
    tags: ["Electronic"],
    genre: "Electronic",
    duration: "4:36"
  },
  {
    id: "video-11",
    title: "Prism Veins",
    description: "An electronic track presented through creative AI-generated visual storytelling and vivid imagery.",
    youtubeId: "i0Z1cxPXxlQ",
    publishedDate: "2025-10-22",
    tags: ["Electronic"],
    genre: "Electronic",
    duration: "3:36"
  },
  {
    id: "video-10",
    title: "Heir to the Hush",
    description: "An atmospheric electronic track with AI-generated visuals exploring themes of silence and introspection.",
    youtubeId: "YkSKywkKmsw",
    publishedDate: "2025-10-21",
    tags: ["Electronic"],
    genre: "Electronic",
    duration: "2:53"
  },
  {
    id: "video-9",
    title: "State Of Mind",
    description: "An electronic track featuring innovative AI-powered video creation and dynamic visual effects.",
    youtubeId: "uy26ioboy-E",
    publishedDate: "2025-10-13",
    tags: ["Electronic"],
    genre: "Electronic",
    duration: "4:49"
  },
  {
    id: "video-8",
    title: "Secret Name",
    description: "An atmospheric electronic track exploring themes of desire and connection through pulsing beats and vivid imagery, brought to life with AI-generated visuals.",
    youtubeId: "1d9rKiSgVg4",
    publishedDate: "2025-10-07",
    tags: ["Electronic"],
    genre: "Electronic",
    duration: "3:14"
  },
  {
    id: "video-6",
    title: "Right Now",
    description: "A pop track brought to life through innovative AI-powered video creation and visual effects.",
    youtubeId: "KTHqBUERSvk",
    publishedDate: "2025-08-04",
    tags: ["Pop"],
    genre: "Pop",
    duration: "3:15"
  },
  {
    id: "video-7",
    title: "Horizon Sequence (Instrumental)",
    description: "An electronic instrumental track presented through an AI-generated music video.",
    youtubeId: "YL3gm4QToo4",
    publishedDate: "2025-09-17",
    tags: ["Electronic"],
    genre: "Electronic"
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