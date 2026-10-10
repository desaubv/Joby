const baseTheme = {
    text: {
        smallSize: 14,
        baseSize: 16,
        subheadingSize: 18,
        headingSize: 24,
        big: 30
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

    thicknesses: {
        none: 0,
        xs: 1.5,
        sm: 2,
        md: 2.5,
        lg: 3
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
        xl: "85%",
        all: "90%",
    },

    radius: {
        sm: 6,
        md: 12,
        lg: 24,
    },

    colors: {
            background: "#f0f6fe",
            surface: "#fafbfe",

            primary: "#087E8B",
            secondary: "#549df1",

            text: {
                heading: "#087E8B",
                text: "#181818",
                secondary: "#555555",
                button: "#f3f6fd",
                ghost: "#b9b4b4",
            },

            input: {
                border: "#D8E1EA",
                background: "#FFFFFF",
            },

            success: "#6ac668",
            warning: "#dbec5e",
            error: "#ec5e5e",
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
                button: "#f3f6fd",
                ghost: "#b9b4b4",
            },

            input: {
                border: "#D8E1EA",
                background: "#FFFFFF",
            },

            success: "#6ac668",
            warning: "#dbec5e",
            error: "#ec5e5e",
        },
    },

    dark: {
        name: "dark",
        ...baseTheme,

        colors: {
            background: "#121212",
            surface: "#1E1E1E",
            
            primary: "#087E8B",
            secondary: "#4a82e4",

            text: {
                heading: "#087E8B",
                text: "#ececec",
                secondary: "#9e9e9e",
                button: "#f3f6fd"
            },

            input: {
                border: "#767a7e",
                background: "#1E1E1E",
            },
            

            success: "#00FF00",
            warning: "#FFFF00",
            error: "#FF0000",
        },
    },

    highContrast: {
        name: "highContrast",
        ...baseTheme,

        colors: {
            background: "#000000",
            surface: "#000000",

            primary: "#FFFF00",
            secondary: "#FFFF00",

            text: {
                heading: "#FFFFFF",
                text: "#FFFFFF",
                secondary: "#FFFFFF",
                button: "#FFFFFF",
                ghost: "#FFFFFF",
            },

            input: {
                border: "#FFFFFF",
                background: "#FFFFFF",
            },

            success: "#00FF00",
            warning: "#FFFF00",
            error: "#FF0000",
        },
    },
};