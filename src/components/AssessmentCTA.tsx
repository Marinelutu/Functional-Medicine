import { useState } from "react";
import ConsultationModal from "./ConsultationModal";

const AssessmentCTA = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-6">
          <div className="gradient-assessment rounded-3xl px-8 py-16 lg:px-16 lg:py-20 text-center">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
              Not Sure Where to Start?
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-foreground max-w-3xl mx-auto mb-6">
              Take the 2-Minute Health Assessment
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
              Answer a few simple questions and we'll point you to the protocol that fits your unique needs — completely free.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center px-8 py-4 rounded-full bg-accent text-accent-foreground font-semibold text-lg hover:opacity-90 transition-opacity"
            >
              Book a Free Consultation
            </button>
          </div>
        </div>
      </section>
      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default AssessmentCTA;
