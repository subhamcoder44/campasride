// CampasRideShare Design System v3
// Neon dark mode with gradient accents and glassmorphism

export const Colors = {
    // Primary accent — electric blue
    accent: '#6C63FF',
    accentLight: '#8B83FF',
    accentDark: '#5046E5',
    accentGlow: 'rgba(108, 99, 255, 0.25)',
    accentGlowStrong: 'rgba(108, 99, 255, 0.45)',
    accentSurface: 'rgba(108, 99, 255, 0.08)',

    // Secondary — vivid cyan
    cyan: '#00D4FF',
    cyanGlow: 'rgba(0, 212, 255, 0.18)',
    cyanSurface: 'rgba(0, 212, 255, 0.08)',

    // Tertiary — hot pink / magenta
    pink: '#FF6B9D',
    pinkGlow: 'rgba(255, 107, 157, 0.18)',
    pinkSurface: 'rgba(255, 107, 157, 0.08)',

    // Purple
    purple: '#A855F7',
    purpleGlow: 'rgba(168, 85, 247, 0.2)',
    purpleSurface: 'rgba(168, 85, 247, 0.08)',

    // Orange / amber
    orange: '#FF9F43',
    orangeGlow: 'rgba(255, 159, 67, 0.18)',
    orangeSurface: 'rgba(255, 159, 67, 0.08)',

    // Backgrounds — ultra-deep dark
    background: '#05080F',
    backgroundCard: '#0A0E1A',
    surface: '#0F1425',
    surfaceLight: '#151B30',
    surfaceHighlight: '#1C2440',
    surfaceGlass: 'rgba(15, 20, 37, 0.88)',

    // Text
    textPrimary: '#F0F2F5',
    textSecondary: '#8892A6',
    textMuted: '#5A6478',

    // Status — neon tones
    success: '#00E676',
    successLight: 'rgba(0, 230, 118, 0.12)',
    successGlow: 'rgba(0, 230, 118, 0.3)',
    warning: '#FFD93D',
    warningLight: 'rgba(255, 217, 61, 0.12)',
    error: '#FF5252',
    errorLight: 'rgba(255, 82, 82, 0.12)',
    errorGlow: 'rgba(255, 82, 82, 0.3)',

    // Borders
    border: 'rgba(255, 255, 255, 0.06)',
    borderLight: 'rgba(255, 255, 255, 0.04)',
    borderAccent: 'rgba(108, 99, 255, 0.25)',

    // Core
    white: '#FFFFFF',
    black: '#000000',
    transparent: 'transparent',
    overlay: 'rgba(0, 0, 0, 0.75)',
};

// Gradient color stops for LinearGradient
export const Gradients = {
    primary: ['#6C63FF', '#4FACFE'] as const,
    primaryDark: ['#5046E5', '#3D7BFF'] as const,
    neon: ['#6C63FF', '#00D4FF'] as const,
    sunset: ['#FF6B9D', '#FFB347'] as const,
    aurora: ['#6C63FF', '#A855F7', '#FF6B9D'] as const,
    success: ['#00E676', '#00BFA5'] as const,
    danger: ['#FF5252', '#FF1744'] as const,
    dark: ['#0F1425', '#05080F'] as const,
    card: ['#111830', '#0A0E1A'] as const,
    glass: ['rgba(15, 20, 37, 0.9)', 'rgba(10, 14, 26, 0.95)'] as const,
};

export const Spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    huge: 48,
    massive: 64,
} as const;

export const BorderRadius = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 28,
    full: 999,
} as const;

export const FontSize = {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 17,
    xl: 20,
    xxl: 26,
    xxxl: 34,
    hero: 48,
} as const;

export const FontWeight = {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    heavy: '800' as const,
    black: '900' as const,
};

export const Shadows = {
    sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 3,
    },
    md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 5,
    },
    lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    glow: {
        shadowColor: '#6C63FF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 24,
        elevation: 12,
    },
    glowCyan: {
        shadowColor: '#00D4FF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.35,
        shadowRadius: 18,
        elevation: 8,
    },
    glowPink: {
        shadowColor: '#FF6B9D',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.35,
        shadowRadius: 18,
        elevation: 8,
    },
    glowSuccess: {
        shadowColor: '#00E676',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.35,
        shadowRadius: 16,
        elevation: 8,
    },
};
