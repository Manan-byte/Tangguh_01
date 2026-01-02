import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import logoTangguh from "@/assets/logo-tangguh.png";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const navLinks = [
    { href: "/#tentang", label: t.nav.about },
    { href: "/#produk", label: t.nav.products },
    { href: "/#konversi", label: t.nav.conversion },
    { href: "/#galeri", label: t.nav.gallery },
    { href: "/#kontak", label: t.nav.contact },
  ];

  const whatsappMessage = language === "id" 
    ? "Halo, saya tertarik dengan motor listrik Tangguh"
    : "Hello, I am interested in Tangguh electric motorcycles";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const isHomePage = location.pathname === "/";
    const hash = href.replace("/#", "#");
    
    if (isHomePage) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(href);
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-border/50"
          : "bg-background/80 backdrop-blur-md"
      }`}
    >
      <div className="container-custom flex items-center justify-between h-16 md:h-20 px-4 md:px-8">
        {/* Logo */}
        <a href="/" onClick={handleLogoClick} className="flex items-center gap-2 md:gap-3 group relative z-[70]">
          <img src={logoTangguh} alt="Tangguh EV Logo" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
          <div className="flex flex-col">
            <span className="font-display font-bold text-base md:text-lg text-foreground group-hover:text-primary transition-colors">
              TANGGUH
            </span>
            <span className="text-[8px] md:text-[10px] tracking-[0.15em] md:tracking-[0.2em] text-muted-foreground -mt-1">
              ELECTRIC VEHICLE
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <LanguageSwitcher />
          <Button variant="hero" size="sm" asChild>
            <a 
              href={`https://wa.me/628567360026?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank" 
              rel="noopener noreferrer"
            >
              {t.nav.contactUs}
            </a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2 relative z-[70]">
          <LanguageSwitcher />
          <button
            type="button"
            className="p-2 text-foreground rounded-lg bg-secondary/50 border border-border/50 min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border absolute top-full left-0 right-0 z-[60]">
          <div className="container-custom py-4 px-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-base font-medium text-foreground hover:text-primary transition-colors py-3 px-4 rounded-lg hover:bg-secondary/50"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
            <Button variant="hero" className="mt-2" asChild>
              <a 
                href={`https://wa.me/628567360026?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank" 
                rel="noopener noreferrer"
              >
                {t.nav.contactUs}
              </a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};
