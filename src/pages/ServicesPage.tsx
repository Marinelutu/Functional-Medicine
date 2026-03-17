import { useState, useRef, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ── Categories ── */
const categories = ["All", "Weight Loss", "Hormones", "Longevity", "Gut Health", "Mental Clarity", "Sexual Health", "Skin & Hair"];

/* ── Botanical SVG Icons (28px, gold #C9A84C, stroke-only, no fill) ── */

const IconLeaf = () => (
  <svg width="28" height="28" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 28C8 28 10 10 28 6C28 6 26 24 8 28Z" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 28C8 28 18 18 28 6" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconMoonDot = () => (
  <svg width="28" height="28" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 10C20.13 10 17 13.13 17 17C17 20.87 20.13 24 24 24C24.34 24 24.67 23.97 25 23.93C23.23 25.81 20.73 27 18 27C12.48 27 8 22.52 8 17C8 11.48 12.48 7 18 7C20.73 7 23.23 8.19 25 10.07C24.67 10.03 24.34 10 24 10Z" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="27" cy="9" r="1.2" stroke="#C9A84C" strokeWidth="1.5" />
  </svg>
);

const IconSun = () => (
  <svg width="28" height="28" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="18" r="5" stroke="#C9A84C" strokeWidth="1.5" />
    <line x1="18" y1="5" x2="18" y2="9" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="18" y1="27" x2="18" y2="31" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="5" y1="18" x2="9" y2="18" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="27" y1="18" x2="31" y2="18" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="8.81" y1="8.81" x2="11.64" y2="11.64" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="24.36" y1="24.36" x2="27.19" y2="27.19" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconRoot = () => (
  <svg width="28" height="28" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6V16" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M18 16C18 16 14 20 10 30" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M18 16C18 16 22 20 26 30" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M18 22C18 22 20 26 18 32" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M13 24C13 24 11 27 9 28" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M23 24C23 24 25 27 27 28" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconLotus = () => (
  <svg width="28" height="28" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 28C18 28 18 20 18 16" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M18 16C16 12 12 8 18 4C24 8 20 12 18 16Z" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 20C14 18 8 16 6 20C10 22 14 20 18 20Z" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 20C22 18 28 16 30 20C26 22 22 20 18 20Z" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconRose = () => (
  <svg width="28" height="28" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 30V20" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M18 20C18 20 12 18 10 14C10 14 14 10 18 12C22 10 26 14 26 14C24 18 18 20 18 20Z" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 12C18 12 15 8 18 5C21 8 18 12 18 12Z" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 26C14 26 10 24 8 26" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconSprig = () => (
  <svg width="28" height="28" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 30V10" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M18 14C18 14 22 10 26 10C26 10 24 14 18 14Z" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 20C18 20 14 16 10 16C10 16 12 20 18 20Z" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 26C18 26 22 22 26 22C26 22 24 26 18 26Z" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconFlame = () => (
  <svg width="28" height="28" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 4C18 4 26 14 26 22C26 26.42 22.42 30 18 30C13.58 30 10 26.42 10 22C10 14 18 4 18 4Z" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 30C18 30 14 26 14 22C14 18 18 14 18 14C18 14 22 18 22 22C22 26 18 30 18 30Z" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconButterfly = () => (
  <svg width="28" height="28" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 10V28" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M18 14C14 10 8 8 6 12C4 16 10 20 18 18" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 14C22 10 28 8 30 12C32 16 26 20 18 18" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 22C15 24 12 28 14 30C16 32 18 28 18 22" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 22C21 24 24 28 22 30C20 32 18 28 18 22" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconMoonStars = () => (
  <svg width="28" height="28" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 8C18.69 8 16 10.69 16 14C16 17.31 18.69 20 22 20C22.34 20 22.67 19.97 23 19.93C21.23 21.81 18.73 23 16 23C11.58 23 8 19.42 8 15C8 10.58 11.58 7 16 7C18.73 7 21.23 8.19 23 10.07C22.67 10.03 22.34 10 22 10" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M26 14L26.9 16.1L29 17L26.9 17.9L26 20L25.1 17.9L23 17L25.1 16.1L26 14Z" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M29 8L29.5 9.5L31 10L29.5 10.5L29 12L28.5 10.5L27 10L28.5 9.5L29 8Z" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconFern = () => (
  <svg width="28" height="28" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 32V6" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M18 10C20 8 24 7 26 8" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M18 14C20 12 24 11 26 12" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M18 18C20 16 24 15 26 16" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M18 22C20 20 24 19 26 20" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M18 10C16 8 12 7 10 8" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M18 14C16 12 12 11 10 12" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M18 18C16 16 12 15 10 16" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M18 22C16 20 12 19 10 20" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconDroplet = () => (
  <svg width="28" height="28" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 4C18 4 8 16 8 22C8 27.52 12.48 32 18 32C23.52 32 28 27.52 28 22C28 16 18 4 18 4Z" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 22C16 22 18 18 20 20C22 22 18 26 18 26C18 26 14 24 16 22Z" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M19 19V16" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/* ── Service Data ── */
interface Service {
  id: string;
  name: string;
  category: string;
  outcome: string;
  categoryTag: string;
  desc: string;
  who: string;
  included: string[];
  image: string;
  icon: React.FC;
}

const services: Service[] = [
  {
    id: "metabolic-reset",
    name: "Metabolic Reset",
    category: "Weight Loss",
    categoryTag: "WEIGHT LOSS",
    outcome: "Lose stubborn weight by fixing your metabolism at its source.",
    desc: "Our Metabolic Reset targets insulin resistance, thyroid dysfunction, and hormonal imbalances that keep weight locked on. Through advanced metabolic testing and personalized nutrition protocols, we identify exactly what's blocking your body from burning fat efficiently. Most members see measurable changes within the first 6 weeks.",
    who: "For those who've tried every diet without lasting results.",
    included: [
      "Advanced metabolic panel & body composition analysis",
      "Custom macro & micronutrient protocol",
      "8-week guided transformation with bi-weekly check-ins"
    ],
    image: "/images/services/metabolic-reset.png",
    icon: IconLeaf,
  },
  {
    id: "hormone-optimization",
    name: "Hormone Optimization",
    category: "Hormones",
    categoryTag: "HORMONES",
    outcome: "Restore hormonal balance for energy, mood, and vitality.",
    desc: "We map your complete hormonal landscape — cortisol, thyroid, sex hormones, and metabolic markers. Then we build a protocol that addresses imbalances naturally before considering bioidentical options. Our approach has helped thousands reclaim the energy and clarity they thought was gone forever.",
    who: "For anyone experiencing fatigue, mood swings, or hormonal shifts.",
    included: [
      "Full hormone panel with functional interpretation",
      "Personalized supplement & lifestyle protocol",
      "90-day follow-up with labs & adjustments"
    ],
    image: "/images/services/hormone-optimization.png",
    icon: IconMoonDot,
  },
  {
    id: "longevity-protocol",
    name: "Longevity Protocol",
    category: "Longevity",
    categoryTag: "LONGEVITY",
    outcome: "Optimize your biological age and healthspan.",
    desc: "Combining cutting-edge longevity science with functional medicine, we target the root mechanisms of aging. From telomere support to mitochondrial optimization, every element of your protocol is designed to extend not just lifespan, but healthspan — the years you feel truly alive.",
    who: "For high-performers who want to age on their own terms.",
    included: [
      "Biological age testing & telomere analysis",
      "Mitochondrial support & NAD+ optimization",
      "Quarterly longevity metrics review"
    ],
    image: "/images/services/longevity-protocol.png",
    icon: IconSun,
  },
  {
    id: "gut-restoration",
    name: "Gut Restoration",
    category: "Gut Health",
    categoryTag: "GUT HEALTH",
    outcome: "Heal your gut to transform digestion, immunity, and mood.",
    desc: "Your gut is the foundation of your health. Our Gut Restoration protocol uses comprehensive stool analysis, food sensitivity testing, and targeted probiotics to rebuild your microbiome. We address SIBO, leaky gut, and dysbiosis with precision — not guesswork.",
    who: "For those dealing with bloating, IBS, or food sensitivities.",
    included: [
      "Comprehensive stool analysis & SIBO breath test",
      "Targeted probiotic & prebiotic protocol",
      "4-phase gut healing program over 12 weeks"
    ],
    image: "/images/services/gut-restoration.png",
    icon: IconRoot,
  },
  {
    id: "neuro-clarity",
    name: "Neuro-Clarity Program",
    category: "Mental Clarity",
    categoryTag: "MENTAL CLARITY",
    outcome: "Sharpen focus, memory, and cognitive performance.",
    desc: "Brain fog isn't normal — it's a symptom. Our Neuro-Clarity Program investigates neuroinflammation, nutrient deficiencies, and hormonal contributors to cognitive decline. Through targeted nootropics, nutrition, and lifestyle shifts, we help you think clearly again.",
    who: "For professionals experiencing brain fog or declining focus.",
    included: [
      "Neuroinflammation markers & nutrient status panel",
      "Evidence-based nootropic protocol",
      "Cognitive performance tracking over 8 weeks"
    ],
    image: "/images/services/neuro-clarity.png",
    icon: IconLotus,
  },
  {
    id: "sexual-health",
    name: "Sexual Health Optimization",
    category: "Sexual Health",
    categoryTag: "SEXUAL HEALTH",
    outcome: "Restore libido, performance, and intimate confidence.",
    desc: "Sexual health is deeply connected to your hormonal, cardiovascular, and neurological systems. We take a whole-body approach to identify what's driving changes in libido and performance, then build a protocol that restores confidence naturally.",
    who: "For anyone experiencing changes in desire or sexual function.",
    included: [
      "Hormonal, vascular & neurological assessment",
      "Personalized libido & performance protocol",
      "Discreet 90-day follow-up program"
    ],
    image: "/images/services/sexual-health.png",
    icon: IconRose,
  },
  {
    id: "skin-hair",
    name: "Hair & Skin Renewal",
    category: "Skin & Hair",
    categoryTag: "SKIN & HAIR",
    outcome: "Address hair loss and skin issues from the inside out.",
    desc: "Your skin and hair are mirrors of internal health. We test for hormonal imbalances, nutrient deficiencies, and inflammatory markers that drive hair loss, acne, and aging skin. Our inside-out approach delivers results that topical treatments never could.",
    who: "For those noticing thinning hair, acne, or premature aging.",
    included: [
      "Dermatological nutrient & hormone panel",
      "Inside-out renewal protocol with targeted supplementation",
      "12-week progress tracking with photo documentation"
    ],
    image: "/images/services/skin-hair.png",
    icon: IconSprig,
  },
  {
    id: "adrenal-recovery",
    name: "Adrenal Recovery",
    category: "Hormones",
    categoryTag: "HORMONES",
    outcome: "Rebuild your stress resilience and end burnout.",
    desc: "Chronic stress rewires your HPA axis, leaving you wired-but-tired and unable to recover. Our Adrenal Recovery protocol uses cortisol mapping, adaptogenic herbs, and lifestyle restructuring to restore your body's natural stress response.",
    who: "For high-achievers running on empty.",
    included: [
      "4-point cortisol mapping & DHEA testing",
      "Adaptogenic herb & adrenal support protocol",
      "Stress resilience program with lifestyle coaching"
    ],
    image: "/images/services/adrenal-recovery.png",
    icon: IconFlame,
  },
  {
    id: "thyroid-optimization",
    name: "Thyroid Optimization",
    category: "Hormones",
    categoryTag: "HORMONES",
    outcome: "Go beyond TSH to fully optimize thyroid function.",
    desc: "Standard thyroid testing misses the full picture. We run a complete thyroid panel — TSH, Free T3, Free T4, Reverse T3, and antibodies — then optimize using functional ranges. The difference between 'normal' and optimal can change your life.",
    who: "For those told their labs are 'normal' but still feel off.",
    included: [
      "Complete thyroid panel with antibody markers",
      "Functional-range optimization protocol",
      "Ongoing monitoring with quarterly re-testing"
    ],
    image: "/images/services/thyroid-optimization.png",
    icon: IconButterfly,
  },
  {
    id: "sleep-restoration",
    name: "Sleep Restoration",
    category: "Mental Clarity",
    categoryTag: "MENTAL CLARITY",
    outcome: "Achieve deep, restorative sleep without medication.",
    desc: "Poor sleep accelerates every disease process. We investigate cortisol rhythms, melatonin production, blood sugar patterns, and environmental factors to build a sleep protocol that works. No sleeping pills — just science-backed solutions for truly restorative rest.",
    who: "For anyone struggling with insomnia or unrefreshing sleep.",
    included: [
      "Sleep hormone & circadian rhythm analysis",
      "Environmental & behavioral sleep optimization",
      "8-week guided sleep restoration program"
    ],
    image: "/images/services/sleep-restoration.png",
    icon: IconMoonStars,
  },
  {
    id: "inflammation-reset",
    name: "Inflammation Reset",
    category: "Longevity",
    categoryTag: "LONGEVITY",
    outcome: "Identify and eliminate chronic inflammation triggers.",
    desc: "Chronic inflammation is the silent driver behind most modern diseases. Our Inflammation Reset uses advanced inflammatory markers, food sensitivity panels, and environmental toxin testing to identify your unique triggers — then systematically eliminate them.",
    who: "For those with unexplained pain, fatigue, or autoimmune concerns.",
    included: [
      "Advanced inflammatory marker panel & food sensitivity testing",
      "Anti-inflammatory nutrition & supplement protocol",
      "12-week systematic elimination & rebuilding program"
    ],
    image: "/images/services/inflammation-reset.png",
    icon: IconFern,
  },
  {
    id: "detox-protocol",
    name: "Detox Protocol",
    category: "Gut Health",
    categoryTag: "GUT HEALTH",
    outcome: "Support your body's natural detoxification pathways.",
    desc: "Your liver, kidneys, and lymphatic system need support in today's toxic world. Our evidence-based Detox Protocol uses targeted nutrients, binders, and lifestyle interventions to enhance Phase I and Phase II liver detoxification — safely and effectively.",
    who: "For those exposed to environmental toxins or feeling 'stuck'.",
    included: [
      "Toxin exposure assessment & liver function panel",
      "Phase I & Phase II detox support protocol",
      "6-week guided detoxification with progress labs"
    ],
    image: "/images/services/detox-protocol.png",
    icon: IconDroplet,
  },
];

/* ── Component ── */
const ServicesPage = () => {
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const initialFilter = searchParams.get("filter");
    if (initialFilter && categories.includes(initialFilter)) {
      setFilter(initialFilter);
      // Wait for the grid to render filtered results then scroll to them
      setTimeout(() => {
        const offset = window.innerWidth < 1024 ? 400 : 500;
        window.scrollTo({ top: offset, behavior: "smooth" });
      }, 100);
    }
  }, [searchParams]);

  const filtered = filter === "All" ? services : services.filter((s) => s.category === filter);

  /* Collapse on filter change */
  const handleFilter = (cat: string) => {
    setExpandedId(null);
    setFilter(cat);
  };

  /* Toggle card */
  const handleToggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  /* Scroll expanded card into view */
  useEffect(() => {
    if (expandedId && cardRefs.current[expandedId]) {
      setTimeout(() => {
        cardRefs.current[expandedId]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 100);
    }
  }, [expandedId]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="dark-section gradient-sage pt-32 pb-20 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[60px] after:bg-gradient-to-b after:from-[#2D4A3E] after:to-[#F5F0E8] after:pointer-events-none page-hero-section">
        <div className="container mx-auto px-6 text-center">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4">Our Services</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-primary-foreground mb-4 page-hero-headline">
            Every Protocol. Built for You.
          </h1>
          <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto">
            Personalized functional medicine programs designed around your unique biology, goals, and lifestyle.
          </p>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="svc-page-section bg-[#F5F0E8]">
        <div className="container mx-auto px-6">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => handleFilter(c)}
                className={`services-filter-tab ${filter === c ? "services-filter-tab--active" : ""}`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Card Grid */}
          <div className="svc-grid">
            {filtered.map((s) => {
              const isExpanded = expandedId === s.id;
              const Icon = s.icon;
              return (
                <div
                  key={s.id}
                  ref={(el) => { cardRefs.current[s.id] = el; }}
                  className={`svc-card group ${isExpanded ? "svc-card--expanded" : ""}`}
                  onClick={() => handleToggle(s.id)}
                >
                  {/* ── Collapsed View ── */}
                  <div className="svc-card-collapsed">
                    <div className="svc-card-collapsed-left">
                      <div className="svc-card-icon"><Icon /></div>
                      <div>
                        <h3 className="svc-card-name">{s.name}</h3>
                        <p className="svc-card-outcome">{s.outcome}</p>
                      </div>
                    </div>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#C9A84C"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`shrink-0 ml-3 transition-all ease-out ${
                        isExpanded
                          ? "rotate-90 opacity-100 [transition-duration:250ms]"
                          : "rotate-0 opacity-80 group-hover:opacity-100 group-hover:translate-x-[3px] duration-200"
                      }`}
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </div>

                  {/* ── Expanded View ── */}
                  <div className={`svc-card-expanded ${isExpanded ? "svc-card-expanded--visible" : ""}`}>
                    <div className="svc-card-expanded-inner">
                      {/* Left Column */}
                      <div className="svc-card-left">
                        <div className={`svc-card-detail svc-card-delay-0 ${isExpanded ? "svc-card-detail--show" : ""}`}>
                          <span className="svc-card-detail-tag">{s.categoryTag}</span>
                        </div>
                        <div className={`svc-card-detail svc-card-delay-1 ${isExpanded ? "svc-card-detail--show" : ""}`}>
                          <Link
                            to="/book"
                            className="svc-card-cta"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Check If You Qualify →
                          </Link>
                        </div>
                        <div className={`svc-card-detail svc-card-delay-2 ${isExpanded ? "svc-card-detail--show" : ""}`}>
                          <p className="svc-card-detail-desc">{s.desc}</p>
                        </div>
                        <div className={`svc-card-detail svc-card-delay-3 ${isExpanded ? "svc-card-detail--show" : ""}`}>
                          <p className="svc-card-detail-label">Who this is for:</p>
                          <p className="svc-card-detail-who">{s.who}</p>
                        </div>
                        <div className={`svc-card-detail svc-card-delay-4 ${isExpanded ? "svc-card-detail--show" : ""}`}>
                          <p className="svc-card-detail-label">What's included:</p>
                          <ul className="svc-card-detail-list">
                            {s.included.map((item, i) => (
                              <li key={i} className="svc-card-detail-list-item">
                                <span className="svc-card-detail-dash">—</span> {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Right Column – Image */}
                      <div className={`svc-card-right ${isExpanded ? "svc-card-right--visible" : ""}`}>
                        <img
                          src={s.image}
                          alt={s.name}
                          className="svc-card-image"
                        />
                        <div className="svc-card-image-overlay" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-16 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[60px] after:bg-gradient-to-b after:from-[#F5F0E8] after:to-[#2D4A3E] after:pointer-events-none bg-[#F5F0E8]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-4">
            Not sure which service is right for you?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Take our 2-minute assessment and we'll recommend the perfect protocol.
          </p>
          <Link
            to="/book"
            className="inline-flex items-center px-8 py-4 rounded-full bg-accent text-accent-foreground font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            Check If You Qualify
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;
