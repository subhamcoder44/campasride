import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadows } from '../theme';

interface RideCardProps {
    driverName: string;
    carModel: string;
    carColor?: string;
    priceETH: string;
    priceUSD: string;
    pickup: string;
    dropoff: string;
    departureTime: string;
    seatsAvailable: number;
    rating?: number;
    onPress?: () => void;
}

export default function RideCard({
    driverName,
    carModel,
    carColor,
    priceETH,
    priceUSD,
    pickup,
    dropoff,
    departureTime,
    seatsAvailable,
    rating,
    onPress,
}: RideCardProps) {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.97,
            useNativeDriver: true,
            speed: 50,
            bounciness: 4,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
            speed: 20,
            bounciness: 8,
        }).start();
    };

    return (
        <Animated.View style={[{ transform: [{ scale: scaleAnim }] }]}>
            <TouchableOpacity
                style={styles.card}
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={1}>
                {/* Top shine */}
                <View style={styles.shine} />

                <View style={styles.header}>
                    <View style={styles.driverInfo}>
                        <View style={styles.avatarContainer}>
                            <View style={styles.avatar}>
                                <Text style={styles.avatarText}>{driverName[0]}</Text>
                            </View>
                            <View style={styles.avatarGlow} />
                        </View>
                        <View>
                            <Text style={styles.driverName}>{driverName}</Text>
                            <Text style={styles.carInfo}>
                                {carModel}{carColor ? ` • ${carColor}` : ''}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.priceContainer}>
                        <Text style={styles.priceETH}>{priceETH}</Text>
                        <Text style={styles.priceUSD}>~{priceUSD}</Text>
                    </View>
                </View>

                <View style={styles.routeContainer}>
                    <View style={styles.routeLine}>
                        <View style={styles.dotGreen}>
                            <View style={styles.dotGreenInner} />
                        </View>
                        <View style={styles.dashedLine} />
                        <View style={styles.dotRed}>
                            <View style={styles.dotRedInner} />
                        </View>
                    </View>
                    <View style={styles.routeInfo}>
                        <Text style={styles.locationText}>{pickup}</Text>
                        <Text style={styles.locationText}>{dropoff}</Text>
                    </View>
                </View>

                <View style={styles.footer}>
                    <View style={styles.footerChip}>
                        <Text style={styles.footerChipText}>🕐 {departureTime}</Text>
                    </View>
                    {rating !== undefined && (
                        <View style={styles.footerChip}>
                            <Text style={styles.footerChipText}>⭐ {rating.toFixed(1)}</Text>
                        </View>
                    )}
                    <View style={[styles.footerChip, seatsAvailable <= 1 && styles.footerChipUrgent]}>
                        <Text style={[styles.footerChipText, seatsAvailable <= 1 && styles.footerChipTextUrgent]}>
                            💺 {seatsAvailable} seat{seatsAvailable !== 1 ? 's' : ''}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.xl,
        padding: Spacing.lg + 2,
        marginBottom: Spacing.md + 2,
        borderWidth: 1,
        borderColor: Colors.border,
        overflow: 'hidden',
        ...Shadows.sm,
    },
    shine: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    driverInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.md,
    },
    avatarContainer: {
        position: 'relative',
    },
    avatar: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: Colors.accent,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarGlow: {
        position: 'absolute',
        top: -3,
        left: -3,
        right: -3,
        bottom: -3,
        borderRadius: 24,
        backgroundColor: Colors.accentGlow,
    },
    avatarText: {
        color: Colors.white,
        fontSize: FontSize.lg,
        fontWeight: FontWeight.bold,
    },
    driverName: {
        color: Colors.textPrimary,
        fontSize: FontSize.md,
        fontWeight: FontWeight.semibold,
    },
    carInfo: {
        color: Colors.textSecondary,
        fontSize: FontSize.sm,
        marginTop: 2,
    },
    priceContainer: {
        alignItems: 'flex-end',
        backgroundColor: Colors.surfaceLight,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.md,
    },
    priceETH: {
        color: Colors.accent,
        fontSize: FontSize.md,
        fontWeight: FontWeight.bold,
    },
    priceUSD: {
        color: Colors.textMuted,
        fontSize: FontSize.xs,
        marginTop: 2,
    },
    routeContainer: {
        flexDirection: 'row',
        marginBottom: Spacing.md,
        paddingVertical: Spacing.sm,
    },
    routeLine: {
        width: 22,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 2,
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
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.success,
    },
    dashedLine: {
        width: 2,
        flex: 1,
        marginVertical: 4,
        backgroundColor: Colors.border,
        borderRadius: 1,
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
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.error,
    },
    routeInfo: {
        flex: 1,
        justifyContent: 'space-between',
        paddingLeft: Spacing.sm,
    },
    locationText: {
        color: Colors.textPrimary,
        fontSize: FontSize.sm,
        fontWeight: FontWeight.medium,
    },
    footer: {
        flexDirection: 'row',
        gap: Spacing.sm,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        paddingTop: Spacing.md,
    },
    footerChip: {
        backgroundColor: Colors.surfaceHighlight,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.xs + 2,
        borderRadius: BorderRadius.full,
    },
    footerChipUrgent: {
        backgroundColor: Colors.errorLight,
    },
    footerChipText: {
        color: Colors.textSecondary,
        fontSize: FontSize.xs,
    },
    footerChipTextUrgent: {
        color: Colors.error,
    },
});
