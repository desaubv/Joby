import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { getToken } from '../services/auth';
import { use, useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function App() {

    const router = useRouter();
    
    useEffect(() => {
        async function checkSession() {
            const token = await getToken();

            if(!token) router.replace('/auth/login');

            console.log(token);
        }

        checkSession();
    }, []);


    return (
        <View style={styles.container}>
            <Text>Hello World!</Text>
            <StatusBar style="auto" />
        </View>
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
