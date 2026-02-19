import React, { useRef } from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ViewStyle,
    TextStyle,
    ActivityIndicator,
    Animated,
    View,
} from 'react-native';
import { Colors, BorderRadius, FontSize, FontWeight, Spacing, Shadows } from '../theme';

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
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.96,
            useNativeDriver: true,
            speed: 50,
            bounciness: 4,
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
        <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, variant === 'primary' && styles.primaryGlow]}>
            <TouchableOpacity
                style={buttonStyles}
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                disabled={disabled || loading}
                activeOpacity={1}>
                {variant === 'primary' && (
                    <View style={styles.primaryShine} />
                )}
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
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    base: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: BorderRadius.lg,
        overflow: 'hidden',
    },
    primary: {
        backgroundColor: Colors.accent,
    },
    primaryGlow: {
        ...Shadows.glow,
        borderRadius: BorderRadius.lg,
    },
    primaryShine: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderTopLeftRadius: BorderRadius.lg,
        borderTopRightRadius: BorderRadius.lg,
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
        borderColor: 'rgba(248, 113, 113, 0.3)',
    },
    size_sm: {
        paddingVertical: Spacing.sm + 2,
        paddingHorizontal: Spacing.lg,
    },
    size_md: {
        paddingVertical: Spacing.md + 2,
        paddingHorizontal: Spacing.xl,
    },
    size_lg: {
        paddingVertical: Spacing.lg + 2,
        paddingHorizontal: Spacing.xxl,
    },
    disabled: {
        opacity: 0.4,
    },
    label: {
        fontWeight: FontWeight.semibold,
        letterSpacing: 0.3,
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
