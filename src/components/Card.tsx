import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, ViewStyle, Animated } from 'react-native';
import { Colors, BorderRadius, Spacing, Shadows } from '../theme';

interface CardProps {
    children: React.ReactNode;
    style?: ViewStyle;
    variant?: 'default' | 'highlight' | 'accent' | 'glass';
    animated?: boolean;
    delay?: number;
}

export default function Card({ children, style, variant = 'default', animated = true, delay = 0 }: CardProps) {
    const fadeAnim = useRef(new Animated.Value(animated ? 0 : 1)).current;
    const translateY = useRef(new Animated.Value(animated ? 16 : 0)).current;

    useEffect(() => {
        if (animated) {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 500,
                    delay,
                    useNativeDriver: true,
                }),
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 500,
                    delay,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [animated, delay, fadeAnim, translateY]);

    return (
        <Animated.View
            style={[
                styles.card,
                variant === 'highlight' && styles.highlight,
                variant === 'accent' && styles.accent,
                variant === 'glass' && styles.glass,
                {
                    opacity: fadeAnim,
                    transform: [{ translateY }],
                },
                style,
            ]}>
            {/* Top shine effect */}
            {variant !== 'glass' && <View style={styles.shine} />}
            {children}
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.xl,
        padding: Spacing.lg + 2,
        borderWidth: 1,
        borderColor: Colors.border,
        overflow: 'hidden',
        ...Shadows.sm,
    },
    shine: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
    },
    highlight: {
        backgroundColor: Colors.surfaceLight,
        borderColor: 'rgba(255, 255, 255, 0.08)',
    },
    accent: {
        backgroundColor: Colors.surfaceLight,
        borderColor: Colors.borderAccent,
        borderWidth: 1.5,
        ...Shadows.glow,
    },
    glass: {
        backgroundColor: Colors.surfaceGlass,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
});
