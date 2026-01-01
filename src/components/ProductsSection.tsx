import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Gauge, Battery, Zap, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const products = [
  {
    name: "ST3",
    slug: "st3",
    tagline: "Dual Purpose",
    description: "Ban dua fungsi dengan kombinasi sempurna dari tarikan kuat di medan berat dan stabilitas maksimal di jalan raya. Mudah dikendalikan bahkan oleh pengguna baru.",
    specs: [
      { icon: Gauge, label: "Top Speed", value: "80 km/h" },
      { icon: Battery, label: "Jarak", value: "100 km" },
      { icon: Zap, label: "Power", value: "5 kW" },
    ],
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    name: "DX4",
    slug: "dx4",
    tagline: "Ready to Race",
    description: "Dirancang khusus untuk para profesional yang haus akan kecepatan dan ketangguhan di setiap lintasan. Didukung teknologi unggulan dan desain aerodinamis.",
    specs: [
      { icon: Gauge, label: "Top Speed", value: "120 km/h" },
      { icon: Battery, label: "Jarak", value: "80 km" },
      { icon: Zap, label: "Power", value: "10 kW" },
    ],
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    name: "SP5",
    slug: "sp5",
    tagline: "Supermoto",
    description: "Motor trail tangguh dengan konsep supermoto, menaklukkan medan berat sekaligus memberikan kenyamanan dan stabilitas di jalan perkotaan.",
    specs: [
      { icon: Gauge, label: "Top Speed", value: "100 km/h" },
      { icon: Battery, label: "Jarak", value: "120 km" },
      { icon: Zap, label: "Power", value: "8 kW" },
    ],
    gradient: "from-orange-500 to-red-600",
  },
];

export const ProductsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
            Produk Kami
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground mb-6">
            Motor Trail <span className="gradient-text">Listrik</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tiga varian motor trail listrik dengan performa tinggi untuk berbagai kebutuhan petualangan Anda.
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
                    Detail Produk
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
