import { useState, useRef, useEffect, forwardRef } from "react";
import { MessageSquare, X, Send, Loader2, Sparkles, HelpCircle, ChevronRight, ShoppingBag, RefreshCw, Phone, MessageCircle, Bot, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

// --- HELPER: FORMAT TEXT COMPONENT ---
interface FormattedTextProps {
  text: string;
}

const FormattedText = ({ text }: FormattedTextProps) => {
  if (!text) return null;

  const parseBold = (str: string) => {
    return str.split(/(\*\*.*?\*\*)/g).map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-semibold text-primary">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="space-y-2.5 text-sm leading-relaxed">
      {text.split('\n').map((line, i) => {
        let trimmedLine = line.trim();
        if (!trimmedLine) return <div key={i} className="h-1.5" />;

        trimmedLine = trimmedLine.replace(/\|/g, '').trim();

        // Handle Heading
        if (trimmedLine.startsWith('#')) {
          const headerText = trimmedLine.replace(/^#+\s*/, '');
          return (
            <div key={i} className="pt-2 pb-1 border-b border-primary/30 mb-2">
              <span className="text-primary font-bold uppercase tracking-wider text-[10px]">
                {parseBold(headerText)}
              </span>
            </div>
          );
        }

        // Handle list/bullet
        if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ') || trimmedLine.startsWith('•')) {
          const content = trimmedLine.replace(/^[-*•]\s*/, '');
          return (
            <div key={i} className="flex gap-2.5 pl-1 items-start">
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-accent mt-2 shrink-0" />
              <span className="text-foreground/90">{parseBold(content)}</span>
            </div>
          );
        }
        
        // Handle Numbering
        if (/^\d+\.\s/.test(trimmedLine)) {
          const dotIndex = trimmedLine.indexOf('.');
          const number = trimmedLine.substring(0, dotIndex);
          const content = trimmedLine.substring(dotIndex + 1).trim();
          return (
            <div key={i} className="flex gap-2.5 pl-1 items-start">
              <span className="w-5 h-5 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-[10px] font-bold text-primary shrink-0">{number}</span>
              <span className="text-foreground/90">{parseBold(content)}</span>
            </div>
          );
        }

        return <p key={i} className="text-foreground/85">{parseBold(trimmedLine)}</p>;
      })}
    </div>
  );
};

// --- MESSAGE TYPE ---
interface Message {
  role: 'user' | 'assistant';
  text: string;
}

// --- TYPING INDICATOR ---
const TypingIndicator = () => (
  <div className="flex items-center gap-1.5 px-4 py-3">
    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0ms' }} />
    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '200ms' }} />
    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '400ms' }} />
  </div>
);

