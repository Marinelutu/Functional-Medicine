import { useEffect, useRef, useState } from "react";

/* ── Easing: cubic ease-out ── */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/* ── Count-up animation helper ── */
function animateCountUp(
  el: HTMLElement,
  target: number,
  duration: number,
  suffix: string,
  format: boolean = false
) {
  const start = performance.now();
  const update = (now: number) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutCubic(progress);
    const current = Math.round(eased * target);
    el.textContent = (format ? current.toLocaleString() : String(current)) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

/* ── Reverse-count (falling) animation for "0" ── */
function animateReverseCount(el: HTMLElement, duration: number) {
  const start = performance.now();
  const startNum = 18;
  const update = (now: number) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutCubic(progress);
    const current = Math.round(startNum * (1 - eased));
    el.textContent = String(current);
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

/* ── Typewriter animation for "24/7" ── */
function animateTypewriter(el: HTMLElement, text: string, charDelay: number) {
  let i = 0;
  el.textContent = "";
  const type = () => {
    if (i < text.length) {
      el.textContent = text.substring(0, i + 1);
      i++;
      setTimeout(type, charDelay);
    }
  };
  type();
}

const StatTriplet = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stat1Ref = useRef<HTMLSpanElement>(null);
  const stat2Ref = useRef<HTMLSpanElement>(null);
  const stat3Ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          setVisible(true);

          if (stat1Ref.current) {
            animateCountUp(stat1Ref.current, 30, 1000, "");
          }
          if (stat2Ref.current) {
            animateReverseCount(stat2Ref.current, 800);
          }
          if (stat3Ref.current) {
            animateTypewriter(stat3Ref.current, "24/7", 150);
          }

          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="stat-triplet-section"
    >
      {/* Gold rule top */}
      <div className="stat-triplet-rule" />

      <div className={`stat-triplet-grid ${visible ? "stat-triplet-grid--visible" : ""}`}>
        {/* Stat 1: 30 Days */}
        <div className="stat-triplet-item">
          <span ref={stat1Ref} className="stat-triplet-number">0</span>
          <span className="stat-triplet-label">Days to First Results</span>
        </div>

        {/* Stat 2: 0 Wasted Consultations */}
        <div className="stat-triplet-item">
          <span ref={stat2Ref} className="stat-triplet-number">0</span>
          <span className="stat-triplet-label">Wasted Consultations</span>
        </div>

        {/* Stat 3: 24/7 Ongoing Support */}
        <div className="stat-triplet-item">
          <span ref={stat3Ref} className="stat-triplet-number">&nbsp;</span>
          <span className="stat-triplet-label">Ongoing Support</span>
        </div>
      </div>

      {/* Gold rule bottom */}
      <div className="stat-triplet-rule" />
    </section>
  );
};

export default StatTriplet;
