import { motion, useInView, AnimatePresence, PanInfo } from "framer-motion";
import { useRef, useState, useMemo, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import pdfPage1 from "@/assets/pdf-page-1.jpg";
import pdfPage2 from "@/assets/pdf-page-2.jpg";
import pdfPage4 from "@/assets/pdf-page-4.jpg";
import pdfPage6 from "@/assets/pdf-page-6.jpg";
import pdfPage7 from "@/assets/pdf-page-7.jpg";
import pdfPage8 from "@/assets/pdf-page-8.jpg";
import pdfPage11 from "@/assets/pdf-page-11.jpg";
import pdfPage12 from "@/assets/pdf-page-12.jpg";
import pdfPage13 from "@/assets/pdf-page-13.jpg";
import pdfPage14 from "@/assets/pdf-page-14.jpg";
import { useLanguage } from "@/contexts/LanguageContext";
import { LazyImage, preloadImages } from "@/components/LazyImage";

type CategoryKey = "all" | "product" | "delivery" | "adventure";

export const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px", amount: 0.2 });
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<CategoryKey>("all");
  const [direction, setDirection] = useState(0);
  const { t } = useLanguage();

  const allImages = useMemo(() => [
    { src: pdfPage1, alt: "Tangguh Electric Vehicle - Company Profile", categoryKey: "product" as const, category: t.gallery.categories.product },
    { src: pdfPage2, alt: "Tentang Tangguh EV", categoryKey: "product" as const, category: t.gallery.categories.product },
    { src: pdfPage4, alt: "Produk ST3, DX4, SP5", categoryKey: "product" as const, category: t.gallery.categories.product },
    { src: pdfPage6, alt: "Layanan & Produk Konversi", categoryKey: "delivery" as const, category: t.gallery.categories.delivery },
    { src: pdfPage7, alt: "Unlimited Adventure", categoryKey: "adventure" as const, category: t.gallery.categories.adventure },
    { src: pdfPage8, alt: "Delivery PDAM Leuwiliang", categoryKey: "delivery" as const, category: t.gallery.categories.delivery },
    { src: pdfPage11, alt: "Proses Konversi Motor Listrik", categoryKey: "delivery" as const, category: t.gallery.categories.delivery },
    { src: pdfPage12, alt: "Konversi Motor BBM ke Listrik", categoryKey: "delivery" as const, category: t.gallery.categories.delivery },
    { src: pdfPage13, alt: "E-Moto Tangguh", categoryKey: "product" as const, category: t.gallery.categories.product },
    { src: pdfPage14, alt: "Tangguh Electric Vehicle", categoryKey: "adventure" as const, category: t.gallery.categories.adventure },
  ], [t]);

  const filters: { key: CategoryKey; label: string }[] = [
    { key: "all", label: t.gallery.filters?.all || "Semua" },
    { key: "product", label: t.gallery.categories.product },
    { key: "delivery", label: t.gallery.categories.delivery },
    { key: "adventure", label: t.gallery.categories.adventure },
  ];

  const filteredImages = useMemo(() => {
    if (activeFilter === "all") return allImages;
    return allImages.filter(img => img.categoryKey === activeFilter);
  }, [activeFilter, allImages]);

  // Preload first 4 images immediately for faster initial display
  useEffect(() => {
    const firstImages = allImages.slice(0, 4).map(img => img.src);
    preloadImages(firstImages);
  }, [allImages]);

  // Preload adjacent images when modal is open
  useEffect(() => {
    if (selectedIndex !== null) {
      const prevIndex = selectedIndex === 0 ? filteredImages.length - 1 : selectedIndex - 1;
      const nextIndex = selectedIndex === filteredImages.length - 1 ? 0 : selectedIndex + 1;
      preloadImages([
        filteredImages[prevIndex]?.src,
        filteredImages[nextIndex]?.src
      ].filter(Boolean));
    }
  }, [selectedIndex, filteredImages]);

  const navigatePrev = () => {
    if (selectedIndex !== null) {
      setDirection(-1);
      setSelectedIndex(selectedIndex === 0 ? filteredImages.length - 1 : selectedIndex - 1);
    }
  };

  const navigateNext = () => {
    if (selectedIndex !== null) {
      setDirection(1);
      setSelectedIndex(selectedIndex === filteredImages.length - 1 ? 0 : selectedIndex + 1);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigatePrev();
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigateNext();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") navigatePrev();
    if (e.key === "ArrowRight") navigateNext();
    if (e.key === "Escape") setSelectedIndex(null);
  };

  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      navigatePrev();
    } else if (info.offset.x < -swipeThreshold) {
      navigateNext();
    }
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <>
      <section id="galeri" className="section-padding relative overflow-hidden">
        <div ref={ref} className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">
              {t.gallery.sectionLabel}
            </span>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground mb-6">
              {t.gallery.title} <span className="gradient-text">{t.gallery.titleHighlight}</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t.gallery.description}
            </p>
          </motion.div>

          {/* Filter buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => {
                  setActiveFilter(filter.key);
                  setSelectedIndex(null);
                }}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter.key
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </motion.div>

          {/* Clean uniform grid layout */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.src}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: 0.03 * index }}
                  className="relative group cursor-pointer overflow-hidden rounded-xl aspect-square"
                  onClick={() => setSelectedIndex(index)}
                >
                  <LazyImage 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    skeletonClassName="bg-secondary animate-pulse"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className="px-2 py-1 rounded-full bg-primary/20 backdrop-blur-md text-primary text-[10px] md:text-xs font-medium">{image.category}</span>
                    <h3 className="text-foreground font-medium mt-1 text-xs md:text-sm line-clamp-1">{image.alt}</h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <AnimatePresence initial={false} custom={direction} mode="wait">
        {selectedIndex !== null && filteredImages[selectedIndex] && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center p-4 overflow-hidden" 
            onClick={() => setSelectedIndex(null)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Close button */}
            <button 
              className="absolute top-6 right-6 p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors z-10" 
              onClick={() => setSelectedIndex(null)}
            >
              <X className="w-6 h-6 text-foreground" />
            </button>

            {/* Previous button - hidden on mobile */}
            <button 
              className="absolute left-4 md:left-8 p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors z-10 hidden md:flex" 
              onClick={handlePrev}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Image with swipe */}
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.img 
                key={selectedIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                src={filteredImages[selectedIndex].src} 
                alt={filteredImages[selectedIndex].alt} 
                className="max-w-full max-h-[85vh] rounded-2xl object-contain cursor-grab active:cursor-grabbing touch-pan-y"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                onClick={(e) => e.stopPropagation()}
              />
            </AnimatePresence>

            {/* Next button - hidden on mobile */}
            <button 
              className="absolute right-4 md:right-8 p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors z-10 hidden md:flex" 
              onClick={handleNext}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image counter & swipe hint */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
              <span className="text-muted-foreground text-xs md:hidden">Swipe untuk navigasi</span>
              <div className="px-4 py-2 rounded-full bg-secondary/80 backdrop-blur-md text-foreground text-sm font-medium">
                {selectedIndex + 1} / {filteredImages.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
