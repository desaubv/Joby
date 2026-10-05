import React from "react";
import Text from "./Text";
import { useTheme } from "../theme/useTheme";

const Paragraph = ({
    children,
    style,
    ...props
}) => {
    const { theme } = useTheme();

    return (
        <Text
            style={[
                {
                    fontSize: theme.text.baseSize,
                    lineHeight: theme.text.baseSize * 1.5,
                    marginBottom: theme.spacing.md,
                },
                style,
            ]}
            {...props}
        >
            {children}
        </Text>
    );
};

export default Paragraph;