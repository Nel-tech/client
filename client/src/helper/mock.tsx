import {
  Search,
  Share2,
  Coins,
  Smartphone,
  Link,
  Users,
  Volume2,
  Music,
  User,
  BarChart3,
} from 'lucide-react';

import {  Fan } from './type';
// lib/config/artist-tiers.ts (or constants/tiers.ts)

export enum ArtistTier {
  BASIC = 'BASIC',
  PRO = 'PRO',
  ULTIMATE = 'ULTIMATE',
}

export const TIER_FEATURES: Record<
  ArtistTier,
  {
    canDelete: boolean;
    canEditUrl: boolean;
    maxFileSize: number;
    maxTracks: number;
  }
> = {
  [ArtistTier.BASIC]: {
    canDelete: false,
    canEditUrl: false,
    maxFileSize: 50,
    maxTracks: 5,
  },
  [ArtistTier.PRO]: {
    canDelete: true,
    canEditUrl: true,
    maxFileSize: 50,
    maxTracks: 20,
  },
  [ArtistTier.ULTIMATE]: {
    canDelete: true,
    canEditUrl: true,
    maxFileSize: 50,
    maxTracks: -1, // unlimited
  },
};


export const TIER_LEVELS: Record<ArtistTier, number> = {
  [ArtistTier.BASIC]: 1,
  [ArtistTier.PRO]: 2,
  [ArtistTier.ULTIMATE]: 3,
};

export const TIER_EDIT_PERMISSIONS = {
  BASIC: ['title', 'description', 'thumbnail'],
  PRO: ['title', 'description', 'thumbnail', 'url'],
  ULTIMATE: ['title', 'description', 'thumbnail', 'url'],
} as const;

export type EditableTrackField = 'title' | 'description' | 'thumbnail' | 'url';
export const artistSteps = [
  {
    number: '01',
    icon: Link,
    headline: 'Link Your Music',
    description: 'Easily add your tracks from YouTube. No uploads needed.',
  },
  {
    number: '02',
    icon: Users,
    headline: 'Activate Your Fanbase',
    description:
      'Your fans get unique links to share your music, directly boosting your views.',
  },
  {
    number: '03',
    icon: BarChart3,
    headline: 'Track Your Growth',
    description:
      'Our dashboard shows you exactly which fans are your top promoters.',
  },
];

export const fanSteps = [
  {
    number: '01',
    icon: Search,
    headline: 'Discover New Music',
    description:
      'Explore a library of tracks from talented upcoming artists from around the world.',
  },
  {
    number: '02',
    icon: Share2,
    headline: 'Share & Promote',
    description:
      'Get your unique link for any track you love. Share it with your friends on social media, WhatsApp, or anywhere else.',
  },
  {
    number: '03',
    icon: Coins,
    headline: 'Earn Coins',
    description:
      'When someone listens to the music you shared for at least 30 seconds, you earn Tropiqk Coins directly in your account.',
  },
  {
    number: '04',
    icon: Smartphone,
    headline: 'Get Free Airtime',
    description:
      "Your coins are real rewards. Redeem your Tropiqk Coins for mobile airtime on major networks. It's that simple.",
  },
];

export const PricingFeatures = {
  basic: [
    { text: '5 Active Tracks', included: true },
    { text: 'Top 5 Promoters Leaderboard', included: true },
    { text: 'Full Promoter Analytics', included: false },
    { text: 'Per-Track Promoter Analytics', included: false },
    { text: "'Double Coins' Campaigns", included: false },
    { text: 'Priority Support', included: false },
  ],
  pro: [
    { text: '50 Active Tracks', included: true },
    { text: 'Full Promoter Analytics', included: true },
    { text: 'Per-Track Promoter Analytics', included: true },
    { text: "'Double Coins' Campaigns", included: false },
    { text: 'Priority Support', included: false },
  ],
  ultimate: [
    { text: 'Unlimited Active Tracks', included: true },
    { text: 'Full Promoter Analytics', included: true },
    { text: 'Per-Track Promoter Analytics', included: true },
    { text: "'Double Coins' Campaigns (3/month)", included: true },
    { text: 'Priority Support', included: true },
  ],
};

