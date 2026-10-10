
import React from "react";
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
} from "react-native";

import { useTheme } from "../theme/useTheme";

import Text from "../components/Text/Text";

import placeholder from "../assets/placeholders/history.avif"

const UserImage = ({
    size=50
}) => {
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        ring: {
            width: size,
            height: size,
            borderRadius: 33,
            padding: 3,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.colors.primary,
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
        <View style={styles.ring}>
            <View style={styles.ball}>
                <Image
                    source={placeholder}
                    style={styles.ballImage}
                    resizeMode="cover"
                />
            </View>
        </View>
    );
};

export default UserImage;
