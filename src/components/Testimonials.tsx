import { useState, useEffect, useRef } from "react";
import ImagePlaceholder from "./ImagePlaceholder";

const goalFilters = ["All", "Energy", "Weight", "Hormones", "Clarity", "Gut Health"];

const testimonials = [
  { name: "Sarah M.", goal: "Energy", outcome: "Energy levels up 80% in 60 days", rating: 5, quote: "I went from needing 3 coffees to get through the day to waking up naturally at 6 AM with energy to spare. My husband said he got his wife back.", image: "/images/testimonial_face_01_1772542149015.png" },
  { name: "James T.", goal: "Weight", outcome: "Lost 27 lbs in 90 days", rating: 5, quote: "After failing every diet for 10 years, VELARA found a thyroid issue my doctor missed. The weight finally came off — and stayed off.", image: "/images/testimonial_face_02_1772542166315.png" },
  { name: "Priya K.", goal: "Hormones", outcome: "PMS symptoms reduced by 90%", rating: 5, quote: "I was told to 'just take birth control.' VELARA actually balanced my hormones naturally. My cycle is now predictable for the first time ever.", image: "/images/testimonial_face_03_1772542183126.png" },
  { name: "Michael R.", goal: "Clarity", outcome: "Focus improved 3x (self-reported)", rating: 5, quote: "The brain fog was so bad I thought I was developing early-onset dementia. Turns out it was gut-related inflammation. VELARA caught what 4 doctors missed.", image: "/images/testimonial_face_04_1772542198955.png" },
  { name: "Lisa W.", goal: "Gut Health", outcome: "IBS symptoms eliminated in 8 weeks", rating: 5, quote: "I can finally eat a meal without anxiety. I can finally travel without planning around bathrooms. That freedom is priceless.", image: "/images/testimonial_face_05_1772542214398.png" },
  { name: "David C.", goal: "Energy", outcome: "Completed first marathon at 52", rating: 5, quote: "They found severe vitamin D and B12 deficiencies plus adrenal fatigue. The protocol gave me my life back.", image: "/images/testimonial_face_06_1772542229637.png" },
];

const Testimonials = () => {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? testimonials : testimonials.filter((t) => t.goal === filter);
  const gridRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          filtered.forEach((_, i) => {
            setTimeout(() => {
              setVisibleCards((prev) => new Set([...prev, i]));
            }, i * 70);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (gridRef.current) observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, [filtered]);

  return (
    <section className="py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4">Real Stories</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-foreground">
            Transformations That Speak for Themselves
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {goalFilters.map((g) => (
            <button
              key={g}
              onClick={() => setFilter(g)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === g ? "bg-primary text-primary-foreground" : "bg-background text-foreground hover:bg-muted"
                }`}
            >
              {g}
            </button>
          ))}
        </div>

        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((t, index) => (
            <div key={t.name} className={`bg-background rounded-2xl p-6 testimonial-card stagger-card ${visibleCards.has(index) ? "stagger-card--visible" : ""}`}>
              <div className="flex items-center gap-4 mb-4">
                <ImagePlaceholder
                  label={`[IMAGE: Testimonial — Member photo, ${t.name}]`}
                  aspectRatio="icon"
                  className="rounded-full w-12 h-12 text-[10px]"
                  src={t.image}
                />
                <div>
                  <p className="font-semibold text-foreground text-sm">{t.name}</p>
                  <p className="text-xs text-accent font-mono">{t.outcome}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-accent text-sm">★</span>
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed italic">"{t.quote}"</p>
            </div>
          ))}
        </div>
        
        <p className="narrative-connector narrative-connector-dark">
          "Every one of them came to us after the system failed them."
        </p>
      </div>
    </section>
  );
};

export default Testimonials;
