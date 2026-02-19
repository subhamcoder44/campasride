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
import Button from '../../components/Button';

interface Props {
    navigation: any;
}

const LIVE_REQUESTS = [
    {
        id: '1',
        name: 'Sarah J.',
        initial: 'S',
        priceETH: '0.005 ETH',
        priceUSD: '~$12.50 USD',
        pickup: 'Central Library',
        pickupDistance: '0.2 mi away',
        destination: 'Dorm Block B',
        totalDistance: '1.2 mi total trip',
    },
    {
        id: '2',
        name: 'Mike T.',
        initial: 'M',
        priceETH: '0.003 ETH',
        priceUSD: '~$8.20 USD',
        pickup: 'Science Building',
        pickupDistance: '0.5 mi away',
        destination: 'Main Gate',
        totalDistance: '2.1 mi total trip',
    },
];

const SCHEDULE = [
    {
        id: '1',
        title: 'Airport Run - Terminal 2',
        time: '8:00 AM',
        detail: 'Pickup from Campus Main Gate',
        icon: '✈️',
    },
    {
        id: '2',
        title: 'Science Fair Shuttle',
        time: '2:30 PM',
        detail: 'Pickup from Research Lab',
        icon: '🔬',
    },
];

const TABS = [
    { key: 'Dashboard', label: 'Dashboard', icon: '📊' },
    { key: 'Map', label: 'Map', icon: '📍' },
    { key: 'Wallet', label: 'Wallet', icon: '💰' },
    { key: 'Profile', label: 'Profile', icon: '👤' },
];

