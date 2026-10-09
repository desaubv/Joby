import { useState } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";

import { useTheme } from "../../theme/useTheme";
import useForm from "../../components/form/useForm";

import ScreenLayout from "../../components/layout/Screen";
import AppImage from "../../components/AppImage";
import Title from "../../components/Text/Title";
import Input from "../../components/form/Input";
import Line from "../../components/layout/Line";
import icon from "../../assets/logos/icon.png";
import Text from "../../components/Text/Text";
import Form from "../../components/form/Form";
import Button from "../../components/Button";

import { Mail, Lock, EyeOff, Eye } from "lucide-react-native";
import { AntDesign } from "@expo/vector-icons";

export default function LoginScreen() {
    const { theme } = useTheme();
    const { width } = useWindowDimensions();

    const [showPassword, setShowPassword] = useState(false);
    const [ buttonsDisabled, setButtonsDisabled ] = useState(false);

    const handleSubmit = async (values) => {
        const { email, password } = values;

        console.log(email, password);
        setButtonsDisabled(true);

    };

    const form = useForm({
        initialValues: {
            email: "",
            password: "",
        },
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
            marginTop: "auto",
            marginBottom: theme.spacing.lg
        },

        button: {
            width: "100%",
        }
    });

    return (
        <ScreenLayout centered>
            <Form
                form={form}
                style={styles.container}
            >
                <View style={styles.logoContainer}>
                    <AppImage
                        source={icon}
                        size={65}
                    />
                    <Text style={styles.logoText}>Joby</Text>
                </View>


                <View style={styles.basicContainer}>
                    <Title style={{ textAlign: "start" }}>Iniciar Sesión</Title>
                    <Text style={{ marginBottom: theme.spacing.md, marginTop: -theme.spacing.sm }} variant="secondary">Ingresa tu cuenta para continuar.</Text>


                    <Input
                        name="email"
                        required
                        requiredMessage="Es necesario ingresar un correo electrónico."
                        placeholder="Correo electrónico"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        iconLeft={Mail}
                        style={styles.input}
                        regex={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
                        warning="Ingresa un correo electrónico válido."
                        disabled={buttonsDisabled}
                    />

                    <Input
                        name="password"
                        required
                        requiredMessage="Es necesario ingresar la contraseña."
                        placeholder="Contraseña"
                        secureTextEntry={!showPassword}
                        regex={/^(?=.*[A-Z])(?=.*\d).{6,}$/}
                        warning="Mínimo 6 caracteres, una mayúscula y un número."
                        style={styles.input}
                        iconLeft={Lock}
                        iconRight={showPassword ? EyeOff : Eye}
                        onIconRightPress={() => setShowPassword(!showPassword)}
                        disabled={buttonsDisabled}
                    />

                    <View
                        style={{ width: "100%", alignItems: "flex-end", marginBottom: theme.spacing.md }}
                    >
                        <Button disabled={buttonsDisabled} href="signin/recovery" variant="ghost">¿Olvidaste tu contraseña?</Button>
                    </View>
                    <Button
                        style={styles.button}
                        onPress={form.submit}
                        disabled={form.isSubmitting || buttonsDisabled}
                    >Iniciar Sesión</Button>
                </View>

                <Line
                    width={theme.size.xl}
                    color={theme.colors.text.secondary}
                    textColor={theme.colors.text.secondary}
                    thickness={1}
                    text="O continúa con"
                    style={{ marginTop: theme.spacing.lg }}
                />

                <View style={styles.basicContainer}>
                    <Button disabled={buttonsDisabled} style={styles.button} variant="secondary" iconLeft={GoogleIcon}>Google</Button>
                </View>

                <View style={styles.bottomContainer}>
                    <Text style={{ textAlign: "center" }}>
                        ¿No tienes cuenta?
                    </Text>
                    <Button disabled={buttonsDisabled} style={{ margin: 0, padding: 0 }} href="signin/register" variant="ghost">Regístrate</Button>
                </View>

            </Form>
        </ScreenLayout>
    );
}

const GoogleIcon = ({ size = 20, color }) => {
    const { theme } = useTheme();

    return (
        <AntDesign
            name="google"
            size={size}
            color={color ?? theme.colors.text.primary}
        />
    );
};