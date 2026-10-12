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
}) {
    const { theme } = useTheme();
    const insets = useSafeAreaInsets();


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
        activeItem: {
            backgroundColor: `${theme.colors.primary}12`,
        },
        label: {
            fontSize: theme.text.smallSize,
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
                                { color, fontSize: theme.text.smallSize * 0.8 },
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