import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontSize, FontWeight, Spacing } from '../theme';

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
            <View style={styles.iconContainer}>
                <Text style={styles.icon}>{type === 'credit' ? '↓' : '↑'}</Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.date}>{date}</Text>
            </View>
            <Text style={[styles.amount, type === 'credit' ? styles.credit : styles.debit]}>
                {type === 'credit' ? '+' : '-'} {amount}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderLight,
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: Colors.surfaceHighlight,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.md,
    },
    icon: {
        fontSize: FontSize.lg,
        color: Colors.textSecondary,
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
        color: Colors.textSecondary,
        fontSize: FontSize.xs,
        marginTop: 2,
    },
    amount: {
        fontSize: FontSize.md,
        fontWeight: FontWeight.semibold,
    },
    credit: {
        color: Colors.success,
    },
    debit: {
        color: Colors.error,
    },
});
