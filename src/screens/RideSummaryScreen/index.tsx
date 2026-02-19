import React, { useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
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

export default function RideSummaryScreen({ navigation }: Props) {
    const checkAnim = useRef(new Animated.Value(0)).current;
    const checkBounce = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.spring(checkBounce, {
                toValue: 1,
                useNativeDriver: true,
                speed: 6,
                bounciness: 15,
            }),
            Animated.timing(checkAnim, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

            {/* Ambient glow */}
            <View style={styles.glowOrb} />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Ride Summary</Text>
                </View>

                {/* Completion Badge */}
                <View style={styles.completionBadge}>
                    <Animated.View style={[styles.checkContainer, { transform: [{ scale: checkBounce }] }]}>
                        <View style={styles.checkGlow} />
                        <View style={styles.checkCircle}>
                            <Text style={styles.completionIcon}>✓</Text>
                        </View>
                    </Animated.View>
                    <Animated.View style={{ opacity: checkAnim }}>
                        <Text style={styles.completionText}>Ride Completed</Text>
                        <Text style={styles.completionTime}>Duration: 15 minutes</Text>
                    </Animated.View>
                </View>

                {/* Route Summary */}
                <Card style={styles.routeCard} delay={200}>
                    <View style={styles.routeRow}>
                        <View style={styles.dotGreen}>
                            <View style={styles.dotGreenInner} />
                        </View>
                        <View style={styles.routeInfo}>
                            <Text style={styles.routeLabel}>FROM</Text>
                            <Text style={styles.routeLocation}>Student Union</Text>
                        </View>
                    </View>
                    <View style={styles.routeDivider} />
                    <View style={styles.routeRow}>
                        <View style={styles.dotRed}>
                            <View style={styles.dotRedInner} />
                        </View>
                        <View style={styles.routeInfo}>
                            <Text style={styles.routeLabel}>TO</Text>
                            <Text style={styles.routeLocation}>North Campus Dorms</Text>
                        </View>
                    </View>
                </Card>

                {/* Fare Breakdown */}
                <Text style={styles.sectionTitle}>Fare Breakdown</Text>
                <Card delay={300}>
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
                <Card style={styles.settlementCard} variant="highlight" delay={400}>
                    <View style={styles.settlementRow}>
                        <View style={styles.settlementIconContainer}>
                            <Text style={styles.settlementIcon}>🛡️</Text>
                        </View>
                        <View style={styles.settlementInfo}>
                            <Text style={styles.settlementTitle}>Smart Contract Settlement</Text>
                            <Text style={styles.settlementDesc}>
                                Payment has been released from escrow and settled on-chain.
                            </Text>
                            <View style={styles.txHashBadge}>
                                <Text style={styles.txHash}>Tx: 0x7a3f...c829</Text>
                            </View>
                        </View>
                    </View>
                </Card>

                {/* Rate Driver */}
                <Card style={styles.rateCard} delay={500}>
                    <Text style={styles.rateTitle}>Rate your driver</Text>
                    <Text style={styles.rateName}>Alex M.</Text>
                    <View style={styles.stars}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <TouchableOpacity key={star} style={styles.starButton}>
                                <Text style={[styles.star, star <= 4 && styles.starActive]}>
                                    {star <= 4 ? '⭐' : '☆'}
                                </Text>
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
    glowOrb: {
        position: 'absolute',
        top: -40,
        left: '30%',
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: Colors.success,
        opacity: 0.06,
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
        fontSize: FontSize.xxxl,
        fontWeight: FontWeight.heavy,
        textAlign: 'center',
        letterSpacing: -0.5,
    },
    completionBadge: {
        alignItems: 'center',
        marginBottom: Spacing.xxl,
    },
    checkContainer: {
        position: 'relative',
        marginBottom: Spacing.lg,
    },
    checkGlow: {
        position: 'absolute',
        top: -12,
        left: -12,
        right: -12,
        bottom: -12,
        borderRadius: 48,
        backgroundColor: Colors.successGlow,
    },
    checkCircle: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: Colors.success,
        alignItems: 'center',
        justifyContent: 'center',
        ...Shadows.glowSuccess,
    },
    completionIcon: {
        color: Colors.white,
        fontSize: 32,
        fontWeight: FontWeight.bold,
    },
    completionText: {
        color: Colors.success,
        fontSize: FontSize.xl,
        fontWeight: FontWeight.heavy,
        textAlign: 'center',
    },
    completionTime: {
        color: Colors.textMuted,
        fontSize: FontSize.sm,
        marginTop: 4,
        textAlign: 'center',
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
    routeInfo: {},
    routeLabel: {
        color: Colors.textMuted,
        fontSize: FontSize.xs,
        fontWeight: FontWeight.semibold,
        letterSpacing: 1.5,
    },
    routeLocation: {
        color: Colors.textPrimary,
        fontSize: FontSize.md,
        fontWeight: FontWeight.semibold,
        marginTop: 2,
    },
    routeDivider: {
        width: 2,
        height: 24,
        backgroundColor: Colors.border,
        marginLeft: 7,
        marginVertical: Spacing.sm,
        borderRadius: 1,
    },
    sectionTitle: {
        color: Colors.textPrimary,
        fontSize: FontSize.xl,
        fontWeight: FontWeight.bold,
        marginBottom: Spacing.md,
    },
    fareRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: Spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
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
        fontWeight: FontWeight.heavy,
    },
    totalValues: {
        alignItems: 'flex-end',
    },
    totalETH: {
        color: Colors.accent,
        fontSize: FontSize.lg,
        fontWeight: FontWeight.heavy,
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
    settlementIconContainer: {
        width: 44,
        height: 44,
        borderRadius: BorderRadius.lg,
        backgroundColor: 'rgba(79, 142, 247, 0.12)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    settlementIcon: {
        fontSize: 22,
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
    txHashBadge: {
        backgroundColor: Colors.surfaceHighlight,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.xs + 1,
        borderRadius: BorderRadius.full,
        alignSelf: 'flex-start',
        marginTop: Spacing.sm,
    },
    txHash: {
        color: Colors.accent,
        fontSize: FontSize.xs,
        fontFamily: 'monospace',
    },
    rateCard: {
        marginTop: Spacing.xxl,
        alignItems: 'center',
    },
    rateTitle: {
        color: Colors.textMuted,
        fontSize: FontSize.sm,
        marginBottom: Spacing.sm,
    },
    rateName: {
        color: Colors.textPrimary,
        fontSize: FontSize.xl,
        fontWeight: FontWeight.bold,
        marginBottom: Spacing.md,
    },
    stars: {
        flexDirection: 'row',
        gap: Spacing.md,
    },
    starButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: Colors.surfaceHighlight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    star: {
        fontSize: 24,
    },
    starActive: {},
    doneButton: {
        marginTop: Spacing.xxl,
        width: '100%',
    },
});
