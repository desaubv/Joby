
import React, {
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    Modal,
    FlatList,
} from "react-native";

import {
    ChevronDown,
    Check,
    Search,
    X,
} from "lucide-react-native";

import { useTheme } from "../../theme/useTheme";
import { FormContext, useFormField } from "./FormContext";

export default function Select({
    name,
    value,
    onValueChange,

    options = [],
    placeholder = "Selecciona una opción",

    label,
    required = false,
    requiredMessage = "Selecciona una opción.",

    iconLeft: IconLeft,

    editable = true,
    disabled = false,

    searchable = false,
    searchPlaceholder = "Buscar...",
    noResultsText = "No se encontraron resultados.",

    style,
    inputStyle,

    warning = "Selecciona una opción válida.",

    ...props
}) {
    const { theme } = useTheme();
    const form = useContext(FormContext);

    const isFormConnected = Boolean(form && name);
    const isControlled = value !== undefined;

    const isDisabled = disabled || !editable;

    const formValue = isFormConnected
        ? form.values?.[name]
        : undefined;

    // Prioridad: valor externo > valor del formulario > valor vacío.
    const selectedValue = isControlled
        ? value
        : isFormConnected
            ? formValue ?? ""
            : "";

    const selectedOption = options.find(
        (option) => option.value === selectedValue
    );

    const { error: formError } = useFormField({
        name,
        value: selectedValue,
        required,
        requiredMessage,
        warning,
    });

    const [visible, setVisible] = useState(false);
    const [search, setSearch] = useState("");
    const [showValidation, setShowValidation] = useState(false);
    const [localError, setLocalError] = useState(null);

    useEffect(() => {
        if (formError) {
            setShowValidation(true);
        }
    }, [formError]);

    useEffect(() => {
        setLocalError(null);
    }, [selectedValue]);

    const isEmpty =
        selectedValue == null || selectedValue === "";

    const validationMessage =
        localError ||
        formError ||
        (
            showValidation && required && isEmpty
                ? requiredMessage
                : null
        );

    const showWarning = Boolean(validationMessage);

    const normalize = (text) =>
        String(text ?? "")
            .toLocaleLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

    const filteredOptions = useMemo(() => {
        if (!searchable || !search.trim()) {
            return options;
        }

        const query = normalize(search.trim());

        return options.filter((option) =>
            normalize(option.label).includes(query)
        );
    }, [options, search, searchable]);

    const closeModal = () => {
        setVisible(false);
        setSearch("");
    };

    const openModal = () => {
        if (isDisabled) return;

        setSearch("");
        setVisible(true);
    };

    const selectOption = (option) => {
        if (option.disabled || isDisabled) return;

        setLocalError(null);
        setShowValidation(true);

        if (onValueChange) {
            // Modo controlado: el padre administra el valor.
            onValueChange(option.value);
        } else if (isFormConnected) {
            // Modo Form: el formulario administra el valor.
            form.setValue(name, option.value);
        }

        closeModal();
    };

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
            minHeight: 64,
            flexDirection: "row",
            alignItems: "center",
            borderWidth: theme.thicknesses.xs,
            borderColor: theme.colors.input.border,
            borderRadius: theme.radius.md,
            backgroundColor: theme.colors.input.background,
            paddingHorizontal: 16,
            opacity: isDisabled ? 0.6 : 1,
        },

        containerWarning: {
            borderColor: theme.colors.error,
        },

        leftIcon: {
            marginRight: 14,
        },

        text: {
            flex: 1,
            fontSize: theme.text.baseSize,
            color: selectedOption
                ? theme.colors.text.text
                : "#9AA9BA",
        },

        arrow: {
            marginLeft: 12,
        },

        warning: {
            marginTop: 6,
            marginLeft: 4,
            fontSize: theme.text.smallSize,
            color: theme.colors.error,
        },

        overlay: {
            flex: 1,
            justifyContent: "center",
            padding: 24,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
        },

        modalContainer: {
            maxHeight: "75%",
            backgroundColor: theme.colors.input.background,
            borderRadius: theme.radius.md,
            overflow: "hidden",
        },

        modalHeader: {
            padding: 18,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: theme.colors.input.border,
        },

        modalTitle: {
            fontSize: theme.text.baseSize,
            fontWeight: "600",
            color: theme.colors.text.text,
            marginBottom: searchable ? 14 : 0,
        },

        searchContainer: {
            minHeight: 48,
            flexDirection: "row",
            alignItems: "center",
            borderWidth: theme.thicknesses.xs,
            borderColor: theme.colors.input.border,
            borderRadius: theme.radius.md,
            paddingHorizontal: 12,
        },

        searchInput: {
            flex: 1,
            minWidth: 0,
            paddingVertical: 10,
            paddingHorizontal: 10,
            fontSize: theme.text.baseSize,
            color: theme.colors.text.text,
        },

        option: {
            minHeight: 54,
            paddingHorizontal: 18,
            paddingVertical: 14,
            flexDirection: "row",
            alignItems: "center",
        },

        optionText: {
            flex: 1,
            fontSize: theme.text.baseSize,
            color: theme.colors.text.text,
        },

        selectedOption: {
            backgroundColor: theme.colors.primary + "12",
        },

        check: {
            marginLeft: 12,
        },

        empty: {
            padding: 20,
            color: theme.colors.text.text,
            textAlign: "center",
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

            <Pressable
                accessibilityRole="button"
                accessibilityLabel={label || placeholder}
                accessibilityState={{
                    disabled: isDisabled,
                    expanded: visible,
                }}
                onPress={openModal}
                disabled={isDisabled}
                style={[
                    styles.container,
                    showWarning && styles.containerWarning,
                    inputStyle,
                ]}
                {...props}
            >
                {IconLeft && (
                    <IconLeft
                        size={24}
                        color="#53677D"
                        strokeWidth={2}
                        style={styles.leftIcon}
                    />
                )}

                <Text numberOfLines={1} style={styles.text}>
                    {selectedOption?.label || placeholder}
                </Text>

                <ChevronDown
                    size={22}
                    color="#53677D"
                    strokeWidth={2}
                    style={styles.arrow}
                />
            </Pressable>

            {showWarning && (
                <Text style={styles.warning}>
                    {validationMessage}
                </Text>
            )}

            <Modal
                visible={visible}
                transparent
                animationType="fade"
                onRequestClose={closeModal}
            >
                <Pressable
                    style={styles.overlay}
                    onPress={closeModal}
                >
                    <Pressable
                        style={styles.modalContainer}
                        onPress={(event) => event.stopPropagation()}
                    >
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>
                                {label || "Selecciona una opción"}
                            </Text>

                            {searchable && (
                                <View style={styles.searchContainer}>
                                    <Search
                                        size={20}
                                        color="#53677D"
                                    />

                                    <TextInput
                                        value={search}
                                        onChangeText={setSearch}
                                        placeholder={searchPlaceholder}
                                        placeholderTextColor="#9AA9BA"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        style={styles.searchInput}
                                        accessibilityLabel="Buscar opciones"
                                    />

                                    {search.length > 0 && (
                                        <Pressable
                                            onPress={() => setSearch("")}
                                            hitSlop={8}
                                            accessibilityLabel="Limpiar búsqueda"
                                        >
                                            <X
                                                size={20}
                                                color="#53677D"
                                            />
                                        </Pressable>
                                    )}
                                </View>
                            )}
                        </View>

                        <FlatList
                            data={filteredOptions}
                            keyExtractor={(item) =>
                                String(item.value)
                            }
                            keyboardShouldPersistTaps="handled"
                            ListEmptyComponent={
                                <Text style={styles.empty}>
                                    {noResultsText}
                                </Text>
                            }
                            renderItem={({ item }) => {
                                const selected =
                                    item.value === selectedValue;

                                return (
                                    <Pressable
                                        onPress={() => selectOption(item)}
                                        disabled={
                                            isDisabled || item.disabled
                                        }
                                        accessibilityRole="button"
                                        accessibilityState={{
                                            selected,
                                            disabled: Boolean(
                                                isDisabled || item.disabled
                                            ),
                                        }}
                                        style={[
                                            styles.option,
                                            selected && styles.selectedOption,
                                            item.disabled && {
                                                opacity: 0.45,
                                            },
                                        ]}
                                    >
                                        <Text style={styles.optionText}>
                                            {item.label}
                                        </Text>

                                        {selected && (
                                            <Check
                                                size={20}
                                                color={theme.colors.primary}
                                                style={styles.check}
                                            />
                                        )}
                                    </Pressable>
                                );
                            }}
                        />
                    </Pressable>
                </Pressable>
            </Modal>
        </View>
    );
}
