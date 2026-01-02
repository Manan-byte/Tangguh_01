import { forwardRef } from "react";
import { Zap, Download } from "lucide-react";
import logoTangguh from "@/assets/logo-tangguh.png";
import { useLanguage } from "@/contexts/LanguageContext";

export const Footer = forwardRef<HTMLElement>((_, ref) => {
  const { t } = useLanguage();

  const footerLinks: {
    produk: { label: string; href: string; isDownload?: boolean }[];
    layanan: { label: string; href: string; isDownload?: boolean }[];
    perusahaan: { label: string; href: string; isDownload?: boolean }[];
  } = {
    produk: [
      { label: "ST3", href: "#produk" },
      { label: "DX4", href: "#produk" },
      { label: "SP5", href: "#produk" },
      { label: t.footer.links.conversion, href: "#layanan" },
    ],
    layanan: [
      { label: t.footer.links.motorConversion, href: "#layanan" },
      { label: t.footer.links.maintenance, href: "#layanan" },
      { label: t.footer.links.consulting, href: "#layanan" },
      { label: t.footer.links.training, href: "#layanan" },
    ],
    perusahaan: [
      { label: t.footer.links.aboutUs, href: "#tentang" },
      { label: t.footer.links.gallery, href: "#galeri" },
      { label: t.footer.links.contact, href: "#kontak" },
      { label: t.footer.links.companyProfile, href: "/documents/company-profile.pdf", isDownload: true },
    ],
  };

  return (
    <footer ref={ref} className="bg-card border-t border-border/50">
      <div className="container-custom px-4 md:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img src={logoTangguh} alt="Tangguh EV Logo" className="w-10 h-10 object-contain" />
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg text-foreground">TANGGUH</span>
                <span className="text-[10px] tracking-[0.2em] text-muted-foreground -mt-1">ELECTRIC VEHICLE</span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{t.footer.description}</p>
            <div className="flex items-center gap-2 text-primary">
              <Zap className="w-5 h-5" />
              <span className="text-sm font-medium">{t.footer.electric}</span>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">{t.footer.product}</h4>
            <ul className="space-y-3">
              {footerLinks.produk.map((link) => (
                <li key={link.label}><a href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">{link.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">{t.footer.service}</h4>
            <ul className="space-y-3">
              {footerLinks.layanan.map((link) => (
                <li key={link.label}><a href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">{link.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">{t.footer.company}</h4>
            <ul className="space-y-3">
              {footerLinks.perusahaan.map((link) => (
                <li key={link.label}>
                  {link.isDownload ? (
                    <a 
                      href={link.href} 
                      download 
                      className="text-muted-foreground hover:text-primary transition-colors text-sm inline-flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      {link.label}
                    </a>
                  ) : (
                    <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">{link.label}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">© {new Date().getFullYear()} Tangguh Electric Vehicle. {t.footer.copyright}</p>
          <p className="text-muted-foreground text-sm">{t.footer.madeIn}</p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";