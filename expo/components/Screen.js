import React from "react";
import {
    View,
    ScrollView,
    StyleSheet
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../theme/useTheme";


const ScreenLayout = ({
    children,
    scroll = true,
    centered = false,
    style,
    contentStyle,
    ...props
}) => {

    const { theme } = useTheme();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background
        },

        content: {
            flexGrow: 1,

            ...(centered && {
                alignItems: "center",
                justifyContent: "center"
            })
        }
    });


    const Content = scroll ? ScrollView : View;

    return (
        <SafeAreaView
            style={[styles.container, style]}
            {...props}
        >
            <Content
                style={scroll ? undefined : styles.content}
                contentContainerStyle={
                    scroll
                        ? [styles.content, contentStyle]
                        : undefined
                }
            >
                {children}
            </Content>
        </SafeAreaView>
    );
};


export default ScreenLayout;