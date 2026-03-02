const logos = ["Healthline", "Forbes", "Mindbodygreen", "Well+Good", "Vogue", "Entrepreneur"];

const SocialProof = () => {
  return (
    <section className="py-12 border-y border-border/50">
      <div className="container mx-auto px-6">
        {/* Logos */}
        <div className="flex items-center justify-center gap-8 lg:gap-14 flex-wrap mb-8 opacity-40">
          {logos.map((name) => (
            <span key={name} className="font-display text-lg lg:text-xl italic text-foreground tracking-wide">
              {name}
            </span>
          ))}
        </div>
        {/* Stats */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-12">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs tracking-wider uppercase text-muted-foreground">Results:</span>
            <span className="text-sm font-semibold text-primary">
              94% of members report measurable improvement within 90 days
            </span>
          </div>
          <div className="h-4 w-px bg-border hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="font-mono text-2xl font-semibold text-accent">4,200+</span>
            <span className="text-sm text-muted-foreground">lives transformed</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
