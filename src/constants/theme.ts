import type React from 'react';

/** Shared theme colors and styles for service/marketing pages. */
export const SECTION_BG = '#0B0F14';
export const CARD_BG_LIGHT = '#f5f5f5';
export const BORDER_SUBTLE = 'rgba(255, 255, 255, 0.08)';
/** Primary: #22D3EE (Light Cyan), Hover: #06B6D4 */
export const ACCENT_COLOR = '#22D3EE';
export const ACCENT_HOVER = '#06B6D4';
export const ACCENT_RGB = '34, 211, 238';
export const BENEFIT_CARD_BG = `rgba(${ACCENT_RGB}, 0.05)`;
export const TEXT_WHITE = '#FFFFFF';
export const TEXT_FAFAFA = '#FAFAFA';
export const TEXT_MUTED = '#9CA3AF';
export const TEXT_SUBTLE = '#6B7280';
export const TEXT_GRAY = '#9E9E9E';
export const TEXT_QUOTE = '#D1D5DB';
export const CARD_DESC_GRAY = '#666666';

export const BADGE_STYLE = { background: `rgba(${ACCENT_RGB}, 0.08)`, borderColor: `rgba(${ACCENT_RGB}, 0.25)` } as const;
export const BADGE_TESTIMONIAL = { background: `rgba(${ACCENT_RGB}, 0.05)`, borderColor: `rgba(${ACCENT_RGB}, 0.2)` } as const;
export const HERO_OVERLAY_GRADIENT = 'linear-gradient(to right, rgba(11, 15, 20, 0.85) 0%, rgba(11, 15, 20, 0.75) 40%, rgba(11, 15, 20, 0.5) 70%, rgba(11, 15, 20, 0.3) 100%)';
export const HERO_BG_CENTER = { backgroundSize: 'cover' as const, backgroundPosition: 'center' as const, backgroundRepeat: 'no-repeat' as const };
export const HERO_BG_TOP = { backgroundSize: 'cover' as const, backgroundPosition: 'center top' as const, backgroundRepeat: 'no-repeat' as const };
export const OVERLAY_DARK = 'rgba(11, 15, 20, 0.4)';
export const OVERVIEW_BADGE = { background: `rgba(${ACCENT_RGB}, 0.1)`, border: `1px solid rgba(${ACCENT_RGB}, 0.3)` } as const;
export const KEY_STAT_BOX = { background: BENEFIT_CARD_BG, border: `1px solid rgba(${ACCENT_RGB}, 0.2)` } as const;
export const IMAGE_SHADOW_ACCENT = { boxShadow: `0 20px 60px rgba(${ACCENT_RGB}, 0.3)` } as const;
export const IMAGE_SHADOW_ACCENT_ALT = { borderRadius: '20px', boxShadow: `0 20px 60px rgba(${ACCENT_RGB}, 0.25), 0 0 40px rgba(${ACCENT_RGB}, 0.1)` } as const;
export const CTA_HERO_STYLE = { background: ACCENT_COLOR, color: TEXT_WHITE, boxShadow: `0 4px 14px 0 rgba(${ACCENT_RGB}, 0.4)` } as const;
export const CTA_SIMPLE = { background: ACCENT_COLOR, color: TEXT_WHITE } as const;
export const PROCESS_GRADIENT_BG = 'linear-gradient(180deg, #0B0F14 0%, #111827 50%, #0B0F14 100%)';
export const FORM_GRADIENT_BG = 'linear-gradient(180deg, #0B0F14 0%, #111827 100%)';
export const FORM_GLOW_STYLE = { background: `radial-gradient(circle at center, rgba(${ACCENT_RGB}, 0.08) 0%, transparent 60%)`, filter: 'blur(60px)', opacity: 0.6 } as const;
export const FORM_CONTAINER_STYLE: React.CSSProperties = { background: 'rgba(17, 24, 39, 0.6)', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(14px)', padding: '48px 32px', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)' };
export const GRADIENT_EMERALD_CYAN = `linear-gradient(135deg, ${ACCENT_COLOR}, ${ACCENT_HOVER})`;
export const SUBMIT_BTN_STYLE = { background: GRADIENT_EMERALD_CYAN, border: '1px solid transparent', color: TEXT_WHITE, boxShadow: `0 4px 14px rgba(${ACCENT_RGB}, 0.25)`, minWidth: '200px' } as const;
export const SUBMIT_BTN_HOVER = { boxShadow: `0 8px 24px rgba(${ACCENT_RGB}, 0.35)` } as const;
export const HEADING_TITLE_STYLE = { color: TEXT_FAFAFA, letterSpacing: '-0.025em', lineHeight: 1.2 } as const;
export const FORM_LAYOUT = { display: 'flex' as const, flexDirection: 'column' as const, gap: '28px' } as const;
export const FORM_GRID_GAP = { gap: '24px' } as const;
export const FORM_MAX_WIDTH = { maxWidth: '1100px', margin: '0 auto' } as const;
export const CHECK_ICON_BG = { background: ACCENT_COLOR } as const;
export const WHY_CHOOSE_BORDER = { borderColor: `rgba(${ACCENT_RGB}, 0.3)` } as const;
export const AI_MODEL_CARD_STYLE: React.CSSProperties = { background: 'rgba(17, 24, 39, 0.4)', backdropFilter: 'blur(10px)', border: `1px solid rgba(${ACCENT_RGB}, 0.1)` };
export const GRADIENT_TEXT_STYLE = { background: GRADIENT_EMERALD_CYAN, WebkitBackgroundClip: 'text' as const, WebkitTextFillColor: 'transparent' as const };
export const OFFICE_ICON_BG = { background: `rgba(${ACCENT_RGB}, 0.15)` } as const;
export const officeCardStyle = { background: 'rgba(17, 24, 39, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(14px)' } as const;
export const formInputStyle = { background: 'rgba(255, 255, 255, 0.06)', borderColor: 'rgba(255, 255, 255, 0.1)' } as const;

