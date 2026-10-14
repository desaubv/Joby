import React, { useEffect, useState } from "react";

import {
    View,
    Text,
    TextInput,
    Pressable,
    ScrollView,
    Modal,
    StyleSheet,
    Keyboard,
} from "react-native";

import {
    Filter,
    Search,
    X,
    Check,
    RotateCcw,
} from "lucide-react-native";

import { useTheme } from "theme/useTheme";

import Input from "components/form/Input";
import Button from "components/ui/Button";

const SearchAndFilter = ({
    placeholder = "Buscar...",
    query,
    setQuery,

    filters = [],
    filterValues,
    onFilterChange,
    onSearch,
    onClear,

    style,
}) => {
    const { theme } = useTheme();

    const controlled =
        query !== undefined && typeof setQuery === "function";

    const [localQuery, setLocalQuery] = useState(query ?? "");
    const [visible, setVisible] = useState(false);

    const [activeFilters, setActiveFilters] = useState(
        filterValues ?? {}
    );

    const [draftFilters, setDraftFilters] = useState(
        filterValues ?? {}
    );

    useEffect(() => {
        if (controlled) {
            setLocalQuery(query ?? "");
        }
    }, [query, controlled]);

    useEffect(() => {
        if (filterValues !== undefined) {
            setActiveFilters(filterValues);
        }
    }, [filterValues]);

    const currentQuery = controlled
        ? query ?? ""
        : localQuery;

    const updateQuery = (value) => {
        if (controlled) {
            setQuery(value);
        } else {
            setLocalQuery(value);
        }
    };

    const handleSearch = () => {
        Keyboard.dismiss();
        onSearch?.(currentQuery.trim(), activeFilters);
    };

    const handleClear = () => {
        updateQuery("");
        onClear?.();
        onSearch?.("", activeFilters);
    };

    const openFilters = () => {
        setDraftFilters({ ...activeFilters });
        setVisible(true);
    };

    const closeFilters = () => {
        setDraftFilters({ ...activeFilters });
        setVisible(false);
    };

    const updateFilter = (key, value) => {
        setDraftFilters((previous) => ({
            ...previous,
            [key]: value,
        }));
    };

    const toggleOption = (filter, optionValue) => {
        if (!filter.multiple) {
            updateFilter(
                filter.key,
                draftFilters[filter.key] === optionValue
                    ? ""
                    : optionValue
            );

            return;
        }

        const current = draftFilters[filter.key] ?? [];

        updateFilter(
            filter.key,
            current.includes(optionValue)
                ? current.filter((value) => value !== optionValue)
                : [...current, optionValue]
        );
    };

    const applyFilters = () => {
        setActiveFilters(draftFilters);
        onFilterChange?.(draftFilters);
        setVisible(false);

        Keyboard.dismiss();
        onSearch?.(currentQuery.trim(), draftFilters);
    };

    const resetFilters = () => {
        const emptyFilters = {};

        filters.forEach((filter) => {
            emptyFilters[filter.key] = filter.multiple ? [] : "";
        });

        setDraftFilters(emptyFilters);
    };

    const activeFilterCount = filters.filter((filter) => {
        const value = activeFilters[filter.key];

        return Array.isArray(value)
            ? value.length > 0
            : value !== undefined &&
              value !== null &&
              value !== "";
    }).length;

    const styles = StyleSheet.create({
        container: {
            width: theme.size.all,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            marginTop: theme.spacing.md,
            marginBottom: theme.spacing.md,
            ...style,
        },

        searchContainer: {
            flex: 1,
            flexShrink: 1,
            minWidth: 0,
        },

        searchInput: {
            width: "100%",
        },

        filterButton: {
            width: 44,
            height: 44,
            flexShrink: 0,
            paddingHorizontal: 0,
            alignItems: "center",
            justifyContent: "center",
        },

        filterButtonContainer: {
            position: "relative",
            flexShrink: 0,
        },

        badge: {
            position: "absolute",
            top: -5,
            right: -5,
            minWidth: 18,
            height: 18,
            borderRadius: 9,
            paddingHorizontal: 4,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.colors.primary,
            zIndex: 1,
        },

        badgeText: {
            color: "#FFFFFF",
            fontSize: 10,
            fontWeight: "700",
        },

        overlay: {
            flex: 1,
            justifyContent: "center",
            padding: 24,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
        },

        modalContainer: {
            maxHeight: "80%",
            backgroundColor: theme.colors.surface,
            borderRadius: theme.radius.md,
            overflow: "hidden",
        },

        modalHeader: {
            padding: 18,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: theme.colors.border,
        },

        headerRow: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        },

        modalTitle: {
            flex: 1,
            fontSize: theme.text.baseSize,
            fontWeight: "600",
            color: theme.colors.text.text,
        },

        closeButton: {
            width: 34,
            height: 34,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.colors.input,
        },

        modalBody: {
            paddingHorizontal: 18,
            paddingTop: 18,
            paddingBottom: 6,
        },

        filterSection: {
            marginBottom: 22,
        },

        filterLabel: {
            fontSize: theme.text.baseSize,
            fontWeight: "600",
            color: theme.colors.text.text,
            marginBottom: 8,
        },

        option: {
            minHeight: 50,
            paddingHorizontal: 12,
            paddingVertical: 12,
            flexDirection: "row",
            alignItems: "center",
            borderRadius: theme.radius.md,
        },

        selectedOption: {
            backgroundColor: theme.colors.primary + "12",
        },

        optionText: {
            flex: 1,
            fontSize: theme.text.baseSize,
            color: theme.colors.text.text,
        },

        check: {
            marginLeft: 12,
        },

        empty: {
            padding: 20,
            color: theme.colors.text.text,
            textAlign: "center",
        },

        footer: {
            flexDirection: "row",
            gap: 10,
            padding: 18,
            borderTopWidth: StyleSheet.hairlineWidth,
            borderTopColor: theme.colors.border,
        },

        footerButton: {
            flex: 1,
            minHeight: 46,
            borderRadius: theme.radius.md,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            gap: 8,
        },

        resetButton: {
            borderWidth: 1,
            borderColor: theme.colors.border,
            backgroundColor: theme.colors.surface,
        },

        applyButton: {
            backgroundColor: theme.colors.primary,
        },

        resetText: {
            fontSize: theme.text.baseSize,
            color: theme.colors.text.text,
            fontWeight: "500",
        },

        applyText: {
            fontSize: theme.text.baseSize,
            color: "#FFFFFF",
            fontWeight: "600",
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <Input
                    height="sm"
                    radius="lg"
                    iconLeft={Search}
                    style={styles.searchInput}
                    placeholder={placeholder}
                    value={currentQuery}
                    onChangeText={updateQuery}
                    onSubmitEditing={handleSearch}
                    returnKeyType="search"
                    iconRight={currentQuery ? X : undefined}
                    onIconRightPress={handleClear}
                />
            </View>

            <View style={styles.filterButtonContainer}>
                {
                    filters.length > 0 ? <Button
                        icon={Filter}
                        variant="ghost"
                        iconSize={30}
                        style={styles.filterButton}
                        onPress={openFilters}
                    /> : null
                }
                

                {activeFilterCount > 0 && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>
                            {activeFilterCount}
                        </Text>
                    </View>
                )}
            </View>

            <Modal
                visible={visible}
                transparent
                animationType="fade"
                onRequestClose={closeFilters}
            >
                <Pressable
                    style={styles.overlay}
                    onPress={closeFilters}
                >
                    <Pressable
                        style={styles.modalContainer}
                        onPress={(event) => event.stopPropagation()}
                    >
                        <View style={styles.modalHeader}>
                            <View style={styles.headerRow}>
                                <Text style={styles.modalTitle}>
                                    Filtros
                                </Text>

                                <Pressable
                                    onPress={closeFilters}
                                    style={styles.closeButton}
                                    accessibilityLabel="Cerrar filtros"
                                >
                                    <X
                                        size={20}
                                        color={theme.colors.text.text}
                                    />
                                </Pressable>
                            </View>
                        </View>

                        <ScrollView
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={styles.modalBody}>
                                {filters.length === 0 ? (
                                    <Text style={styles.empty}>
                                        No hay filtros disponibles.
                                    </Text>
                                ) : (
                                    filters.map((filter) => (
                                        <View
                                            key={filter.key}
                                            style={styles.filterSection}
                                        >
                                            <Text style={styles.filterLabel}>
                                                {filter.label}
                                            </Text>

                                            {(filter.options ?? []).map(
                                                (option) => {
                                                    const value =
                                                        draftFilters[filter.key];

                                                    const selected =
                                                        Array.isArray(value)
                                                            ? value.includes(option.value)
                                                            : value === option.value;

                                                    return (
                                                        <Pressable
                                                            key={String(option.value)}
                                                            onPress={() =>
                                                                toggleOption(
                                                                    filter,
                                                                    option.value
                                                                )
                                                            }
                                                            disabled={option.disabled}
                                                            accessibilityRole="checkbox"
                                                            accessibilityState={{
                                                                checked: selected,
                                                                disabled: Boolean(
                                                                    option.disabled
                                                                ),
                                                            }}
                                                            style={[
                                                                styles.option,
                                                                selected &&
                                                                    styles.selectedOption,
                                                                option.disabled && {
                                                                    opacity: 0.45,
                                                                },
                                                            ]}
                                                        >
                                                            <Text
                                                                style={styles.optionText}
                                                            >
                                                                {option.label}
                                                            </Text>

                                                            {selected && (
                                                                <Check
                                                                    size={20}
                                                                    color={
                                                                        theme.colors.primary
                                                                    }
                                                                    style={styles.check}
                                                                />
                                                            )}
                                                        </Pressable>
                                                    );
                                                }
                                            )}
                                        </View>
                                    ))
                                )}
                            </View>
                        </ScrollView>

                        <View style={styles.footer}>
                            <Pressable
                                onPress={resetFilters}
                                style={[
                                    styles.footerButton,
                                    styles.resetButton,
                                ]}
                            >
                                <RotateCcw
                                    size={17}
                                    color={theme.colors.text.text}
                                />

                                <Text style={styles.resetText}>
                                    Restablecer
                                </Text>
                            </Pressable>

                            <Pressable
                                onPress={applyFilters}
                                style={[
                                    styles.footerButton,
                                    styles.applyButton,
                                ]}
                            >
                                <Check
                                    size={17}
                                    color="#FFFFFF"
                                />

                                <Text style={styles.applyText}>
                                    Aplicar
                                </Text>
                            </Pressable>
                        </View>
                    </Pressable>
                </Pressable>
            </Modal>
        </View>
    );
};

export default SearchAndFilter;
