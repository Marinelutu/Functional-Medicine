import ImagePlaceholder from "./ImagePlaceholder";

const DreamLifeClose = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* BG placeholder */}
      <div className="absolute inset-0">
        <ImagePlaceholder
          label="[IMAGE: Dream Life Close — Person thriving, hiking, cinematic]"
          aspectRatio="hero"
          className="w-full h-full rounded-none"
        />
        <div className="absolute inset-0 bg-foreground/70" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-gradient-gold leading-tight mb-6">
          This is what's waiting on the other side.
        </h2>
        <p className="text-lg text-background/70 mb-10 max-w-xl mx-auto">
          A life where you wake up energized, think clearly, move freely, and feel like yourself again.
        </p>
        <a
          href="/book"
          className="inline-flex items-center px-8 py-4 rounded-full bg-accent text-accent-foreground font-semibold text-lg hover:opacity-90 transition-opacity"
        >
          Begin Your Transformation
        </a>
      </div>
    </section>
  );
};

export default DreamLifeClose;
