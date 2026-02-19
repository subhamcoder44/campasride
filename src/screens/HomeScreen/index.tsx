import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    StatusBar,
    Animated,
    TouchableOpacity,
} from 'react-native';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadows } from '../../theme';
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
    const headerFade = useRef(new Animated.Value(0)).current;
    const searchScale = useRef(new Animated.Value(0.95)).current;
    const quickActionAnims = useRef([
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
    ]).current;

    useEffect(() => {
        Animated.sequence([
            Animated.timing(headerFade, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }),
            Animated.spring(searchScale, {
                toValue: 1,
                useNativeDriver: true,
                speed: 12,
                bounciness: 6,
            }),
            Animated.stagger(80, quickActionAnims.map(anim =>
                Animated.spring(anim, {
                    toValue: 1,
                    useNativeDriver: true,
                    speed: 12,
                    bounciness: 8,
                }),
            )),
        ]).start();
    }, []);

    const handleTabPress = (key: string) => {
        setActiveTab(key);
        if (key !== 'Home') {
            navigation.navigate(key);
        }
    };

    const quickActions = [
        { icon: '🚗', label: 'Ride', bgColor: 'rgba(52, 211, 153, 0.12)', glowColor: Colors.success },
        { icon: '💸', label: 'Split Fare', bgColor: 'rgba(168, 85, 247, 0.12)', glowColor: Colors.purple },
        { icon: '📅', label: 'Schedule', bgColor: 'rgba(79, 142, 247, 0.12)', glowColor: Colors.accent },
        { icon: '🏫', label: 'Campus', bgColor: 'rgba(251, 191, 36, 0.12)', glowColor: Colors.warning },
    ];

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
                <Animated.View style={[styles.header, { opacity: headerFade }]}>
                    <View>
                        <Text style={styles.greeting}>Good Evening 👋</Text>
                        <Text style={styles.headerTitle}>Find a Ride</Text>
                    </View>
                    <TouchableOpacity style={styles.notificationButton}>
                        <Text style={styles.notificationIcon}>🔔</Text>
                        <View style={styles.badge} />
                    </TouchableOpacity>
                </Animated.View>

                {/* Search Bar */}
                <Animated.View style={[styles.searchContainer, { transform: [{ scale: searchScale }] }]}>
                    <View style={styles.searchInner}>
                        <Text style={styles.searchIcon}>🔍</Text>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Where are you going?"
                            placeholderTextColor={Colors.textMuted}
                            value={search}
                            onChangeText={setSearch}
                        />
                    </View>
                </Animated.View>

                {/* Quick Actions */}
                <View style={styles.quickActions}>
                    {quickActions.map((action, idx) => (
                        <Animated.View
                            key={action.label}
                            style={[
                                styles.quickAction,
                                {
                                    opacity: quickActionAnims[idx],
                                    transform: [{
                                        scale: quickActionAnims[idx].interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [0.5, 1],
                                        }),
                                    }],
                                },
                            ]}>
                            <TouchableOpacity style={styles.quickActionTouchable} activeOpacity={0.7}>
                                <View style={[styles.quickActionIcon, { backgroundColor: action.bgColor }]}>
                                    <Text style={styles.quickActionEmoji}>{action.icon}</Text>
                                </View>
                                <Text style={styles.quickActionLabel}>{action.label}</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    ))}
                </View>

                {/* Promo Banner */}
                <View style={styles.promoBanner}>
                    <View style={styles.promoContent}>
                        <Text style={styles.promoEmoji}>🎉</Text>
                        <View style={styles.promoTextContainer}>
                            <Text style={styles.promoTitle}>50% Off First Ride!</Text>
                            <Text style={styles.promoDesc}>Use code: CAMPUS50</Text>
                        </View>
                    </View>
                    <View style={styles.promoGlow} />
                </View>

                {/* Section Header */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Suggested Rides</Text>
                    <TouchableOpacity style={styles.seeAllButton}>
                        <Text style={styles.seeAll}>See All ›</Text>
                    </TouchableOpacity>
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
    glowOrb: {
        position: 'absolute',
        top: -50,
        right: -80,
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
        marginBottom: Spacing.xs,
    },
    headerTitle: {
        color: Colors.textPrimary,
        fontSize: FontSize.xxxl,
        fontWeight: FontWeight.heavy,
        letterSpacing: -0.5,
    },
    notificationButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: Colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
        position: 'relative',
    },
    notificationIcon: {
        fontSize: 22,
    },
    badge: {
        position: 'absolute',
        top: 8,
        right: 10,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Colors.error,
        borderWidth: 2,
        borderColor: Colors.surface,
    },
    searchContainer: {
        marginBottom: Spacing.xxl,
        ...Shadows.sm,
    },
    searchInner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.xl,
        paddingHorizontal: Spacing.lg,
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
        paddingVertical: Spacing.lg + 2,
    },
    quickActions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: Spacing.xxl,
    },
    quickAction: {
        alignItems: 'center',
    },
    quickActionTouchable: {
        alignItems: 'center',
        gap: Spacing.sm,
    },
    quickActionIcon: {
        width: 60,
        height: 60,
        borderRadius: BorderRadius.xl,
        alignItems: 'center',
        justifyContent: 'center',
        ...Shadows.sm,
    },
    quickActionEmoji: {
        fontSize: 26,
    },
    quickActionLabel: {
        color: Colors.textSecondary,
        fontSize: FontSize.xs,
        fontWeight: FontWeight.medium,
    },
    promoBanner: {
        backgroundColor: Colors.surfaceLight,
        borderRadius: BorderRadius.xl,
        padding: Spacing.lg,
        marginBottom: Spacing.xxl,
        borderWidth: 1,
        borderColor: Colors.borderAccent,
        overflow: 'hidden',
        ...Shadows.glow,
    },
    promoContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    promoEmoji: {
        fontSize: 32,
        marginRight: Spacing.lg,
    },
    promoTextContainer: {
        flex: 1,
    },
    promoTitle: {
        color: Colors.textPrimary,
        fontSize: FontSize.lg,
        fontWeight: FontWeight.bold,
    },
    promoDesc: {
        color: Colors.accent,
        fontSize: FontSize.sm,
        marginTop: 2,
        fontWeight: FontWeight.medium,
    },
    promoGlow: {
        position: 'absolute',
        top: -20,
        right: -20,
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Colors.accent,
        opacity: 0.08,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.lg,
    },
    sectionTitle: {
        color: Colors.textPrimary,
        fontSize: FontSize.xl,
        fontWeight: FontWeight.bold,
    },
    seeAllButton: {
        backgroundColor: Colors.surfaceLight,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.full,
    },
    seeAll: {
        color: Colors.accent,
        fontSize: FontSize.sm,
        fontWeight: FontWeight.semibold,
    },
});
