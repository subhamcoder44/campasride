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
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Gradients, BorderRadius, FontSize, FontWeight, Spacing, Shadows } from '../theme';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    icon?: React.ReactNode;
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
            toValue: 0.95,
            useNativeDriver: true,
            speed: 50,
            bounciness: 4,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
            speed: 18,
            bounciness: 10,
        }).start();
    };

    const sizeStyle = styles[`size_${size}`];
    const labelSize = styles[`label_${size}`];

    if (variant === 'primary') {
        return (
            <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, styles.primaryGlow, style]}>
                <TouchableOpacity
                    onPress={onPress}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    disabled={disabled || loading}
                    activeOpacity={1}>
                    <LinearGradient
                        colors={disabled ? [Colors.surfaceHighlight, Colors.surfaceHighlight] : [...Gradients.primary]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={[styles.base, sizeStyle, disabled && styles.disabled]}>
                        <View style={styles.shine} />
                        {loading ? (
                            <ActivityIndicator color={Colors.white} size="small" />
                        ) : (
                            <View style={styles.content}>
                                {icon}
                                <Text style={[styles.label, styles.label_primary, labelSize, textStyle]}>
                                    {title}
                                </Text>
                            </View>
                        )}
                    </LinearGradient>
                </TouchableOpacity>
            </Animated.View>
        );
    }

    return (
        <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, style]}>
            <TouchableOpacity
                style={[
                    styles.base,
                    styles[variant],
                    sizeStyle,
                    disabled && styles.disabled,
                ]}
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                disabled={disabled || loading}
                activeOpacity={1}>
                {loading ? (
                    <ActivityIndicator
                        color={variant === 'danger' ? Colors.error : Colors.accent}
                        size="small"
                    />
                ) : (
                    <View style={styles.content}>
                        {icon}
                        <Text style={[styles.label, styles[`label_${variant}`], labelSize, textStyle]}>
                            {title}
                        </Text>
                    </View>
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
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
    },
    primaryGlow: {
        borderRadius: BorderRadius.lg,
        ...Shadows.glow,
    },
    shine: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '45%',
        backgroundColor: 'rgba(255, 255, 255, 0.07)',
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
        borderColor: 'rgba(255, 82, 82, 0.25)',
    },
    size_sm: {
        paddingVertical: Spacing.sm + 4,
        paddingHorizontal: Spacing.lg,
    },
    size_md: {
        paddingVertical: Spacing.md + 4,
        paddingHorizontal: Spacing.xl,
    },
    size_lg: {
        paddingVertical: Spacing.lg + 4,
        paddingHorizontal: Spacing.xxl,
    },
    disabled: {
        opacity: 0.35,
    },
    label: {
        fontWeight: FontWeight.semibold,
        letterSpacing: 0.4,
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
});
