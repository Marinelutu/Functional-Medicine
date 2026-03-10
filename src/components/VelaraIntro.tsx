import { useEffect, useState, useRef } from 'react';
import './VelaraIntro.css';

const VelaraIntro = ({ onComplete }: { onComplete?: () => void }) => {
  const [visible, setVisible] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Check session storage - only play once per session
    if (sessionStorage.getItem('velara-intro-played')) {
      setVisible(false);
      onComplete?.();
      return;
    }

    const handleMessage = (event: MessageEvent) => {
      if (event.data === 'velara-intro-complete') {
        sessionStorage.setItem('velara-intro-played', 'true');
        setVisible(false);
        onComplete?.();
      }
    };

    // Listen for postMessage from iframe
    window.addEventListener('message', handleMessage);

    // Also listen for the custom event in case iframe dispatches on parent
    const handleCustomEvent = () => {
      sessionStorage.setItem('velara-intro-played', 'true');
      setVisible(false);
      onComplete?.();
    };
    window.addEventListener('velara-intro-complete', handleCustomEvent);

    return () => {
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('velara-intro-complete', handleCustomEvent);
    };
  }, [onComplete]);

  if (!visible) return null;

  return (
    <iframe
      ref={iframeRef}
      src="/velara-intro.html"
      className="velara-intro-iframe"
      title="VELARA Intro"
      allow="autoplay"
    />
  );
};

export default VelaraIntro;
