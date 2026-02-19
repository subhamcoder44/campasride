import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Animated,
} from 'react-native';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadows } from '../../theme';
import Card from '../../components/Card';
import TransactionItem from '../../components/TransactionItem';
import BottomTabBar from '../../components/BottomTabBar';

interface Props {
    navigation: any;
}

const TRANSACTIONS = [
    { id: '1', title: 'Ride to Library', date: 'Today, 10:42 AM', amount: '$4.50', type: 'debit' as const },
    { id: '2', title: 'Wallet Top-up', date: 'Yesterday, 4:20 PM', amount: '$50.00', type: 'credit' as const },
    { id: '3', title: 'Settlement #4829', date: 'Oct 24, 9:15 AM', amount: '$12.00', type: 'credit' as const },
    { id: '4', title: 'Ride to Gym', date: 'Oct 22, 6:30 PM', amount: '$3.25', type: 'debit' as const },
    { id: '5', title: 'Referral Bonus', date: 'Oct 20, 2:00 PM', amount: '$5.00', type: 'credit' as const },
];

const TABS = [
    { key: 'Home', label: 'Home', icon: '🏠' },
    { key: 'Activity', label: 'Rides', icon: '🚗' },
    { key: 'Wallet', label: 'Wallet', icon: '💰' },
    { key: 'Profile', label: 'Profile', icon: '👤' },
];

