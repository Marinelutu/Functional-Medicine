import { useState, useRef, useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";

/* ── Botanical SVG icons (stroke-only, gold) ── */
const LeafIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20c4 0 8.68-3.3 12-11" /><path d="M6 15c2-1.5 4-3 6-3.5" /></svg>
);
const FlameIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" /></svg>
);
const CycleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6M2.5 22v-6h6" /><path d="M2.5 11.5a10 10 0 0 1 18.8-4.3M21.5 12.5a10 10 0 0 1-18.8 4.2" /></svg>
);
const SproutIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 20h10" /><path d="M10 20c5.5-2.5.8-6.4 3-10" /><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" /><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" /></svg>
);
const BrainIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" /><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" /><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" /><path d="M12 18v-5.5" /></svg>
);
const BoltIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /></svg>
);
const MoonIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
);
const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /></svg>
);
const SparkleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" /></svg>
);

/* ── Placeholder leaf portrait SVG ── */
const PlaceholderPortraitSVG = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="23" stroke="#C9A84C" strokeWidth="1" strokeDasharray="3 3" />
    <path d="M34 16C16 20 11.8 32.34 7.64 42.68L11.42 44l2-4.6A8.98 8.98 0 0 0 16 40c8 0 17.36-6.6 24-22" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" fill="none" transform="scale(0.5) translate(24,24)" />
  </svg>
);

/* ── Decorative sage leaf SVG for bottom of left panel ── */
const DecorativeLeafSVG = () => (
  <svg width="280" height="360" viewBox="0 0 280 360" fill="none" className="book-decorative-leaf-svg">
    <path d="M240 360C200 280 160 200 140 140C120 80 140 40 180 10C200 60 220 120 230 180C240 240 240 300 240 360Z" stroke="white" strokeWidth="1.5" fill="none" />
    <path d="M180 10C170 60 160 110 155 155" stroke="white" strokeWidth="1" fill="none" />
    <path d="M155 155C140 140 120 130 100 125" stroke="white" strokeWidth="0.8" fill="none" />
    <path d="M155 155C165 145 180 140 200 138" stroke="white" strokeWidth="0.8" fill="none" />
    <path d="M170 90C155 85 135 82 115 85" stroke="white" strokeWidth="0.8" fill="none" />
    <path d="M170 90C180 82 195 78 215 80" stroke="white" strokeWidth="0.8" fill="none" />
    <path d="M190 50C178 50 165 53 152 60" stroke="white" strokeWidth="0.8" fill="none" />
    <path d="M190 50C200 48 215 50 230 56" stroke="white" strokeWidth="0.8" fill="none" />
    <path d="M145 200C128 195 108 195 90 200" stroke="white" strokeWidth="0.8" fill="none" />
    <path d="M145 200C158 193 175 190 195 192" stroke="white" strokeWidth="0.8" fill="none" />
    <path d="M160 260C145 250 125 248 105 252" stroke="white" strokeWidth="0.8" fill="none" />
    <path d="M160 260C175 253 192 252 210 256" stroke="white" strokeWidth="0.8" fill="none" />
  </svg>
);

/* ── Large gold leaf SVG for success state ── */
const SuccessLeafSVG = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round">
    <path d="M45 13C25 20 15 34 10 50L16 52L18 46C19 44 22 42 25 42C35 42 46 34 52 18" />
    <path d="M18 38C22 35 28 32 34 30" />
    <circle cx="32" cy="32" r="30" stroke="#C9A84C" strokeWidth="1" strokeDasharray="4 4" fill="none" />
  </svg>
);

const serviceOptions = [
  { name: "Metabolic Reset", icon: <FlameIcon />, category: "Weight Loss" },
  { name: "Hormone Optimization", icon: <CycleIcon />, category: "Hormones" },
  { name: "Longevity Protocol", icon: <LeafIcon />, category: "Longevity" },
  { name: "Gut Restoration", icon: <SproutIcon />, category: "Gut Health" },
  { name: "Neuro-Clarity Program", icon: <BrainIcon />, category: "Mental Clarity" },
  { name: "Thyroid Optimization", icon: <BoltIcon />, category: "Hormones" },
  { name: "Sleep Restoration", icon: <MoonIcon />, category: "Mental Clarity" },
  { name: "Adrenal Recovery", icon: <ShieldIcon />, category: "Hormones" },
  { name: "Hair & Skin Renewal", icon: <SparkleIcon />, category: "Skin & Hair" },
];

