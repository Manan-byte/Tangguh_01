import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Wrench, Cpu, Battery, Cable, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import conversionImg from "@/assets/conversion-kit.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

export const ConversionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px", amount: 0.2 });
  const { t, language } = useLanguage();

  const components = [
    { icon: Cpu, name: t.conversion.components.controller.name, desc: t.conversion.components.controller.desc },
    { icon: Battery, name: t.conversion.components.battery.name, desc: t.conversion.components.battery.desc },
    { icon: Wrench, name: t.conversion.components.motor.name, desc: t.conversion.components.motor.desc },
    { icon: Cable, name: t.conversion.components.electrical.name, desc: t.conversion.components.electrical.desc },
  ];

  const whatsappMessage = language === "id"
    ? "Halo, saya ingin konsultasi konversi motor listrik"
    : "Hello, I want to consult about electric motor conversion";

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
              <div className="text-3xl font-display font-bold gradient-text mb-1">BBM → {language === "id" ? "Listrik" : "Electric"}</div>
              <p className="text-sm text-muted-foreground">
                {t.conversion.floatingCard}
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
              {t.conversion.sectionLabel}
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-6">
              {t.conversion.title} <span className="gradient-text">{t.conversion.titleHighlight}</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              {t.conversion.description}
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
              {t.conversion.benefits.map((benefit, index) => (
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
                href={`https://wa.me/628567360026?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank" 
                rel="noopener noreferrer"
              >
                {t.conversion.consultButton}
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
