import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
} from "react-native";
import { useTheme } from "../../theme/useTheme";

export default function Input({
    value,
    onChangeText,
    placeholder,

    iconLeft: IconLeft,
    iconRight: IconRight,
    onIconRightPress,

    secureTextEntry = false,
    keyboardType = "default",
    autoCapitalize = "none",
    autoCorrect = false,

    editable = true,
    style,
    inputStyle,

    regex,
    warning = "El formato no es válido.",

    ...props
}) {
    const [isValid, setIsValid] = useState(true);
    const { theme } = useTheme();

    useEffect(() => {
        // Si no se proporcionó regex, no validar
        if (!regex) {
            setIsValid(true);
            return;
        }

        // No mostrar error mientras esté vacío
        if (!value) {
            setIsValid(true);
            return;
        }

        setIsValid(regex.test(value));
    }, [value, regex]);

    const showWarning = regex && value && !isValid;

    const styles = StyleSheet.create({
        wrapper: {
            width: "100%",
        },

        container: {
            height: 64,

            borderWidth: theme.thicknesses.xs,
            borderColor: theme.colors.input.border,
            borderRadius: theme.radius.md,
            backgroundColor: theme.colors.input.background,

            flexDirection: "row",
            alignItems: "center",

            paddingHorizontal: 16,
        },

        containerWarning: {
            borderColor: theme.colors.error,
        },

        leftIcon: {
            marginRight: 14,
        },

        input: {
            flex: 1,
            height: "100%",

            fontSize: theme.text.baseSize,
            color: theme.colors.text.text,

            paddingVertical: 0,
            paddingHorizontal: 0,
        },

        inputWithLeftIcon: {},

        inputWithRightIcon: {
            paddingRight: 8,
        },

        rightButton: {
            width: 40,
            height: 40,

            alignItems: "center",
            justifyContent: "center",

            marginLeft: 8,
        },

        warning: {
            marginTop: 6,
            marginLeft: 4,

            fontSize: theme.text.smallSize,
            color: theme.colors.error
        },
    });

    return (
        <View style={[styles.wrapper, style]}>

            <View
                style={[
                    styles.container,
                    showWarning && styles.containerWarning,
                ]}
            >
                {IconLeft && (
                    <IconLeft
                        size={24}
                        color="#53677D"
                        strokeWidth={2}
                        style={styles.leftIcon}
                    />
                )}

                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor="#9AA9BA"

                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    autoCorrect={autoCorrect}

                    editable={editable}

                    style={[
                        styles.input,
                        IconLeft && styles.inputWithLeftIcon,
                        IconRight && styles.inputWithRightIcon,
                        inputStyle,
                    ]}

                    {...props}
                />

                {IconRight && (
                    <Pressable
                        onPress={onIconRightPress}
                        disabled={!onIconRightPress}
                        style={styles.rightButton}
                        hitSlop={8}
                    >
                        <IconRight
                            size={24}
                            color="#53677D"
                            strokeWidth={2}
                        />
                    </Pressable>
                )}
            </View>

            {showWarning && (
                <Text style={styles.warning}>
                    {warning}
                </Text>
            )}

        </View>
    );
}

