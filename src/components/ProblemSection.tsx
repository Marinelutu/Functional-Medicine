const symptoms = [
  "Crushing fatigue that no amount of sleep can fix",
  "Brain fog that makes you feel like a stranger in your own mind",
  "Weight that won't budge no matter what you try",
  "Hormonal chaos — mood swings, hot flashes, low libido",
  "Gut issues that control your entire life",
  "Anxiety that came out of nowhere",
  "Skin that's aging faster than you are",
  "Insomnia despite being completely exhausted",
  "Joint pain that limits what you used to love",
  "A doctor who says 'your labs are normal' when you know they're not",
];

const ProblemSection = () => {
  return (
    <section className="gradient-sage py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4">
            Sound Familiar?
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-primary-foreground leading-tight">
            You've been told you're fine.
            <br />
            <span className="italic">But you know you're not.</span>
          </h2>
        </div>

        {/* Scrolling symptoms */}
        <div className="relative">
          <div className="flex animate-scroll-left whitespace-nowrap">
            {[...symptoms, ...symptoms].map((s, i) => (
              <div
                key={i}
                className="inline-flex items-center px-6 py-3 mx-2 rounded-full border border-primary-foreground/20 text-primary-foreground/80 text-sm flex-shrink-0"
              >
                {s}
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-2xl mx-auto text-center mt-16">
          <p className="text-xl md:text-2xl font-display italic text-primary-foreground/90 leading-relaxed">
            "Your body isn't broken.{" "}
            <span className="text-accent font-semibold not-italic">It's been misunderstood.</span>"
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
