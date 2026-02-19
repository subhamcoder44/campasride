import React from 'react';
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

export default function SplitFareScreen({ navigation }: Props) {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

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
                    <View style={{ width: 40 }} />
                </View>

                {/* Inviter Card */}
                <Card style={styles.inviterCard} variant="accent">
                    <View style={styles.inviterRow}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>S</Text>
                        </View>
                        <View style={styles.inviterInfo}>
                            <Text style={styles.inviterName}>Sarah J.</Text>
                            <Text style={styles.inviterMeta}>Verified Student • ⭐ 4.9 Rating</Text>
                        </View>
                    </View>
                    <Text style={styles.inviteMessage}>
                        Invited you to split a ride to downtown
                    </Text>
                </Card>

                {/* Ride Details */}
                <Card style={styles.detailCard}>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Pick-up</Text>
                        <Text style={styles.detailValue}>North Campus Dorms</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Destination</Text>
                        <Text style={styles.detailValue}>Downtown Library</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Departure</Text>
                        <Text style={styles.detailValue}>Tonight, 10:30 PM</Text>
                    </View>
                </Card>

                {/* Your Share */}
                <Card style={styles.shareCard}>
                    <Text style={styles.shareLabel}>Your Share</Text>
                    <View style={styles.shareAmounts}>
                        <Text style={styles.shareETH}>0.0007 ETH</Text>
                        <Text style={styles.shareUSD}>Approx. $1.82</Text>
                    </View>
                </Card>

                {/* Escrow Info */}
                <Card style={styles.escrowCard} variant="highlight">
                    <View style={styles.escrowRow}>
                        <Text style={styles.escrowIcon}>🛡️</Text>
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
    inviterCard: {
        marginBottom: Spacing.xxl,
    },
    inviterRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.lg,
    },
    avatar: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: Colors.accent,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.lg,
    },
    avatarText: {
        color: Colors.white,
        fontSize: FontSize.xxl,
        fontWeight: FontWeight.bold,
    },
    inviterInfo: {
        flex: 1,
    },
    inviterName: {
        color: Colors.textPrimary,
        fontSize: FontSize.xl,
        fontWeight: FontWeight.bold,
    },
    inviterMeta: {
        color: Colors.textSecondary,
        fontSize: FontSize.sm,
        marginTop: 4,
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
        paddingVertical: Spacing.md,
    },
    detailLabel: {
        color: Colors.textMuted,
        fontSize: FontSize.xs,
        fontWeight: FontWeight.semibold,
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    detailValue: {
        color: Colors.textPrimary,
        fontSize: FontSize.md,
        fontWeight: FontWeight.medium,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.borderLight,
    },
    shareCard: {
        marginBottom: Spacing.lg,
        alignItems: 'center',
    },
    shareLabel: {
        color: Colors.textSecondary,
        fontSize: FontSize.sm,
        marginBottom: Spacing.sm,
    },
    shareAmounts: {
        alignItems: 'center',
    },
    shareETH: {
        color: Colors.accent,
        fontSize: FontSize.xxxl,
        fontWeight: FontWeight.bold,
    },
    shareUSD: {
        color: Colors.textSecondary,
        fontSize: FontSize.md,
        marginTop: Spacing.xs,
    },
    escrowCard: {
        marginBottom: Spacing.xxl,
    },
    escrowRow: {
        flexDirection: 'row',
        gap: Spacing.md,
    },
    escrowIcon: {
        fontSize: 24,
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
