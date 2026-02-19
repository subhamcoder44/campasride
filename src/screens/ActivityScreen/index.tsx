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

interface Props {
    navigation: any;
}

const RIDE_HISTORY = [
    {
        id: '1',
        pickup: 'Student Union',
        dropoff: 'North Campus Dorms',
        date: 'Today, 4:15 PM',
        status: 'completed',
        driver: 'Alex M.',
        price: '0.005 ETH',
        priceUSD: '$12.50',
    },
    {
        id: '2',
        pickup: 'Central Library',
        dropoff: 'Downtown Bus Stop',
        date: 'Yesterday, 5:30 PM',
        status: 'completed',
        driver: 'Sarah K.',
        price: '0.003 ETH',
        priceUSD: '$8.20',
    },
    {
        id: '3',
        pickup: 'Engineering Bldg',
        dropoff: 'South Parking Lot',
        date: 'Oct 24, 6:00 PM',
        status: 'completed',
        driver: 'Mike T.',
        price: '0.004 ETH',
        priceUSD: '$10.00',
    },
    {
        id: '4',
        pickup: 'Main Gate',
        dropoff: 'Science Hall',
        date: 'Oct 22, 7:15 PM',
        status: 'cancelled',
        driver: 'Jessica L.',
        price: '0.002 ETH',
        priceUSD: '$5.50',
    },
];

const TABS = [
    { key: 'Home', label: 'Explore', icon: '🗺️' },
    { key: 'Activity', label: 'Activity', icon: '📋' },
    { key: 'Wallet', label: 'Wallet', icon: '💰' },
    { key: 'Profile', label: 'Account', icon: '👤' },
];

