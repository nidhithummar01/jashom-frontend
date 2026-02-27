import type React from 'react';

/** Shared theme colors and styles for service/marketing pages. */
export const SECTION_BG = '#0B0F14';
export const CARD_BG_LIGHT = '#f5f5f5';
export const BORDER_SUBTLE = 'rgba(255, 255, 255, 0.08)';
export const BENEFIT_CARD_BG = 'rgba(16, 185, 129, 0.05)';
export const ACCENT_COLOR = '#10B981';
export const TEXT_WHITE = '#FFFFFF';
export const TEXT_FAFAFA = '#FAFAFA';
export const TEXT_MUTED = '#9CA3AF';
export const TEXT_SUBTLE = '#6B7280';
export const TEXT_GRAY = '#9E9E9E';
export const TEXT_QUOTE = '#D1D5DB';
export const CARD_DESC_GRAY = '#666666';

export const BADGE_STYLE = { background: 'rgba(16, 185, 129, 0.08)', borderColor: 'rgba(16, 185, 129, 0.25)' } as const;
export const BADGE_TESTIMONIAL = { background: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.2)' } as const;
export const HERO_OVERLAY_GRADIENT = 'linear-gradient(to right, rgba(11, 15, 20, 0.85) 0%, rgba(11, 15, 20, 0.75) 40%, rgba(11, 15, 20, 0.5) 70%, rgba(11, 15, 20, 0.3) 100%)';
export const HERO_BG_CENTER = { backgroundSize: 'cover' as const, backgroundPosition: 'center' as const, backgroundRepeat: 'no-repeat' as const };
export const OVERVIEW_BADGE = { background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)' } as const;
export const KEY_STAT_BOX = { background: BENEFIT_CARD_BG, border: '1px solid rgba(16, 185, 129, 0.2)' } as const;
export const IMAGE_SHADOW_ACCENT = { boxShadow: '0 20px 60px rgba(16, 185, 129, 0.3)' } as const;
export const IMAGE_SHADOW_ACCENT_ALT = { borderRadius: '20px', boxShadow: '0 20px 60px rgba(16, 185, 129, 0.25), 0 0 40px rgba(16, 185, 129, 0.1)' } as const;
export const CTA_HERO_STYLE = { background: ACCENT_COLOR, color: TEXT_WHITE, boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.4)' } as const;
export const CTA_SIMPLE = { background: ACCENT_COLOR, color: TEXT_WHITE } as const;
export const PROCESS_GRADIENT_BG = 'linear-gradient(180deg, #0B0F14 0%, #111827 50%, #0B0F14 100%)';
export const FORM_GRADIENT_BG = 'linear-gradient(180deg, #0B0F14 0%, #111827 100%)';
export const FORM_GLOW_STYLE = { background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.08) 0%, transparent 60%)', filter: 'blur(60px)', opacity: 0.6 } as const;
export const FORM_CONTAINER_STYLE: React.CSSProperties = { background: 'rgba(17, 24, 39, 0.6)', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(14px)', padding: '48px 32px', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)' };
export const GRADIENT_EMERALD_CYAN = 'linear-gradient(135deg, #10B981, #06B6D4)';
export const SUBMIT_BTN_STYLE = { background: GRADIENT_EMERALD_CYAN, border: '1px solid transparent', color: TEXT_WHITE, boxShadow: '0 4px 14px rgba(16, 185, 129, 0.25)', minWidth: '200px' } as const;
export const SUBMIT_BTN_HOVER = { boxShadow: '0 8px 24px rgba(16, 185, 129, 0.35)' } as const;
export const HEADING_TITLE_STYLE = { color: TEXT_FAFAFA, letterSpacing: '-0.025em', lineHeight: 1.2 } as const;
export const FORM_LAYOUT = { display: 'flex' as const, flexDirection: 'column' as const, gap: '28px' } as const;
export const FORM_GRID_GAP = { gap: '24px' } as const;
export const FORM_MAX_WIDTH = { maxWidth: '1100px', margin: '0 auto' } as const;
export const CHECK_ICON_BG = { background: ACCENT_COLOR } as const;
export const WHY_CHOOSE_BORDER = { borderColor: 'rgba(16, 185, 129, 0.3)' } as const;
export const AI_MODEL_CARD_STYLE: React.CSSProperties = { background: 'rgba(17, 24, 39, 0.4)', backdropFilter: 'blur(10px)', border: '1px solid rgba(16, 185, 129, 0.1)' };
export const GRADIENT_TEXT_STYLE = { background: GRADIENT_EMERALD_CYAN, WebkitBackgroundClip: 'text' as const, WebkitTextFillColor: 'transparent' as const };
export const OFFICE_ICON_BG = { background: 'rgba(16, 185, 129, 0.15)' } as const;
export const officeCardStyle = { background: 'rgba(17, 24, 39, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(14px)' } as const;
export const formInputStyle = { background: 'rgba(255, 255, 255, 0.06)', borderColor: 'rgba(255, 255, 255, 0.1)' } as const;

export const CHEVRON_DOWN_D = 'M19 9l-7 7-7-7';
export const CHECK_PATH = 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z';

export const formInputClass = 'w-full px-4 py-3 rounded-xl border text-white placeholder-white/40 focus:border-[#10B981]/50 focus:outline-none focus:ring-1 focus:ring-[#10B981]/30 transition-all';
