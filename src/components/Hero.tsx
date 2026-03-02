import { useState } from "react";
import ImagePlaceholder from "./ImagePlaceholder";

const goals = [
  { label: "Energy", emoji: "⚡" },
  { label: "Weight", emoji: "🎯" },
  { label: "Hormones", emoji: "🔄" },
  { label: "Clarity", emoji: "🧠" },
  { label: "Longevity", emoji: "🌿" },
  { label: "Gut Health", emoji: "💚" },
];

const Hero = () => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const toggleGoal = (label: string) => {
    setSelectedGoals((prev) =>
      prev.includes(label) ? prev.filter((g) => g !== label) : [...prev, label]
    );
  };

  return (
    <section className="min-h-screen pt-20 lg:pt-0 flex items-center">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent">
                Functional Medicine, Reimagined
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold leading-[1.1] text-foreground">
                You've tried everything.{" "}
                <span className="italic text-primary">You still don't feel like yourself.</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                VELARA combines advanced diagnostics with personalized protocols to help you reclaim
                the energy, clarity, and vitality you deserve.
              </p>
            </div>

            {/* Goal tiles */}
            <div>
              <p className="font-mono text-xs tracking-wider uppercase text-muted-foreground mb-3">
                What's your #1 goal?
              </p>
              <div className="grid grid-cols-3 gap-3">
                {goals.map((g) => (
                  <button
                    key={g.label}
                    onClick={() => toggleGoal(g.label)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                      selectedGoals.includes(g.label)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card border-border hover:border-primary/40"
                    }`}
                  >
                    <span>{g.emoji}</span>
                    <span>{g.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <a
                href="/book"
                className="inline-flex items-center px-7 py-3.5 rounded-full bg-accent text-accent-foreground font-semibold hover:opacity-90 transition-opacity"
              >
                Start Free Assessment
              </a>
              <a
                href="/services"
                className="inline-flex items-center px-7 py-3.5 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Explore Services
              </a>
            </div>

            {/* Trust bar */}
            <div className="flex items-center gap-6 pt-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-placeholder-bg border-2 border-background"
                  />
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">4,200+ lives transformed</p>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i} className="text-accent text-sm">★</span>
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">4.9/5 rating</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="animate-slide-in-right">
            <ImagePlaceholder
              label="[IMAGE: Hero — Real person, relatable, everyday]"
              aspectRatio="hero"
              className="w-full rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
