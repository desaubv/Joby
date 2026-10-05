import React from "react";
import Text from "./Text";
import { useTheme } from "../theme/useTheme";

const Title = ({
    children,
    style,
    ...props
}) => {
    const { theme } = useTheme();

    return (
        <Text
            style={[
                {
                    color: theme.colors.text.heading,
                    fontSize: theme.text.headingSize,
                    lineHeight: theme.text.headingSize * 1.2,
                    fontWeight: "700",
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

export default Title;