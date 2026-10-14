import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { useTheme } from 'theme/useTheme';
import { useSafeAreaInsets } from "react-native-safe-area-context";


const TabLayout = ({ children }) => {
    const { theme } = useTheme();
    const insets = useSafeAreaInsets();

    const styles = StyleSheet.create({
        container: {
            marginTop: insets.top,
            marginBottom: insets.bottom + theme.spacing.xs,
            width: "100%",
            alignItems: "center",
        },

        histories: {
            width: "100%",
            height: "auto",
            flexDirection: "row",
            gap: 15,
            marginTop: theme.spacing.md
        }
    });


    return (
            <ScrollView
                showsVerticalScrollIndicator
                style={{ width: "100%" }}
            >
                <View style={styles.container}>
                    { children }
                </View>
            </ScrollView>
    );
};

export default TabLayout;