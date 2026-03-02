import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { Check } from "lucide-react";

const serviceOptions = [
  { name: "Metabolic Reset", emoji: "🔥", category: "Weight Loss" },
  { name: "Hormone Optimization", emoji: "🔄", category: "Hormones" },
  { name: "Longevity Protocol", emoji: "🌿", category: "Longevity" },
  { name: "Gut Restoration", emoji: "💚", category: "Gut Health" },
  { name: "Neuro-Clarity Program", emoji: "🧠", category: "Mental Clarity" },
  { name: "Thyroid Optimization", emoji: "⚡", category: "Hormones" },
  { name: "Sleep Restoration", emoji: "🌙", category: "Mental Clarity" },
  { name: "Adrenal Recovery", emoji: "🛡️", category: "Hormones" },
  { name: "Hair & Skin Renewal", emoji: "✨", category: "Skin & Hair" },
];

const practitioners = [
  { name: "Dr. Elena Vasquez", specialty: "Lead Practitioner — General & Thyroid" },
  { name: "Dr. Marcus Chen", specialty: "Hormones & Longevity Specialist" },
  { name: "Dr. Amara Okafor", specialty: "Gut Health & Immunology" },
];

const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"];

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

const BookPage = () => {
  const [step, setStep] = useState(1);
  const [visitType, setVisitType] = useState<"virtual" | "in-person">("virtual");
  const [selectedService, setSelectedService] = useState("");
  const [selectedPractitioner, setSelectedPractitioner] = useState("");
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const monthName = now.toLocaleString("default", { month: "long" });
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const today = now.getDate();

  const unavailableDates = [3, 7, 10, 14, 21, 25, 28];
  const unavailableTimes = ["11:00 AM", "3:00 PM"];

  const canProceedStep1 = selectedService !== "";
  const canProceedStep2 = selectedPractitioner !== "" && selectedDate !== null && selectedTime !== "";
  const canConfirm = name !== "" && email !== "";

  const stepLabels = ["Select Service", "Choose Time", "Confirm"];

  if (confirmed) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="min-h-[80vh] flex items-center justify-center pt-20">
          <div className="text-center max-w-lg mx-auto px-6 space-y-6">
            <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto">
              <Check size={40} />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-semibold text-foreground">Your appointment is confirmed</h1>
            <div className="bg-card rounded-2xl p-6 border border-border text-left space-y-3">
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">Service</span><span className="text-sm font-semibold text-foreground">{selectedService}</span></div>
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">Type</span><span className="text-sm font-semibold text-foreground capitalize">{visitType}</span></div>
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">Practitioner</span><span className="text-sm font-semibold text-foreground">{selectedPractitioner}</span></div>
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">Date</span><span className="text-sm font-semibold text-foreground">{monthName} {selectedDate}, {year}</span></div>
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">Time</span><span className="text-sm font-semibold text-foreground">{selectedTime}</span></div>
            </div>
            <button className="inline-flex items-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity">
              Add to Calendar
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-28 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4">Book a Consultation</p>
            <h1 className="text-3xl md:text-4xl font-display font-semibold text-foreground">Schedule Your Appointment</h1>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-2 mb-12">
            {stepLabels.map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step > i + 1 ? "bg-primary text-primary-foreground" : step === i + 1 ? "bg-accent text-accent-foreground" : "bg-border text-muted-foreground"
                }`}>
                  {step > i + 1 ? <Check size={16} /> : i + 1}
                </div>
                <span className={`text-sm hidden sm:inline ${step === i + 1 ? "text-foreground font-semibold" : "text-muted-foreground"}`}>{label}</span>
                {i < 2 && <div className="w-8 md:w-16 h-px bg-border" />}
              </div>
            ))}
          </div>

          {/* Visit Type Toggle */}
          <div className="flex justify-center gap-2 mb-10">
            {(["virtual", "in-person"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setVisitType(t)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all capitalize ${
                  visitType === t ? "bg-primary text-primary-foreground" : "bg-card text-foreground border border-border"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Step 1 */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-display font-semibold text-foreground mb-6">Select a Service</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {serviceOptions.map((s) => (
                  <button
                    key={s.name}
                    onClick={() => setSelectedService(s.name)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      selectedService === s.name ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary/40"
                    }`}
                  >
                    <span className="text-2xl">{s.emoji}</span>
                    <p className="font-semibold mt-2">{s.name}</p>
                    <p className={`text-xs mt-1 ${selectedService === s.name ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{s.category}</p>
                  </button>
                ))}
              </div>
              <div className="flex justify-end mt-8">
                <button
                  disabled={!canProceedStep1}
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-full bg-accent text-accent-foreground font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-40"
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="space-y-10">
              <div>
                <h2 className="text-xl font-display font-semibold text-foreground mb-4">Choose a Practitioner</h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  {practitioners.map((p) => (
                    <button
                      key={p.name}
                      onClick={() => setSelectedPractitioner(p.name)}
                      className={`p-4 rounded-xl border text-center transition-all ${
                        selectedPractitioner === p.name ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary/40"
                      }`}
                    >
                      <ImagePlaceholder label={`[IMAGE: ${p.name}]`} aspectRatio="icon" className={`mx-auto mb-3 ${selectedPractitioner === p.name ? "opacity-80" : ""}`} />
                      <p className="font-semibold text-sm">{p.name}</p>
                      <p className={`text-xs mt-1 ${selectedPractitioner === p.name ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{p.specialty}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Calendar */}
              <div>
                <h2 className="text-xl font-display font-semibold text-foreground mb-4">{monthName} {year}</h2>
                <div className="grid grid-cols-7 gap-1 text-center">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                    <span key={d} className="text-xs text-muted-foreground font-mono py-2">{d}</span>
                  ))}
                  {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const isPast = day < today;
                    const isUnavailable = unavailableDates.includes(day);
                    const isSelected = selectedDate === day;
                    const disabled = isPast || isUnavailable;
                    return (
                      <button
                        key={day}
                        disabled={disabled}
                        onClick={() => { setSelectedDate(day); setSelectedTime(""); }}
                        className={`py-2 rounded-lg text-sm transition-all ${
                          isSelected ? "bg-primary text-primary-foreground font-semibold" :
                          disabled ? "text-muted-foreground/30 cursor-not-allowed" :
                          "hover:bg-card text-foreground"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              {selectedDate && (
                <div>
                  <h2 className="text-xl font-display font-semibold text-foreground mb-4">Available Times</h2>
                  <div className="flex flex-wrap gap-3">
                    {timeSlots.map((t) => {
                      const unavailable = unavailableTimes.includes(t);
                      return (
                        <button
                          key={t}
                          disabled={unavailable}
                          onClick={() => setSelectedTime(t)}
                          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                            selectedTime === t ? "bg-primary text-primary-foreground" :
                            unavailable ? "bg-border/50 text-muted-foreground/30 cursor-not-allowed" :
                            "bg-card border border-border hover:border-primary/40"
                          }`}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-8">
                <button onClick={() => setStep(1)} className="px-6 py-3 rounded-full border border-border text-foreground font-semibold text-sm hover:bg-card transition-colors">← Back</button>
                <button
                  disabled={!canProceedStep2}
                  onClick={() => setStep(3)}
                  className="px-6 py-3 rounded-full bg-accent text-accent-foreground font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-40"
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="grid lg:grid-cols-2 gap-10">
              <div className="space-y-5">
                <h2 className="text-xl font-display font-semibold text-foreground">Your Information</h2>
                <div>
                  <label className="text-sm text-muted-foreground block mb-1">Full Name *</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground block mb-1">Email *</label>
                  <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground block mb-1">Phone</label>
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:border-primary" />
                </div>
              </div>

              <div className="bg-card rounded-2xl p-6 border border-border space-y-4 h-fit">
                <h3 className="font-display text-lg font-semibold text-foreground">Booking Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Service</span><span className="font-semibold text-foreground">{selectedService}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Type</span><span className="font-semibold text-foreground capitalize">{visitType}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Practitioner</span><span className="font-semibold text-foreground">{selectedPractitioner}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="font-semibold text-foreground">{monthName} {selectedDate}, {year}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Time</span><span className="font-semibold text-foreground">{selectedTime}</span></div>
                </div>
                <button
                  disabled={!canConfirm}
                  onClick={() => setConfirmed(true)}
                  className="w-full mt-4 px-6 py-3 rounded-full bg-accent text-accent-foreground font-semibold hover:opacity-90 transition-opacity disabled:opacity-40"
                >
                  Confirm Booking
                </button>
              </div>

              <button onClick={() => setStep(2)} className="px-6 py-3 rounded-full border border-border text-foreground font-semibold text-sm hover:bg-card transition-colors w-fit">← Back</button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookPage;
