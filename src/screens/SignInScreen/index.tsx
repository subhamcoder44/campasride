import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Animated,
} from 'react-native';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadows } from '../../theme';
import Button from '../../components/Button';

interface Props {
    navigation: any;
}

export default function SignInScreen({ navigation }: Props) {
    const [email, setEmail] = useState('');
    const [step, setStep] = useState<'email' | 'wallet'>('email');
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();
    }, [step]);

    const walletProviders = [
        { name: 'MetaMask', icon: '🦊', network: 'Ethereum', color: '#F6851B' },
        { name: 'Phantom', icon: '👻', network: 'Solana', color: '#AB9FF2' },
        { name: 'Coinbase Wallet', icon: '🔵', network: 'Multi-chain', color: '#0052FF' },
        { name: 'WalletConnect', icon: '🔗', network: 'Universal', color: '#3B99FC' },
    ];

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

            {/* Ambient glow */}
            <View style={styles.glowOrb} />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => step === 'wallet' ? setStep('email') : navigation.goBack()}
                        style={styles.backButton}>
                        <Text style={styles.backIcon}>←</Text>
                    </TouchableOpacity>
                    <View style={styles.stepIndicator}>
                        <View style={[styles.stepDot, styles.stepDotActive]} />
                        <View style={styles.stepConnector}>
                            <View style={[
                                styles.stepConnectorFill,
                                step === 'wallet' && styles.stepConnectorFillActive,
                            ]} />
                        </View>
                        <View style={[styles.stepDot, step === 'wallet' && styles.stepDotActive]} />
                    </View>
                </View>

                {step === 'email' ? (
                    <Animated.View style={{
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }],
                    }}>
                        {/* Email Section */}
                        <View style={styles.section}>
                            <Text style={styles.emoji}>🎓</Text>
                            <Text style={styles.title}>Campus Ride Access</Text>
                            <Text style={styles.subtitle}>
                                Verify your student status to start riding and saving with crypto.
                            </Text>

                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>STUDENT EMAIL</Text>
                                <View style={[
                                    styles.inputWrapper,
                                    email.includes('.edu') && styles.inputWrapperValid,
                                ]}>
                                    <Text style={styles.inputIcon}>📧</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="you@university.edu"
                                        placeholderTextColor={Colors.textMuted}
                                        value={email}
                                        onChangeText={setEmail}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                    />
                                    {email.includes('.edu') && (
                                        <Text style={styles.checkIcon}>✅</Text>
                                    )}
                                </View>
                                <Text style={styles.inputHint}>Must use a valid .edu address</Text>
                            </View>

                            <Button
                                title="Verify & Continue"
                                onPress={() => {
                                    fadeAnim.setValue(0);
                                    slideAnim.setValue(20);
                                    setStep('wallet');
                                }}
                                size="lg"
                                style={styles.continueButton}
                                disabled={!email.includes('.edu')}
                            />
                        </View>
                    </Animated.View>
                ) : (
                    <Animated.View style={{
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }],
                    }}>
                        {/* Wallet Section */}
                        <View style={styles.section}>
                            <Text style={styles.emoji}>🔗</Text>
                            <Text style={styles.title}>Connect Wallet</Text>
                            <Text style={styles.subtitle}>
                                Link your crypto wallet for seamless settlement on Ethereum and Solana.
                            </Text>

                            <View style={styles.walletList}>
                                {walletProviders.map((provider, idx) => (
                                    <WalletProviderItem
                                        key={provider.name}
                                        provider={provider}
                                        index={idx}
                                        onPress={() => navigation.navigate('MainTabs')}
                                    />
                                ))}
                            </View>
                        </View>

                        {/* Terms */}
                        <View style={styles.termsContainer}>
                            <Text style={styles.termsText}>
                                By connecting, you agree to our{' '}
                                <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
                                <Text style={styles.termsLink}>Privacy Policy</Text>
                            </Text>
                        </View>

                        <Button
                            title="Skip for Now"
                            onPress={() => navigation.navigate('MainTabs')}
                            variant="ghost"
                            size="md"
                            style={styles.skipButton}
                        />
                    </Animated.View>
                )}
            </ScrollView>
        </View>
    );
}

