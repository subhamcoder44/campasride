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
import Button from '../../components/Button';

interface Props {
    navigation: any;
    route: any;
}

export default function RideDetailsScreen({ navigation }: Props) {
    const [seats, setSeats] = useState(1);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}>
                        <Text style={styles.backIcon}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Ride Details</Text>
                    <TouchableOpacity style={styles.shareButton}>
                        <Text style={styles.shareIcon}>📤</Text>
                    </TouchableOpacity>
                </View>

                {/* Driver Info */}
                <Card style={styles.driverCard}>
                    <View style={styles.driverRow}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>A</Text>
                        </View>
                        <View style={styles.driverInfo}>
                            <Text style={styles.driverName}>Alex M.</Text>
                            <Text style={styles.carInfo}>Toyota Prius - Grey</Text>
                        </View>
                        <View style={styles.ratingBadge}>
                            <Text style={styles.ratingStar}>⭐</Text>
                            <Text style={styles.ratingText}>4.9</Text>
                        </View>
                    </View>
                </Card>

                {/* Route Info */}
                <Text style={styles.sectionTitle}>Route Info</Text>
                <Card style={styles.routeCard}>
                    {/* Pickup */}
                    <View style={styles.routeRow}>
                        <View style={styles.routeIndicator}>
                            <View style={styles.dotGreen} />
                            <View style={styles.dashedLine} />
                        </View>
                        <View style={styles.routeDetails}>
                            <Text style={styles.routeLabel}>PICKUP</Text>
                            <Text style={styles.routeLocation}>Student Union</Text>
                            <Text style={styles.routeSubtext}>Main Entrance, Gate 2</Text>
                            <Text style={styles.routeTime}>4:00 PM</Text>
                        </View>
                    </View>
                    {/* Dropoff */}
                    <View style={styles.routeRow}>
                        <View style={styles.routeIndicator}>
                            <View style={styles.dotRed} />
                        </View>
                        <View style={styles.routeDetails}>
                            <Text style={styles.routeLabel}>DROPOFF</Text>
                            <Text style={styles.routeLocation}>North Campus Dorms</Text>
                            <Text style={styles.routeSubtext}>Building B Drop-off</Text>
                            <Text style={styles.routeTime}>4:15 PM</Text>
                        </View>
                    </View>
                </Card>

                {/* Seat Selection */}
                <Text style={styles.sectionTitle}>Select Seats</Text>
                <Card>
                    <View style={styles.seatSelector}>
                        <TouchableOpacity
                            style={styles.seatButton}
                            onPress={() => setSeats(Math.max(1, seats - 1))}
                            disabled={seats <= 1}>
                            <Text style={styles.seatButtonText}>−</Text>
                        </TouchableOpacity>
                        <View style={styles.seatCount}>
                            <Text style={styles.seatNumber}>{seats}</Text>
                            <Text style={styles.seatLabel}>seat{seats > 1 ? 's' : ''}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.seatButton}
                            onPress={() => setSeats(Math.min(4, seats + 1))}
                            disabled={seats >= 4}>
                            <Text style={styles.seatButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </Card>

                {/* Price */}
                <Card style={styles.priceCard} variant="accent">
                    <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>Total Price</Text>
                        <View style={styles.priceValues}>
                            <Text style={styles.priceETH}>{(0.005 * seats).toFixed(3)} ETH</Text>
                            <Text style={styles.priceUSD}>~${(12.50 * seats).toFixed(2)} USD</Text>
                        </View>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoIcon}>ℹ️</Text>
                        <Text style={styles.infoText}>
                            Crypto price is estimated based on current exchange rates.
                        </Text>
                    </View>
                </Card>
            </ScrollView>

            {/* Bottom CTA */}
            <View style={styles.bottomBar}>
                <View style={styles.bottomPrice}>
                    <Text style={styles.bottomPriceETH}>{(0.005 * seats).toFixed(3)} ETH</Text>
                    <Text style={styles.bottomPriceUSD}>for {seats} seat{seats > 1 ? 's' : ''}</Text>
                </View>
                <Button
                    title="Book Ride"
                    onPress={() => navigation.navigate('LiveTracking', { rideId: '1' })}
                    size="lg"
                    style={styles.bookButton}
                />
            </View>
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
        paddingBottom: Spacing.huge + Spacing.xxxl,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: Spacing.huge,
        marginBottom: Spacing.xxl,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backIcon: {
        color: Colors.textPrimary,
        fontSize: FontSize.xl,
    },
    headerTitle: {
        color: Colors.textPrimary,
        fontSize: FontSize.lg,
        fontWeight: FontWeight.bold,
    },
    shareButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
    },
    shareIcon: {
        fontSize: 18,
    },
    driverCard: {
        marginBottom: Spacing.xxl,
    },
    driverRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: Colors.accent,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.lg,
    },
    avatarText: {
        color: Colors.white,
        fontSize: FontSize.xl,
        fontWeight: FontWeight.bold,
    },
    driverInfo: {
        flex: 1,
    },
    driverName: {
        color: Colors.textPrimary,
        fontSize: FontSize.lg,
        fontWeight: FontWeight.bold,
    },
    carInfo: {
        color: Colors.textSecondary,
        fontSize: FontSize.sm,
        marginTop: 2,
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surfaceHighlight,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.full,
        gap: 4,
    },
    ratingStar: {
        fontSize: 14,
    },
    ratingText: {
        color: Colors.textPrimary,
        fontSize: FontSize.sm,
        fontWeight: FontWeight.semibold,
    },
    sectionTitle: {
        color: Colors.textPrimary,
        fontSize: FontSize.lg,
        fontWeight: FontWeight.bold,
        marginBottom: Spacing.md,
    },
    routeCard: {
        marginBottom: Spacing.xxl,
    },
    routeRow: {
        flexDirection: 'row',
        marginBottom: Spacing.lg,
    },
    routeIndicator: {
        width: 24,
        alignItems: 'center',
        marginRight: Spacing.md,
    },
    dotGreen: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: Colors.success,
    },
    dashedLine: {
        width: 2,
        height: 40,
        backgroundColor: Colors.border,
        marginVertical: 4,
    },
    dotRed: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: Colors.error,
    },
    routeDetails: {
        flex: 1,
    },
    routeLabel: {
        color: Colors.textMuted,
        fontSize: FontSize.xs,
        fontWeight: FontWeight.semibold,
        letterSpacing: 1,
        marginBottom: 4,
    },
    routeLocation: {
        color: Colors.textPrimary,
        fontSize: FontSize.md,
        fontWeight: FontWeight.semibold,
    },
    routeSubtext: {
        color: Colors.textSecondary,
        fontSize: FontSize.sm,
        marginTop: 2,
    },
    routeTime: {
        color: Colors.accent,
        fontSize: FontSize.sm,
        fontWeight: FontWeight.medium,
        marginTop: 4,
    },
    seatSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing.xxl,
    },
    seatButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.surfaceHighlight,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
    },
    seatButtonText: {
        color: Colors.accent,
        fontSize: FontSize.xxl,
        fontWeight: FontWeight.bold,
    },
    seatCount: {
        alignItems: 'center',
    },
    seatNumber: {
        color: Colors.textPrimary,
        fontSize: FontSize.xxxl,
        fontWeight: FontWeight.bold,
    },
    seatLabel: {
        color: Colors.textSecondary,
        fontSize: FontSize.sm,
    },
    priceCard: {
        marginTop: Spacing.xxl,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    priceLabel: {
        color: Colors.textPrimary,
        fontSize: FontSize.lg,
        fontWeight: FontWeight.bold,
    },
    priceValues: {
        alignItems: 'flex-end',
    },
    priceETH: {
        color: Colors.accent,
        fontSize: FontSize.xl,
        fontWeight: FontWeight.bold,
    },
    priceUSD: {
        color: Colors.textSecondary,
        fontSize: FontSize.sm,
        marginTop: 2,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
        paddingTop: Spacing.md,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    },
    infoIcon: {
        fontSize: 14,
    },
    infoText: {
        color: Colors.textMuted,
        fontSize: FontSize.xs,
        flex: 1,
    },
    bottomBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.surface,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        paddingHorizontal: Spacing.xl,
        paddingVertical: Spacing.lg,
        paddingBottom: Spacing.xxl,
    },
    bottomPrice: {},
    bottomPriceETH: {
        color: Colors.textPrimary,
        fontSize: FontSize.lg,
        fontWeight: FontWeight.bold,
    },
    bottomPriceUSD: {
        color: Colors.textSecondary,
        fontSize: FontSize.xs,
    },
    bookButton: {
        paddingHorizontal: Spacing.xxxl,
    },
});
