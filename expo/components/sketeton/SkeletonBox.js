import React, { useEffect, useRef } from "react";
import {
    Animated,
    Easing,
    StyleSheet,
} from "react-native";

import { useTheme } from "../../theme/useTheme";

const SkeletonBox = ({
    width = "100%",
    height = 16,
    radius = 8,
    animated = true,
    style,
}) => {
    const { theme } = useTheme();

    const opacity = useRef(
        new Animated.Value(0.4)
    ).current;

    useEffect(() => {
        if (!animated) {
            opacity.setValue(0.5);
            return;
        }

        const animation = Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 0.8,
                    duration: 700,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0.35,
                    duration: 700,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        );

        animation.start();

        return () => animation.stop();
    }, [animated, opacity]);

    const styles = StyleSheet.create({
        box: {
            width,
            height,
            borderRadius: radius,
            backgroundColor: theme.colors.text.ghost,
        },
    });

    return (
        <Animated.View
            accessible={false}
            style={[
                styles.box,
                { opacity },
                style,
            ]}
        />
    );
};

export default SkeletonBox;