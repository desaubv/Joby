import React from "react";
import {
    View,
    Pressable,
    StyleSheet,
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTheme } from "../../theme/useTheme";
import Text from "../Text/Text";

export default function NavigationBar({
    tabs = [],
    activeTab,
    onTabChange,
    position="bottom",
    type="default"
}) {
    const { theme } = useTheme();
    const insets = useSafeAreaInsets();

    const isSimple = type === "simple";

    const styles = StyleSheet.create({
        container: {
            position: "absolute",
            bottom: insets.bottom,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            paddingHorizontal: 8,
            paddingVertical: 8,
            backgroundColor: theme.colors.surface,
        },

        containerTop: {
            position: "absolute",
            top: insets.top + theme.spacing.md,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            paddingHorizontal: 8,
            paddingVertical: 8,
            backgroundColor: theme.colors.surface,
        },

        containerBottom: {
            position: "absolute",
            bottom: insets.bottom,
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
            minHeight: isSimple ? 35 : 56,
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            borderRadius: isSimple ? 0 : theme.radius.md,
            paddingVertical: isSimple ? 0 : 6,
            borderBottomWidth: isSimple ? 3 : 0,
            borderBottomColor: "transparent",

        },
        activeItem: {
            backgroundColor: isSimple ? "transparent" : `${theme.colors.primary}12`,
            borderBottomColor: isSimple ? theme.colors.primary : "transparent",
        },
        label: {
            fontSize: isSimple ? theme.text.baseSize : theme.text.smallSize * 0.8,
            textAlign: "center",
        },
        activeLabel: {
            fontWeight: "700",
        },
    });

    return (
        <View style={ position == "bottom" ? styles.containerBottom : styles.containerTop}>
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
                            styles.item,
                            focused && styles.activeItem,
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
                                styles.label,
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