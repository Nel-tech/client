import {
  Search,
  Share2,
  Coins,
  Smartphone,
  Link,
  Users,
  BarChart3,
} from 'lucide-react';
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
    category: 'artist',
    question: 'How do I get my music on Tropiqk?',
    answer:
      "You don't upload music files directly! Simply create an artist profile and add the public links to your tracks from YouTube. We handle the rest, embedding the player so every listen on Tropiqk counts as a real stream on your YouTube channel.",
  },
  {
    id: 'artist-2',
    category: 'artist',
    question: 'How do I know which fans are promoting me?',
    answer:
      'The Artist Dashboard is your command center. Even on our free BASIC plan, you can see a leaderboard of your Top 5 promoters. By upgrading to a PRO plan, you unlock the full list and can see which fans are promoting specific tracks.',
  },
  {
    id: 'artist-3',
    category: 'artist',
    question: 'Are the streams real? How does this help me?',
    answer:
      'Yes, absolutely. Because we use the official YouTube embedded player, every valid listen (30 seconds+) on Tropiqk is registered as a legitimate view on your YouTube video. This directly boosts your visibility, watch time, and helps you grow your channel organically.',
  },
  {
    id: 'artist-4',
    category: 'artist',
    question: 'What is a "Double Coins" Campaign?',
    answer:
      "This is a powerful promotional tool available to our ULTIMATE tier artists. You can select one of your tracks to temporarily offer double the coin rewards to fans who share it. It's the perfect way to supercharge promotion for a new single.",
  },

  // --- Questions for Fans ---
  {
    id: 'fan-1',
    category: 'fan',
    question: 'How do I earn coins?',
    answer:
      "It's simple! For any track on Tropiqk, you can generate a unique share link. When you share that link and someone clicks on it and listens to the track for at least 30 seconds, you automatically earn Tropiqk Coins in your account.",
  },
  {
    id: 'fan-2',
    category: 'fan',
    question: 'What can I use my coins for?',
    answer:
      'Your coins have real value. You can redeem them directly within the app for mobile airtime on major networks. We are always working on adding new and exciting rewards for our community!',
  },
  {
    id: 'fan-3',
    category: 'fan',
    question: 'Does it cost me anything to be a fan?',
    answer:
      'No, being a fan on Tropiqk is completely free! You can discover new music, share tracks, earn coins, and redeem rewards without ever paying anything. Your support for artists is what powers the platform.',
  },
  {
    id: 'fan-4',
    category: 'fan',
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
