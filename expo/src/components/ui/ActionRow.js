import React from "react";
import {
    TouchableOpacity,
    Text,
    View,
    StyleSheet
} from "react-native";

import { useTheme } from "theme/useTheme";
import { useRouter } from "expo-router";
import { ChevronRight } from "lucide-react-native";


const ActionRow = ({
    children,
    href,
    onPress,

    iconLeft,
    iconRight = ChevronRight,

    width,
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

    const iconColor = theme.colors.primary;


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
            width: width ?? "100%",
            paddingVertical: theme.spacing.sm,

            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",

            backgroundColor: "transparent",

            outlineWidth: theme.thicknesses.none,

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

            <View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: 5,
            }}>
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
            </View>

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

        </TouchableOpacity>
    );
};


export default ActionRow;