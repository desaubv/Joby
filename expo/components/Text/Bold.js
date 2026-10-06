import React from "react";
import Text from "./Text";
import { useTheme } from "../../theme/useTheme";

const Bold = ({
    children,
    style,
    ...props
}) => {
    const { theme } = useTheme();

    return (
        <Text
            style={[
                {
                    fontWeight: "700",
                },
                style,
            ]}
            {...props}
        >
            {children}
        </Text>
    );
};

export default Bold;