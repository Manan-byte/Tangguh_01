import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Wrench, Settings, Lightbulb, GraduationCap, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px", amount: 0.2 });
  const { t } = useLanguage();

  const services = [
    {
      icon: Wrench,
      title: t.services.items.conversion.title,
      description: t.services.items.conversion.description,
      features: t.services.items.conversion.features,
    },
    {
      icon: Settings,
      title: t.services.items.maintenance.title,
      description: t.services.items.maintenance.description,
      features: t.services.items.maintenance.features,
    },
    {
      icon: Lightbulb,
      title: t.services.items.consulting.title,
      description: t.services.items.consulting.description,
      features: t.services.items.consulting.features,
    },
    {
      icon: GraduationCap,
      title: t.services.items.education.title,
      description: t.services.items.education.description,
      features: t.services.items.education.features,
    },
  ];

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
            {t.services.sectionLabel}
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground mb-6">
            {t.services.title} <span className="gradient-text">{t.services.titleHighlight}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.services.description}
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
                    {t.services.learnMore}
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
