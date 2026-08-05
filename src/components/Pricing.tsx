import React, { useEffect, useRef, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Clock, ArrowRight } from "lucide-react";

/* ─────────────── Types ─────────────── */
interface PricingPlan {
  title: string;
  priceRange: string;
  description: string;
  features: string[];
  popular?: boolean;
  ctaText?: string;
  completionTime: string;
}

/* ─────────────── Data ─────────────── */
const plans: PricingPlan[] = [
  {
    title: "Starter",
    priceRange: "R2,000 – R3,500",
    description: "Simple websites",
    features: [
      "1–3 pages",
      "Mobile-first design",
      "Contact form",
      "Basic SEO setup",
      "1 month support",
    ],
    completionTime: "3–5 days",
  },
  {
    title: "Standard",
    priceRange: "R3,600 – R5,000",
    description: "Growing businesses",
    popular: true,
    features: [
      "4–6 pages",
      "Custom design",
      "Blog section",
      "Booking forms",
      "3 months support",
    ],
    completionTime: "5–7 days",
  },
  {
    title: "Advanced",
    priceRange: "R5,000 – R7,500",
    description: "Dynamic features",
    features: [
      "7–10 pages",
      "User accounts",
      "Image galleries",
      "Live chat integration",
      "Basic CMS",
    ],
    completionTime: "7–10 days",
  },
  {
    title: "Premium",
    priceRange: "R8,000 – R12,000",
    description: "E-commerce ready",
    features: [
      "10+ pages",
      "Online payments",
      "Product management",
      "Admin dashboard",
      "6 months support",
    ],
    completionTime: "10–15 days",
  },
  {
    title: "Custom",
    priceRange: "R12,000+",
    description: "Tailored solutions",
    ctaText: "Get a Quote",
    features: [
      "Web applications",
      "Multi-vendor stores",
      "Membership systems",
      "API integrations",
      "Custom dashboards",
    ],
    completionTime: "Consultation",
  },
];

/* ─────────────── Card Component ─────────────── */
const PricingCard = React.memo(
  ({
    title,
    priceRange,
    description,
    features,
    popular = false,
    ctaText = "Book a Free Consultation",
    completionTime,
  }: PricingPlan) => {
    return (
      <Card
        className={`relative h-full flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
          popular
            ? "border-space-accent/60 shadow-lg shadow-space-accent/10 ring-1 ring-space-accent/30"
            : "border-white/10 hover:border-white/20"
        }`}
      >
        {popular && (
          <div className="absolute -top-px left-1/2 -translate-x-1/2 z-10">
            <Badge className="bg-gradient-to-r from-space-accent to-red-600 text-white px-3 py-1 text-xs font-semibold rounded-b-lg rounded-t-none">
              Most Popular
            </Badge>
          </div>
        )}

        <CardHeader className="text-center pb-3 pt-6">
          <CardTitle className="text-xl font-bold text-white">
            {title}
          </CardTitle>
          <CardDescription className="text-gray-400 text-sm mt-1">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="py-0 px-6">
          <div className="text-center mb-4">
            <span className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              {priceRange}
            </span>
            {!priceRange.includes("Consultation") && (
              <span className="text-gray-500 ml-1 text-xs font-medium">
                ZAR
              </span>
            )}
          </div>
        </CardContent>

        <CardContent className="px-6 pt-0 pb-4 flex-grow">
          <ul className="space-y-2.5">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="text-space-accent mt-0.5 flex-shrink-0">
                  <Check size={14} strokeWidth={3} />
                </span>
                <span className="text-gray-300 text-sm leading-snug">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>

        <div className="px-6 pb-6 mt-auto">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
            <Clock size={12} aria-hidden="true" />
            <span>
              <span className="font-medium text-gray-400">Delivery:</span>{" "}
              {completionTime}
            </span>
          </div>
          <CardFooter className="p-0">
            <a
              href="#contact"
              className="w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-space-accent focus-visible:ring-offset-2 focus-visible:ring-offset-space-dark rounded-lg"
            >
              <Button
                className={`w-full text-sm h-10 font-semibold transition-all duration-300 ${
                  popular
                    ? "bg-space-accent hover:bg-space-accent/90 text-white"
                    : "bg-white/10 hover:bg-white/20 text-white border border-white/10"
                }`}
              >
                {ctaText}
                <ArrowRight size={14} className="ml-1.5" aria-hidden="true" />
              </Button>
            </a>
          </CardFooter>
        </div>
      </Card>
    );
  },
);

PricingCard.displayName = "PricingCard";

/* ─────────────── Section ─────────────── */
const Pricing: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const memoizedPlans = useMemo(() => plans, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    const elements = sectionRef.current?.querySelectorAll(".reveal-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="py-16 md:py-24"
      aria-label="Pricing plans"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="reveal-on-scroll">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
              Transparent <span className="text-space-accent">Pricing</span>
            </h2>
            <div className="h-1 w-16 bg-space-accent rounded-full mx-auto mt-4" />
          </div>
          <p className="text-gray-300 max-w-lg mx-auto mt-4 text-sm md:text-base reveal-on-scroll">
            High-value development tailored for startups — focused on ROI,
            security, and long-term reliability.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 md:gap-6">
          {memoizedPlans.map((plan, index) => (
            <div
              key={plan.title}
              className="reveal-on-scroll"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <PricingCard {...plan} />
            </div>
          ))}
        </div>

        {/* Trust note */}
        <div className="mt-12 text-center reveal-on-scroll">
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            All plans include a free initial consultation. Custom scope can be
            added to any tier. Prices exclude third-party hosting or API fees.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
