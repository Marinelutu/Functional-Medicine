import { useEffect, useRef, useState } from "react";
import LiquidGoldDivider from "./LiquidGoldDivider";

const logos = ["Well+Good", "Healthline", "MindBodyGreen", "Functional Medicine University"];

/* ── Easing ── */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

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

const SocialProof = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stat4200Ref = useRef<HTMLSpanElement>(null);
  const stat94Ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          setVisible(true);

          if (stat4200Ref.current) {
            animateCountUp(stat4200Ref.current, 4200, 1500, "+", true);
          }
          if (stat94Ref.current) {
            animateCountUp(stat94Ref.current, 94, 1200, "%");
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
    <section ref={sectionRef} className="social-proof-section pt-14 pb-[90px] border-y border-border/50 overflow-x-hidden">
      <div className="container mx-auto px-6">
        {/* Emotional headline */}
        <h2 className="social-proof-headline">
          Real results. Real people.<br />
          <em>Measured, not promised.</em>
        </h2>
        <LiquidGoldDivider />

        {/* Marquee partner logos */}
        <div className="relative mb-10">
          <div className="flex animate-marquee-left whitespace-nowrap">
            {[...logos, ...logos, ...logos, ...logos].map((name, i) => (
              <span
                key={i}
                className="font-display text-xl lg:text-2xl italic text-foreground tracking-wide mx-8 lg:mx-14 opacity-40 flex-shrink-0"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
        {/* Stats */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-12">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs tracking-wider uppercase text-muted-foreground">Results:</span>
            <span className="text-sm font-semibold text-primary">
              <span ref={stat94Ref}>{visible ? "94%" : "0%"}</span> of members report measurable improvement within 90 days
            </span>
          </div>
          <div className="h-4 w-px bg-border hidden sm:block" />
          <div className="flex flex-col items-center gap-0 sm:flex-row sm:items-center sm:gap-2">
            <div className="flex items-center gap-2">
              <span ref={stat4200Ref} className="font-mono text-2xl font-semibold text-accent">{visible ? "4,200+" : "0"}</span>
              <span className="text-sm text-muted-foreground">lives transformed</span>
            </div>
            <span className="social-proof-qualifier">across our patient community since 2019</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
