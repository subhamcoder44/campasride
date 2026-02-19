import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    StatusBar,
} from 'react-native';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius } from '../../theme';
import RideCard from '../../components/RideCard';
import BottomTabBar from '../../components/BottomTabBar';

interface Props {
    navigation: any;
}

const SUGGESTED_RIDES = [
    {
        id: '1',
        driverName: 'Alex M.',
        carModel: 'Tesla Model 3',
        carColor: 'White',
        priceETH: '0.005 ETH',
        priceUSD: '$12.50',
        pickup: 'Student Union',
        dropoff: 'North Campus Dorms',
        departureTime: '4:00 PM',
        seatsAvailable: 3,
        rating: 4.9,
    },
    {
        id: '2',
        driverName: 'Sarah K.',
        carModel: 'Honda Civic',
        carColor: 'Blue',
        priceETH: '0.003 ETH',
        priceUSD: '$8.20',
        pickup: 'Central Library',
        dropoff: 'Downtown Bus Stop',
        departureTime: '5:30 PM',
        seatsAvailable: 2,
        rating: 4.7,
    },
    {
        id: '3',
        driverName: 'Mike T.',
        carModel: 'Toyota Camry',
        carColor: 'Grey',
        priceETH: '0.004 ETH',
        priceUSD: '$10.00',
        pickup: 'Engineering Building',
        dropoff: 'South Parking Lot',
        departureTime: '6:00 PM',
        seatsAvailable: 4,
        rating: 4.8,
    },
    {
        id: '4',
        driverName: 'Jessica L.',
        carModel: 'Hyundai Ioniq',
        carColor: 'Silver',
        priceETH: '0.002 ETH',
        priceUSD: '$5.50',
        pickup: 'Main Gate',
        dropoff: 'Science Hall',
        departureTime: '7:15 PM',
        seatsAvailable: 1,
        rating: 4.6,
    },
];

const TABS = [
    { key: 'Home', label: 'Explore', icon: '🗺️' },
    { key: 'Activity', label: 'Activity', icon: '📋' },
    { key: 'Wallet', label: 'Wallet', icon: '💰' },
    { key: 'Profile', label: 'Account', icon: '👤' },
];

export default function HomeScreen({ navigation }: Props) {
    const [search, setSearch] = useState('');
    const [activeTab, setActiveTab] = useState('Home');

    const handleTabPress = (key: string) => {
        setActiveTab(key);
        if (key !== 'Home') {
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
                    <View>
                        <Text style={styles.greeting}>Good Evening 👋</Text>
                        <Text style={styles.headerTitle}>Find a Ride</Text>
                    </View>
                    <View style={styles.notificationBadge}>
                        <Text style={styles.notificationIcon}>🔔</Text>
                        <View style={styles.badge} />
                    </View>
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Text style={styles.searchIcon}>🔍</Text>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Where are you going?"
                        placeholderTextColor={Colors.textMuted}
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>

                {/* Quick Actions */}
                <View style={styles.quickActions}>
                    <View style={styles.quickAction}>
                        <View style={[styles.quickActionIcon, { backgroundColor: '#1a3a2a' }]}>
                            <Text style={styles.quickActionEmoji}>🚗</Text>
                        </View>
                        <Text style={styles.quickActionLabel}>Ride</Text>
                    </View>
                    <View style={styles.quickAction}>
                        <View style={[styles.quickActionIcon, { backgroundColor: '#2b1a3a' }]}>
                            <Text style={styles.quickActionEmoji}>💸</Text>
                        </View>
                        <Text style={styles.quickActionLabel}>Split Fare</Text>
                    </View>
                    <View style={styles.quickAction}>
                        <View style={[styles.quickActionIcon, { backgroundColor: '#1a2a3a' }]}>
                            <Text style={styles.quickActionEmoji}>📅</Text>
                        </View>
                        <Text style={styles.quickActionLabel}>Schedule</Text>
                    </View>
                    <View style={styles.quickAction}>
                        <View style={[styles.quickActionIcon, { backgroundColor: '#3a2a1a' }]}>
                            <Text style={styles.quickActionEmoji}>🏫</Text>
                        </View>
                        <Text style={styles.quickActionLabel}>Campus</Text>
                    </View>
                </View>

                {/* Section Header */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Suggested Rides</Text>
                    <Text style={styles.seeAll}>See All ›</Text>
                </View>

                {/* Ride Cards */}
                {SUGGESTED_RIDES.map((ride) => (
                    <RideCard
                        key={ride.id}
                        {...ride}
                        onPress={() => navigation.navigate('RideDetails', { rideId: ride.id })}
                    />
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
        marginBottom: Spacing.xs,
    },
    headerTitle: {
        color: Colors.textPrimary,
        fontSize: FontSize.xxl,
        fontWeight: FontWeight.bold,
    },
    notificationBadge: {
        position: 'relative',
    },
    notificationIcon: {
        fontSize: 24,
    },
    badge: {
        position: 'absolute',
        top: -2,
        right: -2,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Colors.error,
        borderWidth: 2,
        borderColor: Colors.background,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.lg,
        paddingHorizontal: Spacing.lg,
        marginBottom: Spacing.xxl,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    searchIcon: {
        fontSize: 18,
        marginRight: Spacing.md,
    },
    searchInput: {
        flex: 1,
        color: Colors.textPrimary,
        fontSize: FontSize.md,
        paddingVertical: Spacing.lg,
    },
    quickActions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: Spacing.xxl,
    },
    quickAction: {
        alignItems: 'center',
        gap: Spacing.sm,
    },
    quickActionIcon: {
        width: 56,
        height: 56,
        borderRadius: BorderRadius.xl,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quickActionEmoji: {
        fontSize: 24,
    },
    quickActionLabel: {
        color: Colors.textSecondary,
        fontSize: FontSize.xs,
        fontWeight: FontWeight.medium,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.lg,
    },
    sectionTitle: {
        color: Colors.textPrimary,
        fontSize: FontSize.lg,
        fontWeight: FontWeight.bold,
    },
    seeAll: {
        color: Colors.accent,
        fontSize: FontSize.sm,
        fontWeight: FontWeight.medium,
    },
});
