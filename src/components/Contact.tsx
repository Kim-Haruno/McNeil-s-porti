import React, { useState, useEffect, useRef } from "react";
import {
  Mail,
  Github,
  Linkedin,
  Facebook,
  Phone,
  Loader2,
  Send,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const Contact: React.FC = () => {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);

  // Intersection Observer for Scroll Animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    document.querySelectorAll(".appear-animation").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (success) setSuccess(false);
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setSuccess(false);

    try {
      const submission = new URLSearchParams();
      new FormData(e.currentTarget).forEach((value, key) => {
        submission.append(key, String(value));
      });

      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: submission.toString(),
      });

      if (!response.ok) throw new Error("Netlify form submission failed");

        setSuccess(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
    } catch (error) {
      console.error("Email sending error:", error);
      toast({
        title: "Message failed",
        description:
          "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-12 sm:py-16 md:py-20 lg:py-28 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Header */}
        <div className="appear-animation text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 inline-block relative tracking-tight text-white">
            Get In <span className="text-blue-500">Touch</span>
            <span className="block h-1 w-1/2 bg-blue-500 mt-2 mx-auto rounded-full" />
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-xs sm:text-sm md:text-base px-4">
            Have a project in mind, need software architecture guidance, or just
            want to chat? I'm always open to discussing new opportunities and
            ideas.
          </p>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10">
          {/* Form Side */}
          <div className="appear-animation lg:w-1/2 bg-white/[0.02] border border-white/10 backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
              Send Me a Message
            </h3>

            <form
              ref={formRef}
              onSubmit={sendEmail}
              name="contact"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              className="space-y-4 sm:space-y-5"
            >
              <input type="hidden" name="form-name" value="contact" />
              <div hidden>
                <Label htmlFor="bot-field">Don't fill this out</Label>
                <Input id="bot-field" name="bot-field" tabIndex={-1} autoComplete="off" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <Label
                    htmlFor="name"
                    className="text-gray-300 text-xs font-semibold mb-1.5 block"
                  >
                    Name
                  </Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 rounded-xl h-10 sm:h-11 text-sm"
                    placeholder="Your name"
                    onChange={handleChange}
                    value={formData.name}
                    required
                  />
                </div>
                <div>
                  <Label
                    htmlFor="email"
                    className="text-gray-300 text-xs font-semibold mb-1.5 block"
                  >
                    Email
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 rounded-xl h-10 sm:h-11 text-sm"
                    placeholder="your.email@example.com"
                    onChange={handleChange}
                    value={formData.email}
                    required
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="phone"
                  className="text-gray-300 text-xs font-semibold mb-1.5 block"
                >
                  Phone Number (Optional)
                </Label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 rounded-xl h-10 sm:h-11 text-sm"
                  placeholder="+27 71 523 1720"
                  onChange={handleChange}
                  value={formData.phone}
                />
              </div>

              <div>
                <Label
                  htmlFor="subject"
                  className="text-gray-300 text-xs font-semibold mb-1.5 block"
                >
                  Subject
                </Label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 rounded-xl h-10 sm:h-11 text-sm"
                  placeholder="What is this regarding?"
                  onChange={handleChange}
                  value={formData.subject}
                  required
                />
              </div>

              <div>
                <Label
                  htmlFor="message"
                  className="text-gray-300 text-xs font-semibold mb-1.5 block"
                >
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 rounded-xl resize-none text-sm"
                  placeholder="Your message here..."
                  onChange={handleChange}
                  value={formData.message}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 sm:px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 text-sm sm:text-base"
                disabled={isSending}
              >
                {isSending ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Message</span>
                  </>
                )}
              </Button>

              {success && (
                <p className="text-emerald-400 text-xs sm:text-sm mt-3 font-medium">
                  ✓ Message sent successfully! I will reply shortly.
                </p>
              )}
            </form>
          </div>

          {/* Contact Details Side */}
          <div className="appear-animation lg:w-1/2 flex flex-col justify-between bg-white/[0.02] border border-white/10 backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                Contact Information
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed mb-6 sm:mb-8">
                Feel free to reach out through any of the channels below or book
                a direct request.
              </p>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="p-2.5 sm:p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400 flex-shrink-0">
                    <Mail size={18} className="sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold text-gray-400 mb-0.5">
                      Email
                    </h4>
                    <a
                      href="mailto:mcneal0745516650@gmail.com"
                      className="text-white hover:text-blue-400 font-medium transition-colors text-sm sm:text-base break-words"
                    >
                      mcneal0745516650@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="p-2.5 sm:p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400 flex-shrink-0">
                    <Phone size={18} className="sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold text-gray-400 mb-0.5">
                      Phone
                    </h4>
                    <a
                      href="tel:+27659016426"
                      className="text-white hover:text-blue-400 font-medium transition-colors text-sm sm:text-base"
                    >
                      +27 65 901 6426
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links & CTA */}
            <div className="pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-white/10 space-y-5 sm:space-y-6">
              <div>
                <h4 className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold text-gray-400 mb-2.5 sm:mb-3">
                  Connect With Me
                </h4>
                <div className="flex gap-2 sm:gap-3 flex-wrap">
                  <a
                    href="https://github.com/Kim-Haruno"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    className="p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <Github size={18} className="sm:w-5 sm:h-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/mcneil-maseko-586716201"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    className="p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <Linkedin size={18} className="sm:w-5 sm:h-5" />
                  </a>
                  
                </div>
              </div>

              <div>
                <a
                  href="mailto:mcneal0745516650@gmail.com?subject=Free%20consultation%20request"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-5 py-2.5 sm:py-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 font-semibold rounded-xl text-xs sm:text-sm transition-colors"
                >
                  Book a free consultation
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
