
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
} from "react-native";

import { useTheme } from "theme/useTheme";
import { useFormField } from "./FormContext";

export default function Input({
    name,
    value,
    onChangeText,
    placeholder,

    label,
    required = false,
    requiredMessage = "Este campo es obligatorio.",

    disabled = false,

    iconLeft: IconLeft,
    iconRight: IconRight,
    onIconRightPress,

    secureTextEntry = false,
    keyboardType = "default",
    autoCapitalize = "none",
    autoCorrect = false,

    height = "md",
    radius = "md",

    editable = true,
    style,
    inputStyle,

    regex,
    regexMessage = "El formato no es válido.",

    transformFunction,

    ...props
}) {
    const { theme } = useTheme();

    const {
        value: formValue,
        onChangeText: setFormValue,
        error: formError,
    } = useFormField({
        name,
        required,
        requiredMessage,
        regex,
        regexMessage,
    });

    const currentValue = value ?? formValue ?? "";
    const handleChangeText = onChangeText ?? setFormValue;

    const heights = {
        "sm": 55,
        "md": 64,
        "lg": 75
    }


    const handleTextChange = (text) => {
        const transformedValue = transformFunction
            ? transformFunction(text)
            : text;

        handleChangeText(transformedValue);
    };

    // El campo queda bloqueado si disabled o editable=false.
    const isEditable = editable && !disabled;

    const [localError, setLocalError] = useState(null);

    useEffect(() => {
        // La validación del formulario tiene prioridad.
        if (formError !== undefined) {
            setLocalError(null);
            return;
        }

        if (!regex || !currentValue) {
            setLocalError(null);
            return;
        }

        regex.lastIndex = 0;
        const valid = regex.test(String(currentValue));
        regex.lastIndex = 0;

        setLocalError(valid ? null : regexMessage);
    }, [currentValue, regex, regexMessage, formError]);

    const validationMessage = formError ?? localError;
    const showregexMessage = Boolean(validationMessage);

    const styles = StyleSheet.create({
        wrapper: {
            width: "100%",
        },

        label: {
            marginBottom: 6,
            fontSize: theme.text.baseSize,
            color: theme.colors.text.text,
        },

        required: {
            color: theme.colors.error,
        },

        container: {
            height: heights[height] ?? heights["md"],
            borderWidth: theme.thicknesses.xs,
            borderColor: theme.colors.border,
            borderRadius: theme.radius[radius] ?? theme.radius["md"],
            backgroundColor: theme.colors.surface,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            opacity: isEditable ? 1 : 0.6,
        },

        containerregexMessage: {
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

        regexMessage: {
            marginTop: 6,
            marginLeft: 4,
            fontSize: theme.text.smallSize,
            color: theme.colors.error,
        },
    });

    return (
        <View style={[styles.wrapper, style]}>
            {label ? (
                <Text style={styles.label}>
                    {label}
                    {required && (
                        <Text style={styles.required}> *</Text>
                    )}
                </Text>
            ) : null}

            <View
                style={[
                    styles.container,
                    showregexMessage && styles.containerregexMessage,
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
                    value={currentValue}
                    onChangeText={handleTextChange}
                    placeholder={placeholder}
                    placeholderTextColor="#9AA9BA"
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    autoCorrect={autoCorrect}
                    editable={isEditable}
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
                        disabled={!onIconRightPress || !isEditable}
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

            {showregexMessage && (
                <Text style={styles.regexMessage}>
                    {validationMessage}
                </Text>
            )}
        </View>
    );
}
