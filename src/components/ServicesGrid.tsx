import { useState } from "react";

const categories = [
  "All", "Weight Loss", "Hormones", "Longevity", "Gut Health", "Mental Clarity", "Sexual Health", "Skin & Hair"
];

const services = [
  { name: "Metabolic Reset Program", category: "Weight Loss", outcome: "Lose 15–30 lbs without restrictive dieting", icon: "🎯" },
  { name: "Hormone Optimization", category: "Hormones", outcome: "Rebalance estrogen, progesterone, testosterone & thyroid", icon: "🔄" },
  { name: "Longevity & Anti-Aging Protocol", category: "Longevity", outcome: "Turn back your biological clock by 5–10 years", icon: "🌿" },
  { name: "Gut Restoration Program", category: "Gut Health", outcome: "Eliminate bloating, IBS, and food sensitivities", icon: "💚" },
  { name: "Cognitive Performance Protocol", category: "Mental Clarity", outcome: "Sharpen focus, memory, and mental stamina", icon: "🧠" },
  { name: "Sexual Wellness Program", category: "Sexual Health", outcome: "Restore libido, performance, and confidence", icon: "💫" },
  { name: "Skin & Hair Rejuvenation", category: "Skin & Hair", outcome: "Glow from the inside out with targeted nutrient therapy", icon: "✨" },
  { name: "Adrenal Recovery Protocol", category: "Mental Clarity", outcome: "End the burnout cycle and reclaim your energy", icon: "⚡" },
];

const ServicesGrid = () => {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? services : services.filter((s) => s.category === filter);

  return (
    <section className="py-24 lg:py-32">
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
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-foreground hover:bg-muted"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((s) => (
            <div
              key={s.name}
              className="bg-card rounded-2xl p-6 border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all group"
            >
              <div className="text-3xl mb-4">{s.icon}</div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{s.name}</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{s.outcome}</p>
              <a
                href="/services"
                className="text-sm font-semibold text-primary group-hover:text-accent transition-colors"
              >
                Learn More →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
