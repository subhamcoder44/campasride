import React, { useRef, useEffect } from 'react';
import { StyleSheet, ViewStyle, Animated, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Gradients, BorderRadius, Spacing, Shadows } from '../theme';

interface CardProps {
    children: React.ReactNode;
    style?: ViewStyle;
    variant?: 'default' | 'highlight' | 'accent' | 'glass' | 'gradient';
    animated?: boolean;
    delay?: number;
}

export default function Card({
    children,
    style,
    variant = 'default',
    animated = true,
    delay = 0,
}: CardProps) {
    const fadeAnim = useRef(new Animated.Value(animated ? 0 : 1)).current;
    const translateY = useRef(new Animated.Value(animated ? 20 : 0)).current;

    useEffect(() => {
        if (animated) {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 600,
                    delay,
                    useNativeDriver: true,
                }),
                Animated.spring(translateY, {
                    toValue: 0,
                    delay,
                    useNativeDriver: true,
                    speed: 10,
                    bounciness: 4,
                }),
            ]).start();
        }
    }, [animated, delay, fadeAnim, translateY]);

    const animatedStyle = {
        opacity: fadeAnim,
        transform: [{ translateY }],
    };

    if (variant === 'gradient') {
        return (
            <Animated.View style={[animatedStyle, style]}>
                <LinearGradient
                    colors={[...Gradients.card]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[styles.card, styles.gradient]}>
                    <View style={styles.shine} />
                    {children}
                </LinearGradient>
            </Animated.View>
        );
    }

    return (
        <Animated.View
            style={[
                styles.card,
                variant === 'highlight' && styles.highlight,
                variant === 'accent' && styles.accent,
                variant === 'glass' && styles.glass,
                animatedStyle,
                style,
            ]}>
            <View style={styles.shine} />
            {children}
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.xl,
        padding: Spacing.lg + 4,
        borderWidth: 1,
        borderColor: Colors.border,
        overflow: 'hidden',
    },
    shine: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
    highlight: {
        backgroundColor: Colors.surfaceLight,
        borderColor: 'rgba(255, 255, 255, 0.06)',
    },
    accent: {
        backgroundColor: Colors.surfaceLight,
        borderColor: Colors.borderAccent,
        borderWidth: 1.5,
    },
    glass: {
        backgroundColor: Colors.surfaceGlass,
        borderColor: 'rgba(255, 255, 255, 0.08)',
    },
    gradient: {
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.06)',
    },
});
