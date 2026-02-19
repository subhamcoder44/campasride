import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors, BorderRadius, Spacing } from '../theme';

interface CardProps {
    children: ReactNode;
    style?: ViewStyle;
    variant?: 'default' | 'highlight' | 'accent';
}

export default function Card({ children, style, variant = 'default' }: CardProps) {
    return (
        <View style={[styles.card, variant === 'highlight' && styles.highlight, variant === 'accent' && styles.accent, style]}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.lg,
        padding: Spacing.lg,
        borderWidth: 1,
        borderColor: Colors.borderLight,
    },
    highlight: {
        backgroundColor: Colors.surfaceLight,
        borderColor: Colors.border,
    },
    accent: {
        backgroundColor: Colors.surfaceLight,
        borderColor: Colors.accent,
        borderWidth: 1,
    },
});
