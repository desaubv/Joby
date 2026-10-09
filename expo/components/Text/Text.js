import React from "react";
import { Text as RNText, StyleSheet } from "react-native";
import { useTheme } from "../../theme/useTheme";

const Text = ({
    children,
    variant = "primary",
    style,
    numberOfLines,
    ellipsizeMode="tail",
    ...props
}) => {
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        text: {
            color: variant === "secondary"
                ? theme.colors.text.secondary
                : theme.colors.text.text,
            fontSize: theme.text.baseSize,
        },
    });

    return (
        <RNText
            style={[styles.text, style]}
            numberOfLines={numberOfLines}
            ellipsizeMode={ellipsizeMode}
            {...props}
        >
            {children}
        </RNText>
    );
};

export default Text;