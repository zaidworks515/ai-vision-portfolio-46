import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Send } from "lucide-react";
import { Button } from "./ui/button";
import { SectionHeader } from "./About";

const Contact = () => {
  return (
    <section id="contact" className="py-24 px-4 md:px-8 relative">
      <div className="max-w-4xl mx-auto">
        <SectionHeader label="// contact.reach_me" title="Get In Touch" />

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left - Info */}
          <div className="space-y-6 animate-fade-in-up">
            <div className="terminal-bg rounded-xl p-6 border border-border/50 glow-border-hover scan-line">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-primary/70" />
                </div>
                <span className="font-mono text-xs text-muted-foreground ml-2">contact.json</span>
              </div>
              <div className="font-mono text-sm space-y-2">
                <p><span className="text-primary">"name"</span>: <span className="text-green-400">"Zaid Ahmed"</span>,</p>
                <p><span className="text-primary">"role"</span>: <span className="text-green-400">"AI-ML Engineer"</span>,</p>
                <p><span className="text-primary">"location"</span>: <span className="text-green-400">"Karachi, Pakistan"</span>,</p>
                <p><span className="text-primary">"status"</span>: <span className="text-primary animate-pulse">"open_to_opportunities"</span></p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: "zaid_works515@outlook.com",
                  href: "mailto:zaid_works515@outlook.com",
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: "+92 336 1084577",
                  href: "tel:+923361084577",
                },
                {
                  icon: MapPin,
                  label: "Location",
                  value: "Block 13/B, Gulshan-e-Iqbal, Karachi",
                  href: null,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-4 p-4 terminal-bg rounded-lg border border-border/50 hover:border-primary/30 transition-all duration-300 group"
                >
                  <div className="w-9 h-9 rounded-lg border border-primary/30 bg-primary/5 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                    <item.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-muted-foreground">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-foreground hover:text-primary transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-sm text-foreground">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Social & CTA */}
          <div className="space-y-6 animate-fade-in-up animate-delay-200">
            <div className="terminal-bg rounded-xl p-6 border border-primary/20 glow-border">
              <h3 className="font-bold text-foreground mb-2">Let's Build Something Amazing</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Open to full-time roles, contract work, and exciting AI/ML collaborations. Let's discuss how I can add value to your team or project.
              </p>

              <div className="space-y-3">
                <Button
                  asChild
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-mono shadow-[0_0_20px_hsl(174_100%_50%/0.3)] hover:shadow-[0_0_30px_hsl(174_100%_50%/0.5)] transition-all duration-300"
                >
                  <a href="mailto:zaid_works515@outlook.com">
                    <Send className="mr-2 h-4 w-4" />
                    Send Email
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-primary/30 text-primary hover:bg-primary/10 font-mono transition-all duration-300"
                >
                  <a href="https://linkedin.com/in/zaidworks515" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-4 w-4" />
                    Connect on LinkedIn
                  </a>
                </Button>
              </div>
            </div>

            {/* Social grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { href: "https://github.com/zaidworks515", icon: Github, label: "GitHub", sub: "@zaidworks515" },
                { href: "https://linkedin.com/in/zaidworks515", icon: Linkedin, label: "LinkedIn", sub: "/in/zaidworks515" },
                { href: "https://www.kaggle.com/zaidworks0508", label: "Kaggle", sub: "zaidworks0508", kaggle: true },
                { href: "https://zaidportfolio.lovable.app", icon: ExternalLink, label: "Portfolio", sub: "zaidportfolio.lovable.app" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col p-4 terminal-bg rounded-lg border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_15px_hsl(174_100%_50%/0.15)] group"
                >
                  <div className="text-primary mb-1 group-hover:scale-110 transition-transform duration-200">
                    {social.kaggle ? (
                      <span className="font-bold font-mono text-lg">K</span>
                    ) : (
                      <social.icon className="h-5 w-5" />
                    )}
                  </div>
                  <div className="font-semibold text-sm text-foreground">{social.label}</div>
                  <div className="text-xs text-muted-foreground font-mono truncate">{social.sub}</div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-border/30 text-center">
          <p className="font-mono text-xs text-muted-foreground">
            <span className="text-primary">{">"}</span> Built with React & ❤️ by Zaid Ahmed · {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
