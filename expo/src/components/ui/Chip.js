import React from "react";
import {
    TouchableOpacity,
    Text,
    View,
    StyleSheet
} from "react-native";

import { useTheme } from "theme/useTheme";
import { useRouter } from "expo-router";


const Chip = ({
    children,
    variant = "primary",

    color,

    disabled = false,
    radius = "full",

    style,
    textStyle,
}) => {
    const { theme } = useTheme();

    const isPrimary = variant === "primary";
    const isSecondary = variant === "secondary";

    const iconColor =
        isPrimary
            ? theme.colors.text.button
            : theme.colors.primary;

    const baseColor = color ?? theme.colors.primary;


    const renderIcon = (IconComponent) => {
        if (!IconComponent) {
            return null;
        }

        return (
            <IconComponent
                size={iconSize}
                strokeWidth={iconStrokeWidth}
                color={iconColor}
            />
        );
    };

    const outlineWidth = {
        primary: theme.thicknesses.none,
        ghost: theme.thicknesses.none
    }

    const styles = StyleSheet.create({
        chip: {
            alignSelf: "flex-start",

            paddingHorizontal: theme.spacing.md,
            paddingVertical: theme.spacing.xs,

            borderRadius: theme.radius[radius] ?? theme.radius.full,

            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",

            backgroundColor: isSecondary
                ? "transparent"
                : `${baseColor}40`,

            outlineWidth: isSecondary
                ? theme.thicknesses.sm
                : theme.thicknesses.none,

            outlineColor: `${baseColor}`,

            outlineStyle: "solid",

            opacity: disabled ? 0.5 : 1
        },

        icon: {
            alignItems: "center",
            justifyContent: "center"
        },

        iconLeft: {
            marginRight: theme.spacing.sm,
        },

        iconRight: {
            marginLeft: theme.spacing.sm,
        },

        text: {
            color: baseColor,
            fontSize: theme.text.smallSize,
            fontWeight: "700"
        }
    });


    return (
        <View
            disabled={disabled}
            activeOpacity={0.7}
            style={[styles.chip, style]}
        >

            <Text style={[styles.text, textStyle]}>
                {children}
            </Text>

        </View>
    );
};


export default Chip;