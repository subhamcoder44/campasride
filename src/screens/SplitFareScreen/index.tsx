import React from 'react';
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

export default function SplitFareScreen({ navigation }: Props) {
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
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}>
                        <Text style={styles.backIcon}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Split Fare Invitation</Text>
                    <View style={{ width: 44 }} />
                </View>

                {/* Inviter Card */}
                <Card style={styles.inviterCard} variant="accent">
                    <View style={styles.inviterRow}>
                        <View style={styles.avatarContainer}>
                            <View style={styles.avatarGlow} />
                            <View style={styles.avatar}>
                                <Text style={styles.avatarText}>S</Text>
                            </View>
                        </View>
                        <View style={styles.inviterInfo}>
                            <Text style={styles.inviterName}>Sarah J.</Text>
                            <View style={styles.metaBadges}>
                                <View style={styles.verifiedBadge}>
                                    <Text style={styles.verifiedText}>✅ Verified</Text>
                                </View>
                                <View style={styles.ratingBadge}>
                                    <Text style={styles.ratingText}>⭐ 4.9</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.inviteMsgContainer}>
                        <Text style={styles.inviteMessage}>
                            Invited you to split a ride to downtown
                        </Text>
                    </View>
                </Card>

                {/* Ride Details */}
                <Card style={styles.detailCard} delay={100}>
                    {[
                        { label: 'PICK-UP', value: 'North Campus Dorms', icon: '📍' },
                        { label: 'DESTINATION', value: 'Downtown Library', icon: '🏁' },
                        { label: 'DEPARTURE', value: 'Tonight, 10:30 PM', icon: '🕐' },
                    ].map((detail, idx) => (
                        <React.Fragment key={idx}>
                            {idx > 0 && <View style={styles.divider} />}
                            <View style={styles.detailRow}>
                                <View style={styles.detailIconContainer}>
                                    <Text style={styles.detailIcon}>{detail.icon}</Text>
                                </View>
                                <View>
                                    <Text style={styles.detailLabel}>{detail.label}</Text>
                                    <Text style={styles.detailValue}>{detail.value}</Text>
                                </View>
                            </View>
                        </React.Fragment>
                    ))}
                </Card>

                {/* Your Share */}
                <Card style={styles.shareCard} variant="accent" delay={200}>
                    <View style={styles.shareGlow} />
                    <Text style={styles.shareLabel}>Your Share</Text>
                    <View style={styles.shareAmounts}>
                        <Text style={styles.shareETH}>0.0007 ETH</Text>
                        <View style={styles.approxBadge}>
                            <Text style={styles.shareUSD}>≈ $1.82</Text>
                        </View>
                    </View>
                </Card>

                {/* Escrow Info */}
                <Card style={styles.escrowCard} variant="highlight" delay={300}>
                    <View style={styles.escrowRow}>
                        <View style={styles.escrowIconContainer}>
                            <Text style={styles.escrowIcon}>🛡️</Text>
                        </View>
                        <Text style={styles.escrowText}>
                            Secure smart contract settlement. Your payment is held in escrow and
                            released only after the ride is marked complete by both parties.
                        </Text>
                    </View>
                </Card>

                {/* Actions */}
                <View style={styles.actions}>
                    <Button
                        title="Decline"
                        onPress={() => navigation.goBack()}
                        variant="secondary"
                        size="lg"
                        style={styles.declineBtn}
                    />
                    <Button
                        title="Accept & Pay"
                        onPress={() => navigation.navigate('LiveTracking', { rideId: '1' })}
                        size="lg"
                        style={styles.acceptBtn}
                    />
                </View>
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
        top: -60,
        right: -60,
        width: 250,
        height: 250,
        borderRadius: 125,
        backgroundColor: Colors.purple,
        opacity: 0.05,
    },
    scrollContent: {
        paddingHorizontal: Spacing.xl,
        paddingBottom: Spacing.xxxl,
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
    inviterCard: {
        marginBottom: Spacing.xxl,
    },
    inviterRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.lg,
    },
    avatarContainer: {
        position: 'relative',
        marginRight: Spacing.lg,
    },
    avatarGlow: {
        position: 'absolute',
        top: -5,
        left: -5,
        right: -5,
        bottom: -5,
        borderRadius: 31,
        backgroundColor: Colors.accentGlow,
    },
    avatar: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: Colors.accent,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        color: Colors.white,
        fontSize: FontSize.xxl,
        fontWeight: FontWeight.heavy,
    },
    inviterInfo: {
        flex: 1,
    },
    inviterName: {
        color: Colors.textPrimary,
        fontSize: FontSize.xl,
        fontWeight: FontWeight.heavy,
    },
    metaBadges: {
        flexDirection: 'row',
        gap: Spacing.sm,
        marginTop: Spacing.sm,
    },
    verifiedBadge: {
        backgroundColor: Colors.successLight,
        paddingHorizontal: Spacing.md,
        paddingVertical: 3,
        borderRadius: BorderRadius.full,
    },
    verifiedText: {
        color: Colors.success,
        fontSize: FontSize.xs,
        fontWeight: FontWeight.semibold,
    },
    ratingBadge: {
        backgroundColor: 'rgba(251, 191, 36, 0.12)',
        paddingHorizontal: Spacing.md,
        paddingVertical: 3,
        borderRadius: BorderRadius.full,
    },
    ratingText: {
        color: Colors.warning,
        fontSize: FontSize.xs,
        fontWeight: FontWeight.semibold,
    },
    inviteMsgContainer: {
        backgroundColor: Colors.surfaceHighlight,
        padding: Spacing.md,
        borderRadius: BorderRadius.md,
    },
    inviteMessage: {
        color: Colors.textSecondary,
        fontSize: FontSize.md,
        lineHeight: 22,
    },
    detailCard: {
        marginBottom: Spacing.lg,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Spacing.md,
        gap: Spacing.md,
    },
    detailIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: Colors.surfaceHighlight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    detailIcon: {
        fontSize: 18,
    },
    detailLabel: {
        color: Colors.textMuted,
        fontSize: FontSize.xs,
        fontWeight: FontWeight.semibold,
        letterSpacing: 1,
        marginBottom: 3,
    },
    detailValue: {
        color: Colors.textPrimary,
        fontSize: FontSize.md,
        fontWeight: FontWeight.medium,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.border,
    },
    shareCard: {
        marginBottom: Spacing.lg,
        alignItems: 'center',
        overflow: 'hidden',
    },
    shareGlow: {
        position: 'absolute',
        top: -30,
        right: -30,
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.accent,
        opacity: 0.1,
    },
    shareLabel: {
        color: Colors.textMuted,
        fontSize: FontSize.sm,
        marginBottom: Spacing.sm,
        letterSpacing: 0.5,
    },
    shareAmounts: {
        alignItems: 'center',
    },
    shareETH: {
        color: Colors.accent,
        fontSize: FontSize.xxxl,
        fontWeight: FontWeight.heavy,
        letterSpacing: -0.5,
    },
    approxBadge: {
        backgroundColor: 'rgba(79, 142, 247, 0.12)',
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.xs,
        borderRadius: BorderRadius.full,
        marginTop: Spacing.sm,
    },
    shareUSD: {
        color: Colors.accentLight,
        fontSize: FontSize.md,
    },
    escrowCard: {
        marginBottom: Spacing.xxl,
    },
    escrowRow: {
        flexDirection: 'row',
        gap: Spacing.md,
    },
    escrowIconContainer: {
        width: 44,
        height: 44,
        borderRadius: BorderRadius.lg,
        backgroundColor: 'rgba(79, 142, 247, 0.12)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    escrowIcon: {
        fontSize: 22,
    },
    escrowText: {
        color: Colors.textSecondary,
        fontSize: FontSize.sm,
        lineHeight: 20,
        flex: 1,
    },
    actions: {
        flexDirection: 'row',
        gap: Spacing.md,
    },
    declineBtn: {
        flex: 1,
    },
    acceptBtn: {
        flex: 2,
    },
});
