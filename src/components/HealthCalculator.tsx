import { useState } from "react";

const quizSteps = [
  {
    question: "What's your primary health goal?",
    options: ["Boost Energy", "Lose Weight", "Balance Hormones", "Sharpen Mental Clarity", "Optimize Longevity", "Heal My Gut"],
  },
  {
    question: "How long have you been experiencing symptoms?",
    options: ["Less than 6 months", "6–12 months", "1–3 years", "3+ years"],
  },
  {
    question: "Have you worked with a functional medicine practitioner before?",
    options: ["No, this is new to me", "Yes, but it didn't work", "Yes, and I want to go deeper"],
  },
];

const results: Record<string, { title: string; description: string; protocol: string }> = {
  "Boost Energy": {
    title: "Energy Restoration Protocol",
    description: "Based on your responses, you're likely dealing with mitochondrial dysfunction, adrenal fatigue, or hidden nutrient deficiencies.",
    protocol: "Comprehensive metabolic panel + targeted B-vitamin & CoQ10 protocol",
  },
  "Lose Weight": {
    title: "Metabolic Reset Protocol",
    description: "Your symptoms suggest metabolic resistance — often caused by insulin dysregulation, thyroid imbalances, or chronic inflammation.",
    protocol: "Full thyroid panel + metabolic flexibility assessment + GLP-1 pathway optimization",
  },
  "Balance Hormones": {
    title: "Hormonal Harmony Protocol",
    description: "Hormonal imbalances don't happen in isolation. We look at your entire endocrine system to find the root cause.",
    protocol: "DUTCH test + full hormone panel + personalized bio-identical support plan",
  },
  default: {
    title: "Personalized Wellness Protocol",
    description: "Based on your answers, we'd recommend starting with a comprehensive assessment to identify your unique root causes.",
    protocol: "Advanced biomarker panel + 1-on-1 practitioner consultation + custom protocol",
  },
};

const HealthCalculator = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    if (step < quizSteps.length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setShowResult(false);
  };

  const result = results[answers[0]] || results.default;

  return (
    <section className="py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4">
              Interactive Tool
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground">
              Your Health, Decoded
            </h2>
            <p className="mt-3 text-muted-foreground">
              Answer 3 quick questions to discover your personalized starting point.
            </p>
          </div>

          <div className="bg-background rounded-2xl p-8 lg:p-10 shadow-sm border border-border/50">
            {!showResult ? (
              <div>
                {/* Progress */}
                <div className="flex items-center gap-2 mb-8">
                  {quizSteps.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 flex-1 rounded-full transition-colors ${
                        i <= step ? "bg-accent" : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
                <p className="font-mono text-xs text-muted-foreground mb-2">
                  Step {step + 1} of {quizSteps.length}
                </p>
                <h3 className="text-xl font-display font-semibold text-foreground mb-6">
                  {quizSteps[step].question}
                </h3>
                <div className="grid gap-3">
                  {quizSteps[step].options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleAnswer(opt)}
                      className="text-left px-5 py-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all text-sm font-medium text-foreground"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6 text-center">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto">
                  <span className="text-accent text-xl">✦</span>
                </div>
                <h3 className="text-2xl font-display font-semibold text-foreground">
                  {result.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{result.description}</p>
                <div className="bg-card rounded-xl p-4 border border-border">
                  <p className="font-mono text-xs text-accent uppercase tracking-wider mb-1">
                    Recommended Protocol
                  </p>
                  <p className="text-sm font-medium text-foreground">{result.protocol}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                  <a
                    href="/book"
                    className="px-7 py-3 rounded-full bg-accent text-accent-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
                  >
                    Book Your Assessment
                  </a>
                  <button
                    onClick={reset}
                    className="px-7 py-3 rounded-full border border-border text-foreground font-medium text-sm hover:bg-muted transition-colors"
                  >
                    Retake Quiz
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthCalculator;
