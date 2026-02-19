import React, { useState } from 'react';
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
                    <View style={{ width: 40 }} />
                </View>

                {/* Ride Info */}
                <Card style={styles.rideCard}>
                    <Text style={styles.rideTitle}>Library to Dorms</Text>
                    <Text style={styles.rideMeta}>1.2 miles • Driver: John D.</Text>
                    <View style={styles.fareRow}>
                        <Text style={styles.fareLabel}>Total Fare</Text>
                        <Text style={styles.fareValue}>0.005 ETH (~$12.50)</Text>
                    </View>
                    <View style={styles.splitInfo}>
                        <Text style={styles.splitLabel}>
                            Split between {selected.length + 1} people
                        </Text>
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
                            <TouchableOpacity
                                key={rider.id}
                                style={[styles.riderItem, isSelected && styles.riderSelected]}
                                onPress={() => toggleSelect(rider.id)}
                                activeOpacity={0.7}>
                                <View style={[styles.riderAvatar, isSelected && styles.riderAvatarSelected]}>
                                    <Text style={styles.riderAvatarText}>{rider.initial}</Text>
                                </View>
                                <View style={styles.riderInfo}>
                                    <Text style={styles.riderName}>{rider.name}</Text>
                                    <Text style={styles.riderMeta}>
                                        ⭐ {rider.rating} • {rider.rides} rides together
                                    </Text>
                                </View>
                                <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                                    {isSelected && <Text style={styles.checkmark}>✓</Text>}
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Contacts */}
                <Text style={styles.sectionTitle}>Contacts</Text>
                <View style={styles.ridersList}>
                    {CONTACTS.map((contact) => {
                        const isSelected = selected.includes(contact.id);
                        return (
                            <TouchableOpacity
                                key={contact.id}
                                style={[styles.riderItem, isSelected && styles.riderSelected]}
                                onPress={() => toggleSelect(contact.id)}
                                activeOpacity={0.7}>
                                <View style={[styles.riderAvatar, isSelected && styles.riderAvatarSelected]}>
                                    <Text style={styles.riderAvatarText}>{contact.initial}</Text>
                                </View>
                                <View style={styles.riderInfo}>
                                    <Text style={styles.riderName}>{contact.name}</Text>
                                </View>
                                <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                                    {isSelected && <Text style={styles.checkmark}>✓</Text>}
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>

            {/* Bottom CTA */}
            <View style={styles.bottomBar}>
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
    rideCard: {
        marginBottom: Spacing.xxl,
    },
    rideTitle: {
        color: Colors.textPrimary,
        fontSize: FontSize.xl,
        fontWeight: FontWeight.bold,
    },
    rideMeta: {
        color: Colors.textSecondary,
        fontSize: FontSize.sm,
        marginTop: 4,
        marginBottom: Spacing.lg,
    },
    fareRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: Spacing.md,
        borderTopWidth: 1,
        borderTopColor: Colors.borderLight,
    },
    fareLabel: {
        color: Colors.textSecondary,
        fontSize: FontSize.md,
    },
    fareValue: {
        color: Colors.accent,
        fontSize: FontSize.md,
        fontWeight: FontWeight.semibold,
    },
    splitInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: Spacing.md,
        borderTopWidth: 1,
        borderTopColor: Colors.borderLight,
    },
    splitLabel: {
        color: Colors.textSecondary,
        fontSize: FontSize.sm,
    },
    splitAmount: {
        color: Colors.success,
        fontSize: FontSize.sm,
        fontWeight: FontWeight.semibold,
    },
    sectionTitle: {
        color: Colors.textPrimary,
        fontSize: FontSize.lg,
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
        borderRadius: BorderRadius.lg,
        padding: Spacing.lg,
        borderWidth: 1,
        borderColor: Colors.borderLight,
    },
    riderSelected: {
        borderColor: Colors.accent,
        backgroundColor: Colors.surfaceLight,
    },
    riderAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
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
        fontWeight: FontWeight.medium,
    },
    riderMeta: {
        color: Colors.textSecondary,
        fontSize: FontSize.xs,
        marginTop: 2,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: Colors.border,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxSelected: {
        backgroundColor: Colors.accent,
        borderColor: Colors.accent,
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
    sendButton: {
        width: '100%',
    },
});
