import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius } from '../../theme';
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
                <Card style={styles.userCard}>
                    <View style={styles.avatarRow}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>AC</Text>
                        </View>
                        <View style={styles.userInfo}>
                            <Text style={styles.userName}>Alex Chen</Text>
                            <Text style={styles.userUniversity}>MIT • Verified Student ✅</Text>
                            <Text style={styles.walletAddress}>0x71C...9A23</Text>
                        </View>
                    </View>

                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>4.9</Text>
                            <Text style={styles.statLabel}>Rating</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>42</Text>
                            <Text style={styles.statLabel}>Rides</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>15</Text>
                            <Text style={styles.statLabel}>Driven</Text>
                        </View>
                    </View>
                </Card>

                {/* Wallet Balance */}
                <Card style={styles.walletCard} variant="highlight">
                    <Text style={styles.walletLabel}>Campus Wallet Balance</Text>
                    <View style={styles.walletBalance}>
                        <Text style={styles.walletAmount}>1,240 CMP</Text>
                        <Text style={styles.walletUSD}>≈ $42.15 USD</Text>
                    </View>
                </Card>

                {/* Ride Preferences */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Ride Preferences</Text>
                </View>
                <Card>
                    {[
                        { icon: '🎵', label: 'Music', value: 'Soft music' },
                        { icon: '💬', label: 'Chat', value: 'Minimal' },
                        { icon: '❄️', label: 'Temperature', value: 'Cool' },
                        { icon: '🐾', label: 'Pets', value: 'No pets' },
                    ].map((pref, idx) => (
                        <View key={idx} style={[styles.prefItem, idx < 3 && styles.prefBorder]}>
                            <Text style={styles.prefIcon}>{pref.icon}</Text>
                            <Text style={styles.prefLabel}>{pref.label}</Text>
                            <Text style={styles.prefValue}>{pref.value}</Text>
                        </View>
                    ))}
                </Card>

                {/* Ride History */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Ride History</Text>
                    <TouchableOpacity>
                        <Text style={styles.viewAll}>View All ›</Text>
                    </TouchableOpacity>
                </View>

                {RIDE_HISTORY.map((ride) => (
                    <Card key={ride.id} style={styles.historyCard}>
                        <View style={styles.historyRow}>
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
        fontSize: FontSize.xxl,
        fontWeight: FontWeight.bold,
    },
    editButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
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
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: Colors.accent,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.lg,
    },
    avatarText: {
        color: Colors.white,
        fontSize: FontSize.xxl,
        fontWeight: FontWeight.bold,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        color: Colors.textPrimary,
        fontSize: FontSize.xl,
        fontWeight: FontWeight.bold,
    },
    userUniversity: {
        color: Colors.textSecondary,
        fontSize: FontSize.sm,
        marginTop: 2,
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
        borderTopColor: Colors.borderLight,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statValue: {
        color: Colors.textPrimary,
        fontSize: FontSize.xl,
        fontWeight: FontWeight.bold,
    },
    statLabel: {
        color: Colors.textSecondary,
        fontSize: FontSize.xs,
        marginTop: 4,
    },
    statDivider: {
        width: 1,
        height: 32,
        backgroundColor: Colors.border,
    },
    walletCard: {
        marginBottom: Spacing.xxl,
    },
    walletLabel: {
        color: Colors.textSecondary,
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
        fontWeight: FontWeight.bold,
    },
    walletUSD: {
        color: Colors.textMuted,
        fontSize: FontSize.sm,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    sectionTitle: {
        color: Colors.textPrimary,
        fontSize: FontSize.lg,
        fontWeight: FontWeight.bold,
    },
    viewAll: {
        color: Colors.accent,
        fontSize: FontSize.sm,
    },
    prefItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Spacing.md,
    },
    prefBorder: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderLight,
    },
    prefIcon: {
        fontSize: 18,
        marginRight: Spacing.md,
    },
    prefLabel: {
        color: Colors.textPrimary,
        fontSize: FontSize.md,
        flex: 1,
    },
    prefValue: {
        color: Colors.textSecondary,
        fontSize: FontSize.sm,
    },
    historyCard: {
        marginBottom: Spacing.sm,
    },
    historyRow: {
        flexDirection: 'row',
        alignItems: 'center',
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
        color: Colors.textSecondary,
        fontSize: FontSize.xs,
        marginTop: 4,
    },
    historyAmount: {
        fontSize: FontSize.md,
        fontWeight: FontWeight.semibold,
    },
    amountCredit: {
        color: Colors.success,
    },
    amountDebit: {
        color: Colors.error,
    },
});
