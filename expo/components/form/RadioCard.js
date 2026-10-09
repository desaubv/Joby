import React from "react";
import {
    TouchableOpacity,
    Text,
    View,
    StyleSheet
} from "react-native";

import { useTheme } from "../../theme/useTheme";

const RadioCard = ({
    value,
    selected = false,
    onPress,

    icon,

    title,
    description,

    iconSize = 28,
    iconStrokeWidth = 2,

    disabled = false,

    style,
    titleStyle,
    descriptionStyle
}) => {

    const { theme } = useTheme();


    const handlePress = () => {
        if (disabled) {
            return;
        }

        if (onPress) {
            onPress(value);
        }
    };


    const iconColor = selected
        ? theme.colors.primary
        : theme.colors.text.secondary;


    const styles = StyleSheet.create({

        card: {
            width: "100%",

            padding: theme.spacing.md,

            borderRadius: theme.radius.md,

            flexDirection: "row",
            alignItems: "center",

            backgroundColor: theme.colors.surface,

            borderWidth: theme.thicknesses.sm,
            borderColor: selected
                ? theme.colors.primary
                : theme.colors.input.border,

            opacity: disabled ? 0.5 : 1
        },

        iconContainer: {
            width: 48,
            height: 48,

            alignItems: "center",
            justifyContent: "center",

            marginRight: theme.spacing.md
        },

        content: {
            flex: 1
        },

        title: {
            color: theme.colors.text.primary,

            fontSize: theme.text.baseSize,
            fontWeight: "600",

            marginBottom: theme.spacing.xs
        },

        description: {
            color: theme.colors.text.secondary,

            fontSize: theme.text.baseSize,
            lineHeight: theme.text.baseSize * 1.4
        },

        radio: {
            width: 22,
            height: 22,

            borderRadius: theme.radius.md,

            borderWidth: theme.thicknesses.sm,
            borderColor: selected
                ? theme.colors.primary
                : theme.colors.input.border,

            alignItems: "center",
            justifyContent: "center",

            marginLeft: theme.spacing.md
        },

        radioSelected: {
            width: 10,
            height: 10,

            borderRadius: 5,

            backgroundColor: theme.colors.primary
        }
    });


    const renderIcon = () => {
        if (!icon) {
            return null;
        }

        const IconComponent = icon;

        return (
            <IconComponent
                size={iconSize}
                strokeWidth={iconStrokeWidth}
                color={iconColor}
            />
        );
    };


    return (
        <TouchableOpacity
            onPress={handlePress}
            disabled={disabled}
            activeOpacity={0.7}
            style={[
                styles.card,
                style
            ]}
            accessibilityRole="radio"
            accessibilityState={{
                selected,
                disabled
            }}
        >

            <View style={styles.iconContainer}>
                {renderIcon()}
            </View>


            <View style={styles.content}>

                <Text
                    style={[
                        styles.title,
                        titleStyle
                    ]}
                >
                    {title}
                </Text>

                {description && (
                    <Text
                        style={[
                            styles.description,
                            descriptionStyle
                        ]}
                    >
                        {description}
                    </Text>
                )}

            </View>


            <View style={styles.radio}>
                {selected && (
                    <View style={styles.radioSelected} />
                )}
            </View>

        </TouchableOpacity>
    );
};


export default RadioCard;