import { StyleSheet } from 'react-native';
import { getToken } from '../services/auth';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import ScreenLayout from '../components/layout/Screen';
export default function App() {

    const router = useRouter();

    useEffect(() => {
        async function checkSession() {
            const token = await getToken();

            if (!token) router.replace('/signin');

            console.log(token);
        }

        checkSession();
    }, []);

    return (
        <ScreenLayout>
        </ScreenLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
