// CampasRideShare Design Tokens
// Premium dark mode with vibrant accents, neon glows, and depth

export const Colors = {
    // Core palette - vibrant blue-purple gradient feel
    accent: '#4F8EF7',
    accentLight: '#7EB0FF',
    accentDark: '#2D6BD4',
    accentGlow: 'rgba(79, 142, 247, 0.25)',
    accentGlowStrong: 'rgba(79, 142, 247, 0.4)',

    // Secondary accent - purple tones
    purple: '#A855F7',
    purpleLight: '#C084FC',
    purpleGlow: 'rgba(168, 85, 247, 0.2)',

    // Tertiary - teal/cyan
    cyan: '#22D3EE',
    cyanGlow: 'rgba(34, 211, 238, 0.15)',

    // Backgrounds - deeper, richer dark
    background: '#080C14',
    backgroundGradientStart: '#080C14',
    backgroundGradientEnd: '#0F1724',
    surface: '#111827',
    surfaceLight: '#1A2332',
    surfaceHighlight: '#1F2D3F',
    surfaceGlass: 'rgba(17, 24, 39, 0.85)',
    surfaceGlassLight: 'rgba(26, 35, 50, 0.75)',

    // Text
    textPrimary: '#F9FAFB',
    textSecondary: '#9CA3AF',
    textMuted: '#6B7280',

    // Status - more vibrant
    success: '#34D399',
    successLight: 'rgba(52, 211, 153, 0.12)',
    successGlow: 'rgba(52, 211, 153, 0.25)',
    warning: '#FBBF24',
    warningLight: 'rgba(251, 191, 36, 0.12)',
    error: '#F87171',
    errorLight: 'rgba(248, 113, 113, 0.12)',
    errorGlow: 'rgba(248, 113, 113, 0.25)',

    // Borders - subtle glass feel
    border: 'rgba(255, 255, 255, 0.08)',
    borderLight: 'rgba(255, 255, 255, 0.05)',
    borderAccent: 'rgba(79, 142, 247, 0.3)',
    borderGlow: 'rgba(79, 142, 247, 0.15)',

    // Misc
    white: '#FFFFFF',
    black: '#000000',
    transparent: 'transparent',
    overlay: 'rgba(0, 0, 0, 0.7)',
    overlayLight: 'rgba(0, 0, 0, 0.4)',
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
    sm: 6,
    md: 10,
    lg: 14,
    xl: 18,
    xxl: 24,
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
    hero: 44,
} as const;

export const FontWeight = {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    heavy: '800' as const,
};

// Shadows for depth and elevation
export const Shadows = {
    sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 2,
    },
    md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
        elevation: 8,
    },
    glow: {
        shadowColor: Colors.accent,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
        elevation: 10,
    },
    glowPurple: {
        shadowColor: Colors.purple,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 8,
    },
    glowSuccess: {
        shadowColor: Colors.success,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 6,
    },
};

// Icon unicode characters used throughout the app
export const Icons = {
    home: '🏠',
    car: '🚗',
    wallet: '💰',
    profile: '👤',
    map: '📍',
    search: '🔍',
    star: '⭐',
    clock: '🕐',
    check: '✅',
    chevronRight: '›',
    chevronLeft: '‹',
    back: '←',
    close: '✕',
    plus: '+',
    minus: '−',
    send: '📤',
    shield: '🛡️',
    lightning: '⚡',
    ethereum: 'Ξ',
    crypto: '₿',
    seat: '💺',
    route: '📍',
    notification: '🔔',
    settings: '⚙️',
    info: 'ℹ️',
    share: '📤',
    invite: '📨',
    splitFare: '💸',
};