function WalletProviderItem({
    provider,
    index,
    onPress,
}: {
    provider: { name: string; icon: string; network: string; color: string };
    index: number;
    onPress: () => void;
}) {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 400,
            delay: index * 100,
            useNativeDriver: true,
        }).start();
    }, [index]);

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.97,
            useNativeDriver: true,
            speed: 50,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
            speed: 20,
            bounciness: 8,
        }).start();
    };

    return (
        <Animated.View style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
        }}>
            <TouchableOpacity
                style={styles.walletItem}
                activeOpacity={1}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={onPress}>
                <View style={[styles.walletIconBg, { backgroundColor: `${provider.color}15` }]}>
                    <Text style={styles.walletIcon}>{provider.icon}</Text>
                </View>
                <View style={styles.walletInfo}>
                    <Text style={styles.walletName}>{provider.name}</Text>
                    <Text style={styles.walletNetwork}>{provider.network}</Text>
                </View>
                <View style={styles.connectBadge}>
                    <Text style={styles.connectText}>Connect</Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    glowOrb: {
        position: 'absolute',
        top: -100,
        right: -80,
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: Colors.accent,
        opacity: 0.06,
    },
    scrollContent: {
        paddingHorizontal: Spacing.xxl,
        paddingBottom: Spacing.xxxl,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: Spacing.huge,
        marginBottom: Spacing.xxxl,
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
    },
    backIcon: {
        color: Colors.textPrimary,
        fontSize: FontSize.xl,
    },
    stepIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 0,
    },
    stepDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Colors.surfaceHighlight,
        borderWidth: 1.5,
        borderColor: Colors.border,
    },
    stepDotActive: {
        backgroundColor: Colors.accent,
        borderColor: Colors.accent,
        ...Shadows.glow,
    },
    stepConnector: {
        width: 40,
        height: 3,
        backgroundColor: Colors.surfaceHighlight,
        borderRadius: 1.5,
        overflow: 'hidden',
    },
    stepConnectorFill: {
        width: 0,
        height: '100%',
        backgroundColor: Colors.accent,
    },
    stepConnectorFillActive: {
        width: '100%',
    },
    section: {
        marginBottom: Spacing.xxl,
    },
    emoji: {
        fontSize: 48,
        marginBottom: Spacing.lg,
    },
    title: {
        fontSize: FontSize.xxxl,
        fontWeight: FontWeight.heavy,
        color: Colors.textPrimary,
        marginBottom: Spacing.sm,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: FontSize.md,
        color: Colors.textSecondary,
        lineHeight: 24,
        marginBottom: Spacing.xxl,
    },
    inputContainer: {
        marginBottom: Spacing.xxl,
    },
    inputLabel: {
        color: Colors.textMuted,
        fontSize: FontSize.xs,
        marginBottom: Spacing.sm,
        fontWeight: FontWeight.semibold,
        letterSpacing: 1.5,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.lg,
        paddingHorizontal: Spacing.lg,
        borderWidth: 1.5,
        borderColor: Colors.border,
    },
    inputWrapperValid: {
        borderColor: Colors.success,
    },
    inputIcon: {
        fontSize: 18,
        marginRight: Spacing.md,
    },
    input: {
        flex: 1,
        color: Colors.textPrimary,
        fontSize: FontSize.md,
        paddingVertical: Spacing.lg,
    },
    checkIcon: {
        fontSize: 16,
    },
    inputHint: {
        color: Colors.textMuted,
        fontSize: FontSize.xs,
        marginTop: Spacing.sm,
    },
    continueButton: {
        width: '100%',
    },
    walletList: {
        gap: Spacing.md,
    },
    walletItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.xl,
        padding: Spacing.lg,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    walletIconBg: {
        width: 48,
        height: 48,
        borderRadius: BorderRadius.lg,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.lg,
    },
    walletIcon: {
        fontSize: 26,
    },
    walletInfo: {
        flex: 1,
    },
    walletName: {
        color: Colors.textPrimary,
        fontSize: FontSize.md,
        fontWeight: FontWeight.semibold,
    },
    walletNetwork: {
        color: Colors.textMuted,
        fontSize: FontSize.xs,
        marginTop: 2,
    },
    connectBadge: {
        backgroundColor: Colors.surfaceHighlight,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.full,
    },
    connectText: {
        color: Colors.accent,
        fontSize: FontSize.xs,
        fontWeight: FontWeight.semibold,
    },
    termsContainer: {
        marginBottom: Spacing.xl,
        paddingHorizontal: Spacing.lg,
    },
    termsText: {
        color: Colors.textMuted,
        fontSize: FontSize.xs,
        textAlign: 'center',
        lineHeight: 18,
    },
    termsLink: {
        color: Colors.accent,
    },
    skipButton: {
        alignSelf: 'center',
    },
});
