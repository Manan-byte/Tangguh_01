import { Zap } from "lucide-react";

const footerLinks = {
  produk: [
    { label: "ST3", href: "#produk" },
    { label: "DX4", href: "#produk" },
    { label: "SP5", href: "#produk" },
    { label: "Konversi", href: "#layanan" },
  ],
  layanan: [
    { label: "Konversi Motor", href: "#layanan" },
    { label: "Perawatan", href: "#layanan" },
    { label: "Konsultasi", href: "#layanan" },
    { label: "Pelatihan", href: "#layanan" },
  ],
  perusahaan: [
    { label: "Tentang Kami", href: "#tentang" },
    { label: "Galeri", href: "#galeri" },
    { label: "Kontak", href: "#kontak" },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border/50">
      <div className="container-custom px-4 md:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="font-display font-bold text-primary-foreground text-xl">T</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg text-foreground">TANGGUH</span>
                <span className="text-[10px] tracking-[0.2em] text-muted-foreground -mt-1">
                  ELECTRIC VEHICLE
                </span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              Inovasi kendaraan listrik Indonesia. Motor trail listrik tangguh untuk petualangan tanpa batas.
            </p>
            <div className="flex items-center gap-2 text-primary">
              <Zap className="w-5 h-5" />
              <span className="text-sm font-medium">100% Electric</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Produk</h4>
            <ul className="space-y-3">
              {footerLinks.produk.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Layanan</h4>
            <ul className="space-y-3">
              {footerLinks.layanan.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Perusahaan</h4>
            <ul className="space-y-3">
              {footerLinks.perusahaan.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Tangguh Electric Vehicle. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">
            Made with ⚡ in Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
};
