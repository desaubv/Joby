import React from "react";
import {
    View,
    Text,
    Pressable,
    StyleSheet,
} from "react-native";
import { Check } from "lucide-react-native";

export default function Checkbox({
    label,
    value = false,
    onValueChange,
    disabled = false,
    style,
    labelStyle,
}) {
    const handlePress = () => {
        if (!disabled) {
            onValueChange?.(!value);
        }
    };

    return (
        <Pressable
            onPress={handlePress}
            disabled={disabled}
            style={[
                styles.container,
                disabled && styles.disabled,
                style,
            ]}
        >
            <Text style={[styles.label, labelStyle]}>
                {label}
            </Text>

            <View
                style={[
                    styles.checkbox,
                    value && styles.checked,
                ]}
            >
                {value && (
                    <Check
                        size={18}
                        color="#FFFFFF"
                        strokeWidth={3}
                    />
                )}
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        minHeight: 48,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        paddingVertical: 8,
    },

    label: {
        flex: 1,
        fontSize: 16,
        color: "#26384A",

        marginRight: 16,
    },

    checkbox: {
        width: 24,
        height: 24,

        borderWidth: 2,
        borderColor: "#53677D",
        borderRadius: 6,

        alignItems: "center",
        justifyContent: "center",

        backgroundColor: "#FFFFFF",
    },

    checked: {
        backgroundColor: "#53677D",
        borderColor: "#53677D",
    },

    disabled: {
        opacity: 0.5,
    },
});