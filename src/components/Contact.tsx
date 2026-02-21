import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Send } from "lucide-react";
import { Button } from "./ui/button";
import { SectionHeader } from "./About";

const Contact = () => {
  return (
    <section id="contact" className="py-20 px-4 md:px-8 section-light">
      <div className="max-w-5xl mx-auto">
        <SectionHeader title="Get In Touch" subtitle="Open to full-time roles, contract work, and exciting AI/ML collaborations." />

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left - Info */}
          <div className="space-y-4 animate-fade-in-up">
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
                className="flex items-center gap-4 p-5 bg-background rounded-2xl border border-border card-hover shadow-sm group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
                  <item.icon className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{item.label}</div>
                  {item.href ? (
                    <a href={item.href} className="text-sm text-foreground font-medium hover:text-primary transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-sm text-foreground font-medium">{item.value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right - CTA & Social */}
          <div className="space-y-6 animate-fade-in-up animate-delay-200">
            <div className="bg-background rounded-2xl p-8 border border-primary/20 shadow-sm">
              <h3 className="font-bold text-foreground text-lg mb-2">Let's Build Something Amazing</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-body">
                Let's discuss how I can add value to your team or project. Whether it's AI/ML consulting, product development, or research collaboration.
              </p>

              <div className="space-y-3">
                <Button
                  asChild
                  className="w-full bg-primary text-primary-foreground hover:brightness-110 font-semibold shadow-md transition-all duration-200"
                >
                  <a href="mailto:zaid_works515@outlook.com">
                    <Send className="mr-2 h-4 w-4" />
                    Send Email
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-primary/30 text-primary hover:bg-primary/10 font-semibold transition-all duration-200"
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
                { href: "/Resume-Zaid_Ahmed.pdf", icon: ExternalLink, label: "Resume", sub: "Download CV" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col p-4 bg-background rounded-2xl border border-border card-hover shadow-sm group"
                >
                  <div className="text-primary mb-2 group-hover:scale-110 transition-transform duration-200">
                    {social.kaggle ? (
                      <span className="font-bold text-lg">K</span>
                    ) : (
                      <social.icon className="h-5 w-5" />
                    )}
                  </div>
                  <div className="font-semibold text-sm text-foreground">{social.label}</div>
                  <div className="text-xs text-muted-foreground truncate">{social.sub}</div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            Built with React & ❤️ by <span className="text-primary font-semibold">Zaid Ahmed</span> · {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
