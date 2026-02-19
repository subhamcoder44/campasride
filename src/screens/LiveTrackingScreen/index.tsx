import React, { useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Animated,
} from 'react-native';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadows } from '../../theme';
import Card from '../../components/Card';
import Button from '../../components/Button';

interface Props {
    navigation: any;
    route: any;
}

export default function LiveTrackingScreen({ navigation }: Props) {
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const sheetSlide = useRef(new Animated.Value(40)).current;
    const sheetFade = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Pulse the status dot
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, { toValue: 1.4, duration: 1000, useNativeDriver: true }),
                Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
            ]),
        ).start();

        // Slide up bottom sheet
        Animated.parallel([
            Animated.spring(sheetSlide, {
                toValue: 0,
                useNativeDriver: true,
                speed: 10,
                bounciness: 6,
            }),
            Animated.timing(sheetFade, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

            {/* Map Placeholder */}
            <View style={styles.mapContainer}>
                <View style={styles.mapPlaceholder}>
                    {/* Grid pattern for map look */}
                    <View style={styles.gridPattern}>
                        {[...Array(6)].map((_, i) => (
                            <View key={i} style={styles.gridLine} />
                        ))}
                    </View>
                    <View style={styles.mapContent}>
                        <Text style={styles.mapIcon}>🗺️</Text>
                        <Text style={styles.mapText}>Live Map View</Text>
                        <View style={styles.route}>
                            <View style={styles.routePoint}>
                                <View style={styles.dotGreen}>
                                    <View style={styles.dotGreenInner} />
                                </View>
                                <Text style={styles.routePointLabel}>Pickup</Text>
                            </View>
                            <View style={styles.routeDashed} />
                            <View style={styles.carDot}>
                                <Text style={styles.carEmoji}>🚗</Text>
                            </View>
                            <View style={styles.routeDashed} />
                            <View style={styles.routePoint}>
                                <View style={styles.dotRed}>
                                    <View style={styles.dotRedInner} />
                                </View>
                                <Text style={styles.routePointLabel}>Drop-off</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Status Badge */}
                <View style={styles.statusBadge}>
                    <Animated.View style={[styles.statusPulse, { transform: [{ scale: pulseAnim }] }]} />
                    <View style={styles.statusDot} />
                    <Text style={styles.statusText}>On Trip</Text>
                </View>

                {/* Back Button */}
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}>
                    <Text style={styles.backIcon}>←</Text>
                </TouchableOpacity>
            </View>

            {/* Bottom Sheet */}
            <Animated.View style={[
                styles.bottomSheet,
                {
                    opacity: sheetFade,
                    transform: [{ translateY: sheetSlide }],
                },
            ]}>
                <View style={styles.sheetHandle} />

                {/* ETA */}
                <View style={styles.etaContainer}>
                    <View style={styles.etaMain}>
                        <Text style={styles.etaNumber}>12</Text>
                        <Text style={styles.etaUnit}>min</Text>
                    </View>
                    <View style={styles.etaDetail}>
                        <Text style={styles.arrivalLabel}>Arrival</Text>
                        <Text style={styles.arrivalTime}>10:45 AM</Text>
                    </View>
                </View>

                {/* Progress bar */}
                <View style={styles.progressBar}>
                    <View style={styles.progressFill} />
                </View>

                {/* Driver Info */}
                <Card style={styles.driverCard}>
                    <View style={styles.driverRow}>
                        <View style={styles.avatarGlowContainer}>
                            <View style={styles.avatarGlow} />
                            <View style={styles.avatar}>
                                <Text style={styles.avatarText}>A</Text>
                            </View>
                        </View>
                        <View style={styles.driverInfo}>
                            <Text style={styles.driverName}>Alice M.</Text>
                            <Text style={styles.carInfo}>Toyota Prius • ABC-1234</Text>
                        </View>
                        <View style={styles.driverActions}>
                            <TouchableOpacity style={styles.actionButton}>
                                <Text style={styles.actionIcon}>📱</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionButton}>
                                <Text style={styles.actionIcon}>💬</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Card>

                {/* Actions */}
                <View style={styles.actions}>
                    <Button
                        title="Share Trip"
                        onPress={() => { }}
                        variant="secondary"
                        size="md"
                        icon="📤"
                        style={styles.actionBtn}
                    />
                    <Button
                        title="Split Fare"
                        onPress={() => navigation.navigate('SplitFare', { rideId: '1' })}
                        variant="primary"
                        size="md"
                        icon="💸"
                        style={styles.actionBtn}
                    />
                </View>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    mapContainer: {
        flex: 1,
        position: 'relative',
    },
    mapPlaceholder: {
        flex: 1,
        backgroundColor: Colors.surfaceLight,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: BorderRadius.xxl,
        borderBottomRightRadius: BorderRadius.xxl,
        overflow: 'hidden',
    },
    gridPattern: {
        ...StyleSheet.absoluteFillObject,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        opacity: 0.04,
    },
    gridLine: {
        width: 1,
        height: '100%',
        backgroundColor: Colors.textPrimary,
    },
    mapContent: {
        alignItems: 'center',
    },
    mapIcon: {
        fontSize: 48,
        marginBottom: Spacing.md,
    },
    mapText: {
        color: Colors.textMuted,
        fontSize: FontSize.md,
        marginBottom: Spacing.xxl,
    },
    route: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.md,
    },
    routePoint: {
        alignItems: 'center',
        gap: Spacing.xs,
    },
    routePointLabel: {
        color: Colors.textSecondary,
        fontSize: FontSize.xs,
    },
    dotGreen: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: Colors.successLight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dotGreenInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Colors.success,
    },
    dotRed: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: Colors.errorLight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dotRedInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Colors.error,
    },
    carDot: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: Colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: Colors.accent,
        ...Shadows.glow,
    },
    carEmoji: {
        fontSize: 18,
    },
    routeDashed: {
        width: 50,
        height: 2,
        backgroundColor: Colors.border,
        borderRadius: 1,
    },
    statusBadge: {
        position: 'absolute',
        top: Spacing.huge,
        right: Spacing.xl,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surfaceGlass,
        paddingHorizontal: Spacing.md + 2,
        paddingVertical: Spacing.sm + 2,
        borderRadius: BorderRadius.full,
        gap: Spacing.sm,
        borderWidth: 1,
        borderColor: 'rgba(52, 211, 153, 0.2)',
    },
    statusPulse: {
        position: 'absolute',
        left: Spacing.md + 2,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.successGlow,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.success,
    },
    statusText: {
        color: Colors.success,
        fontSize: FontSize.sm,
        fontWeight: FontWeight.semibold,
    },
    backButton: {
        position: 'absolute',
        top: Spacing.huge,
        left: Spacing.xl,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.surfaceGlass,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
    },
    backIcon: {
        color: Colors.textPrimary,
        fontSize: FontSize.xl,
    },
    bottomSheet: {
        backgroundColor: Colors.background,
        paddingHorizontal: Spacing.xl,
        paddingTop: Spacing.md,
        paddingBottom: Spacing.xxxl,
        borderTopLeftRadius: BorderRadius.xxl,
        borderTopRightRadius: BorderRadius.xxl,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    },
    sheetHandle: {
        width: 40,
        height: 4,
        borderRadius: 2,
        backgroundColor: Colors.surfaceHighlight,
        alignSelf: 'center',
        marginBottom: Spacing.xxl,
    },
    etaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: Spacing.lg,
    },
    etaMain: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: Spacing.sm,
    },
    etaNumber: {
        color: Colors.textPrimary,
        fontSize: FontSize.hero,
        fontWeight: FontWeight.heavy,
    },
    etaUnit: {
        color: Colors.textMuted,
        fontSize: FontSize.xl,
    },
    etaDetail: {
        alignItems: 'flex-end',
    },
    arrivalLabel: {
        color: Colors.textMuted,
        fontSize: FontSize.xs,
    },
    arrivalTime: {
        color: Colors.textPrimary,
        fontSize: FontSize.lg,
        fontWeight: FontWeight.semibold,
    },
    progressBar: {
        height: 4,
        backgroundColor: Colors.surfaceHighlight,
        borderRadius: 2,
        marginBottom: Spacing.xxl,
        overflow: 'hidden',
    },
    progressFill: {
        width: '65%',
        height: '100%',
        backgroundColor: Colors.accent,
        borderRadius: 2,
        ...Shadows.glow,
    },
    driverCard: {
        marginBottom: Spacing.lg,
    },
    driverRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarGlowContainer: {
        position: 'relative',
        marginRight: Spacing.md,
    },
    avatarGlow: {
        position: 'absolute',
        top: -4,
        left: -4,
        right: -4,
        bottom: -4,
        borderRadius: 26,
        backgroundColor: Colors.accentGlow,
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.accent,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        color: Colors.white,
        fontSize: FontSize.lg,
        fontWeight: FontWeight.bold,
    },
    driverInfo: {
        flex: 1,
    },
    driverName: {
        color: Colors.textPrimary,
        fontSize: FontSize.md,
        fontWeight: FontWeight.bold,
    },
    carInfo: {
        color: Colors.textSecondary,
        fontSize: FontSize.sm,
        marginTop: 2,
    },
    driverActions: {
        flexDirection: 'row',
        gap: Spacing.sm,
    },
    actionButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: Colors.surfaceHighlight,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
    },
    actionIcon: {
        fontSize: 18,
    },
    actions: {
        flexDirection: 'row',
        gap: Spacing.md,
    },
    actionBtn: {
        flex: 1,
    },
});
