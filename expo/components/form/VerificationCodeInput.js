
import React, {
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
} from "react-native";

import { useTheme } from "../../theme/useTheme";
import { useFormField } from "./FormContext";

export default function VerificationCodeInput({
    name,
    value,
    onChangeText,

    length = 6,
    mode = "numeric",

    required = false,
    requiredMessage = "Debes ingresar el código completo.",
    regex,
    warning = "El código no tiene un formato válido.",

    editable = true,
    disabled = false,
    autoFocus = false,
    autoCapitalize = "characters",

    onComplete,
    label,
    style,
    inputStyle,

    ...props
}) {
    const { theme } = useTheme();

    const inputs = useRef([]);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const [localValue, setLocalValue] = useState(value ?? "");
    const [touched, setTouched] = useState(false);

    const isDisabled = disabled || !editable;

    const defaultRegex = useMemo(
        () =>
            mode === "numeric"
                ? new RegExp(`^\\d{${length}}$`)
                : new RegExp(`^[A-Z0-9]{${length}}$`),
        [mode, length]
    );

    const validationRegex = regex ?? defaultRegex;

    const {
        value: formValue,
        onChangeText: setFormValue,
        error: formError,
    } = useFormField({
        name,
        required,
        requiredMessage,
        regex: validationRegex,
        warning,
    });

    // Detecta si el campo está conectado a un Form.
    const isFormConnected = formValue !== undefined;

    // Prioridad: valor controlado > Form > estado local.
    const currentValue =
        value !== undefined
            ? value
            : isFormConnected
                ? formValue
                : localValue;

    const sanitize = (text) => {
        const normalized =
            mode === "numeric"
                ? text.replace(/\D/g, "")
                : text
                    .replace(/[^a-zA-Z0-9]/g, "")
                    .toUpperCase();

        return normalized.slice(0, length);
    };

    const code = sanitize(String(currentValue ?? ""));

    const characters = Array.from(
        { length },
        (_, index) => code[index] || ""
    );

    const handleValueChange = (nextValue) => {
        if (onChangeText) {
            onChangeText(nextValue);
        } else if (isFormConnected) {
            setFormValue(nextValue);
        } else {
            setLocalValue(nextValue);
        }
    };

    const focusInput = (index) => {
        if (isDisabled) return;

        const target = Math.max(
            0,
            Math.min(index, length - 1)
        );

        inputs.current[target]?.focus();
        setFocusedIndex(target);
    };

    useEffect(() => {
        if (!autoFocus || isDisabled) return;

        const timer = setTimeout(() => {
            inputs.current[0]?.focus();
        }, 100);

        return () => clearTimeout(timer);
    }, [autoFocus, isDisabled]);

    // Sincroniza el estado local cuando cambia el valor controlado.
    useEffect(() => {
        if (value !== undefined) {
            setLocalValue(value);
        }
    }, [value]);

    const handleChange = (text, index) => {
        if (isDisabled) return;

        setTouched(true);

        const sanitized = sanitize(text);
        const nextCharacters = [...characters];

        if (sanitized.length > 1) {
            // Pegar un código completo reemplaza el anterior.
            nextCharacters.fill("");

            for (let i = 0; i < sanitized.length; i++) {
                nextCharacters[i] = sanitized[i];
            }

            focusInput(
                Math.min(sanitized.length, length - 1)
            );
        } else if (sanitized.length === 1) {
            // Escritura normal en la casilla enfocada.
            nextCharacters[index] = sanitized;

            focusInput(
                Math.min(index + 1, length - 1)
            );
        } else {
            // Permite borrar el carácter de la casilla actual.
            nextCharacters[index] = "";
        }

        const nextCode = nextCharacters.join("");

        handleValueChange(nextCode);

        if (nextCode.length === length) {
            onComplete?.(nextCode);
        }
    };

    const handleKeyPress = (event, index) => {
        if (
            isDisabled ||
            event.nativeEvent.key !== "Backspace"
        ) {
            return;
        }

        // Si la casilla actual está vacía, vuelve a la anterior
        // y borra su contenido.
        if (!characters[index] && index > 0) {
            const nextCharacters = [...characters];
            nextCharacters[index - 1] = "";

            handleValueChange(nextCharacters.join(""));
            setTouched(true);
            focusInput(index - 1);
        }
    };

    // La validación principal pertenece al Form.
    // Fuera de él, mostramos errores locales después de interactuar.
    const localError = useMemo(() => {
        if (isFormConnected || !touched) return null;

        const empty = code.length === 0;

        if (required && empty) {
            return requiredMessage;
        }

        if (empty || code.length < length) {
            return null;
        }

        validationRegex.lastIndex = 0;
        const valid = validationRegex.test(code);
        validationRegex.lastIndex = 0;

        return valid ? null : warning;
    }, [
        isFormConnected,
        touched,
        code,
        required,
        requiredMessage,
        length,
        validationRegex,
        warning,
    ]);

    const validationMessage = isFormConnected
        ? formError
        : localError;

    const showWarning = Boolean(validationMessage);

    const styles = StyleSheet.create({
        wrapper: {
            width: "100%",
        },

        label: {
            marginBottom: 10,
            fontSize: theme.text.baseSize,
            color: theme.colors.text.text,
        },

        row: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
            width: "100%",
        },

        cell: {
            flex: 1,
            minWidth: 0,
            height: 58,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: theme.thicknesses.xs,
            borderColor: theme.colors.input.border,
            borderRadius: theme.radius.md,
            backgroundColor: theme.colors.input.background,
            opacity: isDisabled ? 0.6 : 1,
        },

        cellFocused: {
            borderColor: theme.colors.primary,
            borderWidth: 2,
        },

        cellFilled: {
            borderColor: theme.colors.primary,
        },

        cellWarning: {
            borderColor: theme.colors.error,
        },

        cellText: {
            width: "100%",
            height: "100%",
            padding: 0,
            textAlign: "center",
            textAlignVertical: "center",
            fontSize: theme.text.baseSize * 1.3,
            fontWeight: "600",
            color: theme.colors.text.text,
        },

        warning: {
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
                    {required ? (
                        <Text style={{ color: theme.colors.error }}>
                            {" *"}
                        </Text>
                    ) : null}
                </Text>
            ) : null}

            <View style={styles.row}>
                {characters.map((character, index) => (
                    <Pressable
                        key={index}
                        style={[
                            styles.cell,
                            character && styles.cellFilled,
                            focusedIndex === index && styles.cellFocused,
                            showWarning && styles.cellWarning,
                            inputStyle,
                        ]}
                        onPress={() => focusInput(index)}
                        disabled={isDisabled}
                    >
                        <TextInput
                            ref={(ref) => {
                                inputs.current[index] = ref;
                            }}
                            value={character}
                            onChangeText={(text) =>
                                handleChange(text, index)
                            }
                            onKeyPress={(event) =>
                                handleKeyPress(event, index)
                            }
                            onFocus={() =>
                                setFocusedIndex(index)
                            }
                            onBlur={() =>
                                setFocusedIndex(-1)
                            }
                            editable={!isDisabled}
                            keyboardType={
                                mode === "numeric"
                                    ? "number-pad"
                                    : "default"
                            }
                            autoCapitalize={autoCapitalize}
                            autoCorrect={false}
                            caretHidden
                            selectionColor={theme.colors.primary}
                            accessibilityLabel={
                                `Carácter ${index + 1} de ${length}`
                            }
                            style={styles.cellText}
                            {...props}
                        />
                    </Pressable>
                ))}
            </View>

            {showWarning && (
                <Text style={styles.warning}>
                    {validationMessage}
                </Text>
            )}
        </View>
    );
}
