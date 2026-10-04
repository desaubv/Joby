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
            background: "#FFFFFF",
            surface: "#F5F5F5",

            text: "#111111",
            textSecondary: "#555555",
            buttonText: "#FFFFFF",

            primary: "#2563EB",
            onPrimary: "#FFFFFF",

            border: "#D1D5DB",

            success: "#16A34A",
            warning: "#CA8A04",
            error: "#DC2626",
        },
    },

    dark: {
        name: "dark",
        ...baseTheme,

        colors: {
            background: "#121212",
            surface: "#1E1E1E",

            text: "#FFFFFF",
            textSecondary: "#BBBBBB",
            buttonText: "#FFFFFF",

            primary: "#60A5FA",
            onPrimary: "#000000",

            border: "#555555",

            success: "#4ADE80",
            warning: "#FACC15",
            error: "#F87171",
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