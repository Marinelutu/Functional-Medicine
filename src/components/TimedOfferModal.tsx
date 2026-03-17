import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./timed-offer-modal.css";

const TimedOfferModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showGhostBar, setShowGhostBar] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [mounted, setMounted] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const hasSeenReset = sessionStorage.getItem("velara_reset_shown");
    const isBookPage =
      document.body.dataset.page === "book" || location.pathname === "/book";
    const isMobile = window.innerWidth < 768;

    if (!hasSeenReset && !isBookPage && !isMobile) {
      let blocked = false;

      // Track if quiz modal opened
      const checkQuizOpen = setInterval(() => {
        if (document.querySelector(".cm-overlay--visible")) {
          blocked = true;
          clearInterval(checkQuizOpen);
        }
      }, 100);

      const timer = setTimeout(() => {
        clearInterval(checkQuizOpen);
        if (blocked) return;
        
        // double check conditions at trigger time
        const currentPath = window.location.pathname;
        if (currentPath !== "/book" && !document.querySelector(".cm-overlay--visible")) {
          setIsOpen(true);
          sessionStorage.setItem("velara_reset_shown", "true");
        }
      }, 10000);

      return () => {
        clearTimeout(timer);
        clearInterval(checkQuizOpen);
      };
    }
  }, [location.pathname]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      if (!isSubmitted) {
        // Only show ghost bar if closed without submitting and it hasn't been dismissed
        if (!sessionStorage.getItem("velara_ghost_dismissed")) {
          setShowGhostBar(true);
        }
      }
    }, 200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError(true);
      setTimeout(() => setEmailError(false), 400);
      return;
    }
    setEmailError(false);
    setIsSubmitted(true);
  };

  const handleSuccessClick = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      navigate("/");
      // Scroll to testimonials if possible
      setTimeout(() => {
        const testimonialsSection = document.getElementById("testimonials") || document.querySelector(".testimonials-section");
        if (testimonialsSection) {
          testimonialsSection.scrollIntoView({ behavior: "smooth" });
        } else {
            window.scrollTo({ top: document.body.scrollHeight / 2, behavior: "smooth" });
        }
      }, 100);
    }, 200);
  };

  const handleReopen = () => {
    setShowGhostBar(false);
    setIsOpen(true);
    setIsSubmitted(false);
  };

  const handleDismissGhostBar = () => {
    setShowGhostBar(false);
    sessionStorage.setItem("velara_ghost_dismissed", "true");
  };

  // If mobile and somehow triggers, don't render (safety net)
  if (window.innerWidth < 768) return null;

  return (
    <>
      {(isOpen || isClosing) && (
        <div className={`tom-overlay ${isClosing ? "tom-overlay--closing" : ""}`}>
          <div className={`tom-card ${isClosing ? "tom-card--closing" : ""}`}>
            {/* Left Panel */}
            <div className="tom-left">
              <svg viewBox="0 0 300 500" className="tom-left-bg-svg">
                <path d="M-20,400 Q80,200 150,50 Q180,150 100,300 Q60,380 -20,400Z" fill="#C9A84C"/>
                <path d="M200,500 Q280,300 250,100 Q300,200 320,350 Q290,450 200,500Z" fill="#C9A84C" opacity="0.6"/>
                <path d="M50,500 Q120,400 80,250 Q40,300 20,450Z" fill="#F5F0E8" opacity="0.4"/>
                <line x1="30" y1="480" x2="270" y2="20" stroke="#C9A84C" strokeWidth="0.5" opacity="0.4"/>
              </svg>
              
              <div className="tom-left-number">7</div>
              <div className="tom-left-overline">7 · DAY · RESET</div>
              <div className="tom-left-bottom-rule"></div>
            </div>

            {/* Right Panel */}
            <div className="tom-right">
              <button className="tom-close" onClick={handleClose}>×</button>

              {!isSubmitted ? (
                <>
                  <div className="tom-overline">COMPLIMENTARY PROTOCOL</div>
                  <h2 className="tom-headline">Your Free 7-Day Functional Reset</h2>
                  <p className="tom-subline">
                    A practitioner-designed micro-protocol for your specific health concern. Not generic wellness advice — a structured 7-day functional medicine framework sent directly to your inbox.
                  </p>

                  <svg className="tom-divider-svg" viewBox="0 0 100 2" preserveAspectRatio="none">
                    <path
                      className="tom-divider-path"
                      d="M0 1 Q 50 2 100 1"
                      stroke="#C9A84C"
                      strokeWidth="1"
                      fill="none"
                    />
                  </svg>

                  <div className="tom-features">
                    <div className="tom-feature-item">
                      <span className="tom-feature-icon">✦</span> Specific to your symptom pattern
                    </div>
                    <div className="tom-feature-item">
                      <span className="tom-feature-icon">✦</span> Morning routine + targeted nutrition
                    </div>
                    <div className="tom-feature-item">
                      <span className="tom-feature-icon">✦</span> One lab test to request this week
                    </div>
                  </div>

                  <form className="tom-form" onSubmit={handleSubmit} noValidate>
                    <label className="tom-form-label">WHERE SHOULD WE SEND IT?</label>
                    <input
                      type="email"
                      className={`tom-input ${emailError ? "tom-input--error" : ""}`}
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type="submit" className="tom-btn">
                      Send Me The Reset Protocol →
                    </button>
                    <p className="tom-form-note">
                      Sent instantly. No spam. Unsubscribe anytime.
                    </p>
                  </form>
                </>
              ) : (
                <div className="tom-success">
                  <div className="tom-success-icon">✦</div>
                  <h2 className="tom-success-title">It's on its way.</h2>
                  <p className="tom-success-body">
                    Check your inbox in the next few minutes. Your 7-day reset is personalized to your health concern.
                  </p>
                  <div className="tom-success-footer">
                    <span className="tom-success-small">While you wait — explore what VELARA patients experience.</span>
                    <a className="tom-success-link" onClick={handleSuccessClick}>
                      See Patient Results →
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showGhostBar && !isOpen && !isClosing && (
        <div className="tom-ghost-bar">
          <span className="tom-ghost-text">
            Your free 7-day reset is waiting — 
            <a className="tom-ghost-link" onClick={handleReopen}>Claim it here →</a>
          </span>
          <button className="tom-ghost-close" onClick={handleDismissGhostBar}>×</button>
        </div>
      )}
    </>
  );
};

export default TimedOfferModal;
