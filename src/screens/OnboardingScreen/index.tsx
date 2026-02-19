import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, Animated, Dimensions } from 'react-native';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadows } from '../../theme';
import Button from '../../components/Button';

const { width } = Dimensions.get('window');

interface Props {
    navigation: any;
}

export default function OnboardingScreen({ navigation }: Props) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;
    const logoScale = useRef(new Animated.Value(0.5)).current;
    const logoRotate = useRef(new Animated.Value(0)).current;
    const glowPulse = useRef(new Animated.Value(0.3)).current;
    const feature1 = useRef(new Animated.Value(0)).current;
    const feature2 = useRef(new Animated.Value(0)).current;
    const feature3 = useRef(new Animated.Value(0)).current;
    const ctaAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Staggered entrance animation
        Animated.sequence([
            // Logo bounce in
            Animated.parallel([
                Animated.spring(logoScale, {
                    toValue: 1,
                    useNativeDriver: true,
                    speed: 8,
                    bounciness: 12,
                }),
                Animated.timing(logoRotate, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ]),
            // Title fade in
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 600,
                    useNativeDriver: true,
                }),
            ]),
            // Features stagger
            Animated.stagger(150, [
                Animated.spring(feature1, { toValue: 1, useNativeDriver: true, speed: 12, bounciness: 6 }),
                Animated.spring(feature2, { toValue: 1, useNativeDriver: true, speed: 12, bounciness: 6 }),
                Animated.spring(feature3, { toValue: 1, useNativeDriver: true, speed: 12, bounciness: 6 }),
            ]),
            // CTA
            Animated.spring(ctaAnim, { toValue: 1, useNativeDriver: true, speed: 10, bounciness: 8 }),
        ]).start();

        // Continuous glow pulse
        Animated.loop(
            Animated.sequence([
                Animated.timing(glowPulse, { toValue: 0.6, duration: 2000, useNativeDriver: true }),
                Animated.timing(glowPulse, { toValue: 0.3, duration: 2000, useNativeDriver: true }),
            ]),
        ).start();
    }, []);

    const features = [
        { icon: '⚡', title: 'Instant Settlements', desc: 'Pay with ETH or campus tokens', anim: feature1, color: '#FBBF24' },
        { icon: '🛡️', title: 'Smart Contract Escrow', desc: 'Funds released only after ride', anim: feature2, color: '#4F8EF7' },
        { icon: '🎓', title: 'Student Verified', desc: 'Only verified .edu students', anim: feature3, color: '#A855F7' },
    ];

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

            {/* Ambient glow effects */}
            <Animated.View style={[styles.glowOrb1, { opacity: glowPulse }]} />
            <Animated.View style={[styles.glowOrb2, { opacity: Animated.multiply(glowPulse, 0.7) }]} />
            <View style={styles.glowOrb3} />

            {/* Logo & Branding */}
            <View style={styles.brandContainer}>
                <Animated.View style={[
                    styles.logoOuter,
                    {
                        transform: [
                            { scale: logoScale },
                            {
                                rotate: logoRotate.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['-20deg', '0deg'],
                                }),
                            },
                        ],
                    },
                ]}>
                    <View style={styles.logoGlowRing} />
                    <View style={styles.logoContainer}>
                        <Text style={styles.logoIcon}>🚗</Text>
                    </View>
                </Animated.View>

                <Animated.View style={{
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }],
                }}>
                    <Text style={styles.title}>Campus</Text>
                    <Text style={styles.titleAccent}>Ride-Share</Text>
                    <View style={styles.subtitleBadge}>
                        <View style={styles.subtitleDot} />
                        <Text style={styles.subtitle}>Crypto-Powered Rides</Text>
                    </View>
                </Animated.View>
            </View>

            {/* Feature highlights */}
            <View style={styles.features}>
                {features.map((feature, idx) => (
                    <Animated.View
                        key={idx}
                        style={[
                            styles.featureItem,
                            {
                                opacity: feature.anim,
                                transform: [{
                                    translateX: feature.anim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [-40, 0],
                                    }),
                                }],
                            },
                        ]}>
                        <View style={[styles.featureIconContainer, { backgroundColor: `${feature.color}15` }]}>
                            <Text style={styles.featureIcon}>{feature.icon}</Text>
                        </View>
                        <View style={styles.featureText}>
                            <Text style={styles.featureTitle}>{feature.title}</Text>
                            <Text style={styles.featureDesc}>{feature.desc}</Text>
                        </View>
                        <Text style={styles.featureChevron}>›</Text>
                    </Animated.View>
                ))}
            </View>

            {/* CTA */}
            <Animated.View style={[styles.ctaContainer, {
                opacity: ctaAnim,
                transform: [{
                    translateY: ctaAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [30, 0],
                    }),
                }],
            }]}>
                <Button
                    title="Get Started"
                    onPress={() => navigation.navigate('SignIn')}
                    size="lg"
                    style={styles.ctaButton}
                />
                <Text style={styles.loginLink} onPress={() => navigation.navigate('SignIn')}>
                    Already have an account? <Text style={styles.loginLinkAccent}>Sign In</Text>
                </Text>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.xxl,
        paddingTop: Spacing.massive + Spacing.lg,
        paddingBottom: Spacing.xxxl + Spacing.sm,
    },
    // Ambient glow orbs
    glowOrb1: {
        position: 'absolute',
        top: -80,
        left: -60,
        width: 280,
        height: 280,
        borderRadius: 140,
        backgroundColor: Colors.accent,
    },
    glowOrb2: {
        position: 'absolute',
        top: 100,
        right: -100,
        width: 250,
        height: 250,
        borderRadius: 125,
        backgroundColor: Colors.purple,
        opacity: 0.15,
    },
    glowOrb3: {
        position: 'absolute',
        bottom: 60,
        left: -40,
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: Colors.cyan,
        opacity: 0.06,
    },
    brandContainer: {
        alignItems: 'center',
    },
    logoOuter: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.xxl,
    },
    logoGlowRing: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.accentGlow,
    },
    logoContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Colors.surfaceLight,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: Colors.accent,
        ...Shadows.glow,
    },
    logoIcon: {
        fontSize: 36,
    },
    title: {
        fontSize: FontSize.hero,
        fontWeight: FontWeight.heavy,
        color: Colors.textPrimary,
        textAlign: 'center',
        letterSpacing: -1,
    },
    titleAccent: {
        fontSize: FontSize.hero,
        fontWeight: FontWeight.heavy,
        color: Colors.accent,
        textAlign: 'center',
        letterSpacing: -1,
        marginTop: -6,
    },
    subtitleBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Spacing.md,
        backgroundColor: Colors.surfaceLight,
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.full,
        gap: Spacing.sm,
    },
    subtitleDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: Colors.success,
    },
    subtitle: {
        fontSize: FontSize.sm,
        color: Colors.textSecondary,
        fontWeight: FontWeight.medium,
    },
    features: {
        gap: Spacing.md,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.xl,
        padding: Spacing.lg,
        borderWidth: 1,
        borderColor: Colors.border,
        ...Shadows.sm,
    },
    featureIconContainer: {
        width: 48,
        height: 48,
        borderRadius: BorderRadius.lg,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.lg,
    },
    featureIcon: {
        fontSize: 24,
    },
    featureText: {
        flex: 1,
    },
    featureTitle: {
        color: Colors.textPrimary,
        fontSize: FontSize.md,
        fontWeight: FontWeight.semibold,
    },
    featureDesc: {
        color: Colors.textMuted,
        fontSize: FontSize.sm,
        marginTop: 2,
    },
    featureChevron: {
        color: Colors.textMuted,
        fontSize: 24,
        fontWeight: FontWeight.bold,
    },
    ctaContainer: {
        alignItems: 'center',
        gap: Spacing.lg,
    },
    ctaButton: {
        width: '100%',
    },
    loginLink: {
        color: Colors.textMuted,
        fontSize: FontSize.sm,
    },
    loginLinkAccent: {
        color: Colors.accent,
        fontWeight: FontWeight.semibold,
    },
});
