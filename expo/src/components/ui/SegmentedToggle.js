
import React from "react";
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
} from "react-native";
import { useTheme } from "theme/useTheme";

const IconLabelToggle = ({
    options = [],
    selectedValue,
    onValueChange,
    style,
    iconSize = 20,
    iconStrokeWidth = 2,
    disabled = false,

}) => {
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "flex-start",
            backgroundColor: theme.colors.background || "#F5F7FA",
            borderRadius: theme.radius.md ?? 12,
            padding: 4,
            borderWidth: theme.thicknesses?.sm ?? 1,
            borderColor: theme.colors.border || "#E2E8F0",
        },
        option: {
            minHeight: 40,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: theme.spacing.md ?? 12,
            paddingVertical: theme.spacing.xs ?? 4,
            borderRadius: theme.radius.sm ?? 8,
        },
        selectedOption: {
            backgroundColor:
                `${theme.colors.primary}25` || "#E0E7FF",
        },
        label: {
            color: theme.colors.primary || "#3B82F6",
            fontSize: theme.text?.baseSize ?? 14,
            fontWeight: "600",
        },
        iconContainer: {
            alignItems: "center",
            justifyContent: "center",
        },
        disabledOption: {
            opacity: 0.5,
        },

    });

    return (
        <View style={[styles.container, style]}>
            {options.map((option) => {
                const isSelected = selectedValue === option.value;
                const Icon = option.icon;

                const iconColor = isSelected
                    ? theme.colors.primary || "#3B82F6"
                    : theme.colors.text?.secondary || "#64748B";

                return (

                    <TouchableOpacity
                        key={option.value}
                        disabled={disabled}
                        onPress={() => {
                            if (selectedValue !== option.value) {
                                onValueChange?.(option.value);
                            }
                        }}
                        activeOpacity={0.7}
                        accessibilityRole="radio"
                        accessibilityState={{
                            selected: isSelected,
                            disabled,
                        }}
                        accessibilityLabel={option.label}
                        style={[
                            styles.option,
                            isSelected && styles.selectedOption,
                            disabled && styles.disabledOption,
                        ]}
                    >

                        {isSelected ? (
                            <Text style={styles.label}>
                                {option.label}
                            </Text>
                        ) : (
                            <View style={styles.iconContainer}>
                                {Icon && (
                                    <Icon
                                        size={iconSize}
                                        strokeWidth={iconStrokeWidth}
                                        color={iconColor}
                                    />
                                )}
                            </View>
                        )}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default IconLabelToggle;
