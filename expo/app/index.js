import { StyleSheet, Text, View } from 'react-native';
import { getToken } from '../services/auth';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useTheme } from '../theme/useTheme';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { ThemeProvider } from '../theme/themeProvider';

export default function App() {

    const router = useRouter();
    const { theme, setTheme } = useTheme();
    
    useEffect(() => {
        async function checkSession() {
            const token = await getToken();

            if(!token) router.replace('/auth/login');

            console.log(token);
        }

        // checkSession();
    }, []);

    return (
        <Layout>
            <Button
            >Hola</Button>
        </Layout>
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
