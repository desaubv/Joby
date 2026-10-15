import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { ThemeProvider } from "theme/themeProvider";
import { getToken } from "services/auth";

export default function RootLayout() {
    const router = useRouter();

    useEffect(() => {
        async function checkSession() {
            const token = await getToken();
            if (!token) router.replace("/signin");
        }

        //checkSession();
    }, []);
    
    return (
        <ThemeProvider>
            <Stack
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen
                    name="index"
                />

                <Stack.Screen
                    name="settings"
                />

                <Stack.Screen
                    name="signin"
                />

            </Stack>
        </ThemeProvider>
    );
}