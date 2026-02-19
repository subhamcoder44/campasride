import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
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

const RECENT_RIDERS = [
    { id: '1', name: 'Mike T.', initial: 'M', rating: 4.8, rides: 12 },
    { id: '2', name: 'Sarah K.', initial: 'S', rating: 4.9, rides: 8 },
    { id: '3', name: 'John D.', initial: 'J', rating: 4.7, rides: 5 },
];

const CONTACTS = [
    { id: '4', name: 'Emily R.', initial: 'E' },
    { id: '5', name: 'David W.', initial: 'D' },
    { id: '6', name: 'Lisa M.', initial: 'L' },
    { id: '7', name: 'Chris P.', initial: 'C' },
];

export default function ManageSplitFareScreen({ navigation }: Props) {
    const [selected, setSelected] = useState<string[]>([]);

    const toggleSelect = (id: string) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
        );
    };

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
                    <Text style={styles.headerTitle}>Split Fare</Text>
                    <View style={{ width: 44 }} />
                </View>

                {/* Ride Info */}
                <Card style={styles.rideCard} variant="accent">
                    <View style={styles.rideHeader}>
                        <View>
                            <Text style={styles.rideTitle}>Library to Dorms</Text>
                            <Text style={styles.rideMeta}>1.2 miles • Driver: John D.</Text>
                        </View>
                        <View style={styles.rideIconContainer}>
                            <Text style={styles.rideIcon}>🚗</Text>
                        </View>
                    </View>
                    <View style={styles.fareRow}>
                        <Text style={styles.fareLabel}>Total Fare</Text>
                        <Text style={styles.fareValue}>0.005 ETH (~$12.50)</Text>
                    </View>
                    <View style={styles.splitInfo}>
                        <View style={styles.splitBadge}>
                            <Text style={styles.splitLabel}>
                                👥 Split between {selected.length + 1} people
                            </Text>
                        </View>
                        <Text style={styles.splitAmount}>
                            ~{(0.005 / (selected.length + 1)).toFixed(4)} ETH each
                        </Text>
                    </View>
                </Card>

                {/* Recent Riders */}
                <Text style={styles.sectionTitle}>Recent Riders</Text>
                <View style={styles.ridersList}>
                    {RECENT_RIDERS.map((rider) => {
                        const isSelected = selected.includes(rider.id);
                        return (
                            <RiderItem
                                key={rider.id}
                                name={rider.name}
                                initial={rider.initial}
                                meta={`⭐ ${rider.rating} • ${rider.rides} rides together`}
                                isSelected={isSelected}
                                onPress={() => toggleSelect(rider.id)}
                            />
                        );
                    })}
                </View>

                {/* Contacts */}
                <Text style={styles.sectionTitle}>Contacts</Text>
                <View style={styles.ridersList}>
                    {CONTACTS.map((contact) => {
                        const isSelected = selected.includes(contact.id);
                        return (
                            <RiderItem
                                key={contact.id}
                                name={contact.name}
                                initial={contact.initial}
                                isSelected={isSelected}
                                onPress={() => toggleSelect(contact.id)}
                            />
                        );
                    })}
                </View>
            </ScrollView>

            {/* Bottom CTA */}
            <View style={styles.bottomBar}>
                <View style={styles.bottomInfo}>
                    <Text style={styles.bottomCount}>
                        {selected.length} selected
                    </Text>
                    {selected.length > 0 && (
                        <Text style={styles.bottomSplit}>
                            ~{(0.005 / (selected.length + 1)).toFixed(4)} ETH each
                        </Text>
                    )}
                </View>
                <Button
                    title={`Send Invite${selected.length > 0 ? ` (${selected.length})` : ''}`}
                    onPress={() => navigation.goBack()}
                    size="lg"
                    style={styles.sendButton}
                    disabled={selected.length === 0}
                />
            </View>
        </View>
    );
}

