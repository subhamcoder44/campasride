import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Colors, FontSize, Spacing, Shadows, BorderRadius } from '../theme';

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
            {/* Frosted glass background */}
            <View style={styles.glassBackground} />
            <View style={styles.tabRow}>
                {tabs.map(tab => {
                    const isActive = tab.key === activeTab;
                    return (
                        <TabItem
                            key={tab.key}
                            tab={tab}
                            isActive={isActive}
                            onPress={() => onTabPress(tab.key)}
                        />
                    );
                })}
            </View>
        </View>
    );
}

function TabItem({ tab, isActive, onPress }: { tab: Tab; isActive: boolean; onPress: () => void }) {
    const scaleAnim = useRef(new Animated.Value(isActive ? 1 : 0.85)).current;
    const glowOpacity = useRef(new Animated.Value(isActive ? 1 : 0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: isActive ? 1.1 : 0.95,
                useNativeDriver: true,
                speed: 20,
                bounciness: 8,
            }),
            Animated.timing(glowOpacity, {
                toValue: isActive ? 1 : 0,
                duration: 250,
                useNativeDriver: true,
            }),
        ]).start();
    }, [isActive, scaleAnim, glowOpacity]);

    return (
        <TouchableOpacity
            style={styles.tab}
            onPress={onPress}
            activeOpacity={0.7}>
            {/* Active glow background */}
            <Animated.View style={[styles.activeGlow, { opacity: glowOpacity }]} />
            <Animated.View style={{ transform: [{ scale: scaleAnim }], alignItems: 'center' }}>
                <Text style={[styles.icon, isActive && styles.iconActive]}>
                    {tab.icon}
                </Text>
            </Animated.View>
            <Text style={[styles.label, isActive && styles.labelActive]}>
                {tab.label}
            </Text>
            {isActive && (
                <View style={styles.indicator} />
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        overflow: 'hidden',
    },
    glassBackground: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: Colors.surface,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.06)',
    },
    tabRow: {
        flexDirection: 'row',
        paddingBottom: Spacing.md,
        paddingTop: Spacing.sm,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Spacing.sm,
        position: 'relative',
    },
    activeGlow: {
        position: 'absolute',
        top: 0,
        left: '20%',
        right: '20%',
        height: 32,
        backgroundColor: Colors.accentGlow,
        borderRadius: 16,
    },
    icon: {
        fontSize: 22,
        marginBottom: 3,
        opacity: 0.4,
    },
    iconActive: {
        opacity: 1,
    },
    label: {
        fontSize: FontSize.xs,
        color: Colors.textMuted,
        letterSpacing: 0.2,
    },
    labelActive: {
        color: Colors.accent,
        fontWeight: '700',
    },
    indicator: {
        position: 'absolute',
        top: -1,
        width: 28,
        height: 3,
        borderRadius: 1.5,
        backgroundColor: Colors.accent,
        ...Shadows.glow,
    },
});
