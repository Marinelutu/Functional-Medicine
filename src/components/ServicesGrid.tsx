import { useState } from "react";

const categories = [
  "All", "Weight Loss", "Hormones", "Longevity", "Gut Health", "Mental Clarity", "Sexual Health", "Skin & Hair"
];

/* ── Botanical SVG icons (inline, gold #C9A84C, 36×36, stroke-width 1.5, no fill) ── */

const BotanicalLeaf = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="service-botanical-icon">
    <path d="M8 28C8 28 10 10 28 6C28 6 26 24 8 28Z" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 28C8 28 18 18 28 6" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const BotanicalMoon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="service-botanical-icon">
    <path d="M24 10C20.13 10 17 13.13 17 17C17 20.87 20.13 24 24 24C24.34 24 24.67 23.97 25 23.93C23.23 25.81 20.73 27 18 27C12.48 27 8 22.52 8 17C8 11.48 12.48 7 18 7C20.73 7 23.23 8.19 25 10.07C24.67 10.03 24.34 10 24 10Z" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="27" cy="9" r="1.2" stroke="#C9A84C" strokeWidth="1.5" />
  </svg>
);

const BotanicalSun = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="service-botanical-icon">
    <circle cx="18" cy="18" r="5" stroke="#C9A84C" strokeWidth="1.5" />
    <line x1="18" y1="5" x2="18" y2="9" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="18" y1="27" x2="18" y2="31" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="5" y1="18" x2="9" y2="18" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="27" y1="18" x2="31" y2="18" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="8.81" y1="8.81" x2="11.64" y2="11.64" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="24.36" y1="24.36" x2="27.19" y2="27.19" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const BotanicalRoot = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="service-botanical-icon">
    <path d="M18 6V16" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M18 16C18 16 14 20 10 30" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M18 16C18 16 22 20 26 30" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M18 22C18 22 20 26 18 32" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M13 24C13 24 11 27 9 28" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M23 24C23 24 25 27 27 28" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const BotanicalLotus = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="service-botanical-icon">
    <path d="M18 28C18 28 18 20 18 16" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M18 16C16 12 12 8 18 4C24 8 20 12 18 16Z" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 20C14 18 8 16 6 20C10 22 14 20 18 20Z" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 20C22 18 28 16 30 20C26 22 22 20 18 20Z" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BotanicalRose = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="service-botanical-icon">
    <path d="M18 30V20" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M18 20C18 20 12 18 10 14C10 14 14 10 18 12C22 10 26 14 26 14C24 18 18 20 18 20Z" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 12C18 12 15 8 18 5C21 8 18 12 18 12Z" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 26C14 26 10 24 8 26" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const BotanicalSprig = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="service-botanical-icon">
    <path d="M18 30V10" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M18 14C18 14 22 10 26 10C26 10 24 14 18 14Z" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 20C18 20 14 16 10 16C10 16 12 20 18 20Z" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 26C18 26 22 22 26 22C26 22 24 26 18 26Z" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BotanicalFlame = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="service-botanical-icon">
    <path d="M18 4C18 4 26 14 26 22C26 26.42 22.42 30 18 30C13.58 30 10 26.42 10 22C10 14 18 4 18 4Z" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 30C18 30 14 26 14 22C14 18 18 14 18 14C18 14 22 18 22 22C22 26 18 30 18 30Z" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BotanicalButterfly = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="service-botanical-icon">
    <path d="M18 10V28" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M18 14C14 10 8 8 6 12C4 16 10 20 18 18" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 14C22 10 28 8 30 12C32 16 26 20 18 18" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 22C15 24 12 28 14 30C16 32 18 28 18 22" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 22C21 24 24 28 22 30C20 32 18 28 18 22" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BotanicalMoonStars = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="service-botanical-icon">
    <path d="M22 8C18.69 8 16 10.69 16 14C16 17.31 18.69 20 22 20C22.34 20 22.67 19.97 23 19.93C21.23 21.81 18.73 23 16 23C11.58 23 8 19.42 8 15C8 10.58 11.58 7 16 7C18.73 7 21.23 8.19 23 10.07C22.67 10.03 22.34 10 22 10" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M26 14L26.9 16.1L29 17L26.9 17.9L26 20L25.1 17.9L23 17L25.1 16.1L26 14Z" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M29 8L29.5 9.5L31 10L29.5 10.5L29 12L28.5 10.5L27 10L28.5 9.5L29 8Z" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BotanicalFern = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="service-botanical-icon">
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

const BotanicalDroplet = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="service-botanical-icon">
    <path d="M18 4C18 4 8 16 8 22C8 27.52 12.48 32 18 32C23.52 32 28 27.52 28 22C28 16 18 4 18 4Z" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 22C16 22 18 18 20 20C22 22 18 26 18 26C18 26 14 24 16 22Z" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M19 19V16" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/* ── Icon map by service name ── */
const iconMap: Record<string, React.FC> = {
  "Metabolic Reset Program": BotanicalLeaf,
  "Hormone Optimization": BotanicalMoon,
  "Longevity & Anti-Aging Protocol": BotanicalSun,
  "Gut Restoration Program": BotanicalRoot,
  "Cognitive Performance Protocol": BotanicalLotus,
  "Sexual Wellness Program": BotanicalRose,
  "Skin & Hair Rejuvenation": BotanicalSprig,
  "Adrenal Recovery Protocol": BotanicalFlame,
  "Thyroid Optimization Protocol": BotanicalButterfly,
  "Sleep Restoration Program": BotanicalMoonStars,
  "Inflammation Reset Protocol": BotanicalFern,
  "Detox Protocol": BotanicalDroplet,
};

const services = [
  { name: "Metabolic Reset Program", category: "Weight Loss", outcome: "Lose 15–30 lbs without restrictive dieting" },
  { name: "Hormone Optimization", category: "Hormones", outcome: "Rebalance estrogen, progesterone, testosterone & thyroid" },
  { name: "Longevity & Anti-Aging Protocol", category: "Longevity", outcome: "Turn back your biological clock by 5–10 years" },
  { name: "Gut Restoration Program", category: "Gut Health", outcome: "Eliminate bloating, IBS, and food sensitivities" },
  { name: "Cognitive Performance Protocol", category: "Mental Clarity", outcome: "Sharpen focus, memory, and mental stamina" },
  { name: "Sexual Wellness Program", category: "Sexual Health", outcome: "Restore libido, performance, and confidence" },
  { name: "Skin & Hair Rejuvenation", category: "Skin & Hair", outcome: "Glow from the inside out with targeted nutrient therapy" },
  { name: "Adrenal Recovery Protocol", category: "Mental Clarity", outcome: "End the burnout cycle and reclaim your energy" },
];

const ServicesGrid = () => {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? services : services.filter((s) => s.category === filter);

  return (
    <section className="services-section py-24 lg:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4">What We Treat</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-foreground">
            Targeted Programs for Real Results
          </h2>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`services-filter-tab ${filter === cat ? "services-filter-tab--active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((s) => {
            const IconComponent = iconMap[s.name];
            return (
              <div
                key={s.name}
                className="service-card rounded-2xl p-6 transition-all group"
              >
                <div className="mb-4">
                  {IconComponent && <IconComponent />}
                </div>
                <h3 className="service-card-name">{s.name}</h3>
                <p className="service-card-outcome">{s.outcome}</p>
                <a
                  href="/services"
                  className="service-card-link"
                >
                  <span className="service-card-link-text">View Protocol</span>
                  <span className="service-card-link-arrow"> →</span>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
