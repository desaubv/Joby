import { StyleSheet, useWindowDimensions, View } from "react-native";

import { useTheme } from "../../theme/useTheme";

import ScreenLayout from "../../components/layout/Screen";
import AppImage from "../../components/AppImage";
import Bold from "../../components/Text/Bold";
import Text from "../../components/Text/Text";
import Button from "../../components/Button";

import banner from "../../assets/images/auth_banner.png";
import icon from "../../assets/logos/icon.png";

import { ArrowRight } from "lucide-react-native";

export default function LoggerScreen() {

    const { theme } = useTheme();
    const { width } = useWindowDimensions();

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
            justifyContent: "center",

            borderRadius: theme.radius.lg
        },

        logoContainer: {
            marginTop: theme.spacing.xl,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
        },

        logoText: {
            color: theme.colors.primary,
            fontSize: 50,
            fontWeight: 700
        },

        slogan: {
            color: theme.colors.primary,
            textAlign: "center",
            fontSize: theme.text.subheadingSize * 1.25,
            maxWidth: "55%",
            marginBottom: 45
        },

        phrase: {
            maxWidth: "85%",
            marginBottom: -20,
            textAlign: "center",
            zIndex: 5
        },

        bottomContainer: {
            width: theme.size.lg,
            gap: 15,
            marginTop: "auto",
            marginBottom: theme.spacing.lg
        }
    });

    return (
        <ScreenLayout centered>
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <AppImage
                        source={icon}
                        size={85}
                    />
                    <Text style={styles.logoText}>Joby</Text>
                </View>
                <Bold style={styles.slogan}>Tu talento también mueve el mundo</Bold>
                <Text style={styles.phrase} variant="secondary">Conecta con oportunidades laborales y forma parte de una red profesional inclusiva.</Text>

                <AppImage
                    source={banner}
                    width="100%"
                    height="auto"
                    style={{
                        aspectRatio: 16 / 9
                    }}
                />

                <View style={styles.bottomContainer}>
                    <Button href="signin/login">Iniciar Sesión</Button>
                    <Button href="signin/register" variant="secondary">Crear cuenta</Button>

                    <Button href="signin/register/company" variant="ghost" iconRight={ArrowRight}>¿Eres una empresa?</Button>
                </View>

            </View>
        </ScreenLayout>
    );
}