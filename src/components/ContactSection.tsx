import { useState } from "react";
import { Mail, Phone, Github, Linkedin, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
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
    <section id="contact" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          Say <span className="gradient-text">Hi</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">
          Have a project in mind or want to collaborate? Let's connect!
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 gradient-border space-y-5">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Name *</label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                className="bg-secondary/50 border-border/50 focus:border-primary"
                maxLength={100}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Email *</label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="your@email.com"
                className="bg-secondary/50 border-border/50 focus:border-primary"
                maxLength={255}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Subject</label>
              <Input
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                placeholder="What's this about?"
                className="bg-secondary/50 border-border/50 focus:border-primary"
                maxLength={200}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Message *</label>
              <Textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Your message..."
                className="bg-secondary/50 border-border/50 focus:border-primary min-h-[120px]"
                maxLength={1000}
              />
            </div>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              <Send size={18} /> Send Message
            </button>
          </form>

          {/* Contact info */}
          <div className="space-y-6">
            <div className="glass rounded-2xl p-8 gradient-border">
              <h3 className="font-semibold text-xl mb-6">Get in Touch</h3>
              <div className="space-y-5">
                <a
                  href="mailto:keshavardhan777@gmail.com"
                  className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Mail className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-foreground">keshavardhan777@gmail.com</p>
                  </div>
                </a>
                <a
                  href="tel:+918790598252"
                  className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <div className="p-3 rounded-xl bg-accent/10">
                    <Phone className="text-accent" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium text-foreground">+91 8790598252</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="glass rounded-2xl p-8 gradient-border">
              <h3 className="font-semibold text-xl mb-6">Follow Me</h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com/keshav-077"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-secondary/60 border border-border/50 hover:border-primary/40 hover:glow-sm transition-all"
                  aria-label="GitHub"
                >
                  <Github size={24} />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-secondary/60 border border-border/50 hover:border-primary/40 hover:glow-sm transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
