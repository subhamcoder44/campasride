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
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, { toValue: 1.3, duration: 800, useNativeDriver: true }),
                Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
            ]),
        ).start();
    }, []);

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

            {/* Ambient glow */}
            <View style={styles.glowOrb} />

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Driver Mode 🌙</Text>
                        <Text style={styles.headerTitle}>Good Evening, Alex</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.switchButton}
                        onPress={() => navigation.navigate('MainTabs')}>
                        <Text style={styles.switchIcon}>🔄</Text>
                        <Text style={styles.switchText}>Rider</Text>
                    </TouchableOpacity>
                </View>

                {/* Earnings Card */}
                <Card style={styles.earningsCard} variant="accent">
                    <View style={styles.earningsGlow} />
                    <Text style={styles.earningsLabel}>Weekly Earnings</Text>
                    <Text style={styles.earningsAmount}>$245.50</Text>
                    <View style={styles.earningsStats}>
                        {[
                            { value: '12', label: 'Trips', icon: '🚗' },
                            { value: '4.9', label: 'Rating', icon: '⭐' },
                            { value: '18h', label: 'Online', icon: '⏱️' },
                        ].map((stat, idx) => (
                            <React.Fragment key={idx}>
                                {idx > 0 && <View style={styles.earningsDivider} />}
                                <View style={styles.earningsStatItem}>
                                    <Text style={styles.earningsStatIcon}>{stat.icon}</Text>
                                    <Text style={styles.earningsStatValue}>{stat.value}</Text>
                                    <Text style={styles.earningsStatLabel}>{stat.label}</Text>
                                </View>
                            </React.Fragment>
                        ))}
                    </View>
                </Card>

                {/* Live Requests */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Live Requests</Text>
                    <View style={styles.liveBadge}>
                        <Animated.View style={[styles.livePulse, { transform: [{ scale: pulseAnim }] }]} />
                        <View style={styles.liveDot} />
                        <Text style={styles.liveText}>{LIVE_REQUESTS.length} new</Text>
                    </View>
                </View>

                {LIVE_REQUESTS.map((request, idx) => (
                    <Card key={request.id} style={styles.requestCard} delay={idx * 100}>
                        <View style={styles.requestHeader}>
                            <View style={styles.requestAvatarContainer}>
                                <View style={styles.requestAvatarGlow} />
                                <View style={styles.requestAvatar}>
                                    <Text style={styles.requestAvatarText}>{request.initial}</Text>
                                </View>
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
                                <View style={styles.dotGreen}>
                                    <View style={styles.dotGreenInner} />
                                </View>
                                <View>
                                    <Text style={styles.routeLocation}>{request.pickup}</Text>
                                    <Text style={styles.routeDistance}>{request.pickupDistance}</Text>
                                </View>
                            </View>
                            <View style={styles.routeItem}>
                                <View style={styles.dotRed}>
                                    <View style={styles.dotRedInner} />
                                </View>
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

                {SCHEDULE.map((item, idx) => (
                    <Card key={item.id} style={styles.scheduleCard} delay={200 + idx * 100}>
                        <View style={styles.scheduleRow}>
                            <View style={styles.scheduleIconContainer}>
                                <Text style={styles.scheduleIcon}>{item.icon}</Text>
                            </View>
                            <View style={styles.scheduleInfo}>
                                <Text style={styles.scheduleTitle}>{item.title}</Text>
                                <Text style={styles.scheduleMeta}>
                                    {item.time} • {item.detail}
                                </Text>
                            </View>
                            <Text style={styles.scheduleChevron}>›</Text>
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
        left: -50,
        width: 250,
        height: 250,
        borderRadius: 125,
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
    greeting: {
        color: Colors.textMuted,
        fontSize: FontSize.sm,
        marginBottom: 4,
    },
    headerTitle: {
        color: Colors.textPrimary,
        fontSize: FontSize.xxl,
        fontWeight: FontWeight.heavy,
        letterSpacing: -0.5,
    },
    switchButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surfaceLight,
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.sm + 2,
        borderRadius: BorderRadius.full,
        borderWidth: 1,
        borderColor: Colors.border,
        gap: Spacing.xs,
    },
    switchIcon: {
        fontSize: 14,
    },
    switchText: {
        color: Colors.accent,
        fontSize: FontSize.sm,
        fontWeight: FontWeight.semibold,
    },
    earningsCard: {
        marginBottom: Spacing.xxl,
        alignItems: 'center',
        overflow: 'hidden',
    },
    earningsGlow: {
        position: 'absolute',
        top: -30,
        right: -30,
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: Colors.accent,
        opacity: 0.08,
    },
    earningsLabel: {
        color: Colors.textMuted,
        fontSize: FontSize.sm,
        letterSpacing: 0.5,
    },
    earningsAmount: {
        color: Colors.textPrimary,
        fontSize: FontSize.hero,
        fontWeight: FontWeight.heavy,
        marginTop: Spacing.sm,
        letterSpacing: -1,
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
    earningsStatIcon: {
        fontSize: 16,
        marginBottom: 4,
    },
    earningsStatValue: {
        color: Colors.textPrimary,
        fontSize: FontSize.xl,
        fontWeight: FontWeight.heavy,
    },
    earningsStatLabel: {
        color: Colors.textMuted,
        fontSize: FontSize.xs,
        marginTop: 4,
    },
    earningsDivider: {
        width: 1,
        height: 36,
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
        fontSize: FontSize.xl,
        fontWeight: FontWeight.bold,
    },
    liveBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
        backgroundColor: Colors.errorLight,
        paddingHorizontal: Spacing.md + 2,
        paddingVertical: Spacing.xs + 2,
        borderRadius: BorderRadius.full,
        position: 'relative',
    },
    livePulse: {
        position: 'absolute',
        left: Spacing.md + 2,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.errorGlow,
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
        fontWeight: FontWeight.bold,
    },
    requestCard: {
        marginBottom: Spacing.md,
    },
    requestHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.lg,
    },
    requestAvatarContainer: {
        position: 'relative',
        marginRight: Spacing.md,
    },
    requestAvatarGlow: {
        position: 'absolute',
        top: -4,
        left: -4,
        right: -4,
        bottom: -4,
        borderRadius: 26,
        backgroundColor: Colors.accentGlow,
    },
    requestAvatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.accent,
        alignItems: 'center',
        justifyContent: 'center',
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
        fontWeight: FontWeight.bold,
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
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: Colors.successLight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dotGreenInner: {
        width: 7,
        height: 7,
        borderRadius: 3.5,
        backgroundColor: Colors.success,
    },
    dotRed: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: Colors.errorLight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dotRedInner: {
        width: 7,
        height: 7,
        borderRadius: 3.5,
        backgroundColor: Colors.error,
    },
    routeLocation: {
        color: Colors.textPrimary,
        fontSize: FontSize.sm,
        fontWeight: FontWeight.medium,
    },
    routeDistance: {
        color: Colors.textMuted,
        fontSize: FontSize.xs,
        marginTop: 1,
    },
    requestActions: {
        flexDirection: 'row',
        gap: Spacing.md,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
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
    scheduleIconContainer: {
        width: 48,
        height: 48,
        borderRadius: BorderRadius.lg,
        backgroundColor: Colors.surfaceHighlight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scheduleIcon: {
        fontSize: 24,
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
    scheduleChevron: {
        color: Colors.textMuted,
        fontSize: 24,
        fontWeight: FontWeight.bold,
    },
});
