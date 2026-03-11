import { useEffect, useRef, useState } from "react";
import ConsultationModal from "./ConsultationModal";

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

const qualifiers = [
  "You've tried conventional medicine and still don't have answers",
  "You're ready to commit to a real protocol, not just advice",
  "You're investing in long-term results, not a quick fix",
];

const ProblemSection = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const gateRef = useRef<HTMLDivElement>(null);
  const [visibleTiles, setVisibleTiles] = useState<Set<number>>(new Set());
  const [gateVisible, setGateVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

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

  /* Eligibility gate fade-in on scroll */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGateVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    if (gateRef.current) {
      observer.observe(gateRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="problem-section pt-24 lg:pt-32 pb-[80px] overflow-hidden" data-theme="dark">
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
        </div>
        
        <p className="narrative-connector">
          "There's a reason conventional medicine keeps missing it."
        </p>
      </section>

      {/* ── ELIGIBILITY GATE ── */}
      <section className="eligibility-gate" ref={gateRef} data-theme="dark">
        <div className={`eligibility-gate-inner ${gateVisible ? "eligibility-gate-inner--visible" : ""}`}>
          {/* Overline */}
          <p className="eligibility-overline">Not For Everyone</p>

          {/* Headline */}
          <h2 className="eligibility-headline">
            VELARA works for a specific kind of patient.
          </h2>

          {/* Body */}
          <p className="eligibility-body">
            Not everyone who reaches out is the right fit — and we mean that respectfully. Our protocols require commitment, openness, and a willingness to go beyond surface-level answers. The right patient gets extraordinary results. The wrong fit wastes both our time.
          </p>

          {/* Gold divider */}
          <div className="eligibility-divider" />

          {/* Three-column icon row */}
          <div className="eligibility-qualifiers">
            {qualifiers.map((q, i) => (
              <div key={i} className="eligibility-qualifier">
                <span className="eligibility-check">✓</span>
                <p className="eligibility-qualifier-text">{q}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="eligibility-cta-wrapper">
            <button
              className="eligibility-cta-btn"
              onClick={() => setModalOpen(true)}
            >
              See If You Qualify →
            </button>
          </div>
        </div>
      </section>

      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default ProblemSection;