// --- AI CHAT WIDGET COMPONENT ---
export const AIChatWidget = forwardRef<HTMLDivElement>((_, ref) => {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const lastMessageRef = useRef<HTMLDivElement>(null);

  // Initialize welcome message based on language
  useEffect(() => {
    setMessages([{ 
      role: 'assistant', 
      text: t.aiChat.welcomeMessage 
    }]);
  }, [language, t.aiChat.welcomeMessage]);

  useEffect(() => {
    if (messages.length > 0 && isOpen) {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [messages, isOpen, showMenu, isLoading]);

  const whatsappMessage = language === 'en' 
    ? 'Hello%2C%20I%20am%20interested%20in%20Tangguh%20EV%20electric%20motorcycles' 
    : 'Halo%2C%20saya%20tertarik%20dengan%20motor%20listrik%20Tangguh%20EV';

  const quickActions = [
    { id: 'produk', label: t.aiChat.actions.specs.label, icon: <ShoppingBag size={16} />, query: t.aiChat.actions.specs.query, isLink: false },
    { id: 'konversi', label: t.aiChat.actions.conversion.label, icon: <RefreshCw size={16} />, query: t.aiChat.actions.conversion.query, isLink: false },
    { id: 'kontak', label: t.aiChat.actions.contact.label, icon: <Phone size={16} />, query: t.aiChat.actions.contact.query, isLink: false },
    { id: 'whatsapp', label: t.aiChat.actions.whatsapp.label, icon: <MessageCircle size={16} />, query: '', isLink: true, href: `https://wa.me/628567360026?text=${whatsappMessage}` }
  ];

  const handleActionClick = (action: typeof quickActions[0]) => {
    if (action.isLink && action.href) {
      window.open(action.href, '_blank', 'noopener,noreferrer');
      return;
    }
    handleSendMessage(null, action.query);
  };

  const handleSendMessage = async (e: React.FormEvent | null, forcedQuery: string | null = null) => {
    if (e) e.preventDefault();
    const query = forcedQuery || inputText;
    if (!query.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: query }]);
    setInputText('');
    setIsLoading(true);
    setShowMenu(false);

    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { message: query, language }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      const fallbackError = language === 'en' ? 'Sorry, a technical issue occurred.' : 'Maaf, terjadi kendala teknis.';
      const aiResponse = data.response || fallbackError;
      setMessages(prev => [...prev, { role: 'assistant', text: aiResponse }]);
      setShowMenu(true);

    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { role: 'assistant', text: t.aiChat.errorConnection }]);
      setShowMenu(true);
      
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : t.aiChat.errorGeneral,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div ref={ref} className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      {isOpen && (
        <div
          className="w-[calc(100vw-2rem)] sm:w-[380px] md:w-[420px] h-[calc(100vh-8rem)] sm:h-[580px] md:h-[640px] max-h-[80vh] rounded-2xl md:rounded-3xl flex flex-col pointer-events-auto mb-4 overflow-hidden relative animate-fade-in"
          style={{
            background: 'linear-gradient(180deg, hsl(210 20% 8%) 0%, hsl(210 18% 6%) 100%)',
            boxShadow: '0 25px 80px -20px rgba(0, 210, 200, 0.35), 0 0 0 1px rgba(0, 210, 200, 0.15), inset 0 1px 0 rgba(255,255,255,0.05)'
          }}
        >
          {/* Glow Effects */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[150px] bg-gradient-to-b from-primary/20 to-transparent blur-[60px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[200px] h-[200px] bg-gradient-to-tl from-accent/10 to-transparent blur-[80px] pointer-events-none" />

          {/* Header */}
          <div className="relative p-4 md:p-5 flex justify-between items-center shrink-0 border-b border-primary/10">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="relative">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary via-primary to-accent flex items-center justify-center shadow-lg"
                  style={{ boxShadow: '0 8px 32px rgba(0, 210, 200, 0.4)' }}>
                  <Bot className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 md:w-4 md:h-4 rounded-full bg-green-500 border-2 border-background" />
              </div>
              <div>
                <h3 className="font-display font-bold text-foreground text-sm md:text-base tracking-tight">{t.aiChat.title}</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Zap className="w-3 h-3 text-primary" />
                  <p className="text-primary text-[9px] md:text-[10px] uppercase font-bold tracking-[0.2em]">{t.aiChat.status}</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="w-10 h-10 rounded-xl bg-secondary/50 hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-all border border-border/50 hover:border-border active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Content */}
          <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4 scrollbar-thin relative">
            {messages.map((msg, idx) => {
              const isLast = idx === messages.length - 1;
              return (
                <div 
                  key={idx} 
                  ref={isLast ? lastMessageRef : null}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg md:rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mr-2 shrink-0 mt-1">
                      <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
                    </div>
                  )}
                  <div className={`max-w-[85%] md:max-w-[80%] rounded-2xl p-3 md:p-4 ${
                    msg.role === 'user' 
                      ? 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-tr-md shadow-lg' 
                      : 'bg-secondary/80 backdrop-blur-sm text-foreground rounded-tl-md border border-border/50'
                  }`}
                  style={msg.role === 'user' ? { boxShadow: '0 4px 20px rgba(0, 210, 200, 0.3)' } : {}}>
                    {msg.role === 'assistant' ? <FormattedText text={msg.text} /> : <p className="text-sm font-medium">{msg.text}</p>}
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex justify-start animate-fade-in">
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg md:rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mr-2 shrink-0">
                  <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
                </div>
                <div className="bg-secondary/80 backdrop-blur-sm border border-border/50 rounded-2xl rounded-tl-md">
                  <TypingIndicator />
                </div>
              </div>
            )}

            {showMenu && !isLoading && (
              <div className="space-y-2 mt-4 pt-4 border-t border-border/30 animate-fade-in">
                <p className="text-[9px] md:text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                  <Zap className="w-3 h-3 text-primary" />
                  {t.aiChat.quickActions}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action) => (
                    <button
                      key={action.id}
                      onClick={() => handleActionClick(action)}
                      className={`flex flex-col items-center gap-2 p-3 md:p-4 rounded-xl md:rounded-2xl text-xs transition-all group text-center relative overflow-hidden active:scale-95 ${
                        action.id === 'whatsapp' 
                          ? 'bg-green-500/10 border border-green-500/30 hover:border-green-500/60 hover:bg-green-500/20' 
                          : 'bg-secondary/40 border border-border/50 hover:border-primary/40 hover:bg-secondary/60'
                      }`}
                    >
                      <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center transition-all ${
                        action.id === 'whatsapp'
                          ? 'bg-green-500/20 text-green-400 group-hover:bg-green-500 group-hover:text-white'
                          : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground'
                      }`}>
                        {action.icon}
                      </div>
                      <span className="font-medium text-foreground/90 leading-tight text-[11px] md:text-xs">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-3 md:p-4 shrink-0 border-t border-border/30 bg-background/50 backdrop-blur-sm">
            <form onSubmit={handleSendMessage} className="flex gap-2 md:gap-3">
              <button 
                type="button"
                onClick={() => setShowMenu(!showMenu)}
                className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center transition-all shrink-0 active:scale-95 ${
                  showMenu 
                    ? 'bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg' 
                    : 'bg-secondary border border-border/50 text-muted-foreground hover:text-foreground hover:border-border'
                }`}
                style={showMenu ? { boxShadow: '0 4px 20px rgba(0, 210, 200, 0.3)' } : {}}
              >
                <HelpCircle size={18} />
              </button>
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={t.aiChat.inputPlaceholder}
                  className="w-full h-10 md:h-12 bg-secondary/60 text-foreground text-sm rounded-lg md:rounded-xl px-3 md:px-4 pr-10 md:pr-12 border border-border/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/60 transition-all"
                />
              </div>
              <button 
                type="submit" 
                disabled={isLoading || !inputText.trim()} 
                className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary to-accent text-primary-foreground rounded-lg md:rounded-xl flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0 shadow-lg hover:shadow-xl active:scale-95"
                style={{ boxShadow: '0 4px 20px rgba(0, 210, 200, 0.3)' }}
              >
                <Send className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </form>
            <p className="text-[8px] md:text-[9px] text-muted-foreground/50 text-center mt-2 md:mt-3 tracking-wide">
              {t.aiChat.poweredBy}
            </p>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="pointer-events-auto relative group active:scale-95 transition-transform"
      >
        {/* Pulse ring - disabled on mobile for performance */}
        {!isOpen && (
          <div className="absolute inset-0 rounded-2xl bg-primary/50 animate-ping hidden md:block" style={{ animationDuration: '2s' }} />
        )}
        <div 
          className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-primary via-primary to-accent flex items-center justify-center transition-all relative overflow-hidden"
          style={{ boxShadow: '0 8px 40px rgba(0, 210, 200, 0.5)' }}
        >
          {/* Inner glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/20 pointer-events-none" />
          {!isOpen ? (
            <MessageSquare className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground" />
          ) : (
            <X className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground" />
          )}
        </div>
        
        {/* Tooltip - hidden on mobile */}
        {!isOpen && (
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-card border border-border rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap hidden md:block">
            <p className="text-xs font-medium text-foreground">{language === 'en' ? 'Chat with AI' : 'Chat dengan AI'}</p>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-card border-r border-t border-border" />
          </div>
        )}
      </button>
    </div>
  );
});

AIChatWidget.displayName = "AIChatWidget";