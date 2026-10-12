import { Stack, useRouter } from "expo-router";
import { ThemeProvider } from "../theme/themeProvider";
import { useEffect } from "react";
import { getToken } from "../services/auth";

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
                    name="signin"
                />

            </Stack>
        </ThemeProvider>
    );
}