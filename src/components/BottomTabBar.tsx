import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import { Colors, Gradients, FontSize, FontWeight, Spacing, Shadows, BorderRadius } from '../theme';

interface Tab {
    key: string;
    label: string;
    icon: string; // Feather icon name
}

interface BottomTabBarProps {
    tabs: Tab[];
    activeTab: string;
    onTabPress: (key: string) => void;
}

export default function BottomTabBar({ tabs, activeTab, onTabPress }: BottomTabBarProps) {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['rgba(5, 8, 15, 0.95)', 'rgba(5, 8, 15, 1)']}
                style={styles.gradient}
            />
            <View style={styles.topBorder} />
            <View style={styles.tabRow}>
                {tabs.map(tab => (
                    <TabItem
                        key={tab.key}
                        tab={tab}
                        isActive={tab.key === activeTab}
                        onPress={() => onTabPress(tab.key)}
                    />
                ))}
            </View>
        </View>
    );
}

function TabItem({ tab, isActive, onPress }: { tab: Tab; isActive: boolean; onPress: () => void }) {
    const scaleAnim = useRef(new Animated.Value(isActive ? 1.15 : 1)).current;
    const translateY = useRef(new Animated.Value(isActive ? -2 : 0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: isActive ? 1.15 : 1,
                useNativeDriver: true,
                speed: 18,
                bounciness: 12,
            }),
            Animated.spring(translateY, {
                toValue: isActive ? -2 : 0,
                useNativeDriver: true,
                speed: 18,
                bounciness: 8,
            }),
        ]).start();
    }, [isActive, scaleAnim, translateY]);

    return (
        <TouchableOpacity
            style={styles.tab}
            onPress={onPress}
            activeOpacity={0.7}>
            {isActive && <View style={styles.activeGlow} />}
            <Animated.View style={{
                transform: [{ scale: scaleAnim }, { translateY }],
                alignItems: 'center',
            }}>
                <Feather
                    name={tab.icon}
                    size={22}
                    color={isActive ? Colors.accent : Colors.textMuted}
                />
            </Animated.View>
            <Text style={[styles.label, isActive && styles.labelActive]}>
                {tab.label}
            </Text>
            {isActive && (
                <View style={styles.indicator}>
                    <LinearGradient
                        colors={[...Gradients.primary]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.indicatorGradient}
                    />
                </View>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    topBorder: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.04)',
    },
    tabRow: {
        flexDirection: 'row',
        paddingBottom: Spacing.md + 2,
        paddingTop: Spacing.sm + 2,
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
        top: 4,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.accentGlow,
    },
    label: {
        fontSize: FontSize.xs,
        color: Colors.textMuted,
        marginTop: 4,
        letterSpacing: 0.3,
        fontWeight: FontWeight.medium,
    },
    labelActive: {
        color: Colors.accent,
        fontWeight: FontWeight.bold,
    },
    indicator: {
        position: 'absolute',
        top: -1,
        width: 24,
        height: 3,
        borderRadius: 1.5,
        overflow: 'hidden',
    },
    indicatorGradient: {
        flex: 1,
        borderRadius: 1.5,
    },
});
