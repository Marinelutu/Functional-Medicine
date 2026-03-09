import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./consultation-modal.css";

/* ── Types ── */
interface ConsultationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

/* ── Botanical SVG icons — Step 1 ── */
const IconEnergy = () => (
    <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 4L8 20h10l-2 12 14-16h-10z" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
const IconWeight = () => (
    <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="18" cy="10" r="4" stroke="#C9A84C" strokeWidth="1.5" />
        <path d="M6 30c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18 18v8M14 26h8" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);
const IconHormones = () => (
    <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 10C20.13 10 17 13.13 17 17s3.13 7 7 7c.34 0 .67-.03 1-.07C23.23 25.81 20.73 27 18 27c-5.52 0-10-4.48-10-10S12.48 7 18 7c2.73 0 5.23 1.19 7 3.07-.33-.04-.66-.07-1-.07z" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="27" cy="9" r="1.2" stroke="#C9A84C" strokeWidth="1.5" />
    </svg>
);
const IconBrainFog = () => (
    <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 8c-5.52 0-10 4.48-10 10 0 3.31 1.61 6.25 4.1 8.07.06.04.1.1.1.17V28a2 2 0 002 2h7.6a2 2 0 002-2v-1.76c0-.07.04-.13.1-.17A10.02 10.02 0 0028 18c0-5.52-4.48-10-10-10z" stroke="#C9A84C" strokeWidth="1.5" strokeLinejoin="round" />
        <line x1="18" y1="18" x2="18" y2="22" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="18" cy="15" r="1" fill="#C9A84C" />
    </svg>
);
const IconGut = () => (
    <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 4C18 4 8 16 8 22c0 5.52 4.48 10 10 10s10-4.48 10-10C28 16 18 4 18 4z" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 22c0 0 2-4 4-2s-2 6-2 6" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
const IconLongevity = () => (
    <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="18" cy="18" r="10" stroke="#C9A84C" strokeWidth="1.5" />
        <path d="M18 8v4M18 24v4M8 18h4M24 18h4" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="18" cy="18" r="3" stroke="#C9A84C" strokeWidth="1.5" />
    </svg>
);

/* ── Botanical SVG icons — Step 2 (symptoms) ── */
const IconTired = () => (
    <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="18" cy="18" r="10" stroke="#C9A84C" strokeWidth="1.5" />
        <path d="M13 20c1 2 6 2 10 0" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="14" cy="16" r="1.2" fill="#C9A84C" />
        <circle cx="22" cy="16" r="1.2" fill="#C9A84C" />
        <path d="M12 13c1-2 3-2 4-1M20 12c1-1 3-1 4 1" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
);
const IconScale = () => (
    <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6v24M8 30h20" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 14l-4 8h8l-4-8zM26 14l-4 8h8l-4-8z" stroke="#C9A84C" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M10 14h16" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);
const IconMood = () => (
    <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 22c2-3 5-5 8-5s6 2 8 5" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 14c2 3 5 5 8 5s6-2 8-5" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="18" cy="18" r="12" stroke="#C9A84C" strokeWidth="1.5" />
    </svg>
);
const IconFocus = () => (
    <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="18" cy="18" r="4" stroke="#C9A84C" strokeWidth="1.5" />
        <circle cx="18" cy="18" r="8" stroke="#C9A84C" strokeWidth="1" strokeDasharray="3 2" />
        <circle cx="18" cy="18" r="12" stroke="#C9A84C" strokeWidth="1" strokeDasharray="2 3" />
        <path d="M18 4v4M18 28v4M4 18h4M28 18h4" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);
const IconDigestion = () => (
    <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 8c0 0-4 4-4 8 0 2.5 1.5 4.5 3 6 1 1 1.5 2.5 1.5 4v2h11v-2c0-1.5.5-3 1.5-4 1.5-1.5 3-3.5 3-6 0-4-4-8-4-8" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 28h8" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M16 8c1-3 4-3 4 0" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
);
const IconAging = () => (
    <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6C11.373 6 6 11.373 6 18c0 6.628 5.373 12 12 12s12-5.372 12-12C30 11.373 24.627 6 18 6z" stroke="#C9A84C" strokeWidth="1.5" />
        <path d="M18 10v8l5 3" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 6L6 2M26 6l4-4" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
);

/* ── Data ── */
const step1Options = [
    { label: "Energy & Fatigue", icon: IconEnergy },
    { label: "Weight & Metabolism", icon: IconWeight },
    { label: "Hormones & Mood", icon: IconHormones },
    { label: "Brain Fog & Focus", icon: IconBrainFog },
    { label: "Gut Health", icon: IconGut },
    { label: "Longevity & Aging", icon: IconLongevity },
];

const step2Options = [
    { label: "Tired all the time despite sleeping", icon: IconTired },
    { label: "Can't lose weight no matter what", icon: IconScale },
    { label: "Mood swings and anxiety", icon: IconMood },
    { label: "Can't think clearly or focus", icon: IconFocus },
    { label: "Bloating, pain, or digestive issues", icon: IconDigestion },
    { label: "Aging faster than I should be", icon: IconAging },
];

const step3Options = [
    "Less than 3 months",
    "3–12 months",
    "1–3 years",
    "More than 3 years",
];

const step4Options = [
    "Yes — conventional medicine, no results",
    "Yes — diets, supplements, lifestyle changes",
    "Yes — both, nothing worked",
    "No — this is my first step",
];

const step5Options = [
    "Waking up with real energy",
    "Feeling like myself again",
    "Finally getting answers",
    "Living longer and better",
];

/* ── Result leaf SVG ── */
const LeafResult = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 38C10 38 14 14 38 8C38 8 34 32 10 38Z" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 38C10 38 24 24 38 8" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

/* ── Component ── */
const ConsultationModal = ({ isOpen, onClose }: ConsultationModalProps) => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [concern, setConcern] = useState("");
    const [symptom, setSymptom] = useState("");
    const [duration, setDuration] = useState("");
    const [priorTreatment, setPriorTreatment] = useState("");
    const [success, setSuccess] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    /* Open / close animation */
    useEffect(() => {
        if (isOpen) {
            setStep(1);
            setConcern("");
            setSymptom("");
            setDuration("");
            setPriorTreatment("");
            setSuccess("");
            setShowResult(false);
            setIsClosing(false);
            requestAnimationFrame(() => setIsVisible(true));
        }
    }, [isOpen]);

    const handleClose = () => {
        setIsClosing(true);
        setIsVisible(false);
        setTimeout(() => {
            setIsClosing(false);
            onClose();
        }, 250);
    };

    const handleNavigate = (path: string) => {
        handleClose();
        setTimeout(() => navigate(path), 270);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleStep1 = (label: string) => {
        setConcern(label);
        setTimeout(() => setStep(2), 400);
    };

    const handleStep2 = (label: string) => {
        setSymptom(label);
        setTimeout(() => setStep(3), 400);
    };

    const handleStep3 = (label: string) => {
        setDuration(label);
        setTimeout(() => setStep(4), 400);
    };

    const handleStep4 = (label: string) => {
        setPriorTreatment(label);
        setTimeout(() => setStep(5), 400);
    };

    const handleStep5 = (label: string) => {
        setSuccess(label);
        setTimeout(() => setShowResult(true), 600);
    };

    if (!isOpen && !isClosing) return null;

    return (
        <div
            className={`cm-overlay ${isVisible ? "cm-overlay--visible" : "cm-overlay--hidden"}`}
            onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        >
            <div className={`cm-card ${isVisible ? "cm-card--visible" : "cm-card--hidden"}`}>

                {/* Close button */}
                <button className="cm-close" onClick={handleClose} aria-label="Close modal">
                    ×
                </button>

                {/* Back button — shown from Step 2 onward */}
                {!showResult && step > 1 && (
                    <button className="cm-back" onClick={handleBack} aria-label="Go back">
                        ← Back
                    </button>
                )}

                {/* Step indicators — 5 dots */}
                {!showResult && (
                    <div className="cm-dots">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <div key={s} className={`cm-dot ${step >= s ? "cm-dot--active" : ""}`} />
                        ))}
                    </div>
                )}

                {/* ── Result state ── */}
                {showResult && (
                    <div className="cm-result">
                        <div className="cm-result-icon">
                            <LeafResult />
                        </div>
                        <p className="cm-result-headline">We have a protocol for you.</p>
                        <p className="cm-result-body">
                            Based on your answers, our{" "}
                            <strong className="cm-text-dark">{concern}</strong>{" "}
                            program is your best starting point. Your free consultation will map the exact path.
                        </p>
                        <button className="cm-result-btn-primary" onClick={() => handleNavigate("/book")}>
                            Book My Free Consultation →
                        </button>
                        <button className="cm-result-btn-secondary" onClick={() => handleNavigate("/services")}>
                            Explore All Services
                        </button>
                        <p className="cm-result-disclaimer">
                            No commitment. No credit card. 30 minutes with a real practitioner.
                        </p>
                    </div>
                )}

                {/* ── Step 1 ── */}
                {!showResult && step === 1 && (
                    <div>
                        <p className="cm-step-label">Step 1 of 5</p>
                        <h2 className="cm-headline">What's your main health concern?</h2>
                        <div className="cm-grid">
                            {step1Options.map(({ label, icon: Icon }) => (
                                <button
                                    key={label}
                                    onClick={() => handleStep1(label)}
                                    className={`cm-grid-btn ${concern === label ? "cm-grid-btn--selected" : ""}`}
                                >
                                    <Icon />
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── Step 2 (NEW) — Symptoms ── */}
                {!showResult && step === 2 && (
                    <div>
                        <p className="cm-step-label">Step 2 of 5</p>
                        <h2 className="cm-headline">How would you describe your symptoms?</h2>
                        <div className="cm-grid">
                            {step2Options.map(({ label, icon: Icon }) => (
                                <button
                                    key={label}
                                    onClick={() => handleStep2(label)}
                                    className={`cm-grid-btn ${symptom === label ? "cm-grid-btn--selected" : ""}`}
                                >
                                    <Icon />
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── Step 3 (was Step 2) — Duration ── */}
                {!showResult && step === 3 && (
                    <div>
                        <p className="cm-step-label">Step 3 of 5</p>
                        <h2 className="cm-headline">How long have you been dealing with this?</h2>
                        <div className="cm-pills">
                            {step3Options.map((opt) => (
                                <button
                                    key={opt}
                                    onClick={() => handleStep3(opt)}
                                    className={`cm-pill ${duration === opt ? "cm-pill--selected" : ""}`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── Step 4 (NEW) — Prior treatment ── */}
                {!showResult && step === 4 && (
                    <div>
                        <p className="cm-step-label">Step 4 of 5</p>
                        <h2 className="cm-headline">Have you already tried to address this?</h2>
                        <div className="cm-pills">
                            {step4Options.map((opt) => (
                                <button
                                    key={opt}
                                    onClick={() => handleStep4(opt)}
                                    className={`cm-pill ${priorTreatment === opt ? "cm-pill--selected" : ""}`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── Step 5 (was Step 3) — Success ── */}
                {!showResult && step === 5 && (
                    <div>
                        <p className="cm-step-label">Step 5 of 5</p>
                        <h2 className="cm-headline">What does success look like for you?</h2>
                        <div className="cm-pills">
                            {step5Options.map((opt) => (
                                <button
                                    key={opt}
                                    onClick={() => handleStep5(opt)}
                                    className={`cm-pill ${success === opt ? "cm-pill--selected" : ""}`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConsultationModal;
