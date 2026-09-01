export type Region = 'Miền Bắc' | 'Miền Nam' | 'Miền Trung' | 'Toàn quốc';
export type Gender = 'Nam' | 'Nữ';
export type ProjectCategory = 
  | 'Quảng cáo TVC'
  | 'Lồng tiếng Phim & Phim hoạt hình'
  | 'Sách nói (Audiobook)'
  | 'Podcast & Radio'
  | 'EdTech & E-Learning'
  | 'Game & Trailer'
  | 'Thuyết minh Tài liệu'
  | 'Tổng đài IVR & Trợ lý ảo AI';

export interface AudioSample {
  id: string;
  title: string;
  category: ProjectCategory;
  durationSec: number;
  tone: string;
  scriptSnippet: string;
  waveformData?: number[];
  audioFrequency?: number; // base frequency for audio synthesis engine
  soundType?: 'warm' | 'deep' | 'energetic' | 'soft' | 'dramatic' | 'cheerful';
}

export interface VoiceTalent {
  id: string;
  name: string;
  verified: boolean;
  avatar: string;
  gender: Gender;
  region: Region;
  title: string;
  bio: string;
  rating: number;
  reviewCount: number;
  completedProjects: number;
  basePricePerMinute: number; // VND
  turnaroundHours: number;
  tags: string[];
  equipment: {
    mic: string;
    soundcard: string;
    room: string;
  };
  sampleAudios: AudioSample[];
  featuredInHero?: boolean;
}

export interface VoiceBrief {
  id: string;
  title: string;
  category: ProjectCategory;
  targetGender: Gender | 'Không yêu cầu';
  targetRegion: Region | 'Không yêu cầu';
  tone: string;
  scriptText: string;
  wordCount: number;
  estimatedDurationMin: number;
  budget: string;
  deadlineDays: number;
  usageType: 'Quảng cáo thương mại' | 'Nội bộ công ty' | 'Mạng xã hội / Youtube' | 'Phát sóng truyền hình / Radio' | 'Sách nói / Giáo dục';
  licenseDuration: '1 năm' | '2 năm' | 'Vĩnh viễn';
  status: 'Open' | 'Reviewing' | 'Closed';
  createdAt: string;
}

export type NavTab = 'explore' | 'how-it-works' | 'enterprise' | 'talents' | 'voice-rights';