const practitioners = [
  { name: "Dr. Elena Vasquez", specialty: "General & Thyroid", image: "/images/team_dr_elena_1772491726653.png" },
  { name: "Dr. Marcus Chen", specialty: "Hormones & Longevity", image: "/images/team_dr_marcus_1772491740108.png" },
  { name: "Dr. Amara Okafor", specialty: "Gut Health & Immunology", image: "/images/team_dr_amara_1772491753632.png" },
];

const timeSlots = ["9:00 AM", "10:30 AM", "12:00 PM", "2:00 PM", "3:30 PM", "5:00 PM"];

const BookPage = () => {
  const [step, setStep] = useState(1);
  const [visitType, setVisitType] = useState<"virtual" | "in-person">("virtual");
  const [selectedService, setSelectedService] = useState("");
  const [selectedPractitioner, setSelectedPractitioner] = useState("");
  const [selectedDateIndex, setSelectedDateIndex] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [concern, setConcern] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const dateScrollRef = useRef<HTMLDivElement>(null);

  /* ── Build 14 days starting from today ── */
  const today = useMemo(() => new Date(), []);
  const dateCards = useMemo(() => {
    const dayAbbrs = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    // weekend day indices (0=Sun, 6=Sat) and 3 random weekdays to mark unavailable
    const unavailableOffsets = new Set<number>();
    // Mark weekends
    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      if (d.getDay() === 0 || d.getDay() === 6) unavailableOffsets.add(i);
    }
    // Mark 3 random weekdays as unavailable (fixed based on today's date for consistency)
    const weekdayOffsets = [];
    for (let i = 0; i < 14; i++) {
      if (!unavailableOffsets.has(i)) weekdayOffsets.push(i);
    }
    // Pick indices 1, 4, 7 from available weekdays for determinism
    [1, 4, 7].forEach(idx => {
      if (weekdayOffsets[idx] !== undefined) unavailableOffsets.add(weekdayOffsets[idx]);
    });

    return Array.from({ length: 14 }, (_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      return {
        dayAbbr: dayAbbrs[d.getDay()],
        dateNum: d.getDate(),
        month: monthNames[d.getMonth()],
        year: d.getFullYear(),
        available: !unavailableOffsets.has(i),
        fullDate: d,
      };
    });
  }, [today]);

  const selectedPractitionerObj = practitioners.find(p => p.name === selectedPractitioner) || null;
  const selectedDateObj = selectedDateIndex !== null ? dateCards[selectedDateIndex] : null;

  const formatSelectedDate = () => {
    if (!selectedDateObj) return null;
    return `${selectedDateObj.month} ${selectedDateObj.dateNum}, ${selectedDateObj.year}`;
  };

  const canConfirm = name.trim() !== "" && email.trim() !== "";

  const stepLabels = ["Select Service", "Choose Time", "Confirm"];

  const handleSelectService = (serviceName: string) => {
    setSelectedService(serviceName);
    setTimeout(() => setStep(2), 400);
  };

  const handleSelectTime = (time: string) => {
    setSelectedTime(time);
    setTimeout(() => setStep(3), 400);
  };

  const scrollDates = (direction: "left" | "right") => {
    if (dateScrollRef.current) {
      const amount = direction === "left" ? -240 : 240;
      dateScrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  /* Scroll right panel to top when step changes */
  const rightPanelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (rightPanelRef.current) {
      rightPanelRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [step]);

  return (
    <div className="book-page-root">
      <Navbar />

      {/* ── Mobile summary bar ── */}
      <div className="book-mobile-bar">
        <span className="book-mobile-bar-text">
          {selectedService || "No service"} {selectedDateObj ? `· ${formatSelectedDate()}` : ""}
        </span>
      </div>

      <div className="book-layout">
        {/* ════════════════════════════════════════
            LEFT PANEL — LIVE BOOKING SUMMARY
           ════════════════════════════════════════ */}
        <aside className="book-left-panel relative overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'url(/images/backgrounds/book-panel-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: 'rgba(45,74,62,0.92)' }} />

          <div className="book-left-inner relative z-10">
            {/* Wordmark */}
            <p className="book-left-wordmark">VELARA</p>
            <p className="book-left-label">YOUR CONSULTATION</p>

            {/* Summary card */}
            <div className="book-summary-card">
              {/* Service */}
              <p className={`book-summary-service ${selectedService ? "book-summary--visible" : ""}`}>
                {selectedService || "No service selected yet"}
              </p>

              <div className="book-summary-divider" />

              {/* Practitioner */}
              <div className="book-summary-practitioner-row">
                {selectedPractitionerObj ? (
                  <>
                    <img
                      src={selectedPractitionerObj.image}
                      alt={selectedPractitionerObj.name}
                      className="book-summary-portrait"
                    />
                    <div>
                      <p className="book-summary-doc-name">{selectedPractitionerObj.name}</p>
                      <p className="book-summary-doc-specialty">{selectedPractitionerObj.specialty}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="book-summary-portrait-placeholder">
                      <PlaceholderPortraitSVG />
                    </div>
                    <p className="book-summary-placeholder-text">Practitioner TBD</p>
                  </>
                )}
              </div>

              <div className="book-summary-divider" />

              {/* Date & time */}
              <p className={`book-summary-datetime ${selectedDateObj || selectedTime ? "book-summary--visible" : ""}`}>
                {selectedDateObj ? formatSelectedDate() : "Date & time TBD"}
                {selectedTime ? ` · ${selectedTime}` : ""}
              </p>

              <div className="book-summary-divider" />

              {/* Consultation type badge */}
              <div className="book-summary-type-badge">
                <span className="book-summary-type-dot" />
                {visitType.toUpperCase()}
              </div>
            </div>

            {/* Bottom reassurance */}
            <p className="book-left-reassurance">
              Free cancellation up to 24 hours before your appointment.
            </p>
          </div>

          {/* Decorative leaf */}
          <div className="book-left-leaf-decor relative z-10">
            <DecorativeLeafSVG />
          </div>

          {confirmed && (
            <div className="book-left-checkmark-overlay relative z-20">
              <Check size={40} color="#C9A84C" />
            </div>
          )}
        </aside>

        {/* ════════════════════════════════════════
            RIGHT PANEL — STEP CONTENT
           ════════════════════════════════════════ */}
        <main className="book-right-panel" ref={rightPanelRef}>
          {/* ── Step progress indicator ── */}
          {!confirmed && (
            <div className="book-progress-bar">
              {stepLabels.map((label, i) => (
                <div key={label} className="book-progress-step-wrapper">
                  {/* Circle */}
                  <div className={`book-progress-circle ${step > i + 1 ? "book-progress-circle--done" :
                    step === i + 1 ? "book-progress-circle--active" :
                      "book-progress-circle--inactive"
                    }`}>
                    {step > i + 1 ? <Check size={16} /> : i + 1}
                  </div>
                  <span className="book-progress-label">{label}</span>

                  {/* Connector line */}
                  {i < 2 && (
                    <div className={`book-progress-line ${step > i + 1 ? "book-progress-line--done" : ""}`} />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ══════════ STEP 1 — SELECT SERVICE ══════════ */}
          {!confirmed && step === 1 && (
            <div className="book-step-content">
              <p className="book-section-label">WHAT BRINGS YOU IN?</p>

              {/* Virtual / In-Person toggle */}
              <div className="book-visit-toggle">
                {(["virtual", "in-person"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setVisitType(t)}
                    className={`book-visit-pill ${visitType === t ? "book-visit-pill--active" : ""}`}
                  >
                    {t === "virtual" ? "Virtual" : "In-Person"}
                  </button>
                ))}
              </div>

              {/* Service cards grid */}
              <div className="book-service-grid">
                {serviceOptions.map((s) => (
                  <button
                    key={s.name}
                    onClick={() => handleSelectService(s.name)}
                    className={`book-service-card ${selectedService === s.name ? "book-service-card--selected" : ""}`}
                  >
                    {selectedService === s.name && (
                      <span className="book-service-check"><Check size={16} /></span>
                    )}
                    <span className="book-service-icon">{s.icon}</span>
                    <span className="book-service-name">{s.name}</span>
                    <span className="book-service-category">{s.category}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ══════════ STEP 2 — CHOOSE TIME ══════════ */}
          {!confirmed && step === 2 && (
            <div className="book-step-content">
              {/* Practitioner selector */}
              <p className="book-section-label">CHOOSE YOUR PRACTITIONER</p>
              <div className="book-practitioner-grid">
                {practitioners.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => setSelectedPractitioner(p.name)}
                    className={`book-practitioner-card ${selectedPractitioner === p.name ? "book-practitioner-card--selected" : ""}`}
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className={`book-practitioner-img ${selectedPractitioner === p.name ? "book-practitioner-img--selected" : ""}`}
                    />
                    <span className="book-practitioner-name">{p.name}</span>
                    <span className="book-practitioner-specialty">{p.specialty}</span>
                  </button>
                ))}
              </div>

              {/* Card-style date picker */}
              <p className="book-section-label book-section-label--date">SELECT A DATE</p>
              <div className="book-date-picker-wrapper">
                <button className="book-date-arrow book-date-arrow--left" onClick={() => scrollDates("left")} aria-label="Scroll dates left">
                  <ChevronLeft size={18} />
                </button>
                <div className="book-date-scroll" ref={dateScrollRef}>
                  {dateCards.map((dc, i) => (
                    <button
                      key={i}
                      disabled={!dc.available}
                      onClick={() => { setSelectedDateIndex(i); setSelectedTime(""); }}
                      className={`book-date-card ${selectedDateIndex === i ? "book-date-card--selected" :
                        !dc.available ? "book-date-card--unavailable" : ""
                        }`}
                    >
                      <span className="book-date-day">{dc.dayAbbr}</span>
                      <span className="book-date-num">{dc.dateNum}</span>
                      <span className="book-date-indicator">
                        {dc.available ? <span className="book-date-dot" /> : <span className="book-date-line" />}
                      </span>
                    </button>
                  ))}
                </div>
                <button className="book-date-arrow book-date-arrow--right" onClick={() => scrollDates("right")} aria-label="Scroll dates right">
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Time slot pills */}
              {selectedDateIndex !== null && (
                <div className="book-time-section">
                  <p className="book-section-label">AVAILABLE TIMES</p>
                  <div className="book-time-pills">
                    {timeSlots.map((t) => (
                      <button
                        key={t}
                        onClick={() => handleSelectTime(t)}
                        className={`book-time-pill ${selectedTime === t ? "book-time-pill--selected" : ""}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Back button */}
              <div className="book-step-nav book-step-nav--mt">
                <button onClick={() => setStep(1)} className="book-back-btn">← Back</button>
              </div>
            </div>
          )}

          {/* ══════════ STEP 3 — CONFIRM ══════════ */}
          {!confirmed && step === 3 && (
            <div className="book-step-content">
              <p className="book-section-label">ALMOST THERE</p>

              {/* Full booking summary card */}
              <div className="book-confirm-summary">
                <p className="book-confirm-service">{selectedService}</p>
                <div className="book-confirm-doc-row">
                  {selectedPractitionerObj && (
                    <>
                      <img src={selectedPractitionerObj.image} alt={selectedPractitionerObj.name} className="book-confirm-portrait" />
                      <div>
                        <p className="book-confirm-doc-name">{selectedPractitionerObj.name}</p>
                        <p className="book-confirm-doc-specialty">{selectedPractitionerObj.specialty}</p>
                      </div>
                    </>
                  )}
                </div>
                <p className="book-confirm-datetime">
                  {formatSelectedDate()} · {selectedTime}
                </p>
                <div className="book-confirm-type-badge">
                  <span className="book-summary-type-dot" />
                  {visitType.toUpperCase()}
                </div>
                <div className="book-summary-divider book-summary-divider--spaced" />
              </div>

              {/* Form fields */}
              <div className="book-form-fields">
                <div className="book-field">
                  <label className="book-field-label">Full Name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="book-field-input"
                    placeholder="Your full name"
                  />
                </div>
                <div className="book-field">
                  <label className="book-field-label">Email Address</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="book-field-input"
                    placeholder="you@example.com"
                  />
                </div>
                <div className="book-field">
                  <label className="book-field-label">Phone Number</label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="tel"
                    className="book-field-input"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div className="book-field">
                  <label className="book-field-label">Brief Health Concern (optional)</label>
                  <textarea
                    value={concern}
                    onChange={(e) => setConcern(e.target.value)}
                    className="book-field-textarea"
                    rows={3}
                    placeholder="What's your primary concern? (optional)"
                  />
                </div>
              </div>

              <button
                disabled={!canConfirm}
                onClick={() => setConfirmed(true)}
                className="book-confirm-btn"
              >
                Confirm My Appointment →
              </button>
              <p className="book-confirm-note">
                You'll receive a confirmation email within 5 minutes. Free cancellation up to 24 hours before.
              </p>

              <div className="book-step-nav book-step-nav--mt-sm">
                <button onClick={() => setStep(2)} className="book-back-btn">← Back</button>
              </div>
            </div>
          )}

          {/* ══════════ SUCCESS STATE ══════════ */}
          {confirmed && (
            <div className="book-success-content">
              <SuccessLeafSVG />
              <h2 className="book-success-title">You're booked.</h2>
              <p className="book-success-subtitle">
                Check your inbox for your confirmation and pre-appointment guide.
              </p>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default BookPage;
