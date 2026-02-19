import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadows } from '../../theme';
import Card from '../../components/Card';
import BottomTabBar from '../../components/BottomTabBar';

interface Props {
    navigation: any;
}

const RIDE_HISTORY = [
    {
        id: '1',
        destination: 'North Campus Dorms',
        date: '2 days ago',
        role: 'Driver: Mike T.',
        amount: '-0.04 ETH',
        type: 'debit',
    },
    {
        id: '2',
        destination: 'Student Union',
        date: '5 days ago',
        role: 'Passenger: Sarah',
        amount: '+0.12 ETH',
        type: 'credit',
    },
    {
        id: '3',
        destination: 'Downtown Library',
        date: '1 week ago',
        role: 'Driver: Jessica',
        amount: '-0.05 ETH',
        type: 'debit',
    },
];

const TABS = [
    { key: 'Home', label: 'Home', icon: '🏠' },
    { key: 'Activity', label: 'Rides', icon: '🚗' },
    { key: 'Wallet', label: 'Wallet', icon: '💰' },
    { key: 'Profile', label: 'Profile', icon: '👤' },
];

export default function ProfileScreen({ navigation }: Props) {
    const [activeTab, setActiveTab] = useState('Profile');

    const handleTabPress = (key: string) => {
        setActiveTab(key);
        if (key !== 'Profile') {
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
                    <Text style={styles.headerTitle}>My Profile</Text>
                    <TouchableOpacity style={styles.editButton}>
                        <Text style={styles.editIcon}>✏️</Text>
                    </TouchableOpacity>
                </View>

                {/* User Card */}
                <Card style={styles.userCard} variant="accent">
                    <View style={styles.avatarRow}>
                        <View style={styles.avatarContainer}>
                            <View style={styles.avatarGlow} />
                            <View style={styles.avatar}>
                                <Text style={styles.avatarText}>AC</Text>
                            </View>
                            <View style={styles.onlineDot} />
                        </View>
                        <View style={styles.userInfo}>
                            <Text style={styles.userName}>Alex Chen</Text>
                            <View style={styles.verifiedBadge}>
                                <Text style={styles.verifiedIcon}>✅</Text>
                                <Text style={styles.userUniversity}>MIT • Verified</Text>
                            </View>
                            <Text style={styles.walletAddress}>0x71C...9A23</Text>
                        </View>
                    </View>

                    <View style={styles.statsRow}>
                        {[
                            { value: '4.9', label: 'Rating', icon: '⭐' },
                            { value: '42', label: 'Rides', icon: '🚗' },
                            { value: '15', label: 'Driven', icon: '🏁' },
                        ].map((stat, idx) => (
                            <React.Fragment key={idx}>
                                {idx > 0 && <View style={styles.statDivider} />}
                                <View style={styles.statItem}>
                                    <Text style={styles.statEmoji}>{stat.icon}</Text>
                                    <Text style={styles.statValue}>{stat.value}</Text>
                                    <Text style={styles.statLabel}>{stat.label}</Text>
                                </View>
                            </React.Fragment>
                        ))}
                    </View>
                </Card>

                {/* Wallet Balance */}
                <Card style={styles.walletCard} variant="highlight" delay={200}>
                    <View style={styles.walletRow}>
                        <View>
                            <Text style={styles.walletLabel}>Campus Wallet Balance</Text>
                            <View style={styles.walletBalance}>
                                <Text style={styles.walletAmount}>1,240 CMP</Text>
                                <Text style={styles.walletUSD}>≈ $42.15</Text>
                            </View>
                        </View>
                        <View style={styles.walletIconContainer}>
                            <Text style={styles.walletIconEmoji}>💰</Text>
                        </View>
                    </View>
                </Card>

                {/* Ride Preferences */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Ride Preferences</Text>
                </View>
                <Card delay={300}>
                    {[
                        { icon: '🎵', label: 'Music', value: 'Soft music' },
                        { icon: '💬', label: 'Chat', value: 'Minimal' },
                        { icon: '❄️', label: 'Temperature', value: 'Cool' },
                        { icon: '🐾', label: 'Pets', value: 'No pets' },
                    ].map((pref, idx) => (
                        <TouchableOpacity key={idx} style={[styles.prefItem, idx < 3 && styles.prefBorder]}>
                            <View style={styles.prefIconContainer}>
                                <Text style={styles.prefIcon}>{pref.icon}</Text>
                            </View>
                            <Text style={styles.prefLabel}>{pref.label}</Text>
                            <Text style={styles.prefValue}>{pref.value}</Text>
                            <Text style={styles.prefChevron}>›</Text>
                        </TouchableOpacity>
                    ))}
                </Card>

                {/* Ride History */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Ride History</Text>
                    <TouchableOpacity style={styles.viewAllButton}>
                        <Text style={styles.viewAll}>View All ›</Text>
                    </TouchableOpacity>
                </View>

                {RIDE_HISTORY.map((ride, idx) => (
                    <Card key={ride.id} style={styles.historyCard} delay={400 + idx * 80}>
                        <View style={styles.historyRow}>
                            <View style={styles.historyIconContainer}>
                                <Text style={styles.historyIcon}>{ride.type === 'credit' ? '↓' : '↑'}</Text>
                            </View>
                            <View style={styles.historyInfo}>
                                <Text style={styles.historyDest}>{ride.destination}</Text>
                                <Text style={styles.historyMeta}>{ride.date} • {ride.role}</Text>
                            </View>
                            <Text
                                style={[
                                    styles.historyAmount,
                                    ride.type === 'credit' ? styles.amountCredit : styles.amountDebit,
                                ]}>
                                {ride.amount}
                            </Text>
                        </View>
                    </Card>
                ))}
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
        top: -50,
        right: -50,
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: Colors.accent,
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
    editButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
    },
    editIcon: {
        fontSize: 18,
    },
    userCard: {
        marginBottom: Spacing.lg,
    },
    avatarRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.xxl,
    },
    avatarContainer: {
        position: 'relative',
        marginRight: Spacing.lg,
    },
    avatarGlow: {
        position: 'absolute',
        top: -5,
        left: -5,
        right: -5,
        bottom: -5,
        borderRadius: 37,
        backgroundColor: Colors.accentGlow,
    },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: Colors.accent,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        color: Colors.white,
        fontSize: FontSize.xxl,
        fontWeight: FontWeight.heavy,
    },
    onlineDot: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: Colors.success,
        borderWidth: 3,
        borderColor: Colors.surfaceLight,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        color: Colors.textPrimary,
        fontSize: FontSize.xl,
        fontWeight: FontWeight.heavy,
    },
    verifiedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.xs,
        marginTop: 3,
    },
    verifiedIcon: {
        fontSize: 12,
    },
    userUniversity: {
        color: Colors.textSecondary,
        fontSize: FontSize.sm,
    },
    walletAddress: {
        color: Colors.accent,
        fontSize: FontSize.xs,
        marginTop: 4,
        fontFamily: 'monospace',
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Spacing.lg,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statEmoji: {
        fontSize: 16,
        marginBottom: 4,
    },
    statValue: {
        color: Colors.textPrimary,
        fontSize: FontSize.xl,
        fontWeight: FontWeight.heavy,
    },
    statLabel: {
        color: Colors.textMuted,
        fontSize: FontSize.xs,
        marginTop: 4,
    },
    statDivider: {
        width: 1,
        height: 36,
        backgroundColor: Colors.border,
    },
    walletCard: {
        marginBottom: Spacing.xxl,
    },
    walletRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    walletLabel: {
        color: Colors.textMuted,
        fontSize: FontSize.sm,
        marginBottom: Spacing.sm,
    },
    walletBalance: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: Spacing.md,
    },
    walletAmount: {
        color: Colors.accent,
        fontSize: FontSize.xxl,
        fontWeight: FontWeight.heavy,
    },
    walletUSD: {
        color: Colors.textMuted,
        fontSize: FontSize.sm,
    },
    walletIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(251, 191, 36, 0.12)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    walletIconEmoji: {
        fontSize: 24,
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
    prefItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Spacing.md + 2,
    },
    prefBorder: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    prefIconContainer: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: Colors.surfaceHighlight,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.md,
    },
    prefIcon: {
        fontSize: 18,
    },
    prefLabel: {
        color: Colors.textPrimary,
        fontSize: FontSize.md,
        flex: 1,
        fontWeight: FontWeight.medium,
    },
    prefValue: {
        color: Colors.textMuted,
        fontSize: FontSize.sm,
        marginRight: Spacing.sm,
    },
    prefChevron: {
        color: Colors.textMuted,
        fontSize: 20,
        fontWeight: FontWeight.bold,
    },
    historyCard: {
        marginBottom: Spacing.sm,
    },
    historyRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    historyIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: Colors.surfaceHighlight,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.md,
    },
    historyIcon: {
        fontSize: FontSize.lg,
        color: Colors.textSecondary,
    },
    historyInfo: {
        flex: 1,
    },
    historyDest: {
        color: Colors.textPrimary,
        fontSize: FontSize.md,
        fontWeight: FontWeight.medium,
    },
    historyMeta: {
        color: Colors.textMuted,
        fontSize: FontSize.xs,
        marginTop: 4,
    },
    historyAmount: {
        fontSize: FontSize.md,
        fontWeight: FontWeight.bold,
    },
    amountCredit: {
        color: Colors.success,
    },
    amountDebit: {
        color: Colors.error,
    },
});
