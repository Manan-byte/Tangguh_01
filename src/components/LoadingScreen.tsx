import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import logoTangguh from "@/assets/logo-tangguh.png";
import { Zap } from "lucide-react";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

// Note: LoadingScreen renders before LanguageProvider, so we use static text
export const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(onLoadingComplete, 500); // Wait for exit animation
    }, 2500);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
        >
          {/* Background glow effects */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.3 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]"
            />
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.2 }}
              transition={{ duration: 1.8, delay: 0.3, ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px]"
            />
          </div>

          {/* Logo container */}
          <div className="relative flex flex-col items-center">
            {/* Logo with pulse ring */}
            <div className="relative">
              {/* Pulse rings */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [0.8, 1.5, 0.8], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 w-32 h-32 rounded-full border-2 border-primary/30"
                style={{ margin: "-16px" }}
              />
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [0.8, 1.8, 0.8], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 w-32 h-32 rounded-full border border-primary/20"
                style={{ margin: "-16px" }}
              />

              {/* Logo */}
              <motion.div
                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.34, 1.56, 0.64, 1],
                  delay: 0.2 
                }}
                className="relative"
              >
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center p-4">
                  <motion.img
                    src={logoTangguh}
                    alt="Tangguh EV"
                    className="w-full h-full object-contain"
                    animate={{ 
                      filter: ["brightness(1)", "brightness(1.3)", "brightness(1)"]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Brand name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8 text-center"
            >
              <h1 className="font-display font-bold text-3xl text-foreground tracking-wider">
                TANGGUH
              </h1>
              <motion.p
                initial={{ opacity: 0, letterSpacing: "0.1em" }}
                animate={{ opacity: 1, letterSpacing: "0.3em" }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="text-xs text-muted-foreground mt-1"
              >
                ELECTRIC VEHICLE
              </motion.p>
            </motion.div>

            {/* Loading indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-10 flex items-center gap-2"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 rounded-full border-2 border-primary/30 border-t-primary"
              />
              <span className="text-sm text-muted-foreground">Memuat...</span>
            </motion.div>

            {/* Electric bolt animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, delay: 1.8, repeat: Infinity }}
              className="absolute -right-12 top-0"
            >
              <Zap className="w-6 h-6 text-primary" fill="currentColor" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, delay: 2.1, repeat: Infinity }}
              className="absolute -left-10 top-4"
            >
              <Zap className="w-4 h-4 text-accent" fill="currentColor" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
