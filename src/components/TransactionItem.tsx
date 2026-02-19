import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius } from '../theme';

interface TransactionItemProps {
    title: string;
    date: string;
    amount: string;
    type: 'credit' | 'debit';
}

export default function TransactionItem({
    title,
    date,
    amount,
    type,
}: TransactionItemProps) {
    return (
        <View style={styles.container}>
            <View style={[
                styles.iconContainer,
                type === 'credit' ? styles.iconCredit : styles.iconDebit,
            ]}>
                <Text style={[
                    styles.icon,
                    type === 'credit' ? styles.iconTextCredit : styles.iconTextDebit,
                ]}>
                    {type === 'credit' ? '↓' : '↑'}
                </Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.date}>{date}</Text>
            </View>
            <View style={styles.amountContainer}>
                <Text style={[styles.amount, type === 'credit' ? styles.credit : styles.debit]}>
                    {type === 'credit' ? '+' : '-'} {amount}
                </Text>
                <View style={[
                    styles.amountDot,
                    type === 'credit' ? styles.amountDotCredit : styles.amountDotDebit,
                ]} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Spacing.md + 2,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.md,
    },
    iconCredit: {
        backgroundColor: Colors.successLight,
    },
    iconDebit: {
        backgroundColor: Colors.errorLight,
    },
    icon: {
        fontSize: FontSize.lg,
    },
    iconTextCredit: {
        color: Colors.success,
    },
    iconTextDebit: {
        color: Colors.error,
    },
    info: {
        flex: 1,
    },
    title: {
        color: Colors.textPrimary,
        fontSize: FontSize.md,
        fontWeight: FontWeight.medium,
    },
    date: {
        color: Colors.textMuted,
        fontSize: FontSize.xs,
        marginTop: 3,
    },
    amountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
    },
    amount: {
        fontSize: FontSize.md,
        fontWeight: FontWeight.bold,
    },
    credit: {
        color: Colors.success,
    },
    debit: {
        color: Colors.error,
    },
    amountDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    amountDotCredit: {
        backgroundColor: Colors.success,
    },
    amountDotDebit: {
        backgroundColor: Colors.error,
    },
});
