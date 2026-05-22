import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  { label: "Energy" },
  { label: "Weight" },
  { label: "Hormones" },
  { label: "Clarity" },
  { label: "Longevity" },
  { label: "Gut Health" },
];

const Hero = () => {
  const navigate = useNavigate();
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
          <source src="/images/services/24540-343454476.mp4" type="video/mp4" />
        </video>

        {/* Dark Overlay */}
        <div className="hero-overlay" />

        {/* Content */}
        <div className="hero-content mt-12 sm:mt-0">

          {/* Headline */}
          <h1 className="hero-headline">
            <span className={`hero-headline-line1 ${animReady ? "hero-anim-active" : ""}`}>
              Renew your health today
            </span>
            <span className={`hero-headline-line2 ${animReady ? "hero-anim-active" : ""}`}>
              with our natural approach
            </span>
          </h1>

          {/* Pills + CTA + Social Proof wrapper */}
          <div className={`hero-actions ${animReady ? "hero-anim-active" : ""}`}>
            {/* Goal pills */}
            <p className="hero-goals-label">What's your purpose?</p>
            <div className="hero-goals-grid">
              {goals.map((g) => (
                <button
                  key={g.label}
                  onClick={() => handleGoalClick(g.label)}
                  className={`hero-goal-pill ${clickedPill === g.label ? "hero-goal-pill--clicked" : ""}`}
                >
                  <span className="hero-goal-pill-text">{g.label}</span>
                </button>
              ))}
            </div>

            {/* CTA */}
            <div className="hero-ctas">
              <button onClick={handleOpenModal} className="hero-cta-primary">
                Check If You Qualify →
              </button>
              <button onClick={() => navigate('/book')} className="hero-cta-secondary" style={{borderColor: 'rgba(201, 168, 76, 0.4)', color: '#C9A84C'}}>
                Explore Premium Protocols
              </button>
            </div>

            {/* Social proof */}
            <p className={`hero-social-proof ${animReady ? "hero-anim-active" : ""}`}>
              Join 4,200+ people who chose to understand their body.
            </p>
          </div>
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
