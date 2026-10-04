import { Stack } from "expo-router";
import { ThemeProvider } from "../theme/themeProvider";

export default function RootLayout() {
    return (
        <ThemeProvider>
            <Stack
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen
                    name="index"
                    options={{
                        title: "Hoel"
                    }}
                />

                <Stack.Screen
                    name="auth"
                />
                
            </Stack>
        </ThemeProvider>
    );
}