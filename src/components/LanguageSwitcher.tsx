import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "id" ? "en" : "id");
  };

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleLanguage();
      }}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/80 border border-border/50 hover:border-primary/50 transition-all duration-300 touch-manipulation active:scale-95"
      aria-label="Switch language"
    >
      <Globe className="w-4 h-4 text-primary" />
      <span className="text-sm font-medium text-foreground uppercase">
        {language === "id" ? "EN" : "ID"}
      </span>
    </button>
  );
};
