import React, { useEffect, useRef } from "react";
import {
    View,
    Animated,
    Easing,
    StyleSheet,
} from "react-native";

import { useTheme } from "../../theme/useTheme";

const SkeletonText = ({
    numberOfLines = 1,
    width = "100%",
    lastLineWidth = "60%",
    fontSize,
    lineHeight,
    gap = 6,
    animated = true,
    style,
}) => {
    const { theme } = useTheme();

    const opacity = useRef(new Animated.Value(0.4)).current;

    const size = (fontSize ?? theme.text.baseSize) * 0.9;
    const height = lineHeight ?? size * 1.2;

    useEffect(() => {
        if (!animated) {
            opacity.setValue(0.65);
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
        container: {
            width: "100%",
            gap,
        },
        line: {
            height,
            borderRadius: height / 3,
            backgroundColor: theme.colors.text.ghost,
            opacity: animated ? undefined : 0.18,
            marginBottom: 2,
        },
    });

    return (
        <View
            style={[styles.container, style]}
            accessibilityRole="none"
            accessible={false}
        >
            {Array.from({ length: Math.max(1, numberOfLines) }).map(
                (_, index) => {
                    const isLast = index === numberOfLines - 1;

                    return (
                        <Animated.View
                            key={index}
                            style={[
                                styles.line,
                                {
                                    width:
                                        numberOfLines === 1
                                            ? width
                                            : isLast
                                                ? lastLineWidth
                                                : "100%",
                                    opacity: animated ? opacity : 0.18,
                                },
                            ]}
                        />
                    );
                }
            )}
        </View>
    );
};

export default SkeletonText;