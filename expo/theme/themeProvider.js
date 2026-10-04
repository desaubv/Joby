import { createContext, useContext, useState } from "react";
import { themes } from "./themes";

const ThemeContext = createContext(null);

export function ThemeProvider({ children, initialTheme = "light" }) {
    const [themeName, setThemeName] = useState(initialTheme);

    const theme = themes[themeName];

    function setTheme(name) {
        if (!themes[name]) {
            throw new Error(`Theme "${name}" does not exist`);
        }

        setThemeName(name);
    }

    return (
        <ThemeContext.Provider
            value={{
                theme,
                themeName,
                setTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useThemeContext() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error(
            "useThemeContext must be used inside ThemeProvider"
        );
    }

    return context;
}