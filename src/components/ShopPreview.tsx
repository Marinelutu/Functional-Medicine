const ShopPreview = () => {
  return (
    <section className="py-12 lg:py-16">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4">
              The Velara Dispensary
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground">
              Practitioner-Grade Supplements
            </h2>
          </div>
          <a href="/shop" className="hidden sm:inline-flex text-sm font-semibold text-primary hover:text-accent transition-colors">
            View All →
          </a>
        </div>

        <p className="text-muted-foreground leading-relaxed max-w-2xl mb-6">
          Every protocol is supported by practitioner-grade supplements, dispensed exclusively to active VELARA patients.
        </p>

        <a href="/shop" className="sm:hidden text-sm font-semibold text-primary hover:text-accent transition-colors">
          View All →
        </a>
      </div>
    </section>
  );
};

export default ShopPreview;
