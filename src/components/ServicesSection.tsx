import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Wrench, Settings, Lightbulb, GraduationCap, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Wrench,
    title: "Konversi Motor",
    description: "Mengubah mesin BBM menjadi motor listrik berbasis baterai dengan komponen berkualitas tinggi dan standar keamanan.",
    features: ["Motor BLDC", "Controller", "Baterai Lithium", "Modifikasi Rangka"],
  },
  {
    icon: Settings,
    title: "Perawatan & Servis",
    description: "Pemeliharaan baterai, motor, sistem kelistrikan, pemeriksaan rutin, dan penggantian spare part.",
    features: ["Diagnostik", "Spare Part", "Tune-up", "Garansi Servis"],
  },
  {
    icon: Lightbulb,
    title: "Konsultasi & R&D",
    description: "Konsultasi teknis untuk modifikasi kendaraan dan riset pengembangan efisiensi motor & sistem kontrol.",
    features: ["Konsultasi Teknis", "Riset Baterai", "Sistem Kontrol", "Custom Project"],
  },
  {
    icon: GraduationCap,
    title: "Pendidikan & Pelatihan",
    description: "Pelatihan teknis untuk bengkel, SMK/teknisi, pelatihan legal & keselamatan, workshop masyarakat.",
    features: ["Training Bengkel", "Workshop SMK", "Sertifikasi", "Community Event"],
  },
];

export const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="layanan" className="section-padding relative overflow-hidden bg-secondary/30">
      {/* Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div ref={ref} className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">
            Layanan Kami
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground mb-6">
            Solusi <span className="gradient-text">Lengkap</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Kami menyediakan layanan komprehensif untuk semua kebutuhan kendaraan listrik Anda.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group glass-card rounded-3xl p-8 hover:border-primary/50 transition-all duration-500 hover-lift"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <a
                    href="#kontak"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
                  >
                    Pelajari Lebih Lanjut
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