export default function DriverDashboardScreen({ navigation }: Props) {
    const [activeTab, setActiveTab] = useState('Dashboard');

    const handleTabPress = (key: string) => {
        setActiveTab(key);
        if (key === 'Wallet') {
            navigation.navigate('Wallet');
        } else if (key === 'Profile') {
            navigation.navigate('Profile');
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
                    <View>
                        <Text style={styles.greeting}>Good Evening 🌙</Text>
                        <Text style={styles.headerTitle}>Good Evening, Alex</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.switchButton}
                        onPress={() => navigation.navigate('MainTabs')}>
                        <Text style={styles.switchText}>Rider</Text>
                    </TouchableOpacity>
                </View>

                {/* Earnings Card */}
                <Card style={styles.earningsCard} variant="accent">
                    <Text style={styles.earningsLabel}>Weekly Earnings</Text>
                    <Text style={styles.earningsAmount}>$245.50</Text>
                    <View style={styles.earningsStats}>
                        <View style={styles.earningsStatItem}>
                            <Text style={styles.earningsStatValue}>12</Text>
                            <Text style={styles.earningsStatLabel}>Trips</Text>
                        </View>
                        <View style={styles.earningsDivider} />
                        <View style={styles.earningsStatItem}>
                            <Text style={styles.earningsStatValue}>4.9</Text>
                            <Text style={styles.earningsStatLabel}>Rating</Text>
                        </View>
                        <View style={styles.earningsDivider} />
                        <View style={styles.earningsStatItem}>
                            <Text style={styles.earningsStatValue}>18h</Text>
                            <Text style={styles.earningsStatLabel}>Online</Text>
                        </View>
                    </View>
                </Card>

                {/* Live Requests */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Live Requests</Text>
                    <View style={styles.liveBadge}>
                        <View style={styles.liveDot} />
                        <Text style={styles.liveText}>{LIVE_REQUESTS.length} new</Text>
                    </View>
                </View>

                {LIVE_REQUESTS.map((request) => (
                    <Card key={request.id} style={styles.requestCard}>
                        <View style={styles.requestHeader}>
                            <View style={styles.requestAvatar}>
                                <Text style={styles.requestAvatarText}>{request.initial}</Text>
                            </View>
                            <View style={styles.requestInfo}>
                                <Text style={styles.requestName}>{request.name}</Text>
                                <View style={styles.requestPricing}>
                                    <Text style={styles.requestETH}>{request.priceETH}</Text>
                                    <Text style={styles.requestUSD}>{request.priceUSD}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.requestRoute}>
                            <View style={styles.routeItem}>
                                <View style={styles.dotGreen} />
                                <View>
                                    <Text style={styles.routeLocation}>{request.pickup}</Text>
                                    <Text style={styles.routeDistance}>{request.pickupDistance}</Text>
                                </View>
                            </View>
                            <View style={styles.routeItem}>
                                <View style={styles.dotRed} />
                                <View>
                                    <Text style={styles.routeLocation}>{request.destination}</Text>
                                    <Text style={styles.routeDistance}>{request.totalDistance}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.requestActions}>
                            <Button
                                title="Decline"
                                onPress={() => { }}
                                variant="ghost"
                                size="sm"
                                style={styles.declineBtn}
                            />
                            <Button
                                title="Accept"
                                onPress={() => { }}
                                size="sm"
                                style={styles.acceptBtn}
                            />
                        </View>
                    </Card>
                ))}

                {/* Upcoming Schedule */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Upcoming Schedule</Text>
                </View>

                {SCHEDULE.map((item) => (
                    <Card key={item.id} style={styles.scheduleCard}>
                        <View style={styles.scheduleRow}>
                            <Text style={styles.scheduleIcon}>{item.icon}</Text>
                            <View style={styles.scheduleInfo}>
                                <Text style={styles.scheduleTitle}>{item.title}</Text>
                                <Text style={styles.scheduleMeta}>
                                    {item.time} • {item.detail}
                                </Text>
                            </View>
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
    greeting: {
        color: Colors.textSecondary,
        fontSize: FontSize.sm,
        marginBottom: 4,
    },
    headerTitle: {
        color: Colors.textPrimary,
        fontSize: FontSize.xxl,
        fontWeight: FontWeight.bold,
    },
    switchButton: {
        backgroundColor: Colors.surfaceLight,
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.full,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    switchText: {
        color: Colors.accent,
        fontSize: FontSize.sm,
        fontWeight: FontWeight.semibold,
    },
    earningsCard: {
        marginBottom: Spacing.xxl,
        alignItems: 'center',
    },
    earningsLabel: {
        color: Colors.textSecondary,
        fontSize: FontSize.sm,
    },
    earningsAmount: {
        color: Colors.textPrimary,
        fontSize: FontSize.hero,
        fontWeight: FontWeight.bold,
        marginTop: Spacing.sm,
    },
    earningsStats: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginTop: Spacing.xxl,
        paddingTop: Spacing.lg,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    },
    earningsStatItem: {
        flex: 1,
        alignItems: 'center',
    },
    earningsStatValue: {
        color: Colors.textPrimary,
        fontSize: FontSize.xl,
        fontWeight: FontWeight.bold,
    },
    earningsStatLabel: {
        color: Colors.textSecondary,
        fontSize: FontSize.xs,
        marginTop: 4,
    },
    earningsDivider: {
        width: 1,
        height: 32,
        backgroundColor: Colors.border,
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
    liveBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
        backgroundColor: Colors.errorLight,
        paddingHorizontal: Spacing.md,
        paddingVertical: 4,
        borderRadius: BorderRadius.full,
    },
    liveDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.error,
    },
    liveText: {
        color: Colors.error,
        fontSize: FontSize.xs,
        fontWeight: FontWeight.semibold,
    },
    requestCard: {
        marginBottom: Spacing.md,
    },
    requestHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.lg,
    },
    requestAvatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.accent,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.md,
    },
    requestAvatarText: {
        color: Colors.white,
        fontSize: FontSize.lg,
        fontWeight: FontWeight.bold,
    },
    requestInfo: {
        flex: 1,
    },
    requestName: {
        color: Colors.textPrimary,
        fontSize: FontSize.md,
        fontWeight: FontWeight.bold,
    },
    requestPricing: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
        marginTop: 2,
    },
    requestETH: {
        color: Colors.accent,
        fontSize: FontSize.sm,
        fontWeight: FontWeight.semibold,
    },
    requestUSD: {
        color: Colors.textMuted,
        fontSize: FontSize.xs,
    },
    requestRoute: {
        gap: Spacing.md,
        marginBottom: Spacing.lg,
    },
    routeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.md,
    },
    dotGreen: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Colors.success,
    },
    dotRed: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Colors.error,
    },
    routeLocation: {
        color: Colors.textPrimary,
        fontSize: FontSize.sm,
    },
    routeDistance: {
        color: Colors.textMuted,
        fontSize: FontSize.xs,
    },
    requestActions: {
        flexDirection: 'row',
        gap: Spacing.md,
        borderTopWidth: 1,
        borderTopColor: Colors.borderLight,
        paddingTop: Spacing.md,
    },
    declineBtn: {
        flex: 1,
    },
    acceptBtn: {
        flex: 2,
    },
    scheduleCard: {
        marginBottom: Spacing.sm,
    },
    scheduleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.md,
    },
    scheduleIcon: {
        fontSize: 28,
    },
    scheduleInfo: {
        flex: 1,
    },
    scheduleTitle: {
        color: Colors.textPrimary,
        fontSize: FontSize.md,
        fontWeight: FontWeight.semibold,
    },
    scheduleMeta: {
        color: Colors.textSecondary,
        fontSize: FontSize.sm,
        marginTop: 4,
    },
});
