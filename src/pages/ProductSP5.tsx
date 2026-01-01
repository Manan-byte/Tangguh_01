import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Gauge, Battery, Zap, ArrowLeft, CheckCircle, Shield, Wrench } from "lucide-react";
import { Link } from "react-router-dom";

const specs = [
  { icon: Gauge, label: "Top Speed", value: "100 km/h" },
  { icon: Battery, label: "Jarak Tempuh", value: "120 km" },
  { icon: Zap, label: "Power", value: "8 kW" },
];

const features = [
  "Konsep supermoto serbaguna",
  "Ban all-terrain untuk segala medan",
  "Jarak tempuh terpanjang di kelasnya",
  "Mode berkendara Eco, Normal, Sport",
  "Sistem ABS untuk keamanan ekstra",
  "Kenyamanan optimal untuk perjalanan jauh",
];

const ProductSP5 = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-600/10" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/#produk" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Produk
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Product Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-background/10 backdrop-blur-[1px]" />
                <span className="text-[200px] font-display font-bold text-foreground/20 select-none">
                  SP5
                </span>
              </div>
              <div className="absolute -bottom-4 -right-4 px-6 py-3 rounded-2xl bg-card border border-border shadow-xl">
                <span className="text-sm text-muted-foreground">Mulai dari</span>
                <div className="font-display font-bold text-2xl text-primary">Rp 45 Juta</div>
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-500 text-sm font-medium mb-4 inline-block">
                Supermoto
              </span>
              <h1 className="font-display font-bold text-4xl md:text-6xl text-foreground mb-6">
                SP5
              </h1>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Motor trail tangguh dengan konsep supermoto, menaklukkan medan berat sekaligus memberikan kenyamanan dan stabilitas di jalan perkotaan. Pilihan sempurna untuk petualang yang menginginkan fleksibilitas maksimal.
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {specs.map((spec, index) => (
                  <motion.div
                    key={spec.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="text-center p-4 rounded-2xl bg-card border border-border"
                  >
                    <spec.icon className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                    <div className="font-display font-bold text-xl text-foreground">
                      {spec.value}
                    </div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">
                      {spec.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg" asChild>
                  <a href="https://wa.me/628567360026?text=Halo,%20saya%20tertarik%20dengan%20motor%20SP5" target="_blank" rel="noopener noreferrer">
                    Pesan Sekarang
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="#spesifikasi">Lihat Spesifikasi</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="spesifikasi" className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Features List */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display font-bold text-3xl text-foreground mb-8">
                Fitur <span className="text-orange-500">Unggulan</span>
              </h2>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border"
                  >
                    <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="p-6 rounded-2xl bg-card border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg text-foreground">Garansi Resmi</h3>
                    <p className="text-sm text-muted-foreground">2 Tahun garansi mesin</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  SP5 dilengkapi dengan garansi resmi selama 2 tahun untuk mesin dan 1.5 tahun untuk baterai.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                    <Wrench className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg text-foreground">Service Berkala</h3>
                    <p className="text-sm text-muted-foreground">Gratis 4x service</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Dapatkan layanan service gratis sebanyak 4 kali selama 1.5 tahun pertama pembelian.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 text-white">
                <h3 className="font-display font-semibold text-lg mb-2">Tertarik dengan SP5?</h3>
                <p className="text-white/80 mb-4">
                  Hubungi kami untuk informasi lebih lanjut dan jadwalkan test ride.
                </p>
                <Button variant="secondary" size="sm" asChild>
                  <a href="https://wa.me/628567360026?text=Halo,%20saya%20ingin%20test%20ride%20SP5" target="_blank" rel="noopener noreferrer">
                    Jadwalkan Test Ride
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default ProductSP5;