function RiderItem({
    name,
    initial,
    meta,
    isSelected,
    onPress,
}: {
    name: string;
    initial: string;
    meta?: string;
    isSelected: boolean;
    onPress: () => void;
}) {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.97,
            useNativeDriver: true,
            speed: 50,
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
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
                style={[styles.riderItem, isSelected && styles.riderSelected]}
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={1}>
                <View style={[styles.riderAvatar, isSelected && styles.riderAvatarSelected]}>
                    <Text style={styles.riderAvatarText}>{initial}</Text>
                </View>
                <View style={styles.riderInfo}>
                    <Text style={styles.riderName}>{name}</Text>
                    {meta && <Text style={styles.riderMeta}>{meta}</Text>}
                </View>
                <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                    {isSelected && <Text style={styles.checkmark}>✓</Text>}
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
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
    rideCard: {
        marginBottom: Spacing.xxl,
    },
    rideHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    rideTitle: {
        color: Colors.textPrimary,
        fontSize: FontSize.xl,
        fontWeight: FontWeight.heavy,
    },
    rideMeta: {
        color: Colors.textSecondary,
        fontSize: FontSize.sm,
        marginTop: 4,
    },
    rideIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(79, 142, 247, 0.12)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rideIcon: {
        fontSize: 24,
    },
    fareRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: Spacing.md,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        marginTop: Spacing.lg,
    },
    fareLabel: {
        color: Colors.textSecondary,
        fontSize: FontSize.md,
    },
    fareValue: {
        color: Colors.accent,
        fontSize: FontSize.md,
        fontWeight: FontWeight.bold,
    },
    splitInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: Spacing.md,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    },
    splitBadge: {
        backgroundColor: Colors.surfaceHighlight,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.xs + 1,
        borderRadius: BorderRadius.full,
    },
    splitLabel: {
        color: Colors.textSecondary,
        fontSize: FontSize.sm,
    },
    splitAmount: {
        color: Colors.success,
        fontSize: FontSize.sm,
        fontWeight: FontWeight.bold,
    },
    sectionTitle: {
        color: Colors.textPrimary,
        fontSize: FontSize.xl,
        fontWeight: FontWeight.bold,
        marginBottom: Spacing.md,
    },
    ridersList: {
        gap: Spacing.sm,
        marginBottom: Spacing.xxl,
    },
    riderItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.xl,
        padding: Spacing.lg,
        borderWidth: 1.5,
        borderColor: Colors.border,
    },
    riderSelected: {
        borderColor: Colors.accent,
        backgroundColor: Colors.surfaceLight,
    },
    riderAvatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.surfaceHighlight,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.md,
    },
    riderAvatarSelected: {
        backgroundColor: Colors.accent,
    },
    riderAvatarText: {
        color: Colors.textPrimary,
        fontSize: FontSize.lg,
        fontWeight: FontWeight.bold,
    },
    riderInfo: {
        flex: 1,
    },
    riderName: {
        color: Colors.textPrimary,
        fontSize: FontSize.md,
        fontWeight: FontWeight.semibold,
    },
    riderMeta: {
        color: Colors.textMuted,
        fontSize: FontSize.xs,
        marginTop: 2,
    },
    checkbox: {
        width: 26,
        height: 26,
        borderRadius: 13,
        borderWidth: 2,
        borderColor: Colors.border,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxSelected: {
        backgroundColor: Colors.accent,
        borderColor: Colors.accent,
        ...Shadows.glow,
    },
    checkmark: {
        color: Colors.white,
        fontSize: 14,
        fontWeight: FontWeight.bold,
    },
    bottomBar: {
        backgroundColor: Colors.surface,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        paddingHorizontal: Spacing.xl,
        paddingVertical: Spacing.lg,
        paddingBottom: Spacing.xxl,
    },
    bottomInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    bottomCount: {
        color: Colors.textSecondary,
        fontSize: FontSize.sm,
        fontWeight: FontWeight.medium,
    },
    bottomSplit: {
        color: Colors.success,
        fontSize: FontSize.sm,
        fontWeight: FontWeight.bold,
    },
    sendButton: {
        width: '100%',
    },
});
