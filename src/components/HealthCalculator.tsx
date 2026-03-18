import { useState } from "react";
import ConsultationModal from "./ConsultationModal";

const HealthCalculator = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="py-24 lg:py-32 bg-card">
        <div className="container mx-auto px-6">
          <div className="max-w-[700px] mx-auto">
            <div className="bg-background rounded-2xl p-10 lg:p-14 shadow-sm border border-border/50 text-center">
              {/* Gold overline */}
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4">
                Smart Patient Filter
              </p>

              {/* Headline (serif) */}
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-3">
                Not sure if you're the right fit?
              </h2>

              {/* Subline */}
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Answer 5 questions and find out in under 2 minutes.
              </p>

              {/* Single CTA */}
              <button onClick={() => setModalOpen(true)} className="w-full flex items-center justify-center h-14 bg-[#C9A84C] text-[#1C1C1C] font-semibold rounded-full group hover:shadow-lg transition-all active:scale-[0.98]">
                Begin Assessment →
              </button>
            </div>
          </div>
        </div>
      </section>
      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default HealthCalculator;
