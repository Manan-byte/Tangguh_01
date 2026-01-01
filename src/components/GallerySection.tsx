import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { X } from "lucide-react";
import galleryImg1 from "@/assets/gallery-1.jpg";
import adventureImg from "@/assets/adventure-bike.jpg";
import productsImg from "@/assets/products-grid.jpg";
import heroImg from "@/assets/hero-bike.jpg";

const galleryImages = [
  { src: heroImg, alt: "Motor Trail Tangguh", category: "Produk" },
  { src: galleryImg1, alt: "Delivery PDAM", category: "Delivery" },
  { src: adventureImg, alt: "Adventure Ride", category: "Adventure" },
  { src: productsImg, alt: "Product Showcase", category: "Produk" },
];

export const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <section id="galeri" className="section-padding relative overflow-hidden">
        <div ref={ref} className="container-custom">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">
              Galeri
            </span>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground mb-6">
              Dokumentasi <span className="gradient-text">Kami</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Lihat koleksi foto produk dan kegiatan Tangguh Electric Vehicle.
            </p>
          </motion.div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className={`relative group cursor-pointer overflow-hidden rounded-2xl ${
                  index === 0 ? "md:col-span-2 md:row-span-2" : ""
                }`}
                onClick={() => setSelectedImage(image.src)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover aspect-square transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md text-primary text-xs font-medium">
                    {image.category}
                  </span>
                  <h3 className="text-foreground font-medium mt-2">{image.alt}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6 text-foreground" />
          </button>
          <motion.img
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            src={selectedImage}
            alt="Gallery preview"
            className="max-w-full max-h-[90vh] rounded-2xl object-contain"
          />
        </motion.div>
      )}
    </>
  );
};
