/**
 * Jashom Brand Colors - "Neural Fusion" World-Class Color System
 * Inspired by NVIDIA (GPU/Performance) + Modern AI Companies
 * Use these constants throughout the application for consistency
 */

export const colors = {
  // Primary Brand Colors - Light Cyan theme
  primary: '#22D3EE',        // Light Cyan - Primary
  primaryHover: '#06B6D4',   // Darker cyan for hover states
  secondary: '#7C3AED',      // Deep Violet - AI Innovation
  tertiary: '#06B6D4',       // Cyber Cyan (matches hover)
  
  // Background Colors
  bgPrimary: '#0B0F14',      // Deep navy/black - Main background
  bgSecondary: '#111827',    // Gray-900 - Secondary background
  bgTertiary: '#1F2937',     // Gray-800 - Elevated cards
  
  // Card & Surface Colors
  cardBg: 'rgba(255, 255, 255, 0.05)',
  cardBgHover: 'rgba(255, 255, 255, 0.08)',
  glassBg: 'rgba(255, 255, 255, 0.02)',
  
  // Text Colors
  textPrimary: '#FAFAFA',    // Near white - Primary text
  textSecondary: '#9CA3AF',  // Gray-400 - Secondary text
  textMuted: '#6B7280',      // Gray-500 - Muted text
  textDisabled: '#4B5563',   // Gray-600 - Disabled text
  
  // Border Colors
  borderSubtle: 'rgba(255, 255, 255, 0.08)',
  borderDefault: 'rgba(255, 255, 255, 0.1)',
  borderActive: 'rgba(34, 211, 238, 0.3)',      // Cyan active border
  borderGlow: 'rgba(34, 211, 238, 0.5)',        // Cyan glow border
  
  // State Colors
  success: '#22D3EE',        // Light Cyan (matches primary)
  warning: '#F59E0B',        // Amber-500
  error: '#EF4444',          // Red-500
  info: '#06B6D4',           // Cyan-500 (matches tertiary)
  
  // Gradient Colors
  gradientStart: '#22D3EE',  // Light Cyan
  gradientMid: '#7C3AED',    // Deep Violet
  gradientEnd: '#06B6D4',    // Cyan hover
  
  // Shadow & Glow
  shadowPrimary: '0 4px 14px 0 rgba(34, 211, 238, 0.4)',
  shadowCard: '0 8px 32px rgba(34, 211, 238, 0.15)',
  glowPrimary: '0 0 40px rgba(34, 211, 238, 0.6)',
  glowSubtle: '0 0 20px rgba(34, 211, 238, 0.3)',
  glowPurple: '0 0 40px rgba(124, 58, 237, 0.4)',
  glowCyan: '0 0 40px rgba(6, 182, 212, 0.4)',
} as const;

// Opacity helpers
export const opacity = {
  glass: 0.05,
  glassHover: 0.08,
  overlay: 0.7,
  disabled: 0.5,
  subtle: 0.3,
} as const;

// Common gradient strings
export const gradients = {
  primary: `linear-gradient(135deg, ${colors.primary}, ${colors.tertiary})`,           // Green → Cyan
  hero: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 50%, ${colors.tertiary} 100%)`, // Green → Purple → Cyan
  card: `linear-gradient(135deg, ${colors.secondary}, ${colors.primary})`,             // Purple → Green
  primaryVertical: `linear-gradient(180deg, ${colors.primary}, ${colors.tertiary})`,
  background: `linear-gradient(180deg, ${colors.bgPrimary} 0%, ${colors.bgSecondary} 100%)`,
  cardSubtle: `linear-gradient(135deg, rgba(34, 211, 238, 0.08) 0%, rgba(34, 211, 238, 0.03) 100%)`,
} as const;

export default colors;
