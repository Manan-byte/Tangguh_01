import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Eye, Lightbulb, Shield, Users, Handshake } from "lucide-react";

const values = [
  {
    icon: Lightbulb,
    title: "Inovasi",
    description: "Menciptakan produk dan teknologi terkini dengan solusi baru yang lebih baik.",
  },
  {
    icon: Shield,
    title: "Kualitas",
    description: "Menghadirkan produk dengan standar keamanan tinggi dan tahan lama.",
  },
  {
    icon: Users,
    title: "Pelayanan",
    description: "Membangun hubungan kuat dengan pelanggan dan memberikan pelayanan terbaik.",
  },
  {
    icon: Handshake,
    title: "Kolaborasi",
    description: "Bekerja sama dengan berbagai vendor untuk suku cadang berkualitas.",
  },
];

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="tentang" className="section-padding relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div ref={ref} className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">
            Tentang Kami
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground mb-6">
            Tangguh <span className="gradient-text">Electric Vehicle</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Perusahaan profesional di bidang Kendaraan Listrik Kreatif, 
            berkontribusi dalam mendukung keberhasilan program pemerintah 
            melalui produk-produk dengan tingkat inovasi tinggi.
          </p>
        </motion.div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-2xl p-8 hover-lift"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Eye className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display font-bold text-2xl text-foreground">Visi</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Menjadi inovasi baru dalam industri kendaraan off-road di Indonesia 
              dengan menghadirkan solusi mobilitas yang berjangka panjang, tangguh, 
              dan menyenangkan untuk petualangan. Menjadi pemimpin dalam solusi 
              konversi kendaraan bermotor BBM ke listrik di Indonesia.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card rounded-2xl p-8 hover-lift"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Target className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display font-bold text-2xl text-foreground">Misi</h3>
            </div>
            <ul className="text-muted-foreground space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                <span>Mengembangkan motor trail listrik dengan teknologi terbaru yang aman dan efisien.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                <span>Mendorong penggunaan kendaraan listrik untuk mengurangi emisi karbon.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                <span>Menyediakan layanan konversi dan perawatan yang terpercaya.</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="font-display font-bold text-2xl text-center text-foreground mb-12">
            Nilai-Nilai Perusahaan
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="group p-6 rounded-2xl bg-secondary/50 border border-border/50 hover:border-primary/50 transition-all duration-300 hover-lift"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-display font-semibold text-lg text-foreground mb-2">
                  {value.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
