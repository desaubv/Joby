import { StyleSheet, useWindowDimensions, View } from "react-native";
import AppImage from "../../../components/AppImage";

import { useTheme } from "../../../theme/useTheme";

import ScreenLayout from "../../../components/layout/Screen";
import icon from "../../../assets/logos/icon.png";
import Text from "../../../components/Text/Text";
import Button from "../../../components/Button";
import Title from "../../../components/Text/Title";
import Input from "../../../components/form/Input";

import { Hash, ArrowLeft } from "lucide-react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function RecoveryCodeScreen() {

    const router  = useRouter();
    const { theme } = useTheme();
    const { width } = useWindowDimensions();

    const [email, setEmail] = useState("");

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.surface,
            flexDirection: "column",

            width: width >= 768
                ? "35%"
                : "100%",

            maxHeight: width >= 768
                ? "90%"
                : "100%",

            alignItems: "center",
            justifyContent: "start",

            borderRadius: theme.radius.lg
        },

        logoContainer: {
            marginTop: theme.spacing.xl * 2,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
        },

        logoText: {
            color: theme.colors.primary,
            fontSize: 35,
            fontWeight: 700
        },

        basicContainer: {
            width: theme.size.xl,
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "start",
            marginTop: theme.spacing.lg,
            marginBottom: theme.spacing.lg
        },

        input: {
            width: "100%",
            marginTop: theme.spacing.md
        },

        bottomContainer: {
            width: theme.size.xl,
            gap: 15,
            marginTop: "auto",
            marginBottom: theme.spacing.lg
        },

        button: {
            width: "100%",
        }
    });

    return (
        <ScreenLayout centered>
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <AppImage
                        source={icon}
                        size={65}
                    />
                    <Text style={styles.logoText}>Joby</Text>
                </View>

                <View style={styles.basicContainer}>
                    <Title style={{ textAlign: "start" }}>Recuperar contraseña</Title>
                    <Text style={{ marginBottom: theme.spacing.md, marginTop: -theme.spacing.sm }} variant="secondary">Te llegará un código a tu correo. Ingresalo enseguida.</Text>

                    <Input
                        placeholder="Código de recuperacion"
                        type="number"
                        iconLeft={Hash}
                        style={styles.input}

                        regex={/^\d{6}$/}
                        warning="Ingresa un código válido."


                        value={email}
                        onChangeText={setEmail}
                    />
                    <View
                        style={{ width: "100%", alignItems: "start", marginTop: theme.spacing.xl}}
                    >
                        <Button style={styles.button}>Verificar código</Button>
                    </View>
                </View>
                <Button onPress={()=> router.back()} variant="ghost" iconLeft={ArrowLeft}>Volver atras</Button>

            </View>
        </ScreenLayout>
    );
}
