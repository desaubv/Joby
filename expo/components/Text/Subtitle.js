import React from "react";
import Text from "./Text";
import { useTheme } from "../../theme/useTheme";

const Subtitle = ({
    children,
    style,
    ...props
}) => {
    const { theme } = useTheme();

    return (
        <Text
            style={[
                {
                    fontSize: theme.text.subtitleSize,
                    lineHeight: theme.text.subtitleSize * 1.3,
                    fontWeight: "600",
                    marginBottom: theme.spacing.sm,
                },
                style,
            ]}
            {...props}
        >
            {children}
        </Text>
    );
};

export default Subtitle;