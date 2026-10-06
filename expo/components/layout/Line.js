import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Line({
    width = "100%",
    thickness = 1,
    color = "#D8E1EA",

    text,
    textPosition = "center",
    textColor = "#53677D",
    textStyle,

    style,
}) {
    if (!text) {
        return (
            <View
                style={[
                    styles.line,
                    {
                        width,
                        height: thickness,
                        backgroundColor: color,
                    },
                    style,
                ]}
            />
        );
    }

    return (
        <View
            style={[
                styles.container,
                { width },
                style,
            ]}
        >
            {textPosition === "start" || textPosition === "center" ? (
                <View
                    style={[
                        styles.line,
                        styles.flexLine,
                        textPosition === "center" && styles.centerLine,
                        {
                            height: thickness,
                            backgroundColor: color,
                        },
                    ]}
                />
            ) : null}

            <Text
                style={[
                    styles.text,
                    {
                        color: textColor,
                    },
                    textStyle,
                ]}
            >
                {text}
            </Text>

            {textPosition === "end" || textPosition === "center" ? (
                <View
                    style={[
                        styles.line,
                        styles.flexLine,
                        textPosition === "center" && styles.centerLine,
                        {
                            height: thickness,
                            backgroundColor: color,
                        },
                    ]}
                />
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },

    line: {
        alignSelf: "center",
    },

    flexLine: {
        flex: 1,
    },

    centerLine: {
        // Permite separar el texto de las líneas
        marginHorizontal: 12,
    },

    text: {
        fontSize: 16,
        fontWeight: "500",
    },
});