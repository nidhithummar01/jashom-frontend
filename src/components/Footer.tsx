import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'motion/react';
import type { LucideIcon } from 'lucide-react';
import { Phone, Mail, Linkedin, Instagram, Youtube, MapPin } from 'lucide-react';
import { SHOW_BLOG_SECTION } from '../config/featureFlags';

const ACCENT = '#22D3EE';
const MUTED = '#9CA3AF';
const BG = '#0a0a0a';
const MAPS_URL =
  'https://www.google.com/maps?cid=14003985891872718787&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYASAA&hl=en-US&source=embed';

/** Matches reference: small caps section labels */
const colHeading =
  'text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-white mb-3 sm:mb-4';

const linkClass =
  'text-[13px] sm:text-sm leading-snug transition-colors duration-200 block';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const getFooterLinkStyle = (isActive: boolean, key: string) => ({
    color: isActive || hoveredLink === key ? ACCENT : MUTED,
  });

  const servicesLinks = [
    { label: 'GPU Optimization Service', path: '/gpu-optimization-service/' },
    { label: 'CUDA Development Service', path: '/cuda-development-service/' },
    { label: 'Hire CUDA Developer', path: '/hire-cuda-developer/' },
    { label: 'Edge Inference', path: '/solutions/' },
  ];

  const companyLinks = [
    { label: 'About Us', path: '/about-us/' },
    { label: 'Company Brochure', path: '/brochure/' },
    { label: 'Contact Us', path: '/contact/' },
    { label: 'Careers', path: '/careers/' },
    { label: 'Legal', path: '/terms/' },
  ];

  const quickLinks: { label: string; path: string }[] = [
    ...(SHOW_BLOG_SECTION ? [{ label: 'Blog', path: '/blogs/' }] : []),
    { label: 'Case Studies', path: '/portfolio/' },
    { label: 'Whitepapers', path: '/resources/' },
    { label: 'System Status', path: '/news/' },
  ];

  /** Lucide for crisp, uniform sizing; PNG only where no brand icon exists (Reddit). */
  const socialLinks: (
    | { href: string; label: string; Icon: LucideIcon; brandColor: string }
    | { href: string; label: string; image: string }
  )[] = [
    {
      href: 'https://www.linkedin.com/company/jashom/',
      label: 'LinkedIn',
      Icon: Linkedin,
      brandColor: '#0A66C2',
    },
    {
      href: 'https://www.instagram.com/jashomtechnologies_',
      label: 'Instagram',
      Icon: Instagram,
      brandColor: '#E1306C',
    },
    {
      href: 'https://youtube.com/@infojashom',
      label: 'YouTube',
      Icon: Youtube,
      brandColor: '#FF0000',
    },
    {
      href: 'https://reddit.com/r/jashom',
      label: 'Reddit',
      image: '/images/social-media/reddit.png.png',
    },
  ];

  return (
    <footer
      className="relative mb-0 w-full overflow-x-hidden pt-16 pb-12 sm:pt-20 sm:pb-14 md:pt-24 md:pb-16 lg:pb-20"
      style={{
        background: BG,
        borderTop: '1px solid rgba(34, 211, 238, 0.15)',
      }}
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Explicit 5-col grid (scoped CSS) — Tailwind lg:1024px often missed at ~900px / zoomed devtools */}
      <style>{`
        .jashom-footer__main {
          display: grid;
          width: 100%;
          gap: 2rem 0.9rem;
          grid-template-columns: 1fr;
          align-items: start;
          padding-bottom: '80px ';
        }
        @media (min-width: 768px) {
          .jashom-footer__main {
            grid-template-columns: repeat(5, minmax(0, 1fr));
            column-gap: 0.95rem;
            row-gap: 1.75rem;
          }
        }
        @media (min-width: 1280px) {
          .jashom-footer__main {
            column-gap: 1.5rem;
            row-gap: 2rem;
          }
        }
      `}</style>
      <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-8 lg:px-10 xl:px-12">
        <div className="jashom-footer__main pb-16 mb-16 md:mb-20 lg:mb-24 md:pb-20 lg:pb-24">
          {/* Column 1 — Brand + Address */}
          <div className="min-w-0 lg:pr-2">
            <Link to="/" className="mb-4 inline-flex items-center" aria-label="Jashom home">
              <motion.img
                src="/jashom-logo-header-70px.png"
                alt="Jashom"
                className="h-12 w-auto max-w-[200px] object-contain object-left sm:h-14"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
              />
            </Link>
            <p className="mb-6 max-w-[250px]  text-sm leading-relaxed sm:text-[15px]" style={{ color: MUTED }}>
              Empowering businesses with modern GPU optimization and CUDA development for high-performance computing.
            </p>
            <div className="mt-6 mb-2">
              <h4 className={colHeading} style={{ fontSize: '16px', marginBottom: 0 }}>
                Address
              </h4>
            </div>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mb-6 flex items-start gap-2 text-sm leading-relaxed transition-colors duration-200"
              style={{ color: MUTED }}
              aria-label="Open address in Google Maps"
            >
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: ACCENT }} />
              <div className="space-y-0.5">
                <div className="font-semibold transition-colors duration-200 group-hover:text-[#22D3EE]">
                  Ahmedabad, India
                </div>
                <div className="transition-colors duration-200 group-hover:text-[#22D3EE]">
                  Shivam 2, AMBA BUSINESS PARK, 414,
                </div>
                <div className="transition-colors duration-200 group-hover:text-[#22D3EE]">
                  Adalaj, Gujarat 382421
                </div>
              </div>
            </a>
          </div>

          {/* Column 2 — Contact + Social */}
          <div className="min-w-0 space-y-7  lg:pr-2">
            <div>
              <h4 className={colHeading} style={{ fontSize :'16px' }}>Get in Touch</h4>
              <div className="space-y-2.5 gap-6 mb-6">
                <a
                  href="tel:+919023906363"
                  className="flex items-start gap-3 text-sm transition-colors group"
                  style={{ color: MUTED }}
                >
                  <Phone className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: ACCENT }} />
                  <span className="group-hover:text-[#22D3EE]">+91 90239 06363</span>
                </a>
                <a
                  href="mailto:info@jashom.com"
                  className="flex items-start gap-3 text-sm transition-colors group"
                  style={{ color: MUTED }}
                >
                  <Mail className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: ACCENT }} />
                  <span className="group-hover:text-[#22D3EE]">info@jashom.com</span>
                </a>
              </div>
            </div>
            <div>
              <h4 className={colHeading} style={{ fontSize :'16px' }}>Follow Us</h4>
              <div className="mt-2 flex flex-wrap gap-4 sm:gap-5">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors duration-200 hover:border-[rgba(34,211,238,0.35)] sm:h-10 sm:w-10"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      borderColor: 'rgba(255,255,255,0.1)',
                    }}
                    animate={{ y: [0, -6, 0] }}
                    whileTap={{ scale: 0.96 }}
                    transition={{
                      duration: 0.8,
                      ease: 'easeInOut',
                      repeat: Infinity,
                      repeatType: 'loop',
                      delay: index * 0.12,
                    }}
                    aria-label={social.label}
                  >
                    {'image' in social ? (
                      <img
                        src={social.image}
                        alt=""
                        width={24}
                        height={24}
                        className="h-[18px] w-[18px] max-h-full max-w-full object-contain sm:h-5 sm:w-5"
                        draggable={false}
                      />
                    ) : (
                      <social.Icon
                        className="h-[18px] w-[18px] shrink-0 sm:h-5 sm:w-5"
                        style={{ color: social.brandColor }}
                        strokeWidth={1.75}
                        aria-hidden
                      />
                    )}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 3 — Services */}
          <div className="min-w-0 lg:px-1">
            <h4 className={colHeading} style={{ fontSize :'16px' }}>Services</h4>
            <ul className="space-y-2.5 hover:text-[] ">
              {servicesLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={linkClass}
                    style={({ isActive }) => getFooterLinkStyle(isActive, link.path)}
                    onMouseEnter={() => setHoveredLink(link.path)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Company */}
          <div className="min-w-0 lg:px-1">
            <h4 className={colHeading} style={{ fontSize :'16px' }}>Company</h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={linkClass}
                    style={({ isActive }) => getFooterLinkStyle(isActive, link.path)}
                    onMouseEnter={() => setHoveredLink(link.path)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5 — Quick Links */}
          <div className="min-w-0 lg:pl-2">
            <h4 className={colHeading} style={{ fontSize :'16px' }}>Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.path + link.label}>
                  <NavLink
                    to={link.path}
                    className={linkClass}
                    style={({ isActive }) => getFooterLinkStyle(isActive, link.path)}
                    onMouseEnter={() => setHoveredLink(link.path)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="flex flex-col  gap-4 border-t mb-3 justify-between border-[rgba(255,255,255,0.08)] pt-6 pb-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pt-7 md:gap-6 md:pt-8 md:pb-3 lg:pt-9"
        >
          <p
            className="order-2 max-w-2xl mt-6  text-center text-[11px] leading-relaxed sm:text-left sm:text-xs lg:order-1"
            style={{ color: MUTED }}
          >
            © {currentYear} Jashom GPU Optimization. All rights reserved. Engineered for peak performance.
          </p>
          <nav
            className="order-1 mt-6 flex gap-6 flex-wrap items-center justify-center gap-x-3 gap-y-1  text-[11px] sm:order-2 sm:justify-end sm:gap-x-5 sm:text-xs"
            aria-label="Legal"
          >
            <NavLink
              to="/privacy/"
              className="shrink-0 py-1 transition-colors"
              style={({ isActive }) => getFooterLinkStyle(isActive, '/privacy/')}
              onMouseEnter={() => setHoveredLink('/privacy/')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              Privacy Policy
            </NavLink>
            <span className="text-[#4B5563]" aria-hidden>
              ·
            </span>
            <NavLink
              to="/terms/"
              className="shrink-0 py-1 transition-colors"
              style={({ isActive }) => getFooterLinkStyle(isActive, '/terms/')}
              onMouseEnter={() => setHoveredLink('/terms/')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              Terms of Service
            </NavLink>
            <span className="text-[#4B5563]" aria-hidden>
              ·
            </span>
            <NavLink
              to="/security/"
              className="shrink-0 py-1 transition-colors"
              style={({ isActive }) => getFooterLinkStyle(isActive, '/security/')}
              onMouseEnter={() => setHoveredLink('/security/')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              Security
            </NavLink>
          </nav>
        </div>
      </div>
    </footer>
  );
}
