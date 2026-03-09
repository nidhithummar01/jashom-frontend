import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Cookie, X } from 'lucide-react';

const STORAGE_KEY = 'jashom_cookie_consent';
const PREFERENCES_KEY = 'jashom_cookie_preferences';

const CYAN = '#22D3EE';
const CYAN_RGB = '34, 211, 238';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, [mounted]);

  const allow = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'accepted');
      localStorage.setItem(
        PREFERENCES_KEY,
        JSON.stringify({
          necessary: true,
          preferences: true,
          statistics: true,
          marketing: true,
        })
      );
    } catch {
      // ignore
    }
    setVisible(false);
  };

  const deny = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'denied');
      localStorage.setItem(
        PREFERENCES_KEY,
        JSON.stringify({
          necessary: true,
          preferences: false,
          statistics: false,
          marketing: false,
        })
      );
    } catch {
      // ignore
    }
    setVisible(false);
  };

  const close = () => deny();

  const banner = (
    <dialog
      open={visible}
      aria-label="Cookie consent"
      className="cookie-consent-dialog w-full max-w-none border-0 p-0 m-0 shadow-none"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        top: 'auto',
        margin: 0,
        maxHeight: 'none',
        zIndex: 99999,
        pointerEvents: 'auto',
        background: 'transparent',
      }}
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 28, stiffness: 260 }}
        className="px-4 pb-5 md:px-6 md:pb-6"
      >
        <div
            className="relative pointer-events-auto w-full max-w-5xl mx-auto rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(168deg, rgba(12,12,14,0.98) 0%, rgba(6,6,8,0.99) 100%)',
              border: '1px solid rgba(255,255,255,0.06)',
              boxShadow: `0 0 0 1px rgba(${CYAN_RGB},0.06), 0 24px 48px -12px rgba(0,0,0,0.7), 0 0 100px -24px rgba(${CYAN_RGB},0.08)`,
            }}
          >
            {/* Top accent */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, rgba(${CYAN_RGB},0.45), transparent)`,
              }}
            />

            <div className="p-5 md:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
              {/* Left: Icon + Title + Description */}
              <div className="flex items-start gap-4 flex-1 min-w-0 pr-4 sm:pr-6">
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, rgba(${CYAN_RGB},0.2) 0%, rgba(${CYAN_RGB},0.06) 100%)`,
                    border: `1px solid rgba(${CYAN_RGB},0.25)`,
                  }}
                >
                  <Cookie className="w-6 h-6" style={{ color: CYAN }} strokeWidth={1.75} />
                </div>
                <div className="min-w-0">
                  <h2 className="font-semibold text-white text-lg md:text-xl tracking-tight">
                    This website uses cookies
                  </h2>
                  <p
                    className="text-sm md:text-[15px] leading-relaxed mt-1"
                    style={{ color: 'rgba(255,255,255,0.78)' }}
                  >
                    We use cookies to personalise content and ads, to provide social media features and to
                    analyse our traffic.{' '}
                    <Link to="/cookies/" className="font-medium hover:opacity-90" style={{ color: CYAN }}>
                      Cookie Policy
                    </Link>
                  </p>
                </div>
              </div>

              {/* Right: Actions row – Allow, Deny, Close */}
              <div className="relative z-10 flex flex-shrink-0 sm:pl-6 items-center gap-3">
                <button
                  type="button"
                  onClick={allow}
                  className="cursor-pointer px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:brightness-110 active:scale-[0.98] whitespace-nowrap"
                  style={{
                    cursor: 'pointer',
                    background: `linear-gradient(135deg, ${CYAN} 0%, #06b6d4 100%)`,
                    color: '#0a0a0a',
                    boxShadow: `0 0 24px -4px rgba(${CYAN_RGB},0.45), 0 1px 0 0 rgba(255,255,255,0.1) inset`,
                  }}
                >
                  Allow
                </button>
                <button
                  type="button"
                  onClick={deny}
                  className="cursor-pointer px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-white/[0.08] active:scale-[0.98] whitespace-nowrap"
                  style={{
                    cursor: 'pointer',
                    background: 'rgba(255,255,255,0.04)',
                    color: 'rgba(255,255,255,0.9)',
                    border: '1px solid rgba(255,255,255,0.12)',
                  }}
                >
                  Deny
                </button>
                <button
                  type="button"
                  onClick={close}
                  className="cursor-pointer p-2.5 rounded-xl transition-colors duration-200 hover:bg-white/10 flex-shrink-0"
                  style={{ cursor: 'pointer', color: 'rgba(255,255,255,0.55)' }}
                  aria-label="Close"
                >
                  <X className="w-5 h-5" strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
      </motion.div>
    </dialog>
  );

  if (!mounted || typeof document === 'undefined') return null;
  return createPortal(banner, document.body);
}
