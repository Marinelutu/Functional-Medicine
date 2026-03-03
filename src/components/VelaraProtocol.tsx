import { useState, useEffect, useCallback } from "react";
import ImagePlaceholder from "./ImagePlaceholder";

const steps = [
  {
    number: "01",
    title: "Assess",
    description:
      "Complete our comprehensive health assessment and advanced lab panel — going far beyond standard blood work to uncover root causes. We evaluate over 80 biomarkers across metabolic, hormonal, nutritional, and inflammatory pathways to build a complete picture of your health.",
    stat: "80+ biomarkers analyzed",
    image: "/images/protocol_step_01_assess_1772491828260.png",
  },
  {
    number: "02",
    title: "Diagnose",
    description:
      "Our clinical team analyzes your results using functional ranges — not just conventional ones — to identify what's actually driving your symptoms. We connect the dots between systems that traditional medicine treats in silos.",
    stat: "3x more markers than standard labs",
    image: "/images/protocol_step_02_diagnose_1772491844275.png",
  },
  {
    number: "03",
    title: "Protocol",
    description:
      "Receive your personalized Velara Protocol™ — a tailored plan combining targeted supplements, precision nutrition, and lifestyle shifts designed around your unique biology, not generic guidelines.",
    stat: "100% personalized protocols",
    image: "/images/protocol_step_03_protocol_1772491856872.png",
  },
  {
    number: "04",
    title: "Transform",
    description:
      "Experience measurable change within 90 days with ongoing practitioner support, progress tracking, and protocol adjustments. Watch your labs improve, your energy return, and your vitality transform.",
    stat: "94% see results in 90 days",
    image: "/images/protocol_step_04_transform_1772491876304.png",
  },
];

const AUTO_ADVANCE_MS = 5000;

const VelaraProtocol = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const goToStep = useCallback((index: number) => {
    setActiveStep(index);
    setProgress(0);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveStep((s) => (s + 1) % steps.length);
          return 0;
        }
        return prev + 100 / (AUTO_ADVANCE_MS / 50);
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isPaused, activeStep]);

  const current = steps[activeStep];

  return (
    <section
      className="py-24 lg:py-32 bg-velara-protocol"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4">
            Our Method
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-white">
            The Velara Protocol™
          </h2>
          <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
            A proven 4-step system that identifies root causes and delivers lasting results.
          </p>
        </div>

        {/* Interactive Panel */}
        <div className="grid lg:grid-cols-[340px_1fr] gap-0 rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm max-w-5xl mx-auto min-h-[480px]">
          {/* Left: Step list */}
          <div className="flex flex-col border-b lg:border-b-0 lg:border-r border-white/10">
            {steps.map((step, i) => (
              <button
                key={step.number}
                onClick={() => goToStep(i)}
                className={`relative text-left px-8 py-7 transition-all duration-300 group flex-1 ${i < steps.length - 1 ? "border-b border-white/10" : ""
                  } ${activeStep === i ? "bg-white/10" : "hover:bg-white/5"}`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`font-mono text-xs tracking-wider transition-colors duration-300 ${activeStep === i ? "text-accent" : "text-white/40"
                      }`}
                  >
                    {step.number}
                  </span>
                  <span
                    className={`font-display text-xl font-semibold transition-colors duration-300 ${activeStep === i ? "text-white" : "text-white/60"
                      }`}
                  >
                    {step.title}
                  </span>
                </div>
                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5">
                  <div
                    className="h-full bg-accent transition-all duration-100 ease-linear protocol-progress-bar"
                    ref={(el) => {
                      if (el) {
                        const width = activeStep === i ? `${progress}%` : i < activeStep ? '100%' : '0%';
                        el.style.setProperty('--progress-width', width);
                      }
                    }}
                  />
                </div>
              </button>
            ))}
          </div>

          {/* Right: Content area */}
          <div className="p-8 lg:p-12 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Image */}
            <div className="w-full lg:w-1/2 flex-shrink-0">
              <ImagePlaceholder
                label={`[ICON: ${current.title}]`}
                aspectRatio="square"
                className="w-full rounded-xl"
                src={current.image}
              />
            </div>

            {/* Text */}
            <div className="w-full lg:w-1/2 space-y-6">
              <div>
                <span className="font-mono text-xs tracking-wider text-accent">
                  Step {current.number}
                </span>
                <h3 className="text-3xl font-display font-semibold text-white mt-1">
                  {current.title}
                </h3>
              </div>
              <p className="text-base text-white/70 leading-relaxed">
                {current.description}
              </p>
              <div className="flex items-center gap-3 pt-2">
                <span className="text-accent text-lg">✦</span>
                <span className="font-mono text-sm tracking-wider text-accent font-medium">
                  {current.stat}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VelaraProtocol;
