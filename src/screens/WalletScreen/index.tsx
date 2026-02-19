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

    const handleTabPress = (key: string) => {
        setActiveTab(key);
        if (key !== 'Wallet') {
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
                    <Text style={styles.headerTitle}>My Wallet</Text>
                    <TouchableOpacity style={styles.settingsButton}>
                        <Text style={styles.settingsIcon}>⚙️</Text>
                    </TouchableOpacity>
                </View>

                {/* Balance Card */}
                <Card style={styles.balanceCard} variant="accent">
                    <Text style={styles.balanceLabel}>Total Balance</Text>
                    <Text style={styles.balanceAmount}>$45.20</Text>
                    <Text style={styles.balanceCRIDE}>≈ 1,250 CRIDE</Text>

                    <View style={styles.balanceStatus}>
                        <View style={styles.statusDot} />
                        <Text style={styles.statusText}>Online</Text>
                        <Text style={styles.networkText}>~15 confirmations</Text>
                    </View>

                    <View style={styles.balanceActions}>
                        <TouchableOpacity style={styles.balanceAction}>
                            <View style={styles.actionCircle}>
                                <Text style={styles.actionIcon}>↑</Text>
                            </View>
                            <Text style={styles.actionLabel}>Send</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.balanceAction}>
                            <View style={styles.actionCircle}>
                                <Text style={styles.actionIcon}>↓</Text>
                            </View>
                            <Text style={styles.actionLabel}>Receive</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.balanceAction}>
                            <View style={styles.actionCircle}>
                                <Text style={styles.actionIcon}>↔</Text>
                            </View>
                            <Text style={styles.actionLabel}>Swap</Text>
                        </TouchableOpacity>
                    </View>
                </Card>

                {/* Recent Activity */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Recent Activity</Text>
                    <TouchableOpacity>
                        <Text style={styles.viewAll}>View All ›</Text>
                    </TouchableOpacity>
                </View>

                <Card>
                    {TRANSACTIONS.map((tx) => (
                        <TransactionItem key={tx.id} {...tx} />
                    ))}
                </Card>

                {/* Earn Crypto Card */}
                <Card style={styles.earnCard} variant="highlight">
                    <View style={styles.earnContent}>
                        <Text style={styles.earnIcon}>🎁</Text>
                        <View style={styles.earnTextContainer}>
                            <Text style={styles.earnTitle}>Earn Crypto</Text>
                            <Text style={styles.earnDesc}>
                                Invite friends and earn 50 CRIDE per signup.
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.earnButton}>
                        <Text style={styles.earnButtonText}>Invite Friends</Text>
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
    settingsButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
    },
    settingsIcon: {
        fontSize: 20,
    },
    balanceCard: {
        marginBottom: Spacing.xxl,
        alignItems: 'center',
    },
    balanceLabel: {
        color: Colors.textSecondary,
        fontSize: FontSize.sm,
        marginBottom: Spacing.sm,
    },
    balanceAmount: {
        color: Colors.textPrimary,
        fontSize: FontSize.hero,
        fontWeight: FontWeight.bold,
    },
    balanceCRIDE: {
        color: Colors.accent,
        fontSize: FontSize.md,
        marginTop: Spacing.xs,
        fontWeight: FontWeight.medium,
    },
    balanceStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Spacing.md,
        gap: Spacing.sm,
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
        fontWeight: FontWeight.medium,
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
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.surfaceHighlight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionIcon: {
        color: Colors.accent,
        fontSize: FontSize.xl,
        fontWeight: FontWeight.bold,
    },
    actionLabel: {
        color: Colors.textSecondary,
        fontSize: FontSize.xs,
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
    earnCard: {
        marginTop: Spacing.xxl,
    },
    earnContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.lg,
    },
    earnIcon: {
        fontSize: 36,
        marginRight: Spacing.lg,
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
        borderRadius: BorderRadius.md,
        paddingVertical: Spacing.md,
        alignItems: 'center',
    },
    earnButtonText: {
        color: Colors.white,
        fontSize: FontSize.md,
        fontWeight: FontWeight.semibold,
    },
});
