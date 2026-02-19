import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius } from '../../theme';
import Button from '../../components/Button';
import Card from '../../components/Card';

interface Props {
    navigation: any;
}

export default function SignInScreen({ navigation }: Props) {
    const [email, setEmail] = useState('');
    const [step, setStep] = useState<'email' | 'wallet'>('email');

    const walletProviders = [
        { name: 'MetaMask', icon: '🦊', network: 'Ethereum' },
        { name: 'Phantom', icon: '👻', network: 'Solana' },
        { name: 'Coinbase Wallet', icon: '🔵', network: 'Multi-chain' },
        { name: 'WalletConnect', icon: '🔗', network: 'Universal' },
    ];

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
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
                        <View style={[styles.stepDot, step === 'wallet' && styles.stepDotActive]} />
                    </View>
                </View>

                {step === 'email' ? (
                    <>
                        {/* Email Section */}
                        <View style={styles.section}>
                            <Text style={styles.title}>Campus Ride Access</Text>
                            <Text style={styles.subtitle}>
                                Verify your student status to start riding.
                            </Text>

                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>Student Email</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="you@university.edu"
                                    placeholderTextColor={Colors.textMuted}
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                                <Text style={styles.inputHint}>Must use a valid .edu address</Text>
                            </View>

                            <Button
                                title="Verify & Continue"
                                onPress={() => setStep('wallet')}
                                size="lg"
                                style={styles.continueButton}
                                disabled={!email.includes('.edu')}
                            />
                        </View>
                    </>
                ) : (
                    <>
                        {/* Wallet Section */}
                        <View style={styles.section}>
                            <Text style={styles.title}>Connect Wallet</Text>
                            <Text style={styles.subtitle}>
                                Link your crypto wallet for seamless settlement. We support major
                                providers on Ethereum and Solana networks.
                            </Text>

                            <View style={styles.walletList}>
                                {walletProviders.map((provider) => (
                                    <TouchableOpacity
                                        key={provider.name}
                                        style={styles.walletItem}
                                        activeOpacity={0.7}
                                        onPress={() => navigation.navigate('MainTabs')}>
                                        <Text style={styles.walletIcon}>{provider.icon}</Text>
                                        <View style={styles.walletInfo}>
                                            <Text style={styles.walletName}>{provider.name}</Text>
                                            <Text style={styles.walletNetwork}>{provider.network}</Text>
                                        </View>
                                        <Text style={styles.chevron}>›</Text>
                                    </TouchableOpacity>
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
                    </>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
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
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backIcon: {
        color: Colors.textPrimary,
        fontSize: FontSize.xl,
    },
    stepIndicator: {
        flexDirection: 'row',
        gap: Spacing.sm,
    },
    stepDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.border,
    },
    stepDotActive: {
        backgroundColor: Colors.accent,
        width: 24,
    },
    section: {
        marginBottom: Spacing.xxl,
    },
    title: {
        fontSize: FontSize.xxl,
        fontWeight: FontWeight.bold,
        color: Colors.textPrimary,
        marginBottom: Spacing.sm,
    },
    subtitle: {
        fontSize: FontSize.md,
        color: Colors.textSecondary,
        lineHeight: 22,
        marginBottom: Spacing.xxl,
    },
    inputContainer: {
        marginBottom: Spacing.xxl,
    },
    inputLabel: {
        color: Colors.textSecondary,
        fontSize: FontSize.sm,
        marginBottom: Spacing.sm,
        fontWeight: FontWeight.medium,
    },
    input: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.md,
        padding: Spacing.lg,
        color: Colors.textPrimary,
        fontSize: FontSize.md,
        borderWidth: 1,
        borderColor: Colors.border,
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
        borderRadius: BorderRadius.lg,
        padding: Spacing.lg,
        borderWidth: 1,
        borderColor: Colors.borderLight,
    },
    walletIcon: {
        fontSize: 28,
        marginRight: Spacing.lg,
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
        color: Colors.textSecondary,
        fontSize: FontSize.xs,
        marginTop: 2,
    },
    chevron: {
        color: Colors.textMuted,
        fontSize: 24,
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
