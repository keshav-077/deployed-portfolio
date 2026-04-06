import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Mail, Phone, Github, Linkedin, Send, Loader2, ArrowUpRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionHeading from "./SectionHeading";

const ContactSection = () => {
  const { toast } = useToast();
  const { ref, isVisible } = useScrollReveal();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    setSending(true);
    try {
      await emailjs.send(
        "service_n8c6eko",
        "template_3p0opym",
        {
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        },
        "VCehBPkLou-GijNjT"
      );
      toast({ title: "Message sent!", description: "Thanks for reaching out. I'll get back to you soon." });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast({ title: "Failed to send message", description: "Please try again or email me directly.", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <SectionHeading title="Say" highlight="Hi" subtitle="Get in Touch" isVisible={isVisible} />

        <div className="grid md:grid-cols-2 gap-6">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className={`group relative rounded-2xl p-8 bg-card/60 border border-border/40 overflow-hidden space-y-5 transition-all duration-700 delay-200 hover:border-foreground/20 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="relative z-10 space-y-5">
              <div>
                <label className="text-sm font-medium mb-1.5 block text-foreground/60">Name *</label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="bg-secondary/60 border-border/40 focus:border-foreground/30 transition-colors"
                  maxLength={100}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block text-foreground/60">Email *</label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  className="bg-secondary/60 border-border/40 focus:border-foreground/30 transition-colors"
                  maxLength={255}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block text-foreground/60">Subject</label>
                <Input
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="What's this about?"
                  className="bg-secondary/60 border-border/40 focus:border-foreground/30 transition-colors"
                  maxLength={200}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block text-foreground/60">Message *</label>
                <Textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Your message..."
                  className="bg-secondary/60 border-border/40 focus:border-foreground/30 min-h-[120px] transition-colors"
                  maxLength={1000}
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-medium hover:bg-foreground/90 transition-all duration-300 disabled:opacity-60"
              >
                {sending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                {sending ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>

          {/* Contact info */}
          <div
            className={`space-y-5 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="group relative rounded-2xl p-8 bg-card/60 border border-border/40 overflow-hidden hover:border-foreground/20 transition-all">
              <h3 className="font-medium text-xl mb-6 text-foreground/90 relative z-10">Get in Touch</h3>
              <div className="space-y-5 relative z-10">
                <a href="mailto:keshavardhan777@gmail.com" className="flex items-center gap-4 group/item">
                  <div className="p-3 rounded-xl bg-foreground/5 border border-foreground/10 group-hover/item:bg-foreground/10 transition-colors">
                    <Mail className="text-foreground/50" size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                    <p className="font-medium text-foreground/80 group-hover/item:text-foreground transition-colors text-sm">
                      keshavardhan777@gmail.com
                    </p>
                  </div>
                  <ArrowUpRight size={16} className="text-muted-foreground group-hover/item:text-foreground/70 transition-colors" />
                </a>
                <a href="tel:+918790598252" className="flex items-center gap-4 group/item">
                  <div className="p-3 rounded-xl bg-foreground/5 border border-foreground/10 group-hover/item:bg-foreground/10 transition-colors">
                    <Phone className="text-foreground/50" size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-0.5">Phone</p>
                    <p className="font-medium text-foreground/80 group-hover/item:text-foreground transition-colors text-sm">
                      +91 8790598252
                    </p>
                  </div>
                  <ArrowUpRight size={16} className="text-muted-foreground group-hover/item:text-foreground/70 transition-colors" />
                </a>
              </div>
            </div>

            <div className="group relative rounded-2xl p-8 bg-card/60 border border-border/40 overflow-hidden hover:border-foreground/20 transition-all">
              <h3 className="font-medium text-xl mb-6 text-foreground/90 relative z-10">Follow Me</h3>
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
                    className="flex items-center gap-2 px-5 py-3 rounded-full bg-foreground/5 border border-foreground/10 hover:border-foreground/25 transition-all duration-300 text-foreground/60 hover:text-foreground/80"
                    aria-label={s.label}
                  >
                    <s.icon size={18} />
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
