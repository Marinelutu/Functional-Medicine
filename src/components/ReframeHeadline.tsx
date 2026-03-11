import { useEffect, useRef, useState } from "react";

const words = ["Functional", "Medicine,", "Reimagined."];

const ReframeHeadline = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleWords, setVisibleWords] = useState<Set<number>>(new Set());
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          words.forEach((_, i) => {
            setTimeout(() => {
              setVisibleWords((prev) => new Set([...prev, i]));
            }, i * 120);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="reframe-section">
      <h2 className="reframe-headline">
        {words.map((word, i) => (
          <span key={i} className="reframe-word">
            <span
              className={`reframe-word-inner ${visibleWords.has(i) ? "reframe-word-inner--visible" : ""}`}
            >
              {word}
            </span>
          </span>
        ))}
      </h2>
    </section>
  );
};

export default ReframeHeadline;
