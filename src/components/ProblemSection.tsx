import { useEffect, useRef, useState } from "react";

const symptoms = [
  "Exhausted no matter how much you sleep",
  "Brain fog that makes you feel 20 years older",
  "Weight that won't budge no matter what you try",
  "Labs come back normal but you know something's wrong",
  "Hormonal chaos ruling your mood and body",
  "Gut issues that control your entire day",
  "Anxiety that never fully switches off",
  "A doctor who has 8 minutes for you",
  "Skin and hair that stopped feeling like yours",
];

const ProblemSection = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [visibleTiles, setVisibleTiles] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start staggered reveal of all tiles
            symptoms.forEach((_, i) => {
              setTimeout(() => {
                setVisibleTiles((prev) => new Set([...prev, i]));
              }, i * 80);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="problem-section py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* TOP — Headline block */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="font-mono text-xs tracking-[0.2em] uppercase problem-gold-text mb-4">
            Sound Familiar?
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-white leading-tight">
            You've been told you're fine.
            <br />
            <span className="italic">But you know you're not.</span>
          </h2>
        </div>

        {/* MIDDLE — Symptom tile grid */}
        <div ref={gridRef} className="problem-tile-grid">
          {symptoms.map((symptom, i) => (
            <div
              key={i}
              className={`problem-tile ${visibleTiles.has(i) ? "problem-tile--visible" : ""}`}
              data-tile-index={i}
            >
              <span className="problem-tile-text">
                {symptom}
              </span>
              <span className="problem-tile-qmark">?</span>
            </div>
          ))}
        </div>

        {/* BOTTOM — Closing statement */}
        <div className="problem-closing">
          <div className="problem-closing-line" />
          <p className="problem-closing-main">
            <span className="problem-closing-white">Your body isn't broken.</span>
            <br />
            <span className="problem-closing-gold">It's been misunderstood.</span>
          </p>
          <p className="problem-closing-sub">
            That's exactly what we're here to change.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
