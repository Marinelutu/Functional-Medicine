import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categories = ["All", "Weight Loss", "Hormones", "Longevity", "Gut Health", "Mental Clarity", "Sexual Health", "Skin & Hair"];

const services = [
  { name: "Metabolic Reset", emoji: "🔥", category: "Weight Loss", outcome: "Lose stubborn weight by fixing your metabolism at its source.", who: "For those who've tried every diet without lasting results.", desc: "Our Metabolic Reset targets insulin resistance, thyroid dysfunction, and hormonal imbalances that keep weight locked on. Through advanced metabolic testing and personalized nutrition protocols, we identify exactly what's blocking your body from burning fat efficiently. Most members see measurable changes within the first 6 weeks." },
  { name: "Hormone Optimization", emoji: "🔄", category: "Hormones", outcome: "Restore hormonal balance for energy, mood, and vitality.", who: "For anyone experiencing fatigue, mood swings, or hormonal shifts.", desc: "We map your complete hormonal landscape — cortisol, thyroid, sex hormones, and metabolic markers. Then we build a protocol that addresses imbalances naturally before considering bioidentical options. Our approach has helped thousands reclaim the energy and clarity they thought was gone forever." },
  { name: "Longevity Protocol", emoji: "🌿", category: "Longevity", outcome: "Optimize your biological age and healthspan.", who: "For high-performers who want to age on their own terms.", desc: "Combining cutting-edge longevity science with functional medicine, we target the root mechanisms of aging. From telomere support to mitochondrial optimization, every element of your protocol is designed to extend not just lifespan, but healthspan — the years you feel truly alive." },
  { name: "Gut Restoration", emoji: "💚", category: "Gut Health", outcome: "Heal your gut to transform digestion, immunity, and mood.", who: "For those dealing with bloating, IBS, or food sensitivities.", desc: "Your gut is the foundation of your health. Our Gut Restoration protocol uses comprehensive stool analysis, food sensitivity testing, and targeted probiotics to rebuild your microbiome. We address SIBO, leaky gut, and dysbiosis with precision — not guesswork." },
  { name: "Neuro-Clarity Program", emoji: "🧠", category: "Mental Clarity", outcome: "Sharpen focus, memory, and cognitive performance.", who: "For professionals experiencing brain fog or declining focus.", desc: "Brain fog isn't normal — it's a symptom. Our Neuro-Clarity Program investigates neuroinflammation, nutrient deficiencies, and hormonal contributors to cognitive decline. Through targeted nootropics, nutrition, and lifestyle shifts, we help you think clearly again." },
  { name: "Sexual Health Optimization", emoji: "❤️‍🔥", category: "Sexual Health", outcome: "Restore libido, performance, and intimate confidence.", who: "For anyone experiencing changes in desire or sexual function.", desc: "Sexual health is deeply connected to your hormonal, cardiovascular, and neurological systems. We take a whole-body approach to identify what's driving changes in libido and performance, then build a protocol that restores confidence naturally." },
  { name: "Hair & Skin Renewal", emoji: "✨", category: "Skin & Hair", outcome: "Address hair loss and skin issues from the inside out.", who: "For those noticing thinning hair, acne, or premature aging.", desc: "Your skin and hair are mirrors of internal health. We test for hormonal imbalances, nutrient deficiencies, and inflammatory markers that drive hair loss, acne, and aging skin. Our inside-out approach delivers results that topical treatments never could." },
  { name: "Adrenal Recovery", emoji: "🛡️", category: "Hormones", outcome: "Rebuild your stress resilience and end burnout.", who: "For high-achievers running on empty.", desc: "Chronic stress rewires your HPA axis, leaving you wired-but-tired and unable to recover. Our Adrenal Recovery protocol uses cortisol mapping, adaptogenic herbs, and lifestyle restructuring to restore your body's natural stress response." },
  { name: "Thyroid Optimization", emoji: "⚡", category: "Hormones", outcome: "Go beyond TSH to fully optimize thyroid function.", who: "For those told their labs are 'normal' but still feel off.", desc: "Standard thyroid testing misses the full picture. We run a complete thyroid panel — TSH, Free T3, Free T4, Reverse T3, and antibodies — then optimize using functional ranges. The difference between 'normal' and optimal can change your life." },
  { name: "Sleep Restoration", emoji: "🌙", category: "Mental Clarity", outcome: "Achieve deep, restorative sleep without medication.", who: "For anyone struggling with insomnia or unrefreshing sleep.", desc: "Poor sleep accelerates every disease process. We investigate cortisol rhythms, melatonin production, blood sugar patterns, and environmental factors to build a sleep protocol that works. No sleeping pills — just science-backed solutions for truly restorative rest." },
  { name: "Inflammation Reset", emoji: "🔬", category: "Longevity", outcome: "Identify and eliminate chronic inflammation triggers.", who: "For those with unexplained pain, fatigue, or autoimmune concerns.", desc: "Chronic inflammation is the silent driver behind most modern diseases. Our Inflammation Reset uses advanced inflammatory markers, food sensitivity panels, and environmental toxin testing to identify your unique triggers — then systematically eliminate them." },
  { name: "Detox Protocol", emoji: "🧪", category: "Gut Health", outcome: "Support your body's natural detoxification pathways.", who: "For those exposed to environmental toxins or feeling 'stuck'.", desc: "Your liver, kidneys, and lymphatic system need support in today's toxic world. Our evidence-based Detox Protocol uses targeted nutrients, binders, and lifestyle interventions to enhance Phase I and Phase II liver detoxification — safely and effectively." },
];

const ServicesPage = () => {
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = filter === "All" ? services : services.filter((s) => s.category === filter);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* Hero */}
      <section className="gradient-sage pt-32 pb-20">
        <div className="container mx-auto px-6 text-center">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4">Our Services</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-primary-foreground mb-4">
            Every Protocol. Built for You.
          </h1>
          <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto">
            Personalized functional medicine programs designed around your unique biology, goals, and lifestyle.
          </p>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === c ? "bg-primary text-primary-foreground" : "bg-card text-foreground hover:bg-border"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((s) => (
              <div
                key={s.name}
                className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setExpanded(expanded === s.name ? null : s.name)}
              >
                <div className="text-3xl mb-4">{s.emoji}</div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-2">{s.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{s.outcome}</p>
                <p className="text-xs text-accent font-mono mb-4">{s.who}</p>
                {expanded === s.name && (
                  <p className="text-sm text-muted-foreground mb-4 animate-fade-in">{s.desc}</p>
                )}
                <Link
                  to="/book"
                  className="inline-flex items-center px-5 py-2.5 rounded-full bg-accent text-accent-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
                  onClick={(e) => e.stopPropagation()}
                >
                  Book This
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="gradient-assessment py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-4">
            Not sure which service is right for you?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Take our free 2-minute assessment and we'll recommend the perfect protocol.
          </p>
          <Link
            to="/book"
            className="inline-flex items-center px-8 py-4 rounded-full bg-accent text-accent-foreground font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            Start Free Assessment
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;