export const FAQ = [
  // --- Questions for Artists ---
  {
    id: 'artist-1',
    category: 'Artist',
    question: 'How do I get my music on Tropiqk?',
    answer:
      "You don't upload music files directly! Simply create an artist profile and add the public links to your tracks from YouTube. We handle the rest, embedding the player so every listen on Tropiqk counts as a real stream on your YouTube channel.",
  },
  {
    id: 'artist-2',
    category: 'Artist',
    question: 'How do I know which fans are promoting me?',
    answer:
      'The Artist Dashboard is your command center. Even on our free BASIC plan, you can see a leaderboard of your Top 5 promoters. By upgrading to a PRO plan, you unlock the full list and can see which fans are promoting specific tracks.',
  },
  {
    id: 'artist-3',
    category: 'Artist',
    question: 'Are the streams real? How does this help me?',
    answer:
      'Yes, absolutely. Because we use the official YouTube embedded player, every valid listen (30 seconds+) on Tropiqk is registered as a legitimate view on your YouTube video. This directly boosts your visibility, watch time, and helps you grow your channel organically.',
  },
  {
    id: 'artist-4',
    category: 'Artist',
    question: 'What is a "Double Coins" Campaign?',
    answer:
      "This is a powerful promotional tool available to our ULTIMATE tier artists. You can select one of your tracks to temporarily offer double the coin rewards to fans who share it. It's the perfect way to supercharge promotion for a new single.",
  },

  // --- Questions for Fans ---
  {
    id: 'fan-1',
    category: 'Fan',
    question: 'How do I earn coins?',
    answer:
      "It's simple! For any track on Tropiqk, you can generate a unique share link. When you share that link and someone clicks on it and listens to the track for at least 30 seconds, you automatically earn Tropiqk Coins in your account.",
  },
  {
    id: 'fan-2',
    category: 'Fan',
    question: 'What can I use my coins for?',
    answer:
      'Your coins have real value. You can redeem them directly within the app for mobile airtime on major networks. We are always working on adding new and exciting rewards for our community!',
  },
  {
    id: 'fan-3',
    category: 'Fan',
    question: 'Does it cost me anything to be a fan?',
    answer:
      'No, being a fan on Tropiqk is completely free! You can discover new music, share tracks, earn coins, and redeem rewards without ever paying anything. Your support for artists is what powers the platform.',
  },
  {
    id: 'fan-4',
    category: 'Fan',
    question: "What if I share a link and don't get coins?",
    answer:
      "For a view to be valid and earn you coins, the listener must watch for at least 30 seconds. If they click away too soon, the view won't be counted. Some artists on our ULTIMATE plan may also offer higher coin rewards on specific tracks!",
  },
];

export const links = [
  { name: 'How It Works', href: '/#how-it-works' },
  { name: 'Pricing', href: '/#pricing' },
  //   { name: 'About', href: '/#about' },
  { name: 'Faq', href: '/#faq' },
];

