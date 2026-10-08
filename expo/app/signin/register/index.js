import { StyleSheet, useWindowDimensions, View } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

import { useTheme } from "../../../theme/useTheme";

import ScreenLayout from "../../../components/layout/Screen";
import RadioCard from "../../../components/form/RadioCard";
import AppImage from "../../../components/AppImage";
import Title from "../../../components/Text/Title";
import icon from "../../../assets/logos/icon.png";
import Text from "../../../components/Text/Text";
import Button from "../../../components/Button";

import { ChevronLeft, User, BuildingComplex } from "lucide-react-native";

export default function RegisterScreen() {

    const router = useRouter();
    const { theme } = useTheme();
    const { width } = useWindowDimensions();

    const [ accountType, setAccoundType ] = useState("user");

    const handleContinue = () => {
        router.push("/signin/register/"+accountType);
    }

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

        header: {
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between"
        },

        logoContainer: {
            marginTop: theme.spacing.xl,
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
            marginTop: theme.spacing.lg
        },


        bottomContainer: {
            width: theme.size.xl,
            gap: 15,
            marginTop: "auto",
            marginBottom: theme.spacing.xl
        },

        button: {
            width: "100%",
        }
    });

    return (
        <ScreenLayout centered>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Button onPress={() => router.back()} icon={ChevronLeft} iconSize={30} variant="ghost" />

                    <View style={styles.logoContainer}>
                        <AppImage
                            source={icon}
                            size={65}
                        />
                        <Text style={styles.logoText}>Joby</Text>
                    </View>

                    <Button icon={ChevronLeft} iconSize={30} disabled style={{ opacity: 0 }} variant="ghost" />
                </View>

                <View style={styles.basicContainer}>
                    <Title style={{ textAlign: "start" }}>Crear cuenta</Title>
                    <Text style={{ marginBottom: theme.spacing.md, marginTop: -theme.spacing.sm }} variant="secondary">¿Qué tipo de cuenta quieres crear?</Text>
                </View>

                <View style={[styles.basicContainer, {gap: 15}]}>
                    <RadioCard
                        icon={User}
                        iconSize={40}
                        title="Candidato"
                        description="Busca y postúlate a empleos, conecta con profesionales y contruye tu red."
                        selected={accountType=="user"}
                        onPress={() => setAccoundType("user")}
                    />
                    
                    <RadioCard
                        icon={BuildingComplex}
                        iconSize={40}
                        title="Empresa"
                        description="Publica vacantes, encuentra talentro y haz crecer tu equipo.."
                        selected={accountType=="company"}
                        onPress={() => setAccoundType("company")}

                    />

                </View>



                <View style={styles.bottomContainer}>
                    <Button onPress={handleContinue}>Continuar</Button>
                </View>

            </View>
        </ScreenLayout>
    );
}
