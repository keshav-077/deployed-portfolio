import { useState } from "react";
import { Send, Loader2, Check, Copy, AlertCircle } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useContactForm } from "@/hooks/useContactForm";
import { profile } from "@/data/profile";

const CoastalContact = () => {
  const { ref, isVisible } = useScrollReveal();
  const { values, errors, status, setField, submit } = useContactForm();
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Duplicate submissions are prevented inside the hook (R6.3).
    void submit();
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      // Visible confirmation shows within 1s and lingers briefly (R6.9).
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — leave the direct-line link as the fallback.
    }
  };

  const isSubmitting = status === "submitting";
  const isSuccess = status === "success";
  const isError = status === "error";
  const isRateLimited = status === "rate_limited";

  return (
    <section id="contact" ref={ref} className="py-24 px-8 md:px-20 bg-[#F6F2EE]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20">
        <div>
          <h2 className={`font-display italic font-bold text-4xl md:text-6xl text-[#1C2B36] mb-8 reveal-text ${isVisible ? 'is-in' : ''}`}>
            Say Hi.
          </h2>
          <p className={`text-muted max-w-sm mb-12 stagger-in ${isVisible ? 'is-in' : ''}`} style={{ transitionDelay: '300ms' }}>
            Open for collaborations, research opportunities, or just a sophisticated chat about AI.
          </p>
          <div className={`space-y-4 stagger-in ${isVisible ? 'is-in' : ''}`} style={{ transitionDelay: '400ms' }}>
            <p className="font-mono text-[11px] tracking-widest text-accent-1 uppercase">Direct Line</p>
            <a href={`mailto:${profile.email}`} className="font-display italic text-2xl text-[#1C2B36] hover:text-accent-2 transition-colors inline-flex min-h-[44px] items-center rounded-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-1">
              {profile.email}
            </a>
            <button
              type="button"
              onClick={handleCopyEmail}
              aria-label="Copy email address to clipboard"
              className="group inline-flex min-h-[44px] items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-accent-1 uppercase hover:text-accent-2 transition-colors outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-1"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span aria-live="polite">{copied ? "Copied!" : "Copy Email"}</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className={`space-y-8 stagger-in ${isVisible ? 'is-in' : ''}`} style={{ transitionDelay: '500ms' }}>
          {/* Honeypot: hidden from sight and assistive tech, never tab-focusable (R6.7). */}
          <div aria-hidden="true" className="absolute w-px h-px -m-px overflow-hidden p-0 border-0" style={{ clip: 'rect(0 0 0 0)', clipPath: 'inset(50%)' }}>
            <label htmlFor="website">Leave this field empty</label>
            <input
              type="text"
              id="website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={values.website}
              onChange={(e) => setField('website', e.target.value)}
            />
          </div>

          <div className="space-y-2 border-b border-[#1C2B36]/10 pb-4 focus-within:border-accent-1 transition-colors">
            <label htmlFor="contact-name" className="font-mono text-[10px] tracking-widest text-muted uppercase">Name</label>
            <input
              type="text"
              id="contact-name"
              value={values.name}
              onChange={(e) => setField('name', e.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
              className="w-full bg-transparent border-none outline-none font-display italic text-xl text-[#1C2B36] placeholder:text-[#1C2B36]/20"
              placeholder="Your name"
            />
            {errors.name && (
              <p id="contact-name-error" className="font-mono text-[10px] tracking-wide text-red-600">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2 border-b border-[#1C2B36]/10 pb-4 focus-within:border-accent-1 transition-colors">
            <label htmlFor="contact-email" className="font-mono text-[10px] tracking-widest text-muted uppercase">Email</label>
            <input
              type="email"
              id="contact-email"
              value={values.email}
              onChange={(e) => setField('email', e.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
              className="w-full bg-transparent border-none outline-none font-display italic text-xl text-[#1C2B36] placeholder:text-[#1C2B36]/20"
              placeholder="your@email.com"
            />
            {errors.email && (
              <p id="contact-email-error" className="font-mono text-[10px] tracking-wide text-red-600">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2 border-b border-[#1C2B36]/10 pb-4 focus-within:border-accent-1 transition-colors">
            <label htmlFor="contact-message" className="font-mono text-[10px] tracking-widest text-muted uppercase">Message</label>
            <textarea
              id="contact-message"
              value={values.message}
              onChange={(e) => setField('message', e.target.value)}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "contact-message-error" : undefined}
              className="w-full bg-transparent border-none outline-none font-display italic text-xl text-[#1C2B36] placeholder:text-[#1C2B36]/20 min-h-[100px] resize-none"
              placeholder="Your message..."
            />
            {errors.message && (
              <p id="contact-message-error" className="font-mono text-[10px] tracking-wide text-red-600">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="group flex min-h-[44px] items-center gap-4 font-mono text-[11px] tracking-[0.2em] text-accent-1 uppercase hover:text-accent-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-1"
          >
            {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
            <div className="w-12 h-[1px] bg-accent-1 group-hover:w-20 transition-all duration-500" />
          </button>

          {/* Success confirmation with a gentle entrance animation (R6.4). */}
          {isSuccess && (
            <div
              role="status"
              className="flex items-center gap-3 text-accent-2 stagger-in is-in"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-accent-2/10 animate-in zoom-in duration-300">
                <Check size={16} className="text-accent-2" />
              </span>
              <p className="font-display italic text-lg text-[#1C2B36]">Message sent. Thanks for reaching out.</p>
            </div>
          )}

          {/* Delivery / rate-limit errors retain the visitor's values (R6.5). */}
          {(isError || isRateLimited) && (
            <div role="alert" className="flex items-start gap-3 text-red-600">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <p className="font-mono text-[11px] tracking-wide leading-relaxed">
                {isRateLimited
                  ? "Too many messages sent. Please wait a few minutes and try again."
                  : "Something went wrong and your message wasn't delivered. Please try again."}
              </p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default CoastalContact;
