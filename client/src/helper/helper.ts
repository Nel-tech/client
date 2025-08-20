

export type RolesTypes= 'artist' | 'fans'

export interface TabProps {
  activeTab: RolesTypes;
  setActiveTab: (tab: RolesTypes) => void;
}
export interface FeatureProps {
  title: string;
  subtitle: string;
  description: string;
  points: { label: string; text: string }[];
  buttonText: string;
  buttonHref: string;
  imageSrc?: string; 
  imageAlt?: string;
  media?: React.ReactNode; 
  reverse?: boolean;
  buttonVariant?: "solid" | "outline";
}
export interface FloatingCoinProps{
    icon?: React.ReactNode;
    className?:string;
    height?:number;
    delay?:number;
}
export interface PromoterRowProps{
    avatar?: string;
  username: string;
  streams: string;
  growth: string;
  rank: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
};

// export interface HowItWorksSteps{
//     number: string;
//     icon: React.ReactNode;
//     headline: string;
//     description: string;
// }