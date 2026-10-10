import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import { useTheme } from '../theme/useTheme';

import UserImage from '../components/UserImage';
import Input from '../components/form/Input';
import { Image as ImageIcon } from 'lucide-react-native';


const NewPublication = () => {
    const { theme } = useTheme();

    const handleSubmitImage = () => {

    }

    const styles = StyleSheet.create({
        container: {
            width: theme.size.all,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 15,
            marginTop: theme.spacing.md,
            marginBottom: theme.spacing.md,
        },

        ball: {
            width: "100%",
            height: "100%",
            borderRadius: 30,
            padding: 2,
            backgroundColor: theme.colors?.background ?? "#FFFFFF",
        },

        ballImage: {
            width: "100%",
            height: "100%",
            borderRadius: 30,
        },

        ballText: {
            fontSize: theme.text.smallSize * 0.8,
            textAlign: "center",
            width: "100%",
        },

        input: {
            flex: 1,
            padding: 1
        }
    });
    return (
        <View style={styles.container}>
            <UserImage/>
            <Input
                style={styles.input}
                iconRight={ImageIcon}
                placeholder="¿Qué quieres compartir?"
                onIconRightPress={handleSubmitImage}
            />
        </View>
    );
};

export default NewPublication;