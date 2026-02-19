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

            {/* Ambient glow */}
            <View style={styles.glowOrb} />

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
                <Card style={styles.driverCard} variant="accent">
                    <View style={styles.driverRow}>
                        <View style={styles.avatarContainer}>
                            <View style={styles.avatarGlow} />
                            <View style={styles.avatar}>
                                <Text style={styles.avatarText}>A</Text>
                            </View>
                        </View>
                        <View style={styles.driverInfo}>
                            <Text style={styles.driverName}>Alex M.</Text>
                            <Text style={styles.carInfo}>Toyota Prius • Grey</Text>
                        </View>
                        <View style={styles.ratingBadge}>
                            <Text style={styles.ratingStar}>⭐</Text>
                            <Text style={styles.ratingText}>4.9</Text>
                        </View>
                    </View>
                </Card>

                {/* Route Info */}
                <Text style={styles.sectionTitle}>Route Info</Text>
                <Card style={styles.routeCard} delay={100}>
                    {/* Pickup */}
                    <View style={styles.routeRow}>
                        <View style={styles.routeIndicator}>
                            <View style={styles.dotGreen}>
                                <View style={styles.dotGreenInner} />
                            </View>
                            <View style={styles.dashedLine} />
                        </View>
                        <View style={styles.routeDetails}>
                            <Text style={styles.routeLabel}>PICKUP</Text>
                            <Text style={styles.routeLocation}>Student Union</Text>
                            <Text style={styles.routeSubtext}>Main Entrance, Gate 2</Text>
                            <View style={styles.timeBadge}>
                                <Text style={styles.timeBadgeText}>🕐 4:00 PM</Text>
                            </View>
                        </View>
                    </View>
                    {/* Dropoff */}
                    <View style={styles.routeRow}>
                        <View style={styles.routeIndicator}>
                            <View style={styles.dotRed}>
                                <View style={styles.dotRedInner} />
                            </View>
                        </View>
                        <View style={styles.routeDetails}>
                            <Text style={styles.routeLabel}>DROPOFF</Text>
                            <Text style={styles.routeLocation}>North Campus Dorms</Text>
                            <Text style={styles.routeSubtext}>Building B Drop-off</Text>
                            <View style={styles.timeBadge}>
                                <Text style={styles.timeBadgeText}>🕐 4:15 PM</Text>
                            </View>
                        </View>
                    </View>
                </Card>

                {/* Seat Selection */}
                <Text style={styles.sectionTitle}>Select Seats</Text>
                <Card delay={200}>
                    <View style={styles.seatSelector}>
                        <TouchableOpacity
                            style={[styles.seatButton, seats <= 1 && styles.seatButtonDisabled]}
                            onPress={() => setSeats(Math.max(1, seats - 1))}
                            disabled={seats <= 1}>
                            <Text style={[styles.seatButtonText, seats <= 1 && styles.seatButtonTextDisabled]}>−</Text>
                        </TouchableOpacity>
                        <View style={styles.seatCount}>
                            <Text style={styles.seatNumber}>{seats}</Text>
                            <Text style={styles.seatLabel}>seat{seats > 1 ? 's' : ''}</Text>
                        </View>
                        <TouchableOpacity
                            style={[styles.seatButton, seats >= 4 && styles.seatButtonDisabled]}
                            onPress={() => setSeats(Math.min(4, seats + 1))}
                            disabled={seats >= 4}>
                            <Text style={[styles.seatButtonText, seats >= 4 && styles.seatButtonTextDisabled]}>+</Text>
                        </TouchableOpacity>
                    </View>
                </Card>

                {/* Price */}
                <Card style={styles.priceCard} variant="accent" delay={300}>
                    <View style={styles.priceGlow} />
                    <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>Total Price</Text>
                        <View style={styles.priceValues}>
                            <Text style={styles.priceETH}>{(0.005 * seats).toFixed(3)} ETH</Text>
                            <Text style={styles.priceUSD}>~${(12.50 * seats).toFixed(2)} USD</Text>
                        </View>
                    </View>
                    <View style={styles.infoRow}>
                        <View style={styles.infoBadge}>
                            <Text style={styles.infoIcon}>ℹ️</Text>
                            <Text style={styles.infoText}>
                                Crypto price is estimated based on current exchange rates.
                            </Text>
                        </View>
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
    glowOrb: {
        position: 'absolute',
        top: -60,
        left: -40,
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
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
    },
    backIcon: {
        color: Colors.textPrimary,
        fontSize: FontSize.xl,
    },
    headerTitle: {
        color: Colors.textPrimary,
        fontSize: FontSize.xl,
        fontWeight: FontWeight.bold,
    },
    shareButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
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
    avatarContainer: {
        position: 'relative',
        marginRight: Spacing.lg,
    },
    avatarGlow: {
        position: 'absolute',
        top: -4,
        left: -4,
        right: -4,
        bottom: -4,
        borderRadius: 28,
        backgroundColor: Colors.accentGlow,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: Colors.accent,
        alignItems: 'center',
        justifyContent: 'center',
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
        backgroundColor: 'rgba(251, 191, 36, 0.12)',
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
        fontWeight: FontWeight.bold,
    },
    sectionTitle: {
        color: Colors.textPrimary,
        fontSize: FontSize.xl,
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
        width: 26,
        alignItems: 'center',
        marginRight: Spacing.md,
    },
    dotGreen: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: Colors.successLight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dotGreenInner: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.success,
    },
    dashedLine: {
        width: 2,
        height: 44,
        backgroundColor: Colors.border,
        marginVertical: 4,
        borderRadius: 1,
    },
    dotRed: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: Colors.errorLight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dotRedInner: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.error,
    },
    routeDetails: {
        flex: 1,
    },
    routeLabel: {
        color: Colors.textMuted,
        fontSize: FontSize.xs,
        fontWeight: FontWeight.semibold,
        letterSpacing: 1.5,
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
    timeBadge: {
        backgroundColor: Colors.surfaceHighlight,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.xs,
        borderRadius: BorderRadius.full,
        alignSelf: 'flex-start',
        marginTop: Spacing.sm,
    },
    timeBadgeText: {
        color: Colors.accent,
        fontSize: FontSize.xs,
        fontWeight: FontWeight.medium,
    },
    seatSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing.xxl,
    },
    seatButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: Colors.surfaceHighlight,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: Colors.accent,
    },
    seatButtonDisabled: {
        borderColor: Colors.border,
        opacity: 0.4,
    },
    seatButtonText: {
        color: Colors.accent,
        fontSize: FontSize.xxl,
        fontWeight: FontWeight.bold,
    },
    seatButtonTextDisabled: {
        color: Colors.textMuted,
    },
    seatCount: {
        alignItems: 'center',
    },
    seatNumber: {
        color: Colors.textPrimary,
        fontSize: FontSize.hero,
        fontWeight: FontWeight.heavy,
    },
    seatLabel: {
        color: Colors.textMuted,
        fontSize: FontSize.sm,
    },
    priceCard: {
        marginTop: Spacing.xxl,
        overflow: 'hidden',
    },
    priceGlow: {
        position: 'absolute',
        top: -20,
        right: -20,
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.accent,
        opacity: 0.08,
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
        fontWeight: FontWeight.heavy,
    },
    priceUSD: {
        color: Colors.textSecondary,
        fontSize: FontSize.sm,
        marginTop: 2,
    },
    infoRow: {
        paddingTop: Spacing.md,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    },
    infoBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
        backgroundColor: Colors.surfaceHighlight,
        padding: Spacing.md,
        borderRadius: BorderRadius.md,
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
        fontWeight: FontWeight.heavy,
    },
    bottomPriceUSD: {
        color: Colors.textMuted,
        fontSize: FontSize.xs,
    },
    bookButton: {
        paddingHorizontal: Spacing.xxxl,
    },
});
