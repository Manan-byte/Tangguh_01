import { useRef, useState } from "react";
import { MapPin, Phone, Mail, Send, MessageCircle, Instagram, Facebook } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

// YouTube Icon Component
const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

// TikTok Icon Component
const TiktokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

interface SocialLink {
  icon: typeof Instagram | typeof Facebook | typeof MessageCircle | typeof YoutubeIcon | typeof TiktokIcon;
  href: string;
  label: string;
  isCustom?: boolean;
}

const socialLinks: SocialLink[] = [
  { icon: Instagram, href: "https://instagram.com/tangguhev", label: "Instagram", isCustom: false },
  { icon: Facebook, href: "https://facebook.com/tangguhev", label: "Facebook", isCustom: false },
  { icon: YoutubeIcon, href: "https://youtube.com/@tangguhev", label: "YouTube", isCustom: true },
  { icon: TiktokIcon, href: "https://tiktok.com/@tangguhev", label: "TikTok", isCustom: true },
  { icon: MessageCircle, href: "https://wa.me/628567360026", label: "WhatsApp", isCustom: false },
];

export const ContactSection = () => {
  const ref = useRef(null);
  const { toast } = useToast();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const contactInfo = [
    { icon: MapPin, label: t.contact.address, value: "Bogor, Jawa Barat, Indonesia" },
    { icon: Phone, label: t.contact.phone, value: "+62 856-7360-026" },
    { icon: Mail, label: t.contact.email, value: "info@tangguhev.com" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const whatsappNumber = "628567360026";
    const text = `Halo, saya ${formData.name}.%0A%0AEmail: ${formData.email}%0ATelepon: ${formData.phone}%0A%0APesan:%0A${formData.message}`;
    
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank");
    
    toast({
      title: t.contact.toast.title,
      description: t.contact.toast.description,
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section id="kontak" className="section-padding relative overflow-hidden bg-secondary/30">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div ref={ref} className="container-custom">
        <div className="text-center mb-16 animate-fade-in">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">
            {t.contact.sectionLabel}
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground mb-6">
            {t.contact.title} <span className="gradient-text">{t.contact.titleHighlight}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.contact.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="animate-fade-in">
            <div className="glass-card rounded-3xl p-8 mb-8">
              <h3 className="font-display font-bold text-2xl text-foreground mb-6">
                {t.contact.infoTitle}
              </h3>
              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">{item.label}</div>
                      <div className="text-foreground font-medium">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-3xl p-8">
              <h3 className="font-display font-semibold text-lg text-foreground mb-4">
                {t.contact.followUs}
              </h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors group"
                    aria-label={social.label}
                  >
                    {social.isCustom ? (
                      <social.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                    ) : (
                      <social.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="animate-fade-in">
            <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-8">
              <h3 className="font-display font-bold text-2xl text-foreground mb-6">
                {t.contact.sendMessage}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">{t.contact.form.name}</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder={t.contact.form.namePlaceholder}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">{t.contact.form.email}</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                      placeholder={t.contact.form.emailPlaceholder}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">{t.contact.form.phone}</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                      placeholder={t.contact.form.phonePlaceholder}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">{t.contact.form.message}</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder={t.contact.form.messagePlaceholder}
                    required
                  />
                </div>
                <Button type="submit" variant="hero" size="lg" className="w-full">
                  <Send className="w-5 h-5" />
                  {t.contact.form.submit}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
