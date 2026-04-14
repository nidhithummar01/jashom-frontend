import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Cookie, X } from 'lucide-react';

const STORAGE_KEY = 'jashom_cookie_consent';
const PREFERENCES_KEY = 'jashom_cookie_preferences';

const CYAN = '#22D3EE';
const CYAN_RGB = '34, 211, 238';

/* Show banner immediately when consent not yet set */
const COOKIE_BANNER_DELAY_MS = 0;

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) timeoutId = setTimeout(() => setVisible(true), COOKIE_BANNER_DELAY_MS);
    } catch {
      timeoutId = setTimeout(() => setVisible(true), COOKIE_BANNER_DELAY_MS);
    }
    return () => { if (timeoutId) clearTimeout(timeoutId); };
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
        initial={{ y: 48, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: 'spring', damping: 24, stiffness: 220 }}
        className="px-4 pb-4 md:px-6 md:pb-6"
      >
        <div
            className="relative pointer-events-auto w-full max-w-4xl mx-auto rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(22, 36, 48, 0.78) 0%, rgba(10, 18, 28, 0.76) 100%)',
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: `0 12px 40px -16px rgba(0,0,0,0.72), 0 0 0 1px rgba(${CYAN_RGB},0.12)`,
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
          >
            <div className="absolute inset-0 pointer-events-none" style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)'
            }} />

            <div className="relative z-10 pt-8 pb-9 pl-8 pr-5 md:pt-9 md:pb-10 md:pl-10 md:pr-6">
              <div className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, rgba(${CYAN_RGB},0.28) 0%, rgba(${CYAN_RGB},0.1) 100%)`,
                    border: `1px solid rgba(${CYAN_RGB},0.35)`,
                  }}
                >
                  <Cookie className="w-7 h-7" style={{ color: CYAN }} strokeWidth={1.9} />
                </div>
                <div className="min-w-0">
                  <h2 className="font-semibold text-white text-xl tracking-tight">
                    This website uses cookies
                  </h2>
                  <p
                    className="text-sm md:text-base leading-relaxed mt-1.5"
                    style={{ color: 'rgba(255,255,255,0.82)' }}
                  >
                    We use cookies to personalise content and ads, to provide social media features and to
                    analyse our traffic.{' '}
                    <Link to="/cookies/" className="font-medium hover:opacity-90" style={{ color: CYAN }}>
                      Cookie Policy
                    </Link>
                  </p>
                </div>
              </div>

              <div className="mt-5 mb-2 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={allow}
                  className="cursor-pointer min-w-[120px] px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:brightness-110 active:scale-[0.98] whitespace-nowrap"
                  style={{
                    cursor: 'pointer',
                    background: `linear-gradient(135deg, ${CYAN} 0%, #06b6d4 100%)`,
                    color: '#0a0a0a',
                    boxShadow: `0 0 20px -4px rgba(${CYAN_RGB},0.52), 0 1px 0 0 rgba(255,255,255,0.14) inset`,
                  }}
                >
                  Allow all
                </button>
                <button
                  type="button"
                  onClick={deny}
                  className="cursor-pointer min-w-[120px] px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-white/[0.08] active:scale-[0.98] whitespace-nowrap"
                  style={{
                    cursor: 'pointer',
                    background: 'rgba(16, 24, 36, 0.55)',
                    color: 'rgba(255,255,255,0.9)',
                    border: '1px solid rgba(255,255,255,0.24)',
                  }}
                >
                  Deny
                </button>
              </div>

              <button
                type="button"
                onClick={close}
                className="cursor-pointer absolute top-3 right-3 p-2 rounded-lg transition-colors duration-200 hover:bg-white/10"
                style={{ cursor: 'pointer', color: 'rgba(255,255,255,0.58)' }}
                aria-label="Close"
              >
                <X className="w-4 h-4" strokeWidth={2} />
              </button>
            </div>
          </div>
      </motion.div>
    </dialog>
  );

  if (!mounted || typeof document === 'undefined') return null;
  return createPortal(banner, document.body);
}