export const CHEVRON_DOWN_D = 'M19 9l-7 7-7-7';
export const CHECK_PATH = 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z';

export const formInputClass = 'w-full px-4 py-3 rounded-xl border text-white placeholder-white/40 focus:border-[#22D3EE]/50 focus:outline-none focus:ring-1 focus:ring-[#22D3EE]/30 transition-all';

/** GPU / service page hero and section layout */
export const HERO_BG_IMAGE = '/images/service-hero-bg.jpg';
export const HERO_H1_STYLE: React.CSSProperties = { fontSize: 'clamp(28px, 4vw, 48px)', textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)', letterSpacing: '-0.02em', marginBottom: '32px' };
export const HERO_P_STYLE: React.CSSProperties = { fontSize: 'clamp(17px, 2vw, 20px)', lineHeight: '1.75', textShadow: '0 2px 10px rgba(0, 0, 0, 0.6)', marginBottom: '48px', maxWidth: '560px' };
export const HERO_CONTENT_PADDING: React.CSSProperties = { paddingTop: '140px', paddingBottom: '100px' };
export const SECTION_CLASS = 'py-20 px-4 sm:px-6 lg:px-8';
export const SECTION_CONTAINER = 'max-w-7xl mx-auto';
export const CTA_SECTION_BG = `rgba(${ACCENT_RGB}, 0.05)`;
export const TESTIMONIAL_CARD_STYLE: React.CSSProperties = { background: 'rgba(255, 255, 255, 0.02)', borderColor: BORDER_SUBTLE, backdropFilter: 'blur(10px)' };

/** Motion variants to avoid repeating the same props */
export const MOTION_FADE_UP_20 = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } } as const;
export const MOTION_FADE_UP_30 = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } } as const;
export const MOTION_FADE_SCALE = { initial: { opacity: 0, scale: 0.95 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true }, transition: { duration: 0.6 } } as const;

/** Stagger animation variants for lists (HomePage, TeamPage, etc.) */
export const STAGGER_CONTAINER = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } } } as const;
export const STAGGER_ITEM = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100, damping: 10 } } } as const;

export const OFFICE_ICON_SVG_CLASS = 'w-6 h-6';
export const OFFICE_ICON_SVG_PROPS = { fill: 'none' as const, viewBox: '0 0 24 24', stroke: 'currentColor' as const } as const;
