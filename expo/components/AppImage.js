import React from "react";
import {
    Image as RNImage,
    StyleSheet
} from "react-native";

import { useTheme } from "../theme/useTheme";

const AppImage = ({
    source,
    width,
    height,
    size,
    borderRadius,
    resizeMode = "contain",
    style,
    ...props
}) => {

    const { theme } = useTheme();

    const imageSize = size ?? undefined;

    const styles = StyleSheet.create({
        image: {
            width: width ?? imageSize,
            height: height ?? imageSize,
        }
    });

    return (
        <RNImage
            source={source}
            resizeMode={resizeMode}
            style={[
                styles.image,
                style
            ]}
            {...props}
        />
    );
};


export default AppImage;