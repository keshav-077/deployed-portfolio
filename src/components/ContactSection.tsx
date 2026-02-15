import { useState } from "react";
import { Mail, Phone, Github, Linkedin, Send, ArrowUpRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionHeading from "./SectionHeading";

const ContactSection = () => {
  const { toast } = useToast();
  const { ref, isVisible } = useScrollReveal();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    toast({ title: "Message sent!", description: "Thanks for reaching out. I'll get back to you soon." });
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <SectionHeading title="Say" highlight="Hi" subtitle="Get in Touch" isVisible={isVisible} />

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className={`group relative glass rounded-2xl p-8 border border-border/50 overflow-hidden space-y-5 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/3 via-transparent to-accent/3 pointer-events-none" />

            <div className="relative z-10 space-y-5">
              <div>
                <label className="text-sm font-medium mb-1.5 block text-foreground/80">Name *</label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="bg-secondary/50 border-border/50 focus:border-primary transition-colors"
                  maxLength={100}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block text-foreground/80">Email *</label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  className="bg-secondary/50 border-border/50 focus:border-primary transition-colors"
                  maxLength={255}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block text-foreground/80">Subject</label>
                <Input
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="What's this about?"
                  className="bg-secondary/50 border-border/50 focus:border-primary transition-colors"
                  maxLength={200}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block text-foreground/80">Message *</label>
                <Textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Your message..."
                  className="bg-secondary/50 border-border/50 focus:border-primary min-h-[120px] transition-colors"
                  maxLength={1000}
                />
              </div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium hover:opacity-90 hover:shadow-[0_0_20px_-5px_hsl(250_80%_65%/0.4)] transition-all duration-300"
              >
                <Send size={18} /> Send Message
              </button>
            </div>
          </form>

          {/* Contact info */}
          <div
            className={`space-y-5 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="group relative glass rounded-2xl p-8 border border-border/50 overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

              <h3 className="font-semibold text-xl mb-6 relative z-10">Get in Touch</h3>
              <div className="space-y-5 relative z-10">
                <a
                  href="mailto:keshavardhan777@gmail.com"
                  className="flex items-center gap-4 group/item"
                >
                  <div className="p-3 rounded-xl bg-primary/10 group-hover/item:bg-primary/20 transition-colors">
                    <Mail className="text-primary" size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                    <p className="font-medium text-foreground group-hover/item:text-accent transition-colors">
                      keshavardhan777@gmail.com
                    </p>
                  </div>
                  <ArrowUpRight size={16} className="text-muted-foreground group-hover/item:text-accent transition-colors" />
                </a>
                <a
                  href="tel:+918790598252"
                  className="flex items-center gap-4 group/item"
                >
                  <div className="p-3 rounded-xl bg-accent/10 group-hover/item:bg-accent/20 transition-colors">
                    <Phone className="text-accent" size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-0.5">Phone</p>
                    <p className="font-medium text-foreground group-hover/item:text-accent transition-colors">
                      +91 8790598252
                    </p>
                  </div>
                  <ArrowUpRight size={16} className="text-muted-foreground group-hover/item:text-accent transition-colors" />
                </a>
              </div>
            </div>

            <div className="group relative glass rounded-2xl p-8 border border-border/50 overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

              <h3 className="font-semibold text-xl mb-6 relative z-10">Follow Me</h3>
              <div className="flex gap-3 relative z-10">
                {[
                  { icon: Github, label: "GitHub", href: "https://github.com/keshav-077" },
                  { icon: Linkedin, label: "LinkedIn", href: "#" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-secondary/60 border border-border/50 hover:border-primary/40 hover:shadow-[0_0_15px_-3px_hsl(250_80%_65%/0.25)] transition-all duration-300"
                    aria-label={s.label}
                  >
                    <s.icon size={20} />
                    <span className="text-sm font-medium">{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
