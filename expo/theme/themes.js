const baseTheme = {
    text: {
        smallSize: 14,
        baseSize: 16,
        headingSize: 22,
        subheadingSize: 18,

        // fonts: {
        //     black:      "LexendDeca-Black",
        //     bold:       "LexendDeca-Bold",
        //     extrabold:  "LexendDeca-ExtraBold",
        //     extraligth: "LexendDeca-ExtraLight",
        //     light:      "LexendDeca-Light",
        //     medium:     "LexendDeca-Medium",
        //     regular:    "LexendDeca-Regular",
        //     semibold:   "LexendDeca-SemiBold",
        //     thin:       "LexendDeca-Thin",
        // },
    },

    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
    },

    size: {
        xs: "20%",
        sm: "25%",
        md: "50%",
        lg: "70%",
        xl: "90%",
    },

    radius: {
        sm: 6,
        md: 12,
        lg: 24,
    },
}

export const themes = {
    light: {
        name: "light",
        ...baseTheme,

        colors: {
            background: "#f0f6fe",
            surface: "#fafbfe",

            primary: "#087E8B",
            secondary: "#549df1",

            text: {
                heading: "#087E8B",
                text: "#181818",
                secondary: "#555555",
                button: "#f3f6fd"
            }
        },
    },

    dark: {
        name: "dark",
        ...baseTheme,

        colors: {
            background: "#121212",
            surface: "#1E1E1E",
            
            primary: "#087E8B",
            secondary: "#0e5fe7",

            text: {
                heading: "#0e3477",
                text: "#ececec",
                secondary: "#9e9e9e",
                button: "#f3f6fd"
            }
        },
    },

    highContrast: {
        name: "highContrast",
        ...baseTheme,

        colors: {
            background: "#000000",
            surface: "#000000",

            text: "#FFFFFF",
            textSecondary: "#FFFFFF",
            buttonText: "#FFFFFF",

            primary: "#FFFF00",
            onPrimary: "#000000",

            border: "#FFFFFF",

            success: "#00FF00",
            warning: "#FFFF00",
            error: "#FF0000",
        },
    },
};