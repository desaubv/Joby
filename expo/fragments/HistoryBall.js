
import React from "react";
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
} from "react-native";

import { useTheme } from "../theme/useTheme";

import Text from "../components/Text/Text";

const HistoryBall = ({
    image,
    text,
    onPress,
    seen = false,
}) => {
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        container: {
            width: 72,
            height: 72,
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 5
        },

        ring: {
            width: 66,
            height: 66,
            borderRadius: 33,
            padding: 3,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: seen
                ? theme.colors.text.ghost
                : theme.colors.secondary,
        },

        ball: {
            width: "100%",
            height: "100%",
            borderRadius: 30,
            padding: 2,
            backgroundColor: theme.colors?.background ?? "#FFFFFF",
        },

        ballImage: {
            width: "100%",
            height: "100%",
            borderRadius: 30,
        },

        ballText: {
            fontSize: theme.text.smallSize * 0.8,
            textAlign: "center",
            width: "100%",
        },
    });

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <View style={styles.ring}>
                <View style={styles.ball}>
                    <Image
                        source={
                            typeof image === "string"
                                ? { uri: image }
                                : image
                        }
                        style={styles.ballImage}
                        resizeMode="cover"
                    />
                </View>
            </View>

            <Text
                numberOfLines={2}
                variant="secondary"
                style={styles.ballText}
            >
                {text}
            </Text>
        </TouchableOpacity>
    );
};

export default HistoryBall;
