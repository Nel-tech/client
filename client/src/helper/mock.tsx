import {
 ShieldCheck,
 UserCheck,
 UploadCloud,
 Megaphone,
 UserPlus,
 Headphones,
 Gift,
Music,
  User,
  BarChart3,
  Download,
  Crown, 
  Zap, 
  TrendingUp, 
  Users, 
  Sparkles,
  Layers,
} from 'lucide-react';

import {  Fan } from './type';

export enum ArtistTier {
  BASIC = 'BASIC',
  PRO = 'PRO',
  ULTIMATE = 'ULTIMATE',
}

export const CampaignStatus = {
  PENDING_PAYMENT: "PENDING_PAYMENT",
  ACTIVE: "ACTIVE",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;

export type CampaignStatus =
  (typeof CampaignStatus)[keyof typeof CampaignStatus];

export const artistSteps = [
  {
    number: '01',
    icon: ShieldCheck,
    headline: 'Authenticate Your Artist Profile',
    description:
      'Verify your account and set up your artist profile so fans know it’s really you.',
  },
  {
    number: '02',
    icon: UserCheck,
    headline: 'Complete Your Onboarding',
    description:
      'Tell us about your sound, genre, and goals. This helps us connect you with the right audience.',
  },
  {
    number: '03',
    icon: UploadCloud,
    headline: 'Add Your Track',
    description:
      'Submit your song from YouTube and get it ready for real listeners to discover and enjoy.',
  },
  {
    number: '04',
    icon: Megaphone,
    headline: 'Let Fans Power Your Growth',
    description:
      'Your fans share your music naturally, helping you reach new listeners and build real momentum.',
  },
];

export const fanSteps = [
  {
    number: '01',
    icon: Download,
    headline: 'Download the App',
    description:
      'Join Tropiqk and unlock a new way to discover fresh, upcoming music.',
  },
  {
    number: '02',
    icon: UserPlus,
    headline: 'Sign Up & Get Set',
    description:
      'Create your account, personalize your interests, and step into the music community.',
  },
  {
    number: '03',
    icon: Headphones,
    headline: 'Explore & Enjoy New Sounds',
    description:
      'Listen freely to emerging artists, discover new vibes, and support music you genuinely love.',
  },
  {
    number: '04',
    icon: Gift,
    headline: 'Get Rewarded for Your Time',
    description:
      'Your support doesn’t go unnoticed. Earn rewards as you help great music travel further.',
  },
];




export const FAQ = [
  // --- Questions for Artists ---
  {
    id: 'artist-1',
    category: 'Artist',
    question: 'How do I get my music on Tropiqk?',
    answer:
      'Artists can upload their original, undiluted tracks directly from their device to Tropiqk. Once uploaded, your music becomes available to listeners on the platform, with optional promotion features if you choose to boost visibility.',
  },
  {
    id: 'artist-2',
    category: 'Artist',
    question: 'Do listens on Tropiqk count as streams?',
    answer:
      'Yes. Tropiqk tracks and records listening activity across the platform. Every play contributes to detailed analytics that show how your music is being discovered and streamed by real listeners.',
  },
  {
    id: 'artist-3',
    category: 'Artist',
    question: 'What insights do I get as an artist?',
    answer:
      'You get access to performance data such as total plays, listening duration, and engagement trends. These insights help you understand how your tracks are performing and how listeners interact with your music.',
  },
  {
    id: 'artist-4',
    category: 'Artist',
    question: 'Is Tropiqk suitable for upcoming artists?',
    answer:
      'Absolutely. Tropiqk is built to help emerging artists get their songs out there, reach new listeners, and grow steadily without needing a large fan base to start.',
  },

  // --- Questions for Fans ---
  {
    id: 'fan-1',
    category: 'Fan',
    question: 'What can I do as a fan on Tropiqk?',
    answer:
      'As a fan, you can discover new music from emerging artists and listen to their tracks directly on Tropiqk. By listening, you actively support artists and grow alongside them on their journey.',
  },
  {
    id: 'fan-2',
    category: 'Fan',
    question: 'Do I need to pay to use Tropiqk?',
    answer:
      'No. Tropiqk is free for listeners. You can explore music, enjoy tracks, and support artists without any subscription or payment.',
  },
  {
    id: 'fan-3',
    category: 'Fan',
    question: 'Can I use Tropiqk on my phone?',
    answer:
      'Yes. A dedicated mobile app is currently in production. We’re working hard to deliver a smooth, powerful listening experience on mobile very soon.',
  },
  {
    id: 'fan-4',
    category: 'Fan',
    question: 'How does listening on Tropiqk help artists?',
    answer:
      'Every time you listen to a track, you help increase its visibility and engagement on the platform. Consistent listening helps artists understand their audience, gain momentum, and grow their presence naturally.',
  },
];


export const links = [
  { name: 'How It Works', href: '/#how-it-works' },
  
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
    id: "overview",
    label: "Overview",
    route: "/artist/dashboard",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    id: "tracks",
    label: "Tracks",
    route: "/artist/dashboard/Tracks",
    icon: <Music className="h-5 w-5" />,
  },
  {
    id: "plans",
    label: "Plans", // 👈 replaces “Tiers”
    route: "/artist/dashboard/plans",
    icon: <Layers className="h-5 w-5" />,
  },
  {
    id: "profile",
    label: "Profile",
    route: "/artist/dashboard/Profile",
    icon: <User className="h-5 w-5" />,
  },
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

export const tierData = {
  BASIC: {
    name: 'Basic',
    icon: Sparkles,
    color: 'from-zinc-600 to-zinc-700',
    borderColor: 'border-zinc-700',
    budget: 0,
    maxUpload: 5,
    features: [
      { icon: TrendingUp, label: 'Low Feed Boost', available: true },
      { icon: BarChart3, label: 'Analytics', available: false },
      { icon: Users, label: 'Top Listeners', available: false },
      { icon: Crown, label: 'Verified Badge', available: false },
    ],
  },
  PRO: {
    name: 'Pro',
    icon: Zap,
    color: 'from-[#ff6b35] to-[#ff8a65]',
    borderColor: 'border-[#ff6b35]',
    budget: 5000,
    maxUpload: 15,
    features: [
      { icon: TrendingUp, label: 'Medium Feed Boost', available: true },
      { icon: BarChart3, label: 'Analytics', available: true },
      { icon: Users, label: 'Top Listeners', available: false },
      { icon: Crown, label: 'Verified Badge', available: false },
    ],
  },
  ULTIMATE: {
    name: 'Ultimate',
    icon: Crown,
   color: 'from-[#ff6b35] to-[#ff8a65]',
    borderColor: 'border-[#ff6b35]',
    budget: 15000,
    maxUpload: 50,
    features: [
      { icon: TrendingUp, label: 'High Feed Boost', available: true },
      { icon: BarChart3, label: 'Full Analytics', available: true },
      { icon: Users, label: 'Top Listeners', available: true },
      { icon: Crown, label: 'Verified Badge', available: true },
    ],
  },
};