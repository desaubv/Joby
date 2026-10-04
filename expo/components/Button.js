import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../theme/useTheme';

const Button = ({ children, onPress }) => {

    const { theme } = useTheme();

    const styles = StyleSheet.create({
        button: {
            alignItems: "center",
            justifyContent: "center",

            backgroundColor: theme.colors.primary,

            borderRadius: theme.radius.md,

            paddingHorizontal: theme.spacing.sm,
            paddingVertical: theme.spacing.sm,
        },

        textButton: {
            textAlign: "center",
            color: theme.colors.buttonText,
        }
    });

    return (
        <TouchableOpacity
            onPress={onPress ? onPress : () => { }}
            style={styles.button}
        >
            <Text
                style={styles.textButton}
            >
                {children}
            </Text>
        </TouchableOpacity>
    );
};

export default Button;