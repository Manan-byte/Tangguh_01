import { motion, useReducedMotion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AIChatWidget } from "@/components/AIChatWidget";
import { Button } from "@/components/ui/button";
import { Gauge, Battery, Zap, CheckCircle, Shield, Wrench, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { ProductBreadcrumb } from "@/components/ProductBreadcrumb";
import { ProductSchema } from "@/components/ProductSchema";
import { ProductMeta } from "@/components/ProductMeta";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { PageTransition } from "@/components/PageTransition";
import { useIsMobile } from "@/hooks/use-mobile";

const products = [
  { slug: "st3", name: "ST3" },
  { slug: "dx4", name: "DX4" },
  { slug: "sp5", name: "SP5" },
];

const currentProduct = "sp5";
const currentIndex = products.findIndex(p => p.slug === currentProduct);
const prevProduct = products[currentIndex - 1];
const nextProduct = products[currentIndex + 1];

const ProductSP5 = () => {
  const { t, language } = useLanguage();
  const isMobile = useIsMobile();
  const shouldReduceMotion = useReducedMotion();

  const specs = [
    { icon: Gauge, label: t.products.topSpeed, value: "100 km/h" },
    { icon: Battery, label: t.products.range, value: "120 km" },
    { icon: Zap, label: t.products.power, value: "8 kW" },
  ];

  const features = language === "id" ? [
    "Konsep supermoto serbaguna",
    "Ban all-terrain untuk segala medan",
    "Jarak tempuh terpanjang di kelasnya",
    "Mode berkendara Eco, Normal, Sport",
    "Sistem ABS untuk keamanan ekstra",
    "Kenyamanan optimal untuk perjalanan jauh",
  ] : [
    "Versatile supermoto concept",
    "All-terrain tires for any road",
    "Longest range in its class",
    "Eco, Normal, Sport riding modes",
    "ABS system for extra safety",
    "Optimal comfort for long trips",
  ];

  const whatsappOrderMsg = language === "id" 
    ? "Halo, saya tertarik dengan motor SP5"
    : "Hello, I am interested in the SP5 motorcycle";
  const whatsappTestRideMsg = language === "id"
    ? "Halo, saya ingin test ride SP5"
    : "Hello, I want to schedule a test ride for SP5";

  // Simple fade animation for mobile
  const fadeIn = {
    hidden: { opacity: 0, y: isMobile ? 10 : 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <PageTransition>
    <main className="min-h-screen bg-background">
      <ProductMeta
        name="SP5"
        slug="sp5"
        description={t.products.sp5.description}
        price="Rp 45 Juta"
      />
      <ProductSchema
        name="SP5"
        slug="sp5"
        description={t.products.sp5.description}
        price={45000000}
        specs={{
          topSpeed: "100 km/h",
          range: "120 km",
          power: "8 kW"
        }}
        warranty="2"
      />
      <BreadcrumbSchema
        items={[
          { name: "Beranda", url: "https://tangguhev.com" },
          { name: "Produk", url: "https://tangguhev.com/#produk" },
          { name: "SP5", url: "https://tangguhev.com/produk/sp5" },
        ]}
      />
      <Navbar />
      
      <section className="pt-24 md:pt-32 pb-12 md:pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-600/10" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="container-custom relative">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.3 }}
          >
            <ProductBreadcrumb productName="SP5" productSlug="sp5" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 0.4 }} 
              className="relative"
            >
              <div className="aspect-square rounded-2xl md:rounded-3xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-background/10 backdrop-blur-[1px]" />
                <span className="text-[120px] md:text-[200px] font-display font-bold text-foreground/20 select-none">SP5</span>
              </div>
              <div className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl bg-card border border-border shadow-xl">
                <span className="text-xs md:text-sm text-muted-foreground">{t.productDetail.startingFrom}</span>
                <div className="font-display font-bold text-xl md:text-2xl text-primary">Rp 45 Juta</div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <span className="px-3 md:px-4 py-1 md:py-1.5 rounded-full bg-orange-500/10 text-orange-500 text-xs md:text-sm font-medium mb-4 inline-block">
                {t.products.sp5.tagline}
              </span>
              <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-6xl text-foreground mb-4 md:mb-6">SP5</h1>
              <p className="text-muted-foreground text-base md:text-lg mb-6 md:mb-8 leading-relaxed">{t.products.sp5.description}</p>

              <div className="grid grid-cols-3 gap-2 md:gap-4 mb-6 md:mb-8">
                {specs.map((spec, index) => (
                  <motion.div 
                    key={spec.label} 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }} 
                    className="text-center p-3 md:p-4 rounded-xl md:rounded-2xl bg-card border border-border"
                  >
                    <spec.icon className="w-5 h-5 md:w-6 md:h-6 text-orange-500 mx-auto mb-1 md:mb-2" />
                    <div className="font-display font-bold text-lg md:text-xl text-foreground">{spec.value}</div>
                    <div className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wide">{spec.label}</div>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg" asChild>
                  <a href={`https://wa.me/628567360026?text=${encodeURIComponent(whatsappOrderMsg)}`} target="_blank" rel="noopener noreferrer">
                    {t.productDetail.orderNow}
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="#spesifikasi">{t.productDetail.viewSpecs}</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="spesifikasi" className="section-padding bg-secondary/30">
        <div className="container-custom">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="font-display font-bold text-2xl md:text-3xl lg:text-4xl text-foreground">
              {t.productDetail.features} <span className="text-orange-500">{t.productDetail.featuresHighlight}</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-3 md:space-y-4">
              {features.map((feature, index) => (
                <motion.div 
                  key={index} 
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-start gap-3 p-3 md:p-4 rounded-xl bg-card border border-border"
                >
                  <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span className="text-foreground text-sm md:text-base">{feature}</span>
                </motion.div>
              ))}
            </div>

            <div className="space-y-4 md:space-y-6">
              <motion.div 
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="p-4 md:p-6 rounded-2xl bg-card border border-border"
              >
                <div className="flex items-center gap-3 mb-3 md:mb-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 md:w-6 md:h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-base md:text-lg text-foreground">{t.productDetail.warranty}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">2 {t.productDetail.warrantyYears}</p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm md:text-base">
                  {language === "id" 
                    ? "SP5 dilengkapi dengan garansi resmi selama 2 tahun untuk mesin dan 1.5 tahun untuk baterai."
                    : "SP5 comes with official warranty for 2 years for engine and 1.5 years for battery."}
                </p>
              </motion.div>

              <motion.div 
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="p-4 md:p-6 rounded-2xl bg-card border border-border"
              >
                <div className="flex items-center gap-3 mb-3 md:mb-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                    <Wrench className="w-5 h-5 md:w-6 md:h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-base md:text-lg text-foreground">{t.productDetail.service}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">{t.productDetail.serviceFree} 4x service</p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm md:text-base">
                  {language === "id"
                    ? "Dapatkan layanan service gratis sebanyak 4 kali selama 1.5 tahun pertama pembelian."
                    : "Get 4 free service sessions during the first 1.5 years of purchase."}
                </p>
              </motion.div>

              <motion.div 
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="p-4 md:p-6 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 text-white"
              >
                <h3 className="font-display font-semibold text-base md:text-lg mb-2">{t.productDetail.interested} SP5?</h3>
                <p className="text-white/80 mb-4 text-sm md:text-base">{t.productDetail.interestedDesc}</p>
                <Button variant="secondary" size="sm" asChild>
                  <a href={`https://wa.me/628567360026?text=${encodeURIComponent(whatsappTestRideMsg)}`} target="_blank" rel="noopener noreferrer">
                    {t.productDetail.scheduleTestRide}
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12 border-t border-border/50">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            {prevProduct ? (
              <Link to={`/produk/${prevProduct.slug}`} className="flex items-center gap-2 md:gap-3 group">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <span className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wide">{t.productDetail.previous}</span>
                  <div className="font-display font-semibold text-sm md:text-base text-foreground group-hover:text-primary transition-colors">{prevProduct.name}</div>
                </div>
              </Link>
            ) : <div />}

            <Link to="/#produk" className="px-4 md:px-6 py-2 rounded-full border border-border hover:border-primary hover:text-primary transition-colors text-xs md:text-sm font-medium">
              {t.productDetail.allProducts}
            </Link>

            {nextProduct ? (
              <Link to={`/produk/${nextProduct.slug}`} className="flex items-center gap-2 md:gap-3 group text-right">
                <div>
                  <span className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wide">{t.productDetail.next}</span>
                  <div className="font-display font-semibold text-sm md:text-base text-foreground group-hover:text-primary transition-colors">{nextProduct.name}</div>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </Link>
            ) : <div />}
          </div>
        </div>
      </section>

      <Footer />
      <AIChatWidget />
    </main>
    </PageTransition>
  );
};

export default ProductSP5;