import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { SocialProof } from "@/components/landing/SocialProof";
import { PainVsSolution } from "@/components/landing/PainVsSolution";
import { ROI } from "@/components/landing/ROI";
import { Features } from "@/components/landing/Features";
import { Workflow } from "@/components/landing/Workflow";
import { DashboardPreview } from "@/components/landing/DashboardPreview";
import { LeadForm } from "@/components/landing/LeadForm";
import { Comparison } from "@/components/landing/Comparison";
import { TechStack } from "@/components/landing/TechStack";
import { Security } from "@/components/landing/Security";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { CTABanner } from "@/components/landing/CTABanner";
import { Footer } from "@/components/landing/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <PainVsSolution />
        <ROI />
        <Features />
        <Workflow />
        <DashboardPreview />
        <Comparison />
        <LeadForm />
        <TechStack />
        <Security />
        <Pricing />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}
