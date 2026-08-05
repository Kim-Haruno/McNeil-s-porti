import React from "react";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  position: string;
  company: string;
  rating: number;
  initials: string;
  avatarBg: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "McNeil built our online platform seamlessly.Platform is fast, intuitive, and has significantly improved our client engagement. Highly recommend his expertise.",
    name: "Dr. H. Chauke",
    position: "Practice Director",
    company: "Webbly.Inc",
    rating: 5,
    initials: "MC",
    avatarBg: "bg-blue-600/30 text-blue-400 border-blue-500/30",
  },
  {
    quote:
      "The order process for our food market was completely transformed. Integrating direct WhatsApp ordering saved us hours of manual admin work every single week.",
    name: "R. Mukwevho",
    position: "Operations Lead",
    company: "Ramvees Food Booking",
    rating: 5,
    initials: "RM",
    avatarBg: "bg-orange-600/30 text-orange-400 border-orange-500/30",
  },
  {
    quote:
      "He engineered a modern marketplace interface that easily scales across desktop and mobile devices. Exceptional attention to detail and UI/UX performance.",
    name: "INHIM Trading",
    position: "Product Manager",
    company: "Gaza Market",
    rating: 5,
    initials: "KN",
    avatarBg: "bg-purple-600/30 text-purple-400 border-purple-500/30",
  },
  {
    quote:
      "Delivered a slick, ultra-fast website for our metal fabrication business. Our clients frequently comment on how clear and professional our catalog looks online.",
    name: "T. Selamolela",
    position: "Founder",
    company: "Selamolela Steel Work",
    rating: 5,
    initials: "TS",
    avatarBg: "bg-emerald-600/30 text-emerald-400 border-emerald-500/30",
  },
];

const Testimonials: React.FC = () => {
  return (
    <section
      id="testimonials"
      className="py-16 md:py-24 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Client <span className="text-blue-500">Testimonials</span>
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto mt-3 text-sm md:text-base">
            Feedback from business owners and partners on live systems built for
            speed, utility, and user experience.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md transition-all duration-300 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/5 group"
            >
              {/* Decorative Quote Mark */}
              <Quote
                size={40}
                className="absolute top-6 right-6 text-white/5 group-hover:text-blue-500/10 transition-colors pointer-events-none"
              />

              <div>
                {/* Rating & Company */}
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <div className="flex items-center space-x-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/5 text-gray-300 border border-white/10">
                    {t.company}
                  </span>
                </div>

                {/* Quote Text */}
                <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6 relative z-10 italic">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/5 mt-auto">
                <div
                  className={`w-10 h-10 rounded-full border flex items-center justify-center text-xs font-bold ${t.avatarBg}`}
                >
                  {t.initials}
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm group-hover:text-blue-400 transition-colors">
                    {t.name}
                  </h4>
                  <p className="text-xs text-gray-400">{t.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
