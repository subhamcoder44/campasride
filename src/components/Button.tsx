import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ViewStyle,
    TextStyle,
    ActivityIndicator,
} from 'react-native';
import { Colors, BorderRadius, FontSize, FontWeight, Spacing } from '../theme';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    icon?: string;
}

export default function Button({
    title,
    onPress,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    style,
    textStyle,
    icon,
}: ButtonProps) {
    const buttonStyles = [
        styles.base,
        styles[variant],
        styles[`size_${size}`],
        disabled && styles.disabled,
        style,
    ];

    const labelStyles = [
        styles.label,
        styles[`label_${variant}`],
        styles[`label_${size}`],
        disabled && styles.labelDisabled,
        textStyle,
    ];

    return (
        <TouchableOpacity
            style={buttonStyles}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}>
            {loading ? (
                <ActivityIndicator
                    color={variant === 'primary' ? Colors.white : Colors.accent}
                    size="small"
                />
            ) : (
                <>
                    {icon && <Text style={[styles.icon, styles[`label_${variant}`]]}>{icon} </Text>}
                    <Text style={labelStyles}>{title}</Text>
                </>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    base: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: BorderRadius.md,
    },
    primary: {
        backgroundColor: Colors.accent,
    },
    secondary: {
        backgroundColor: Colors.surfaceLight,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    ghost: {
        backgroundColor: Colors.transparent,
    },
    danger: {
        backgroundColor: Colors.errorLight,
        borderWidth: 1,
        borderColor: Colors.error,
    },
    size_sm: {
        paddingVertical: Spacing.sm,
        paddingHorizontal: Spacing.lg,
    },
    size_md: {
        paddingVertical: Spacing.md + 2,
        paddingHorizontal: Spacing.xl,
    },
    size_lg: {
        paddingVertical: Spacing.lg,
        paddingHorizontal: Spacing.xxl,
    },
    disabled: {
        opacity: 0.5,
    },
    label: {
        fontWeight: FontWeight.semibold,
    },
    label_primary: {
        color: Colors.white,
    },
    label_secondary: {
        color: Colors.textPrimary,
    },
    label_ghost: {
        color: Colors.accent,
    },
    label_danger: {
        color: Colors.error,
    },
    label_sm: {
        fontSize: FontSize.sm,
    },
    label_md: {
        fontSize: FontSize.md,
    },
    label_lg: {
        fontSize: FontSize.lg,
    },
    labelDisabled: {
        opacity: 0.7,
    },
    icon: {
        fontSize: FontSize.md,
    },
});