export const sampleData = {
  'New Releases': [
    { img: '/images/placeholder.png', song: 'Rise', artist: 'Iwa Salave' },
    { img: '/images/placeholder.png', song: 'Dreams', artist: 'Elijah' },
    { img: '/images/placeholder.png', song: 'Wander', artist: 'Linda' },
    {
      img: '/images/placeholder.png',
      song: 'Late Nights',
      artist: 'Kevin Dubois',
    },
    { img: '/images/placeholder.png', song: 'Echo', artist: 'Maya' },
    { img: '/images/placeholder.png', song: 'Shine', artist: 'Juliet' },
    { img: '/images/placeholder.png', song: 'Closer', artist: 'Michael' },
    { img: '/images/placeholder.png', song: 'Gravity', artist: 'Sandra' },
    { img: '/images/placeholder.png', song: 'Thunder', artist: 'Alex' },
    { img: '/images/placeholder.png', song: 'Storm', artist: 'Jessica' },
  ],
  'Trending Artists': [
    { img: '/images/placeholder.png', song: 'Yasmin', artist: 'Yasmin' },
    { img: '/images/placeholder.png', song: 'Deon', artist: 'Deon' },
    { img: '/images/placeholder.png', song: 'Sasha', artist: 'Reggie' },
    { img: '/images/placeholder.png', song: 'Feelings', artist: 'Davido' },
    { img: '/images/placeholder.png', song: 'Energy', artist: 'Teni' },
    { img: '/images/placeholder.png', song: 'Wave', artist: 'Rema' },
    { img: '/images/placeholder.png', song: 'Heat', artist: 'Omah Lay' },
    { img: '/images/placeholder.png', song: 'Spark', artist: 'CKay' },
    { img: '/images/placeholder.png', song: 'Fire', artist: 'Burna Boy' },
    { img: '/images/placeholder.png', song: 'Light', artist: 'Wizkid' },
  ],
  'Spotlight On: Afrobeats': [
    { img: '/images/placeholder.png', song: 'Omo', artist: 'Burna' },
    { img: '/images/placeholder.png', song: 'Show Me', artist: 'Cynthia' },
    { img: '/images/placeholder.png', song: 'Love Like', artist: 'Fola' },
    { img: '/images/placeholder.png', song: 'Freccos', artist: 'Emmanuel' },
    { img: '/images/placeholder.png', song: 'Vibes', artist: 'Wizkid' },
    { img: '/images/placeholder.png', song: 'Tempo', artist: 'Fireboy' },
    { img: '/images/placeholder.png', song: 'Juice', artist: 'Bella Shmurda' },
    { img: '/images/placeholder.png', song: 'Flex', artist: 'Joeboy' },
    { img: '/images/placeholder.png', song: 'Mood', artist: 'Kizz Daniel' },
    { img: '/images/placeholder.png', song: 'Vibe', artist: 'Tekno' },
  ],
};

export const stats = [
  { value: '2,847', label: 'Total Fans' },
  { value: '15,234', label: 'Total Shares' },
  { value: '89,432', label: 'Streams Boosted' },
];



export const topFans: Fan[] = [
  {
    id: '1',
    name: 'Sarah M.',
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop',
    shares: 45,
    rank: 1,
  },
  {
    id: '2',
    name: 'Mike J.',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
    shares: 38,
    rank: 2,
  },
  {
    id: '3',
    name: 'Emma K.',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop',
    shares: 32,
    rank: 3,
  },
  {
    id: '4',
    name: 'Alex R.',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
    shares: 28,
    rank: 4,
  },
];

export const profileTasks = [
  { id: 1, task: 'Upload profile picture', completed: true },
  { id: 2, task: 'Fill out bio', completed: true },
  { id: 3, task: 'Select genres', completed: true },
  { id: 4, task: 'Upload first track', completed: false },
  { id: 5, task: 'Add social links', completed: false },
];

export const sidebarItems = [
  {
    id: 'overview',
    label: 'Overview',
     route: '/artist/dashboard',
    icon: <BarChart3 className="h-5 w-5" />,
  },
  { id: 'tracks', label: 'Tracks',  route: '/artist/dashboard/Tracks', icon: <Music className="h-5 w-5" /> },
  // { id: 'fans', label: 'Fans', icon: <Users className="h-5 w-5" /> },
  { id: 'profile', label: 'Profile',  route: '/artist/dashboard/Profile',icon: <User className="h-5 w-5" /> },
];

// data/tracks.ts
export interface Track {
  id: string;
  title: string;
  artist: string;
  genre: string;
  duration: string;
  uploadedAt: string;
  thumbnail: string;
}

export const mockTracks: Track[] = [
  {
    id: '1',
    title: 'Midnight Dreams',
    artist: 'Luna Eclipse',
    genre: 'Electronic',
    duration: '3:45',
    uploadedAt: '2 days ago',
    thumbnail:
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=80&h=80&fit=crop',
  },
  // … the rest of the 5 tracks (same as in your original file)
];