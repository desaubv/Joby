import React from "react";
import {
    View,
    Pressable,
    StyleSheet,
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTheme } from "theme/useTheme";
import Text from "../Text/Text";

export default function NavigationBar({
    tabs = [],
    position = "bottom",
    variant = "default",
    activeTab,
    onTabChange,
}) {
    const { theme } = useTheme();
    const insets = useSafeAreaInsets();

    const isSimple = variant === "simple";

    const positionStyle =
        position == "bottom" ? {
            bottom: insets.bottom,
        } : {
            top: insets.top + theme.spacing.lg,
        };

    const styles = StyleSheet.create({
        container: {
            ...positionStyle,
            width: "100%",
            position: "absolute",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            paddingHorizontal: 8,
            paddingVertical: 8,
            backgroundColor: theme.colors.surface,
        },

        border: {
            width: "80%",
            alignSelf: "center",
            height: 1,
            backgroundColor: "#ccc",
        },

        item: {
            flex: 1,
            minHeight: 56,
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            borderRadius: theme.radius.md,
            paddingVertical: 6,
        },
        itemSimple: {
            flex: 1,
            minHeight: 35,
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            paddingVertical: 6,
            
            borderBottomWidth: 3,
            borderBottomColor: "transparent"
        },

        activeItem: {
            backgroundColor: `${theme.colors.primary}12`,
            
        },
        activeItemSimple: {
            borderBottomColor: theme.colors.primary,
        },

        label: {
            fontSize: theme.text.smallSize * 0.8,
            textAlign: "center",
        },
        
        labelSimple: {
            fontSize: theme.text.baseSize * 0.8,
            textAlign: "center",
        },
        activeLabel: {
            fontWeight: "700",
        },
    });

    return (
        <View style={styles.container}>
            {tabs.map(({ label, icon: Icon }, index) => {
                const focused = activeTab === index;
                const color = focused
                    ? theme.colors.primary
                    : theme.colors.text.text;

                return (
                    <Pressable
                        key={`${label}-${index}`}
                        accessibilityRole="button"
                        accessibilityLabel={label}
                        accessibilityState={{ selected: focused }}
                        onPress={() => onTabChange(index)}
                        style={({ pressed }) => [
                            isSimple ? styles.itemSimple : styles.item,
                            focused && (isSimple ? styles.activeItemSimple : styles.activeItem),
                            pressed && { opacity: 0.7 },
                        ]}
                    >
                        {Icon && (
                            <Icon
                                size={23}
                                color={color}
                                strokeWidth={focused ? 2.5 : 2}
                            />
                        )}

                        <Text
                            style={[
                                isSimple ? styles.labelSimple : styles.label,
                                { color },
                                focused && styles.activeLabel,
                            ]}
                            numberOfLines={1}
                        >
                            {label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}