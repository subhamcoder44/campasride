import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius } from '../theme';

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
    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
            <View style={styles.header}>
                <View style={styles.driverInfo}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{driverName[0]}</Text>
                    </View>
                    <View>
                        <Text style={styles.driverName}>{driverName}</Text>
                        <Text style={styles.carInfo}>
                            {carModel}{carColor ? ` - ${carColor}` : ''}
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
                    <View style={styles.dotGreen} />
                    <View style={styles.dashedLine} />
                    <View style={styles.dotRed} />
                </View>
                <View style={styles.routeInfo}>
                    <Text style={styles.locationText}>{pickup}</Text>
                    <Text style={styles.locationText}>{dropoff}</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <Text style={styles.timeText}>🕐 {departureTime}</Text>
                {rating !== undefined && (
                    <Text style={styles.ratingText}>⭐ {rating.toFixed(1)}</Text>
                )}
                <Text style={styles.seatsText}>💺 {seatsAvailable} seats</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.lg,
        padding: Spacing.lg,
        marginBottom: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.borderLight,
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
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.accent,
        alignItems: 'center',
        justifyContent: 'center',
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
    },
    priceETH: {
        color: Colors.accent,
        fontSize: FontSize.md,
        fontWeight: FontWeight.bold,
    },
    priceUSD: {
        color: Colors.textSecondary,
        fontSize: FontSize.xs,
        marginTop: 2,
    },
    routeContainer: {
        flexDirection: 'row',
        marginBottom: Spacing.md,
        paddingVertical: Spacing.sm,
    },
    routeLine: {
        width: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 2,
    },
    dotGreen: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Colors.success,
    },
    dashedLine: {
        width: 2,
        flex: 1,
        marginVertical: 4,
        backgroundColor: Colors.border,
    },
    dotRed: {
        width: 10,
        height: 10,
        borderRadius: 5,
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
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: Colors.borderLight,
        paddingTop: Spacing.md,
    },
    timeText: {
        color: Colors.textSecondary,
        fontSize: FontSize.sm,
    },
    ratingText: {
        color: Colors.textSecondary,
        fontSize: FontSize.sm,
    },
    seatsText: {
        color: Colors.textSecondary,
        fontSize: FontSize.sm,
    },
});
