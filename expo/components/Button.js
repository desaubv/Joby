import React from "react";
import {
    TouchableOpacity,
    Text,
    View,
    StyleSheet
} from "react-native";

import { useTheme } from "../theme/useTheme";
import { useRouter } from "expo-router";


const Button = ({
    children,
    href,
    onPress,

    variant = "primary",
    
    iconLeft,
    iconRight,
    icon,
    
    iconSize = 20,
    iconStrokeWidth = 2,
    
    disabled = false,

    style,
    textStyle
}) => {

    const { theme } = useTheme();

    const router = useRouter();

    const handlePress = async () => {
        if (disabled) {
            return;
        }

        if (href) {
            if (
                href.startsWith("http://") ||
                href.startsWith("https://")
            ) {
                await Linking.openURL(href);
            } else {
                router.push(href);
            }

            return;
        }

        if (onPress) {
            onPress();
        }
    };

    const isIconOnly = icon && !children;

    const isPrimary = variant === "primary";
    const isSecondary = variant === "secondary";
    const isGhost = variant === "ghost";

    const iconColor =
        isPrimary
            ? theme.colors.text.button
            : theme.colors.primary;


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


    const styles = StyleSheet.create({
        button: {
            minHeight: 48,

            paddingHorizontal: isIconOnly
                ? theme.spacing.md
                : theme.spacing.lg,

            paddingVertical: theme.spacing.sm,

            borderRadius: theme.radius.sm + 3,

            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",

            backgroundColor:
                isPrimary
                    ? theme.colors.primary
                    : "transparent",

            outlineWidth:
                isGhost
                    ? theme.thicknesses.none
                    : theme.thicknesses.sm,

            outlineColor:
                theme.colors.primary,

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
            color: iconColor,

            fontSize: theme.text.baseSize,
            fontWeight: "600"
        }
    });


    return (
        <TouchableOpacity
            onPress={handlePress}
            disabled={disabled}
            activeOpacity={0.7}
            style={[styles.button, style]}
        >

            {isIconOnly ? (

                <View style={styles.icon}>
                    {renderIcon(icon)}
                </View>

            ) : (

                <>
                    {iconLeft && (
                        <View
                            style={[
                                styles.icon,
                                styles.iconLeft
                            ]}
                        >
                            {renderIcon(iconLeft)}
                        </View>
                    )}

                    {children && (
                        <Text style={[styles.text, textStyle]}>
                            {children}
                        </Text>
                    )}

                    {iconRight && (
                        <View
                            style={[
                                styles.icon,
                                styles.iconRight
                            ]}
                        >
                            {renderIcon(iconRight)}
                        </View>
                    )}
                </>

            )}

        </TouchableOpacity>
    );
};


export default Button;