import { Stack, useRoute, useRouter } from "expo-router";
import { useEffect } from "react";
import { getToken } from "../../services/auth";

export default function AuthLayout() {
    const router = useRouter();

    useEffect(() => {
        async function checkSession() {
            const token = await getToken();
            if (token) router.replace("/");
        }

        checkSession();
    }, []);

    return (
        <Stack
            screenOptions={{ headerShown: false }}

        >
            <Stack.Screen
                name="login"
            />

            <Stack.Screen
                name="register"
            />
        </Stack>
    );
}