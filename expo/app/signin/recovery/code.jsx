import { useState } from "react";

import { useTheme } from "../../../theme/useTheme";
import useForm from "../../../components/form/useForm";

import { StyleSheet, useWindowDimensions, View } from "react-native";
import VerificationCodeInput from "../../../components/form/VerificationCodeInput";
import ScreenLayout from "../../../components/layout/Screen";
import AppImage from "../../../components/AppImage";
import Title from "../../../components/Text/Title";
import Form from "../../../components/form/Form";
import Text from "../../../components/Text/Text";
import Button from "../../../components/Button";

import { ArrowLeft } from "lucide-react-native";
import { useRouter } from "expo-router";

import icon from "../../../assets/logos/icon.png";

export default function RecoveryCodeScreen() {

    const router = useRouter();
    const { theme } = useTheme();
    const { width } = useWindowDimensions();

    const [buttonsDisabled, setButtonsDisabled] = useState(false);

    const handleSubmit = async (values) => {
        const { code } = values;

        console.log(code);
        setButtonsDisabled(true);
    };

    const form = useForm({
        onSubmit: handleSubmit
    });

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
            <Form style={styles.container} form={form}>
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

                    <VerificationCodeInput
                        style={{ marginTop: theme.spacing.md }}
                        required
                        requiredMessage="Ingresa el código de verificación."
                        name="code"
                        length={6}
                        mode="numeric"
                        label="Código de verificación"
                        disabled={form.isSubmitting || buttonsDisabled}
                    />
                    <View
                        style={{ width: "100%", alignItems: "start", marginTop: theme.spacing.xl }}
                    >
                        <Button onPress={form.submit} style={styles.button} disabled={form.isSubmitting || buttonsDisabled}>Verificar código</Button>
                    </View>
                </View>
                <Button disabled={buttonsDisabled} onPress={() => router.back()} variant="ghost" iconLeft={ArrowLeft}>Volver atras</Button>

            </Form>
        </ScreenLayout>
    );
}
