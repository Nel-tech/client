import { Nav } from '@/components/Nav';
import { HeroSection } from './Home/HeroSection';
import { HowItWorksSection } from './Home/How-it-works';
import { FeatureSection } from './Home/Feature-Section';
// import Pricing from '@/app/Home/Pricng';
import { FAQSection } from './Home/Faq';
import FooterSection from '@/components/Footer';
// import BaseFooter from '@/components/BaseFooter';

function page() {
  return (
    <div>
      <Nav />
      <HeroSection />
      <HowItWorksSection />
      <FeatureSection />
      {/* <Pricing /> */}
      <FAQSection />
      <FooterSection />
      {/* <BaseFooter /> */}
    </div>
  );
}

export default page;
