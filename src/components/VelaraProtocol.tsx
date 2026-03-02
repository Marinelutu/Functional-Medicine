import ImagePlaceholder from "./ImagePlaceholder";

const steps = [
  {
    number: "01",
    title: "Assess",
    description:
      "Complete our comprehensive health assessment and advanced lab panel — going far beyond standard blood work to uncover root causes.",
  },
  {
    number: "02",
    title: "Diagnose",
    description:
      "Our clinical team analyzes 80+ biomarkers using functional ranges, not just conventional ones, to identify what's actually driving your symptoms.",
  },
  {
    number: "03",
    title: "Protocol",
    description:
      "Receive your personalized Velara Protocol™ — a tailored plan combining targeted supplements, nutrition, and lifestyle shifts.",
  },
  {
    number: "04",
    title: "Transform",
    description:
      "Experience measurable change within 90 days with ongoing practitioner support, progress tracking, and protocol adjustments.",
  },
];

const VelaraProtocol = () => {
  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4">
            Our Method
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-foreground">
            The Velara Protocol™
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            A proven 4-step system that identifies root causes and delivers lasting results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={step.number} className="text-center space-y-4">
              <ImagePlaceholder
                label={`[ICON: ${step.title}]`}
                aspectRatio="icon"
                className="mx-auto text-[10px]"
              />
              <span className="font-mono text-xs tracking-wider text-accent">{step.number}</span>
              <h3 className="text-2xl font-display font-semibold text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 text-border">→</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VelaraProtocol;
