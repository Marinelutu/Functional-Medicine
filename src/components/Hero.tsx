import { useState, useEffect } from "react";
import ConsultationModal from "./ConsultationModal";

/* ── Goal → Concern mapping for pre-selecting Step 1 ── */
const goalToConcern: Record<string, string> = {
  "Energy": "Energy & Fatigue",
  "Weight": "Weight & Metabolism",
  "Hormones": "Hormones & Mood",
  "Clarity": "Brain Fog & Focus",
  "Longevity": "Longevity & Aging",
  "Gut Health": "Gut Health",
};

const goals = [
  { label: "Energy", icon: "✦" },
  { label: "Weight", icon: "⚖" },
  { label: "Hormones", icon: "⚥" },
  { label: "Clarity", icon: "⚛" },
  { label: "Longevity", icon: "∞" },
  { label: "Gut Health", icon: "☘" },
];

const Hero = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [preSelectedConcern, setPreSelectedConcern] = useState<string | undefined>(undefined);
  const [animReady, setAnimReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const [clickedPill, setClickedPill] = useState<string | null>(null);

  const handleGoalClick = (label: string) => {
    setClickedPill(label);
    setTimeout(() => {
      setClickedPill(null);
      setPreSelectedConcern(goalToConcern[label]);
      setModalOpen(true);
    }, 200);
  };

  const handleOpenModal = () => {
    setPreSelectedConcern(undefined);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setPreSelectedConcern(undefined);
  };

  return (
    <>
      <section className="hero-section" data-theme="dark">
        {/* Video Background */}
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          webkit-playsinline="true"
        >
          <source src="/images/44969-441206537_medium.mp4" type="video/mp4" />
        </video>

        {/* Dark Overlay */}
        <div className="hero-overlay" />

        {/* Content */}
        <div className="hero-content">
          {/* Overline */}
          <p className={`hero-overline ${animReady ? "hero-anim-active" : ""}`}>
            Functional Medicine, Reimagined
          </p>

          {/* Headline */}
          <h1 className="hero-headline">
            <span className={`hero-headline-line1 ${animReady ? "hero-anim-active" : ""}`}>
              You still don't feel
            </span>
            <span className={`hero-headline-line2 ${animReady ? "hero-anim-active" : ""}`}>
              like yourself.
            </span>
          </h1>

          {/* Gold italic line */}
          <p className={`hero-gold-line ${animReady ? "hero-anim-active" : ""}`}>
            That changes here.
          </p>

          {/* Subline */}
          <p className={`hero-subline ${animReady ? "hero-anim-active" : ""}`}>
            Imagine waking up with real energy. Thinking clearly. Feeling like
            the version of yourself you've been trying to get back to.
          </p>

          {/* Pills + CTAs wrapper */}
          <div className={`hero-actions ${animReady ? "hero-anim-active" : ""}`}>
            {/* Goal pills */}
            <div className="hero-goals">
              <p className="hero-goals-label">What Brings You Here?</p>
              <div className="hero-goals-grid">
                {goals.map((g) => (
                  <button
                    key={g.label}
                    onClick={() => handleGoalClick(g.label)}
                    className={`hero-goal-pill ${clickedPill === g.label ? "hero-goal-pill--clicked" : ""}`}
                  >
                    <span className="hero-goal-pill-icon">{g.icon}</span>
                    <span className="hero-goal-pill-text">{g.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="hero-ctas">
              <button onClick={handleOpenModal} className="hero-cta-primary hidden md:flex">
                Check If You Qualify →
              </button>
              <a href="/services" className="hero-cta-secondary">
                Explore Services
              </a>
            </div>
          </div>

          {/* Social proof */}
          <p className={`hero-social-proof ${animReady ? "hero-anim-active" : ""}`}>
            Join 4,200+ people who chose to understand their body.
          </p>
        </div>
      </section>

      <ConsultationModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        preSelectedConcern={preSelectedConcern}
      />
    </>
  );
};

export default Hero;
