import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { getToken, saveToken } from '../../services/auth';
import { useRouter } from 'expo-router';

const ComponentName = () => {
    const router = useRouter();

    const handleLogin = async () => {
        await saveToken("LOREM IPSUM AS DOLOR IS MIET");
        router.replace("/");
    }

    return (
        <View>
            <Text>Hello, World!</Text>
            <TouchableOpacity
                onPress={handleLogin}
            >Login</TouchableOpacity>
        </View>
    );
};

export default ComponentName;