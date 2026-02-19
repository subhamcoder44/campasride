import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, FontSize, Spacing } from '../theme';

interface Tab {
    key: string;
    label: string;
    icon: string;
}

interface BottomTabBarProps {
    tabs: Tab[];
    activeTab: string;
    onTabPress: (key: string) => void;
}

export default function BottomTabBar({ tabs, activeTab, onTabPress }: BottomTabBarProps) {
    return (
        <View style={styles.container}>
            {tabs.map(tab => {
                const isActive = tab.key === activeTab;
                return (
                    <TouchableOpacity
                        key={tab.key}
                        style={styles.tab}
                        onPress={() => onTabPress(tab.key)}
                        activeOpacity={0.7}>
                        <Text style={[styles.icon, isActive && styles.iconActive]}>
                            {tab.icon}
                        </Text>
                        <Text style={[styles.label, isActive && styles.labelActive]}>
                            {tab.label}
                        </Text>
                        {isActive && <View style={styles.indicator} />}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: Colors.surface,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        paddingBottom: Spacing.sm,
        paddingTop: Spacing.sm,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Spacing.sm,
        position: 'relative',
    },
    icon: {
        fontSize: 20,
        marginBottom: 2,
        opacity: 0.5,
    },
    iconActive: {
        opacity: 1,
    },
    label: {
        fontSize: FontSize.xs,
        color: Colors.textMuted,
    },
    labelActive: {
        color: Colors.accent,
        fontWeight: '600',
    },
    indicator: {
        position: 'absolute',
        top: -Spacing.sm,
        width: 20,
        height: 3,
        borderRadius: 1.5,
        backgroundColor: Colors.accent,
    },
});
