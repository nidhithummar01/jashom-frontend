import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { SEO as Seo } from './SEO';

export function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      navigate('/', { replace: true });
    }, 4000);

    return () => window.clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8"
      style={{
        background:
          'radial-gradient(1200px 560px at 12% 0%, rgba(34, 211, 238, 0.16) 0%, rgba(11, 15, 20, 1) 52%, rgba(11, 15, 20, 1) 100%)',
      }}
    >
      <Seo
        title="404 - Page Not Found | Jashom"
        description="The page you requested was not found. Redirecting you to the home page."
        keywords="404, page not found, jashom"
      />

      <div className="pointer-events-none absolute -top-20 -left-16 h-64 w-64 rounded-full blur-3xl" style={{ background: 'rgba(34, 211, 238, 0.18)' }} />
      <div className="pointer-events-none absolute -bottom-20 -right-16 h-72 w-72 rounded-full blur-3xl" style={{ background: 'rgba(2, 132, 199, 0.14)' }} />

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl border p-8 sm:p-12 text-center"
        style={{
          background: 'linear-gradient(180deg, rgba(17, 24, 39, 0.82) 0%, rgba(11, 15, 20, 0.88) 100%)',
          borderColor: 'rgba(34, 211, 238, 0.25)',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.35)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(800px 220px at 50% -10%, rgba(34, 211, 238, 0.2) 0%, rgba(34, 211, 238, 0) 68%)' }}
        />

        <p
          className="relative inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold tracking-[0.18em] mb-5 border"
          style={{
            color: '#67E8F9',
            borderColor: 'rgba(34, 211, 238, 0.3)',
            background: 'rgba(34, 211, 238, 0.08)',
          }}
        >
          ERROR 404
        </p>

        <p
          className="relative text-7xl sm:text-8xl font-extrabold leading-none mb-3"
          style={{
            color: '#FFFFFF',
            letterSpacing: '-0.04em',
            textShadow: '0 6px 28px rgba(34, 211, 238, 0.16)',
          }}
        >
          404
        </p>

        <h1 className="relative text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#FFFFFF' }}>
          Page Not Found
        </h1>

        <p className="relative text-base sm:text-lg mb-8 mx-auto max-w-xl" style={{ color: '#CBD5E1', lineHeight: 1.7 }}>
          The page you are trying to reach does not exist or may have been moved.
          We will redirect you to the home page in a few seconds.
        </p>

        <div className="relative flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold transition-all hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, #22D3EE 0%, #06B6D4 100%)',
              color: '#041018',
              boxShadow: '0 10px 20px rgba(34, 211, 238, 0.28)',
            }}
          >
            Go to Home
          </Link>
          
        </div>

        <p className="relative mt-6 text-xs sm:text-sm" style={{ color: '#94A3B8' }}>
          Redirecting automatically in 4 seconds...
        </p>
      </motion.div>
    </div>
  );
}
