import { StyleSheet, useWindowDimensions, View } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

import { useTheme } from "../../../theme/useTheme";

import ScreenLayout from "../../../components/layout/Screen";
import RadioCard from "../../../components/form/RadioCard";
import Bold from "../../../components/Text/Bold";
import Title from "../../../components/Text/Title";
import Text from "../../../components/Text/Text";
import Button from "../../../components/Button";

import { ChevronLeft, User, BuildingComplex, Mail } from "lucide-react-native";
import Stepper from "../../../components/layout/Stepper";
import Input from "../../../components/form/Input";
import VerificationCodeInput from "../../../components/form/VerificationCodeInput";

export default function RegisterUserScreen() {

    const router = useRouter();
    const { theme } = useTheme();
    const { width } = useWindowDimensions();

    const [accountType, setAccoundType] = useState("user");


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
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: theme.spacing.md
        },

        titleContainer: {
            marginTop: theme.spacing.xl,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
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

                    <Title style={{ textAlign: "center", marginTop: theme.spacing.sm }}>Crear cuenta</Title>

                    <Button icon={ChevronLeft} iconSize={30} disabled style={{ opacity: 0 }} variant="ghost" />
                </View>

                <View style={styles.basicContainer}>
                    <Stepper>
                        <Stepper.Step
                            component={<PersonalData />}
                        />
                        <Stepper.Step
                            component={<ValidateEmail user={{email: "lorem@ipsum.com"}}/>}
                            
                        />
                        <Stepper.Step 
                            component={<ProfesionalData/>}
                        />
                        <Stepper.Step />
                        <Stepper.Step />
                    </Stepper>
                </View>

                <View style={[styles.basicContainer, { gap: 15 }]}>

                </View>

            </View>
        </ScreenLayout>
    );
}

function PersonalData({ user }) {
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
            justifyContent: "start",

            borderRadius: theme.radius.lg
        },

        header: {
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: theme.spacing.md
        },

        titleContainer: {
            marginTop: theme.spacing.xl,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
        },


        basicContainer: {
            width: "100%",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "start",
        },

        label: {
            color: theme.colors.text.text
        },

        input: {
            width: "100%",
            marginTop: theme.spacing.xs,
            marginBottom: theme.spacing.md
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
        <View style={[styles.basicContainer, { gap: 15 }]}>

            <View style={styles.basicContainer}>
                <Title style={{ textAlign: "start" }}>Datos Personales</Title>
                <Text style={{ marginBottom: theme.spacing.md, marginTop: -theme.spacing.sm }} variant="secondary">Cuéntanos un poco sobre ti.</Text>

                <Input
                    label="Nombre(s)*"
                    placeholder="Ej. Juan"
                    style={styles.input}
                />

                <Text style={styles.label}>Apellido(s) <Bold>*</Bold></Text>
                <Input
                    label="Apellido(s)*"
                    placeholder="Ej. Pérez"
                    style={styles.input}
                />

                <Text style={styles.label}>Correo electrónico <Bold>*</Bold></Text>
                <Input
                    placeholder="tu@correo.com"
                    type="email"
                    style={styles.input}

                    regex={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
                    warning="Ingresa un correo electrónico válido."
                />

                <Text style={styles.label}>Teléfono (opcional)</Text>
                <Input
                    placeholder="+52 12 3456 7890"
                    type="email"
                    style={styles.input}

                    regex={/^(?:\d{10}|\+52\d{10})$/}
                    warning="Ingresa un número de teléfono válido."
                />
            </View>

        </View>
    )
}

function ValidateEmail({ user }) {
    const { theme } = useTheme();
    const { width } = useWindowDimensions();

    const [ code, setCode ] = useState("");

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
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: theme.spacing.md
        },

        titleContainer: {
            marginTop: theme.spacing.xl,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
        },


        basicContainer: {
            width: "100%",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "start",
        },

        label: {
            color: theme.colors.text.text
        },

        input: {
            width: "100%",
            marginTop: theme.spacing.xs,
            marginBottom: theme.spacing.md
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
        <View style={[styles.basicContainer, { gap: 15 }]}>

            <View style={styles.basicContainer}>
                <Title style={{ textAlign: "start" }}>Valida tu correo electronico</Title>
                <Text style={{ marginBottom: theme.spacing.md, marginTop: -theme.spacing.sm }} variant="secondary">Te llegará un código a tu correo a <Bold>{user.email}</Bold>, proporcionalo enseguida por favor.</Text>

                <VerificationCodeInput
                    style={{marginTop: theme.spacing.md}}
                    value={code}
                    onChangeText={setCode}
                    length={6}
                    mode="numeric"
                    label="Código de verificación"
                    onComplete={(value) => {
                        console.log("Código completo:", value);
                    }}
                />
            </View>

        </View>
    )
}

function ProfesionalData({ user }) {
    const { theme } = useTheme();
    const { width } = useWindowDimensions();


    const cities = [
        { label: "Guadalajara", value: "guadalajara" },
        { label: "Ciudad de México", value: "cdmx" },
        { label: "Monterrey", value: "monterrey" },
        { label: "Puebla", value: "puebla" },
        { label: "Querétaro", value: "queretaro" },
    ];

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
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: theme.spacing.md
        },

        titleContainer: {
            marginTop: theme.spacing.xl,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
        },


        basicContainer: {
            width: "100%",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "start",
        },

        label: {
            color: theme.colors.text.text
        },

        input: {
            width: "100%",
            marginTop: theme.spacing.xs,
            marginBottom: theme.spacing.md
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
        <View style={[styles.basicContainer, { gap: 15 }]}>

            <View style={styles.basicContainer}>
                <Title style={{ textAlign: "start" }}>Información profesional</Title>
                <Text style={{ marginBottom: theme.spacing.md, marginTop: -theme.spacing.sm }} variant="secondary">Cuéntanos un poco sobre tu historia.</Text>

                <Text style={styles.label}>Nombre(s) <Bold>*</Bold></Text>
                <Input
                    placeholder="Ej. Juan"
                    style={styles.input}
                    
                />

                <Text style={styles.label}>Apellido(s) <Bold>*</Bold></Text>
                <Input
                    placeholder="Ej. Pérez"
                    style={styles.input}
                />

                <Text style={styles.label}>Correo electrónico <Bold>*</Bold></Text>
                <Input
                    placeholder="tu@correo.com"
                    type="email"
                    style={styles.input}

                    regex={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
                    warning="Ingresa un correo electrónico válido."
                />

                <Text style={styles.label}>Teléfono (opcional)</Text>
                <Input
                    placeholder="+52 12 3456 7890"
                    type="email"
                    style={styles.input}

                    regex={/^(?:\d{10}|\+52\d{10})$/}
                    warning="Ingresa un número de teléfono válido."
                />
            </View>

        </View>
    )
}