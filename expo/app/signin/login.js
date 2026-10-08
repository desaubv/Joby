import { StyleSheet, useWindowDimensions, View } from "react-native";
import AppImage from "../../components/AppImage";

import { useTheme } from "../../theme/useTheme";

import ScreenLayout from "../../components/layout/Screen";
import icon from "../../assets/logos/icon.png";
import Text from "../../components/Text/Text";
import Button from "../../components/Button";
import Title from "../../components/Text/Title";
import Input from "../../components/form/Input";
import Line from "../../components/layout/Line";

import { Mail, Lock, EyeOff, Eye } from "lucide-react-native";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";


export default function LoginScreen() {

    const { theme } = useTheme();
    const { width } = useWindowDimensions();

    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
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
                    <Title style={{ textAlign: "start" }}>Iniciar Sesión</Title>
                    <Text style={{ marginBottom: theme.spacing.md, marginTop: -theme.spacing.sm }} variant="secondary">Ingresa tu cuenta para continuar.</Text>

                    <Input
                        placeholder="Correo electrónico"
                        type="email"
                        iconLeft={Mail}
                        style={styles.input}

                        regex={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
                        warning="Ingresa un correo electrónico válido."


                        value={email}
                        onChangeText={setEmail}
                    />

                    <Input
                        style={styles.input}
                        placeholder="Contraseña"
                        secureTextEntry={!showPassword}

                        value={password}
                        onChangeText={setPassword}

                        regex={/^(?=.*[A-Z])(?=.*\d).{6,}$/}
                        warning="Mínimo 6 caracteres, una mayúscula y un número."

                        iconLeft={Lock}
                        iconRight={showPassword ? EyeOff : Eye}
                        onIconRightPress={() => setShowPassword(!showPassword)}
                    />
                    <View
                        style={{ width: "100%", alignItems: "flex-end", marginBottom: theme.spacing.md }}
                    >
                        <Button href="signin/recovery" variant="ghost">¿Olvidaste tu contraseña?</Button>
                    </View>
                    <Button style={styles.button}>Iniciar Sesión</Button>
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
                    <Button style={styles.button} variant="secondary" iconLeft={GoogleIcon}>Google</Button>
                </View>

                <View style={styles.bottomContainer}>
                    <Text style={{ textAlign: "center" }}>
                        ¿No tienes cuenta?
                    </Text>
                    <Button style={{ margin: 0, padding: 0 }} href="signin/register" variant="ghost">Regístrate</Button>
                </View>

            </View>
        </ScreenLayout>
    );
}

const GoogleIcon = ({
    size = 20,
    color = theme.colors.text.primary,
}) => {
    return (
        <AntDesign
            name="google"
            size={size}
            color={color}
        />
    );
};
