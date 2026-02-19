import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius } from '../../theme';
import Button from '../../components/Button';

interface Props {
    navigation: any;
}

export default function OnboardingScreen({ navigation }: Props) {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

            {/* Top decorative glow */}
            <View style={styles.glowContainer}>
                <View style={styles.glowCircle} />
            </View>

            {/* Logo & Branding */}
            <View style={styles.brandContainer}>
                <View style={styles.logoContainer}>
                    <Text style={styles.logoIcon}>🚗</Text>
                </View>
                <Text style={styles.title}>Campus Ride-Share</Text>
                <Text style={styles.subtitle}>Secure Crypto Settlements</Text>
            </View>

            {/* Tagline */}
            <View style={styles.taglineContainer}>
                <Text style={styles.tagline}>
                    Save gas, share rides, and pay instantly with tokens.
                </Text>
            </View>

            {/* Feature highlights */}
            <View style={styles.features}>
                <View style={styles.featureItem}>
                    <Text style={styles.featureIcon}>⚡</Text>
                    <View style={styles.featureText}>
                        <Text style={styles.featureTitle}>Instant Settlements</Text>
                        <Text style={styles.featureDesc}>Pay with ETH or campus tokens</Text>
                    </View>
                </View>
                <View style={styles.featureItem}>
                    <Text style={styles.featureIcon}>🛡️</Text>
                    <View style={styles.featureText}>
                        <Text style={styles.featureTitle}>Smart Contract Escrow</Text>
                        <Text style={styles.featureDesc}>Funds released only after ride</Text>
                    </View>
                </View>
                <View style={styles.featureItem}>
                    <Text style={styles.featureIcon}>🎓</Text>
                    <View style={styles.featureText}>
                        <Text style={styles.featureTitle}>Student Verified</Text>
                        <Text style={styles.featureDesc}>Only verified .edu students</Text>
                    </View>
                </View>
            </View>

            {/* CTA */}
            <View style={styles.ctaContainer}>
                <Button
                    title="Get Started"
                    onPress={() => navigation.navigate('SignIn')}
                    size="lg"
                    style={styles.ctaButton}
                />
                <Text style={styles.loginLink} onPress={() => navigation.navigate('SignIn')}>
                    Already have an account? <Text style={styles.loginLinkAccent}>Sign In</Text>
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.xxl,
        paddingTop: Spacing.huge + Spacing.xxl,
        paddingBottom: Spacing.xxxl,
    },
    glowContainer: {
        position: 'absolute',
        top: -100,
        left: '50%',
        marginLeft: -150,
        width: 300,
        height: 300,
    },
    glowCircle: {
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: Colors.accent,
        opacity: 0.08,
    },
    brandContainer: {
        alignItems: 'center',
    },
    logoContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Colors.surfaceLight,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.xl,
        borderWidth: 2,
        borderColor: Colors.accent,
    },
    logoIcon: {
        fontSize: 36,
    },
    title: {
        fontSize: FontSize.xxxl,
        fontWeight: FontWeight.bold,
        color: Colors.textPrimary,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: FontSize.md,
        color: Colors.accent,
        marginTop: Spacing.sm,
        fontWeight: FontWeight.medium,
    },
    taglineContainer: {
        alignItems: 'center',
        paddingHorizontal: Spacing.xl,
    },
    tagline: {
        fontSize: FontSize.lg,
        color: Colors.textSecondary,
        textAlign: 'center',
        lineHeight: 26,
    },
    features: {
        gap: Spacing.lg,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.lg,
        padding: Spacing.lg,
        borderWidth: 1,
        borderColor: Colors.borderLight,
    },
    featureIcon: {
        fontSize: 28,
        marginRight: Spacing.lg,
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
        color: Colors.textSecondary,
        fontSize: FontSize.sm,
        marginTop: 2,
    },
    ctaContainer: {
        alignItems: 'center',
        gap: Spacing.lg,
    },
    ctaButton: {
        width: '100%',
    },
    loginLink: {
        color: Colors.textSecondary,
        fontSize: FontSize.sm,
    },
    loginLinkAccent: {
        color: Colors.accent,
        fontWeight: FontWeight.semibold,
    },
});
