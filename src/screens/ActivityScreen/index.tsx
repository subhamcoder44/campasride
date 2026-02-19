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
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Ride Activity</Text>
                </View>

                {/* Stats */}
                <View style={styles.statsRow}>
                    <Card style={styles.statCard}>
                        <Text style={styles.statValue}>42</Text>
                        <Text style={styles.statLabel}>Total Rides</Text>
                    </Card>
                    <Card style={styles.statCard}>
                        <Text style={styles.statValue}>$156</Text>
                        <Text style={styles.statLabel}>Total Spent</Text>
                    </Card>
                    <Card style={styles.statCard}>
                        <Text style={styles.statValue}>28</Text>
                        <Text style={styles.statLabel}>CO₂ Saved</Text>
                    </Card>
                </View>

                <Text style={styles.sectionTitle}>Recent Rides</Text>

                {RIDE_HISTORY.map((ride) => (
                    <TouchableOpacity
                        key={ride.id}
                        activeOpacity={0.85}
                        onPress={() => navigation.navigate('RideSummary', { rideId: ride.id })}>
                        <Card style={styles.rideCard}>
                            <View style={styles.rideHeader}>
                                <View style={styles.rideRoute}>
                                    <View style={styles.routeIndicator}>
                                        <View style={styles.dotGreen} />
                                        <View style={styles.dashedLine} />
                                        <View style={styles.dotRed} />
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
                                <Text style={styles.rideDriver}>Driver: {ride.driver}</Text>
                                <View
                                    style={[
                                        styles.statusBadge,
                                        ride.status === 'cancelled' && styles.statusCancelled,
                                    ]}>
                                    <Text
                                        style={[
                                            styles.statusText,
                                            ride.status === 'cancelled' && styles.statusTextCancelled,
                                        ]}>
                                        {ride.status === 'completed' ? '✓ Completed' : '✕ Cancelled'}
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
        fontSize: FontSize.xxl,
        fontWeight: FontWeight.bold,
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
    statValue: {
        color: Colors.accent,
        fontSize: FontSize.xl,
        fontWeight: FontWeight.bold,
    },
    statLabel: {
        color: Colors.textSecondary,
        fontSize: FontSize.xs,
        marginTop: 4,
    },
    sectionTitle: {
        color: Colors.textPrimary,
        fontSize: FontSize.lg,
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
        width: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: Spacing.sm,
        paddingVertical: 2,
    },
    dotGreen: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.success,
    },
    dashedLine: {
        width: 1.5,
        flex: 1,
        backgroundColor: Colors.border,
        marginVertical: 2,
    },
    dotRed: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.error,
    },
    routeText: {
        justifyContent: 'space-between',
        flex: 1,
    },
    locationText: {
        color: Colors.textPrimary,
        fontSize: FontSize.sm,
    },
    ridePricing: {
        alignItems: 'flex-end',
    },
    ridePrice: {
        color: Colors.accent,
        fontSize: FontSize.sm,
        fontWeight: FontWeight.semibold,
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
        borderTopColor: Colors.borderLight,
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
        backgroundColor: Colors.successLight,
        paddingHorizontal: Spacing.md,
        paddingVertical: 3,
        borderRadius: BorderRadius.full,
    },
    statusCancelled: {
        backgroundColor: Colors.errorLight,
    },
    statusText: {
        color: Colors.success,
        fontSize: FontSize.xs,
        fontWeight: FontWeight.medium,
    },
    statusTextCancelled: {
        color: Colors.error,
    },
});