export default function WalletScreen({ navigation }: Props) {
    const [activeTab, setActiveTab] = useState('Wallet');
    const balanceFade = useRef(new Animated.Value(0)).current;
    const balanceScale = useRef(new Animated.Value(0.9)).current;
    const pulseAnim = useRef(new Animated.Value(0.6)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(balanceFade, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.spring(balanceScale, {
                toValue: 1,
                useNativeDriver: true,
                speed: 10,
                bounciness: 6,
            }),
        ]).start();

        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, { toValue: 1, duration: 1500, useNativeDriver: true }),
                Animated.timing(pulseAnim, { toValue: 0.6, duration: 1500, useNativeDriver: true }),
            ]),
        ).start();
    }, []);

    const handleTabPress = (key: string) => {
        setActiveTab(key);
        if (key !== 'Wallet') {
            navigation.navigate(key);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

            {/* Ambient glow */}
            <View style={styles.glowOrb} />

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>My Wallet</Text>
                    <TouchableOpacity style={styles.settingsButton}>
                        <Text style={styles.settingsIcon}>⚙️</Text>
                    </TouchableOpacity>
                </View>

                {/* Balance Card */}
                <Animated.View style={{
                    opacity: balanceFade,
                    transform: [{ scale: balanceScale }],
                }}>
                    <Card style={styles.balanceCard} variant="accent" animated={false}>
                        <View style={styles.balanceGlow} />
                        <Text style={styles.balanceLabel}>Total Balance</Text>
                        <Text style={styles.balanceAmount}>$45.20</Text>
                        <View style={styles.cryptoBadge}>
                            <Text style={styles.cryptoIcon}>Ξ</Text>
                            <Text style={styles.balanceCRIDE}>≈ 1,250 CRIDE</Text>
                        </View>

                        <View style={styles.balanceStatus}>
                            <Animated.View style={[styles.statusPulse, { opacity: pulseAnim }]} />
                            <View style={styles.statusDot} />
                            <Text style={styles.statusText}>Online</Text>
                            <Text style={styles.networkText}>~15 confirmations</Text>
                        </View>

                        <View style={styles.balanceActions}>
                            {[
                                { icon: '↑', label: 'Send', color: Colors.accent },
                                { icon: '↓', label: 'Receive', color: Colors.success },
                                { icon: '↔', label: 'Swap', color: Colors.purple },
                            ].map((action, idx) => (
                                <TouchableOpacity key={idx} style={styles.balanceAction}>
                                    <View style={[styles.actionCircle, { backgroundColor: `${action.color}15` }]}>
                                        <Text style={[styles.actionIcon, { color: action.color }]}>{action.icon}</Text>
                                    </View>
                                    <Text style={styles.actionLabel}>{action.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </Card>
                </Animated.View>

                {/* Recent Activity */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Recent Activity</Text>
                    <TouchableOpacity style={styles.viewAllButton}>
                        <Text style={styles.viewAll}>View All ›</Text>
                    </TouchableOpacity>
                </View>

                <Card delay={200}>
                    {TRANSACTIONS.map((tx) => (
                        <TransactionItem key={tx.id} {...tx} />
                    ))}
                </Card>

                {/* Earn Crypto Card */}
                <Card style={styles.earnCard} variant="highlight" delay={400}>
                    <View style={styles.earnContent}>
                        <View style={styles.earnIconContainer}>
                            <Text style={styles.earnIcon}>🎁</Text>
                        </View>
                        <View style={styles.earnTextContainer}>
                            <Text style={styles.earnTitle}>Earn Crypto</Text>
                            <Text style={styles.earnDesc}>
                                Invite friends and earn 50 CRIDE per signup.
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.earnButton}>
                        <Text style={styles.earnButtonText}>Invite Friends</Text>
                        <Text style={styles.earnButtonArrow}>→</Text>
                    </TouchableOpacity>
                </Card>
            </ScrollView>

            <BottomTabBar tabs={TABS} activeTab={activeTab} onTabPress={handleTabPress} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    glowOrb: {
        position: 'absolute',
        top: -40,
        left: -60,
        width: 250,
        height: 250,
        borderRadius: 125,
        backgroundColor: Colors.purple,
        opacity: 0.05,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: Spacing.xl,
        paddingBottom: Spacing.xxl,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: Spacing.huge,
        marginBottom: Spacing.xxl,
    },
    headerTitle: {
        color: Colors.textPrimary,
        fontSize: FontSize.xxxl,
        fontWeight: FontWeight.heavy,
        letterSpacing: -0.5,
    },
    settingsButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
    },
    settingsIcon: {
        fontSize: 20,
    },
    balanceCard: {
        marginBottom: Spacing.xxl,
        alignItems: 'center',
        overflow: 'hidden',
    },
    balanceGlow: {
        position: 'absolute',
        top: -30,
        right: -30,
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: Colors.accent,
        opacity: 0.08,
    },
    balanceLabel: {
        color: Colors.textMuted,
        fontSize: FontSize.sm,
        marginBottom: Spacing.sm,
        letterSpacing: 0.5,
    },
    balanceAmount: {
        color: Colors.textPrimary,
        fontSize: FontSize.hero,
        fontWeight: FontWeight.heavy,
        letterSpacing: -1,
    },
    cryptoBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(79, 142, 247, 0.1)',
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.xs + 1,
        borderRadius: BorderRadius.full,
        marginTop: Spacing.sm,
        gap: Spacing.xs,
    },
    cryptoIcon: {
        color: Colors.accent,
        fontSize: FontSize.md,
        fontWeight: FontWeight.bold,
    },
    balanceCRIDE: {
        color: Colors.accent,
        fontSize: FontSize.sm,
        fontWeight: FontWeight.medium,
    },
    balanceStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Spacing.lg,
        gap: Spacing.sm,
    },
    statusPulse: {
        position: 'absolute',
        left: 0,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.successGlow,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.success,
    },
    statusText: {
        color: Colors.success,
        fontSize: FontSize.xs,
        fontWeight: FontWeight.semibold,
    },
    networkText: {
        color: Colors.textMuted,
        fontSize: FontSize.xs,
    },
    balanceActions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: Spacing.xxl,
        paddingTop: Spacing.lg,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    },
    balanceAction: {
        alignItems: 'center',
        gap: Spacing.sm,
    },
    actionCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionIcon: {
        fontSize: FontSize.xl,
        fontWeight: FontWeight.bold,
    },
    actionLabel: {
        color: Colors.textSecondary,
        fontSize: FontSize.xs,
        fontWeight: FontWeight.medium,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    sectionTitle: {
        color: Colors.textPrimary,
        fontSize: FontSize.xl,
        fontWeight: FontWeight.bold,
    },
    viewAllButton: {
        backgroundColor: Colors.surfaceLight,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.full,
    },
    viewAll: {
        color: Colors.accent,
        fontSize: FontSize.sm,
        fontWeight: FontWeight.semibold,
    },
    earnCard: {
        marginTop: Spacing.xxl,
    },
    earnContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.lg,
    },
    earnIconContainer: {
        width: 52,
        height: 52,
        borderRadius: BorderRadius.lg,
        backgroundColor: 'rgba(251, 191, 36, 0.12)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.lg,
    },
    earnIcon: {
        fontSize: 28,
    },
    earnTextContainer: {
        flex: 1,
    },
    earnTitle: {
        color: Colors.textPrimary,
        fontSize: FontSize.lg,
        fontWeight: FontWeight.bold,
    },
    earnDesc: {
        color: Colors.textSecondary,
        fontSize: FontSize.sm,
        marginTop: Spacing.xs,
    },
    earnButton: {
        backgroundColor: Colors.accent,
        borderRadius: BorderRadius.lg,
        paddingVertical: Spacing.md + 2,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: Spacing.sm,
        ...Shadows.glow,
    },
    earnButtonText: {
        color: Colors.white,
        fontSize: FontSize.md,
        fontWeight: FontWeight.semibold,
    },
    earnButtonArrow: {
        color: Colors.white,
        fontSize: FontSize.lg,
        fontWeight: FontWeight.bold,
    },
});
