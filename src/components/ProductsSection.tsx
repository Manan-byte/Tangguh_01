import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Gauge, Battery, Zap, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export const ProductsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px", amount: 0.2 });
  const { t } = useLanguage();

  const products = [
    {
      name: "ST3",
      slug: "st3",
      tagline: t.products.st3.tagline,
      description: t.products.st3.description,
      specs: [
        { icon: Gauge, label: t.products.topSpeed, value: "80 km/h" },
        { icon: Battery, label: t.products.range, value: "100 km" },
        { icon: Zap, label: t.products.power, value: "5 kW" },
      ],
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      name: "DX4",
      slug: "dx4",
      tagline: t.products.dx4.tagline,
      description: t.products.dx4.description,
      specs: [
        { icon: Gauge, label: t.products.topSpeed, value: "120 km/h" },
        { icon: Battery, label: t.products.range, value: "80 km" },
        { icon: Zap, label: t.products.power, value: "10 kW" },
      ],
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      name: "SP5",
      slug: "sp5",
      tagline: t.products.sp5.tagline,
      description: t.products.sp5.description,
      specs: [
        { icon: Gauge, label: t.products.topSpeed, value: "100 km/h" },
        { icon: Battery, label: t.products.range, value: "120 km" },
        { icon: Zap, label: t.products.power, value: "8 kW" },
      ],
      gradient: "from-orange-500 to-red-600",
    },
  ];

  return (
    <section id="produk" className="section-padding relative overflow-hidden bg-secondary/30">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div ref={ref} className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">
            {t.products.sectionLabel}
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground mb-6">
            {t.products.title} <span className="gradient-text">{t.products.titleHighlight}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.products.description}
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
              className="group relative bg-card rounded-3xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-500 hover-lift"
            >
              {/* Card Header */}
              <div className={`h-48 bg-gradient-to-br ${product.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-background/20 backdrop-blur-[1px]" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-6xl font-display font-bold text-foreground/20">
                    {product.name}
                  </span>
                </div>
                <div className="absolute bottom-4 left-6">
                  <span className="px-3 py-1 rounded-full bg-background/20 backdrop-blur-md text-foreground text-xs font-medium">
                    {product.tagline}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <h3 className="font-display font-bold text-2xl text-foreground mb-3">
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-6 line-clamp-3">
                  {product.description}
                </p>

                {/* Specs */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {product.specs.map((spec) => (
                    <div key={spec.label} className="text-center p-3 rounded-xl bg-secondary/50">
                      <spec.icon className="w-5 h-5 text-primary mx-auto mb-1" />
                      <div className="font-display font-semibold text-foreground text-sm">
                        {spec.value}
                      </div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wide">
                        {spec.label}
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full group/btn" asChild>
                  <Link to={`/produk/${product.slug}`}>
                    {t.products.detailButton}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