export default function ActivityScreen({ navigation }: Props) {
    const [activeTab, setActiveTab] = useState('Activity');
    const headerFade = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(headerFade, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, []);

    const handleTabPress = (key: string) => {
        setActiveTab(key);
        if (key !== 'Activity') {
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
                <Animated.View style={[styles.header, { opacity: headerFade }]}>
                    <Text style={styles.headerTitle}>Ride Activity</Text>
                </Animated.View>

                {/* Stats */}
                <View style={styles.statsRow}>
                    {[
                        { value: '42', label: 'Total Rides', icon: '🚗', color: Colors.accent },
                        { value: '$156', label: 'Total Spent', icon: '💰', color: Colors.purple },
                        { value: '28kg', label: 'CO₂ Saved', icon: '🌿', color: Colors.success },
                    ].map((stat, idx) => (
                        <Card key={idx} style={styles.statCard} delay={idx * 100}>
                            <Text style={styles.statIcon}>{stat.icon}</Text>
                            <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
                            <Text style={styles.statLabel}>{stat.label}</Text>
                        </Card>
                    ))}
                </View>

                <Text style={styles.sectionTitle}>Recent Rides</Text>

                {RIDE_HISTORY.map((ride, idx) => (
                    <TouchableOpacity
                        key={ride.id}
                        activeOpacity={0.85}
                        onPress={() => navigation.navigate('RideSummary', { rideId: ride.id })}>
                        <Card style={styles.rideCard} delay={(idx + 3) * 80}>
                            <View style={styles.rideHeader}>
                                <View style={styles.rideRoute}>
                                    <View style={styles.routeIndicator}>
                                        <View style={styles.dotGreen}>
                                            <View style={styles.dotGreenInner} />
                                        </View>
                                        <View style={styles.dashedLine} />
                                        <View style={styles.dotRed}>
                                            <View style={styles.dotRedInner} />
                                        </View>
                                    </View>
                                    <View style={styles.routeText}>
                                        <Text style={styles.locationText}>{ride.pickup}</Text>
                                        <Text style={styles.locationText}>{ride.dropoff}</Text>
                                    </View>
                                </View>
                                <View style={styles.ridePricing}>
                                    <Text style={styles.ridePrice}>{ride.price}</Text>
                                    <Text style={styles.ridePriceUSD}>{ride.priceUSD}</Text>
                                </View>
                            </View>
                            <View style={styles.rideFooter}>
                                <Text style={styles.rideDate}>{ride.date}</Text>
                                <Text style={styles.rideDriver}>{ride.driver}</Text>
                                <View
                                    style={[
                                        styles.statusBadge,
                                        ride.status === 'cancelled' && styles.statusCancelled,
                                    ]}>
                                    <View style={[
                                        styles.statusDot,
                                        ride.status === 'cancelled' && styles.statusDotCancelled,
                                    ]} />
                                    <Text
                                        style={[
                                            styles.statusText,
                                            ride.status === 'cancelled' && styles.statusTextCancelled,
                                        ]}>
                                        {ride.status === 'completed' ? 'Completed' : 'Cancelled'}
                                    </Text>
                                </View>
                            </View>
                        </Card>
                    </TouchableOpacity>
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
        paddingTop: Spacing.huge,
        marginBottom: Spacing.xxl,
    },
    headerTitle: {
        color: Colors.textPrimary,
        fontSize: FontSize.xxxl,
        fontWeight: FontWeight.heavy,
        letterSpacing: -0.5,
    },
    statsRow: {
        flexDirection: 'row',
        gap: Spacing.md,
        marginBottom: Spacing.xxl,
    },
    statCard: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: Spacing.lg,
    },
    statIcon: {
        fontSize: 22,
        marginBottom: Spacing.sm,
    },
    statValue: {
        fontSize: FontSize.xl,
        fontWeight: FontWeight.heavy,
    },
    statLabel: {
        color: Colors.textMuted,
        fontSize: FontSize.xs,
        marginTop: 4,
    },
    sectionTitle: {
        color: Colors.textPrimary,
        fontSize: FontSize.xl,
        fontWeight: FontWeight.bold,
        marginBottom: Spacing.md,
    },
    rideCard: {
        marginBottom: Spacing.md,
    },
    rideHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: Spacing.md,
    },
    rideRoute: {
        flexDirection: 'row',
        flex: 1,
    },
    routeIndicator: {
        width: 18,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: Spacing.sm,
        paddingVertical: 2,
    },
    dotGreen: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: Colors.successLight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dotGreenInner: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: Colors.success,
    },
    dashedLine: {
        width: 2,
        flex: 1,
        backgroundColor: Colors.border,
        marginVertical: 2,
        borderRadius: 1,
    },
    dotRed: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: Colors.errorLight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dotRedInner: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: Colors.error,
    },
    routeText: {
        justifyContent: 'space-between',
        flex: 1,
    },
    locationText: {
        color: Colors.textPrimary,
        fontSize: FontSize.sm,
        fontWeight: FontWeight.medium,
    },
    ridePricing: {
        alignItems: 'flex-end',
        backgroundColor: Colors.surfaceHighlight,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.md,
    },
    ridePrice: {
        color: Colors.accent,
        fontSize: FontSize.sm,
        fontWeight: FontWeight.bold,
    },
    ridePriceUSD: {
        color: Colors.textMuted,
        fontSize: FontSize.xs,
        marginTop: 2,
    },
    rideFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        paddingTop: Spacing.md,
        gap: Spacing.md,
    },
    rideDate: {
        color: Colors.textMuted,
        fontSize: FontSize.xs,
    },
    rideDriver: {
        color: Colors.textSecondary,
        fontSize: FontSize.xs,
        flex: 1,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.successLight,
        paddingHorizontal: Spacing.md,
        paddingVertical: 4,
        borderRadius: BorderRadius.full,
        gap: Spacing.xs,
    },
    statusCancelled: {
        backgroundColor: Colors.errorLight,
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: Colors.success,
    },
    statusDotCancelled: {
        backgroundColor: Colors.error,
    },
    statusText: {
        color: Colors.success,
        fontSize: FontSize.xs,
        fontWeight: FontWeight.semibold,
    },
    statusTextCancelled: {
        color: Colors.error,
    },
});
