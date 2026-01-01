import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Wrench, Cpu, Battery, Cable, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import conversionImg from "@/assets/conversion-kit.jpg";

const benefits = [
  "Pengurangan emisi CO (Carbon Monoksida)",
  "Pengurangan penggunaan BBM impor",
  "Peluang industri komponen lokal",
  "Lebih cepat dan tanpa suara",
  "Perawatan lebih murah",
  "Ramah lingkungan",
];

const components = [
  { icon: Cpu, name: "Controller", desc: "Sistem kontrol canggih" },
  { icon: Battery, name: "Baterai", desc: "Lithium-ion berkualitas" },
  { icon: Wrench, name: "Dinamo BLDC", desc: "Motor listrik efisien" },
  { icon: Cable, name: "Kelistrikan", desc: "Sistem pengisian lengkap" },
];

export const ConversionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="konversi" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

      <div ref={ref} className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden">
              <img
                src={conversionImg}
                alt="Konversi Motor Listrik"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>
            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -bottom-6 -right-6 glass-card rounded-2xl p-6 max-w-[280px] hidden md:block"
            >
              <div className="text-3xl font-display font-bold gradient-text mb-1">BBM → Listrik</div>
              <p className="text-sm text-muted-foreground">
                Konversi motor bensin Anda menjadi motor listrik ramah lingkungan
              </p>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">
              Layanan Konversi
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-6">
              Konversi Motor <span className="gradient-text">Listrik</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Mengubah mesin BBM menjadi motor listrik berbasis baterai—mencakup 
              pemasangan motor listrik (BLDC), controller, baterai, sistem pengisian, 
              serta modifikasi rangka jika diperlukan.
            </p>

            {/* Components */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {components.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50 border border-border/50"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">{item.name}</div>
                    <div className="text-xs text-muted-foreground">{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-sm text-muted-foreground">{benefit}</span>
                </motion.div>
              ))}
            </div>

            <Button variant="hero" size="lg" asChild>
              <a 
                href="https://wa.me/628567360026?text=Halo,%20saya%20ingin%20konsultasi%20konversi%20motor%20listrik" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Konsultasi Konversi
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
