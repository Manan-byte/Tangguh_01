import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ProductsSection } from "@/components/ProductsSection";
import { ConversionSection } from "@/components/ConversionSection";
import { ServicesSection } from "@/components/ServicesSection";
import { GallerySection } from "@/components/GallerySection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { OrganizationSchema } from "@/components/OrganizationSchema";
import { AIChatWidget } from "@/components/AIChatWidget";
import { PageTransition } from "@/components/PageTransition";

const Index = () => {
  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <OrganizationSchema />
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ProductsSection />
        <ConversionSection />
        <ServicesSection />
        <GallerySection />
        <ContactSection />
        <Footer />
        <AIChatWidget />
      </main>
    </PageTransition>
  );
};

export default Index;
