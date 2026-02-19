import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    StatusBar,
} from 'react-native';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius } from '../../theme';
import Card from '../../components/Card';
import Button from '../../components/Button';

interface Props {
    navigation: any;
    route: any;
}

export default function RideSummaryScreen({ navigation }: Props) {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Ride Summary</Text>
                </View>

                {/* Completion Badge */}
                <View style={styles.completionBadge}>
                    <Text style={styles.completionIcon}>✅</Text>
                    <Text style={styles.completionText}>Ride Completed</Text>
                    <Text style={styles.completionTime}>Duration: 15 minutes</Text>
                </View>

                {/* Route Summary */}
                <Card style={styles.routeCard}>
                    <View style={styles.routeRow}>
                        <View style={styles.dotGreen} />
                        <View style={styles.routeInfo}>
                            <Text style={styles.routeLabel}>FROM</Text>
                            <Text style={styles.routeLocation}>Student Union</Text>
                        </View>
                    </View>
                    <View style={styles.routeDivider} />
                    <View style={styles.routeRow}>
                        <View style={styles.dotRed} />
                        <View style={styles.routeInfo}>
                            <Text style={styles.routeLabel}>TO</Text>
                            <Text style={styles.routeLocation}>North Campus Dorms</Text>
                        </View>
                    </View>
                </Card>

                {/* Fare Breakdown */}
                <Text style={styles.sectionTitle}>Fare Breakdown</Text>
                <Card>
                    {[
                        { label: 'Base fare', value: '$3.00' },
                        { label: 'Distance (1.2 mi)', value: '$1.50' },
                        { label: 'Platform fee', value: '$0.50' },
                        { label: 'Crypto discount', value: '-$0.50', isDiscount: true },
                    ].map((item, idx) => (
                        <View key={idx} style={styles.fareRow}>
                            <Text style={styles.fareLabel}>{item.label}</Text>
                            <Text style={[styles.fareValue, item.isDiscount && styles.fareDiscount]}>
                                {item.value}
                            </Text>
                        </View>
                    ))}
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total Fare</Text>
                        <View style={styles.totalValues}>
                            <Text style={styles.totalETH}>0.0018 ETH</Text>
                            <Text style={styles.totalUSD}>$4.50</Text>
                        </View>
                    </View>
                </Card>

                {/* Settlement Info */}
                <Card style={styles.settlementCard} variant="highlight">
                    <View style={styles.settlementRow}>
                        <Text style={styles.settlementIcon}>🛡️</Text>
                        <View style={styles.settlementInfo}>
                            <Text style={styles.settlementTitle}>Smart Contract Settlement</Text>
                            <Text style={styles.settlementDesc}>
                                Payment has been released from escrow and settled on-chain.
                            </Text>
                            <Text style={styles.txHash}>Tx: 0x7a3f...c829</Text>
                        </View>
                    </View>
                </Card>

                {/* Rate Driver */}
                <Card style={styles.rateCard}>
                    <Text style={styles.rateTitle}>Rate your driver</Text>
                    <Text style={styles.rateName}>Alex M.</Text>
                    <View style={styles.stars}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <TouchableOpacity key={star}>
                                <Text style={styles.star}>{star <= 4 ? '⭐' : '☆'}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </Card>

                <Button
                    title="Done"
                    onPress={() => navigation.navigate('MainTabs')}
                    size="lg"
                    style={styles.doneButton}
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    scrollContent: {
        paddingHorizontal: Spacing.xl,
        paddingBottom: Spacing.xxxl,
    },
    header: {
        paddingTop: Spacing.huge,
        marginBottom: Spacing.xxl,
    },
    headerTitle: {
        color: Colors.textPrimary,
        fontSize: FontSize.xxl,
        fontWeight: FontWeight.bold,
        textAlign: 'center',
    },
    completionBadge: {
        alignItems: 'center',
        marginBottom: Spacing.xxl,
    },
    completionIcon: {
        fontSize: 48,
        marginBottom: Spacing.md,
    },
    completionText: {
        color: Colors.success,
        fontSize: FontSize.lg,
        fontWeight: FontWeight.bold,
    },
    completionTime: {
        color: Colors.textSecondary,
        fontSize: FontSize.sm,
        marginTop: 4,
    },
    routeCard: {
        marginBottom: Spacing.xxl,
    },
    routeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.md,
    },
    dotGreen: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: Colors.success,
    },
    dotRed: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: Colors.error,
    },
    routeInfo: {},
    routeLabel: {
        color: Colors.textMuted,
        fontSize: FontSize.xs,
        fontWeight: FontWeight.semibold,
        letterSpacing: 1,
    },
    routeLocation: {
        color: Colors.textPrimary,
        fontSize: FontSize.md,
        fontWeight: FontWeight.medium,
        marginTop: 2,
    },
    routeDivider: {
        width: 2,
        height: 24,
        backgroundColor: Colors.border,
        marginLeft: 5,
        marginVertical: Spacing.sm,
    },
    sectionTitle: {
        color: Colors.textPrimary,
        fontSize: FontSize.lg,
        fontWeight: FontWeight.bold,
        marginBottom: Spacing.md,
    },
    fareRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: Spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderLight,
    },
    fareLabel: {
        color: Colors.textSecondary,
        fontSize: FontSize.md,
    },
    fareValue: {
        color: Colors.textPrimary,
        fontSize: FontSize.md,
        fontWeight: FontWeight.medium,
    },
    fareDiscount: {
        color: Colors.success,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: Spacing.lg,
    },
    totalLabel: {
        color: Colors.textPrimary,
        fontSize: FontSize.lg,
        fontWeight: FontWeight.bold,
    },
    totalValues: {
        alignItems: 'flex-end',
    },
    totalETH: {
        color: Colors.accent,
        fontSize: FontSize.lg,
        fontWeight: FontWeight.bold,
    },
    totalUSD: {
        color: Colors.textSecondary,
        fontSize: FontSize.sm,
        marginTop: 2,
    },
    settlementCard: {
        marginTop: Spacing.xxl,
    },
    settlementRow: {
        flexDirection: 'row',
        gap: Spacing.md,
    },
    settlementIcon: {
        fontSize: 24,
    },
    settlementInfo: {
        flex: 1,
    },
    settlementTitle: {
        color: Colors.textPrimary,
        fontSize: FontSize.md,
        fontWeight: FontWeight.semibold,
    },
    settlementDesc: {
        color: Colors.textSecondary,
        fontSize: FontSize.sm,
        marginTop: 4,
        lineHeight: 20,
    },
    txHash: {
        color: Colors.accent,
        fontSize: FontSize.xs,
        fontFamily: 'monospace',
        marginTop: Spacing.sm,
    },
    rateCard: {
        marginTop: Spacing.xxl,
        alignItems: 'center',
    },
    rateTitle: {
        color: Colors.textSecondary,
        fontSize: FontSize.sm,
        marginBottom: Spacing.sm,
    },
    rateName: {
        color: Colors.textPrimary,
        fontSize: FontSize.lg,
        fontWeight: FontWeight.bold,
        marginBottom: Spacing.md,
    },
    stars: {
        flexDirection: 'row',
        gap: Spacing.md,
    },
    star: {
        fontSize: 28,
    },
    doneButton: {
        marginTop: Spacing.xxl,
        width: '100%',
    },
});
