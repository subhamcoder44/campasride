import React from 'react';
import {
    View,
    Text,
    StyleSheet,
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

export default function LiveTrackingScreen({ navigation }: Props) {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

            {/* Map Placeholder */}
            <View style={styles.mapContainer}>
                <View style={styles.mapPlaceholder}>
                    <Text style={styles.mapIcon}>🗺️</Text>
                    <Text style={styles.mapText}>Live Map View</Text>
                    <View style={styles.route}>
                        <View style={styles.routePoint}>
                            <View style={styles.dotGreen} />
                            <Text style={styles.routePointLabel}>Pickup</Text>
                        </View>
                        <View style={styles.routeDashed} />
                        <View style={styles.routePoint}>
                            <View style={styles.dotRed} />
                            <Text style={styles.routePointLabel}>Drop-off</Text>
                        </View>
                    </View>
                </View>

                {/* Status Badge */}
                <View style={styles.statusBadge}>
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
            <View style={styles.bottomSheet}>
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

                {/* Driver Info */}
                <Card style={styles.driverCard}>
                    <View style={styles.driverRow}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>A</Text>
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
            </View>
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
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: Colors.success,
    },
    dotRed: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: Colors.error,
    },
    routeDashed: {
        width: 80,
        height: 2,
        backgroundColor: Colors.border,
    },
    statusBadge: {
        position: 'absolute',
        top: Spacing.huge,
        right: Spacing.xl,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.successLight,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.full,
        gap: Spacing.sm,
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
    bottomSheet: {
        backgroundColor: Colors.background,
        paddingHorizontal: Spacing.xl,
        paddingTop: Spacing.md,
        paddingBottom: Spacing.xxxl,
    },
    sheetHandle: {
        width: 40,
        height: 4,
        borderRadius: 2,
        backgroundColor: Colors.border,
        alignSelf: 'center',
        marginBottom: Spacing.xxl,
    },
    etaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: Spacing.xxl,
    },
    etaMain: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: Spacing.sm,
    },
    etaNumber: {
        color: Colors.textPrimary,
        fontSize: FontSize.hero,
        fontWeight: FontWeight.bold,
    },
    etaUnit: {
        color: Colors.textSecondary,
        fontSize: FontSize.xl,
    },
    etaDetail: {
        alignItems: 'flex-end',
    },
    arrivalLabel: {
        color: Colors.textSecondary,
        fontSize: FontSize.xs,
    },
    arrivalTime: {
        color: Colors.textPrimary,
        fontSize: FontSize.lg,
        fontWeight: FontWeight.semibold,
    },
    driverCard: {
        marginBottom: Spacing.lg,
    },
    driverRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.accent,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.md,
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
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.surfaceHighlight,
        alignItems: 'center',
        justifyContent: 'center',
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
