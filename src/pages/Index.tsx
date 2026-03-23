import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import ProblemSection from "@/components/ProblemSection";
import StatTriplet from "@/components/StatTriplet";
import VelaraProtocol from "@/components/VelaraProtocol";
import HealthCalculator from "@/components/HealthCalculator";
import ServicesGrid from "@/components/ServicesGrid";
import Testimonials from "@/components/Testimonials";
import ReframeHeadline from "@/components/ReframeHeadline";
import ShopPreview from "@/components/ShopPreview";
import MeetTeam from "@/components/MeetTeam";
import BlogPreview from "@/components/BlogPreview";
import AssessmentCTA from "@/components/AssessmentCTA";
import FAQ from "@/components/FAQ";
import DreamLifeClose from "@/components/DreamLifeClose";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <SocialProof />
      <ProblemSection />
      <StatTriplet />
      <VelaraProtocol />
      <FAQ />
      <Testimonials />
      <HealthCalculator />
      <ReframeHeadline />
      <ServicesGrid />
      <MeetTeam />
      <ShopPreview />
      <BlogPreview />
      <AssessmentCTA />
      <DreamLifeClose />
      <Footer />
    </div>
  );
};

export default Index;
