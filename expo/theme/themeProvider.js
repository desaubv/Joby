
import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { themes } from "./themes";
import {
    FONT_SCALES,
    getFontScale,
    getFontSize as calculateFontSize,
} from "./fontScale";

import LocalStorage from "services/storage/LocalStorage";

const ThemeContext = createContext(null);

export function ThemeProvider({
    children,
    initialTheme = "light",
    initialFontSize = "normal",
}) {
    const [themeName, setThemeName] = useState(initialTheme);
    const [fontSize, setFontSizeState] = useState(initialFontSize);
    const [isConfigLoaded, setIsConfigLoaded] = useState(false);

    useEffect(() => {
        let mounted = true;

        async function loadConfig() {
            const config = await LocalStorage.getConfig();

            if (!mounted) return;

            if (themes[config.theme]) {
                setThemeName(config.theme);
            }

            if (config.fontSize in FONT_SCALES) {
                setFontSizeState(config.fontSize);
            }

            setIsConfigLoaded(true);
        }

        loadConfig().catch((error) => {
            console.error("Error al cargar la configuración:", error);

            if (mounted) {
                setIsConfigLoaded(true);
            }
        });

        return () => {
            mounted = false;
        };
    }, []);

    const theme = themes[themeName];
    const fontScale = getFontScale(fontSize);

    async function setTheme(name) {
        if (!themes[name]) {
            throw new Error(`Theme "${name}" does not exist`);
        }

        setThemeName(name);

        await LocalStorage.setConfig({
            theme: name,
        });
    }

    async function setFontSize(size) {
        if (!(size in FONT_SCALES)) {
            throw new Error(`Font size "${size}" does not exist`);
        }

        setFontSizeState(size);

        await LocalStorage.setConfig({
            fontSize: size,
        });
    }

    function getScaledFontSize(baseSize) {
        return calculateFontSize(baseSize, fontSize);
    }

    return (
        <ThemeContext.Provider
            value={{
                theme,
                themeName,
                setTheme,
                fontSize,
                setFontSize,
                fontScale,
                getFontSize: getScaledFontSize,
                isConfigLoaded,
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
