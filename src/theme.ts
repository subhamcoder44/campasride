// CampasRideShare Design Tokens
// Derived from Stitch project: Dark mode, Space Grotesk, Blue accent

export const Colors = {
    // Core palette
    accent: '#2b8cee',
    accentLight: '#4da3f7',
    accentDark: '#1a6bc4',

    // Backgrounds
    background: '#0d1117',
    surface: '#161b22',
    surfaceLight: '#1c2333',
    surfaceHighlight: '#21262d',

    // Text
    textPrimary: '#ffffff',
    textSecondary: '#8b949e',
    textMuted: '#525964',

    // Status
    success: '#2ea043',
    successLight: '#1a3a2a',
    warning: '#d29922',
    warningLight: '#3b2e1a',
    error: '#f85149',
    errorLight: '#3d1a1a',

    // Borders
    border: '#30363d',
    borderLight: '#21262d',

    // Misc
    white: '#ffffff',
    black: '#000000',
    transparent: 'transparent',
    overlay: 'rgba(0,0,0,0.6)',
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
} as const;

export const BorderRadius = {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 20,
    full: 999,
} as const;

export const FontSize = {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 17,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    hero: 40,
} as const;

export const FontWeight = {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
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
