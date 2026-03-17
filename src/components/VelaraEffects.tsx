import { useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";

/**
 * VelaraEffects — Three premium visual effects for the VELARA website:
 *   1. Breathing Background (dark green sections)
 *   2. Cursor Glow Trail (desktop only)
 *   3. Liquid Gold Divider IntersectionObserver
 *
 * All three effects are disabled on the book page via data-page="book".
 */
const VelaraEffects = () => {
  const location = useLocation();
  const glowCreated = useRef(false);
  const dividerObserverRef = useRef<IntersectionObserver | null>(null);

  // ═══════════════════════════════════════════
  // EFFECT 1 — BREATHING BACKGROUND
  // ═══════════════════════════════════════════
  const applyBreathingEffect = useCallback(() => {
    if (document.body.dataset.page === "book") return;

    // Select dark green sections by known class names
    const breatheSections = document.querySelectorAll<HTMLElement>(
      ".problem-section, .eligibility-gate, .dark-section"
    );

    const delays = [0, 1.5, 3, 4.5];
    let idx = 0;
    breatheSections.forEach((section) => {
      // Skip hero video section and footer
      if (
        section.closest(".hero-section") ||
        section.tagName === "FOOTER" ||
        section.closest("footer")
      ) return;

      if (!section.classList.contains("breathe")) {
        section.classList.add("breathe");
        section.style.animationDelay = `${delays[idx % delays.length]}s`;
        idx++;
      }
    });
  }, []);

  // ═══════════════════════════════════════════
  // EFFECT 2 — CURSOR GLOW TRAIL
  // ═══════════════════════════════════════════
  useEffect(() => {
    if (glowCreated.current) return;
    if (document.body.dataset.page === "book") return;

    // Disable on touch devices and small screens
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice || window.innerWidth < 1024) return;

    glowCreated.current = true;

    // Create glow element
    const glow = document.createElement("div");
    glow.id = "cursor-glow";
    document.body.prepend(glow);

    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;
    let idleTimer: ReturnType<typeof setTimeout>;
    let isVisible = false;

    // Detect section type for glow color adaptation
    const updateGlowColor = (x: number, y: number) => {
      const elementUnder = document.elementFromPoint(x, y);
      if (!elementUnder) return;

      // Walk up to find nearest section
      let el: Element | null = elementUnder;
      while (el && el !== document.body) {
        const bg = getComputedStyle(el).backgroundColor;
        // Check if it's a dark section
        if (
          bg.includes("45, 74, 62") ||  // #2D4A3E
          bg.includes("30, 61, 50") ||   // darker variant
          bg.includes("50, 79, 67") ||   // #324F43
          bg.includes("28, 28, 28") ||   // #1C1C1C
          el.getAttribute("data-theme") === "dark"
        ) {
          glow.style.background =
            "radial-gradient(circle, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0.04) 40%, transparent 70%)";
          return;
        }
        el = el.parentElement;
      }

      // Default (cream/light sections): more subtle
      glow.style.background =
        "radial-gradient(circle, rgba(201,168,76,0.06) 0%, rgba(201,168,76,0.02) 40%, transparent 70%)";
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        glow.style.opacity = "1";
        isVisible = true;
      }

      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        glow.style.opacity = "0";
        isVisible = false;
      }, 2000);

      updateGlowColor(e.clientX, e.clientY);
    };

    document.addEventListener("mousemove", handleMouseMove);

    // Smooth animation loop with lerp
    let rafId: number;
    const animateGlow = () => {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      glow.style.left = glowX + "px";
      glow.style.top = glowY + "px";
      rafId = requestAnimationFrame(animateGlow);
    };
    rafId = requestAnimationFrame(animateGlow);

    // Handle resize — hide on small screens
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        glow.style.display = "none";
      } else {
        glow.style.display = "block";
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafId);
      clearTimeout(idleTimer);
    };
  }, []); // Only create once

  // ═══════════════════════════════════════════
  // EFFECT 3 — LIQUID GOLD DIVIDER + BREATHING
  // Re-initialize on route changes
  // ═══════════════════════════════════════════
  useEffect(() => {
    if (document.body.dataset.page === "book") return;

    // Small delay to let new page DOM render
    const timeoutId = setTimeout(() => {
      // Apply breathing effect to new page
      applyBreathingEffect();

      // Observe liquid gold dividers
      if (dividerObserverRef.current) {
        dividerObserverRef.current.disconnect();
      }

      const dividers = document.querySelectorAll<HTMLElement>(
        ".liquid-gold-divider:not(.animate)"
      );

      if (dividers.length === 0) return;

      dividerObserverRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate");
              dividerObserverRef.current?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.8 }
      );

      dividers.forEach((d) => dividerObserverRef.current!.observe(d));
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (dividerObserverRef.current) {
        dividerObserverRef.current.disconnect();
      }
    };
  }, [location.pathname, applyBreathingEffect]);

  // Handle book page glow visibility
  useEffect(() => {
    const glow = document.getElementById("cursor-glow");
    if (glow) {
      if (document.body.dataset.page === "book") {
        glow.style.display = "none";
      } else {
        glow.style.display = "";
      }
    }
  }, [location.pathname]);

  return null;
};

export default VelaraEffects;
