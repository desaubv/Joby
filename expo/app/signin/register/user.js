import { StyleSheet, useWindowDimensions, View } from "react-native";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "expo-router";

import { useTheme } from "../../../theme/useTheme";

import VerificationCodeInput from "../../../components/form/VerificationCodeInput";
import ScreenLayout from "../../../components/layout/Screen";
import Stepper from "../../../components/layout/Stepper";
import Title from "../../../components/Text/Title";
import Input from "../../../components/form/Input";
import Select from "../../../components/form/Select";
import Bold from "../../../components/Text/Bold";
import Text from "../../../components/Text/Text";
import Button from "../../../components/Button";
import Form from "../../../components/form/Form";

import { ChevronLeft } from "lucide-react-native";
import useForm from "../../../components/form/useForm";
import FileUpload from "../../../components/form/FileUpload";

export default function RegisterUserScreen() {

    const router = useRouter();
    const { theme } = useTheme();
    const { width } = useWindowDimensions();
    const [user, setUser] = useState({});

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

    const stepperRef = useRef(null);

    return (
        <ScreenLayout centered>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Button onPress={() => router.back()} icon={ChevronLeft} iconSize={30} variant="ghost" />

                    <Title style={{ textAlign: "center", marginTop: theme.spacing.sm }}>Crear cuenta</Title>

                    <Button icon={ChevronLeft} iconSize={30} disabled style={{ opacity: 0 }} variant="ghost" />
                </View>

                <View style={styles.basicContainer}>
                    <Stepper
                        ref={stepperRef}
                        showNavigation={false}
                    >
                        <Stepper.Step
                            component={<PersonalData user={user} setUser={setUser} ref={stepperRef} />}
                        />

                        <Stepper.Step
                            component={<ValidateEmail user={user} setUser={setUser} ref={stepperRef} />}
                        />

                        <Stepper.Step
                            component={<ProfesionalData user={user} setUser={setUser} ref={stepperRef} />}
                        />

                        <Stepper.Step
                            component={<ImageData user={user} setUser={setUser} ref={stepperRef} />}
                        />

                        <Stepper.Step
                            component={<CreateUser user={user} setUser={setUser} ref={stepperRef} />}
                        />
                    </Stepper>
                </View>

            </View>
        </ScreenLayout>
    );
}

function PersonalData({ setUser, user, ref }) {
    const { theme } = useTheme();
    const { width } = useWindowDimensions();

    const handleSubmit = async (data) => {
        if (data.email !== user.email) {
            delete data.code;
            delete data.isMailVerified;
        }

        setUser(data);
        ref.current?.next();
    };

    const form = useForm({
        initialValues: user,
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
            width: "100%",
            gap: 15,
            flex: 1,
            alignItems: "flex-end",
            marginBottom: theme.spacing.xl
        },

        nextButton: {
            width: "45%"
        },

        button: {
            width: "100%",
        }
    });

    return (
        <View style={[styles.basicContainer]}>

            <Form style={styles.basicContainer} form={form}>
                <Title style={{ textAlign: "start" }}>Datos Personales</Title>
                <Text style={{ marginBottom: theme.spacing.md, marginTop: -theme.spacing.sm }} variant="secondary">Cuéntanos un poco sobre ti.</Text>

                <Input
                    required
                    requiredMessage="Es necesario ingresar tu nombre."
                    name="name"
                    label="Nombre(s)"
                    placeholder="Ej. Juan"
                    style={styles.input}
                />

                <Input
                    required
                    requiredMessage="Es necesario ingresar tu apellido."
                    name="lastname"
                    label="Apellido(s)"
                    placeholder="Ej. Pérez"
                    style={styles.input}
                />

                <Input
                    required
                    name="email"
                    requiredMessage="Es necesario ingresar un correo electrónico."
                    placeholder="Correo electrónico"
                    label="Correo electrónico"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.input}
                    regex={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
                    warning="Ingresa un correo electrónico válido."
                />

                <Input
                    label="Teléfono (opcional)"
                    name="phone"
                    type="email"
                    keyboardType="phone-pad"
                    placeholder="+52 12 3456 7890"
                    style={styles.input}

                    regex={/^(?:\d{10}|\+52\d{10})$/}
                    warning="Ingresa un número de teléfono válido."
                />

                <View style={styles.bottomContainer}>
                    <Button style={styles.nextButton} onPress={form.submit}>Continuar</Button>
                </View>
            </Form>


        </View>
    )
}

function ValidateEmail({ ref, setUser, user }) {
    const { theme } = useTheme();
    const { width } = useWindowDimensions();

    const [buttonsDisabled, setButtonsDisabled] = useState(false);
    const [errorCode, setErrorCode] = useState(false);

    const handleSubmit = async (data) => {
        const { code } = data;
        const testCode = "123654";

        if (data.isMailVerified) {
            ref.current?.next();
        }

        setErrorCode(false);
        setButtonsDisabled(true);
        if (code === testCode) {
            data.isMailVerified = true;
            setUser({ ...user, code });

            // Despues de la validación
            ref.current?.next();
        }

        setErrorCode(true);
        setButtonsDisabled(false);

    };

    const form = useForm({
        initialValues: {
            code: user.code,
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

        errorLabel: {
            color: theme.colors.error,
            marginTop: theme.spacing.sm,
            marginBottom: theme.spacing.lg,
            alignSelf: "center",
            fontWeight: "700"
        },

        input: {
            width: "100%",
            marginTop: theme.spacing.xs,
            marginBottom: theme.spacing.md
        },

        bottomContainer: {
            width: "100%",
            gap: 15,
            flex: 1,
            flexDirection: "row",

            justifyContent: "space-around",
            marginBottom: theme.spacing.xl
        },

        nextButton: {
            width: "45%"
        },

        button: {
            width: "100%",
        }
    });

    return (
        <View style={[styles.basicContainer, { gap: 15 }]}>

            <Form style={styles.basicContainer} form={form}>
                <Title style={{ textAlign: "start" }}>Valida tu correo electronico</Title>
                <Text style={{ marginBottom: theme.spacing.md, marginTop: -theme.spacing.sm }} variant="secondary">Te llegará un código a tu correo a <Bold>{user.email}</Bold>, proporcionalo enseguida por favor.</Text>

                <VerificationCodeInput
                    style={{ marginTop: theme.spacing.md, maxWidth: "100%" }}
                    required
                    name="code"
                    requiredMessage="Ingresa el código de verificación."
                    length={6}
                    mode="numeric"
                    label="Código de verificación"
                    disabled={form.isSubmitting || buttonsDisabled}
                />

                <Text style={styles.errorLabel}>{errorCode ? "El código ingresado no es correcto" : ""}</Text>

                <View style={styles.bottomContainer}>
                    <Button style={styles.nextButton} onPress={() => ref.current?.prev()} variant="secondary">Atras</Button>
                    <Button style={styles.nextButton} disabled={buttonsDisabled} onPress={form.submit}>Continuar</Button>
                </View>
            </Form>

        </View>
    )
}

function ProfesionalData({ setUser, user, ref }) {
    const { theme } = useTheme();
    const { width } = useWindowDimensions();

    const handleSubmit = async (data) => {
        console.log({ ...user, ...data });

        setUser({ ...user, ...data });
        ref.current?.next();
    };

    const form = useForm({
        initialValues: user,
        onSubmit: handleSubmit
    });

    const experienceLevels = [
        { label: "Sin experiencia", value: "no_experience" },
        { label: "Prácticas profesionales", value: "internship" },
        { label: "Nivel inicial (Junior)", value: "junior" },
        { label: "Nivel intermedio (Mid-level)", value: "mid_level" },
        { label: "Nivel avanzado (Senior)", value: "senior" },
        { label: "Especialista", value: "specialist" },
        { label: "Liderazgo o gerencia", value: "leadership" },
    ];

    const educationLevels = [
        { label: "Sin estudios formales", value: "none" },
        { label: "Educación primaria", value: "primary" },
        { label: "Educación secundaria", value: "secondary" },
        { label: "Bachillerato o preparatoria", value: "high_school" },
        { label: "Carrera técnica", value: "technical" },
        { label: "Técnico Superior Universitario (TSU)", value: "associate" },
        { label: "Licenciatura o ingeniería", value: "bachelor" },
        { label: "Especialidad", value: "specialty" },
        { label: "Maestría", value: "master" },
        { label: "Doctorado", value: "doctorate" },
    ];

    const interestAreas = [
        { label: "Tecnologías de la información", value: "it" },
        { label: "Programación y desarrollo de software", value: "software_development" },
        { label: "Inteligencia artificial y ciencia de datos", value: "ai_data_science" },
        { label: "Diseño gráfico y UX/UI", value: "design_ux_ui" },
        { label: "Administración y gestión empresarial", value: "administration" },
        { label: "Atención al cliente", value: "customer_service" },
        { label: "Ventas y comercio", value: "sales" },
        { label: "Marketing y comunicación", value: "marketing" },
        { label: "Recursos humanos", value: "human_resources" },
        { label: "Contabilidad y finanzas", value: "accounting_finance" },
        { label: "Educación y capacitación", value: "education" },
        { label: "Ingeniería y manufactura", value: "engineering" },
        { label: "Logística y transporte", value: "logistics" },
        { label: "Salud y bienestar", value: "health_wellness" },
        { label: "Servicios jurídicos", value: "legal_services" },
        { label: "Oficios y mantenimiento", value: "trades_maintenance" },
        { label: "Turismo y hospitalidad", value: "tourism_hospitality" },
        { label: "Trabajo social y atención comunitaria", value: "social_work" },
        { label: "Investigación y desarrollo", value: "research_development" },
        { label: "Otra área", value: "other" },
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
            width: "100%",
            gap: 15,
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-around",
            marginBottom: theme.spacing.xl
        },

        nextButton: {
            width: "45%"
        },

        button: {
            width: "100%",
        }
    });

    return (
        <View style={[styles.basicContainer]}>

            <Form style={styles.basicContainer} form={form}>
                <Title style={{ textAlign: "start" }}>Información profesional</Title>
                <Text style={{ marginBottom: theme.spacing.md, marginTop: -theme.spacing.sm }} variant="secondary">Completa tu perfil profesional.</Text>

                <Select
                    style={styles.input}
                    required
                    name="interest"
                    label="Área de interés"
                    placeholder="Selecciona un opción"
                    options={interestAreas}
                    requiredMessage="Selecciona un área de interés."
                    
                    searchable
                    searchPlaceholder="Ingrese el área de interés"
                />

                <Select
                    style={styles.input}
                    required
                    name="experience"
                    label="Nivel de experiencia"
                    placeholder="Selecciona un opción"
                    options={experienceLevels}
                    requiredMessage="Selecciona un área de interés."
                    searchable
                    searchPlaceholder="Ingrese el nivel de experiencia"
                />

                <Select
                    style={styles.input}
                    required
                    name="education"
                    label="Estudios"
                    placeholder="Selecciona un opción"
                    options={educationLevels}
                    requiredMessage="Selecciona tu nivel de estudios."
                />

                <Input
                    label="¿Tienes alguna habilidad especial?"
                    name="hability"
                    placeholder="Ej. Python, diseño, idomas, etc... (opcional)"
                    style={styles.input}

                    regex={/^(?:\d{10}|\+52\d{10})$/}
                    warning="Ingresa un número de teléfono válido."
                />

                <View style={styles.bottomContainer}>
                    <Button style={styles.nextButton} onPress={() => ref.current?.prev()} variant="secondary">Atras</Button>
                    <Button style={styles.nextButton} onPress={form.submit}>Continuar</Button>
                </View>
            </Form>


        </View>
    )
}

function ImageData({ setUser, user, ref }) {
    const { theme } = useTheme();
    const { width } = useWindowDimensions();

    const [pic, setPic] = useState([]);

    useEffect(() => {
        const getPic = () => {
            console.log(pic);
        }

        getPic();

    }, pic);

    const handleSubmit = async (picture) => {
        if (picture.length > 0) {
            setUser({ ...user, ...picture });

        }
        console.log({ ...user, ...picture });

        ref.current?.next();
    };

    const form = useForm({
        initialValues: user,
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
            width: "100%",
            gap: 15,
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-around",
            marginBottom: theme.spacing.xl
        },

        nextButton: {
            width: "45%"
        },

        button: {
            width: "100%",
        }
    });

    return (
        <View style={[styles.basicContainer]}>

            <Form style={styles.basicContainer} form={form}>
                <Title style={{ textAlign: "start" }}>Sube tu foto de perfil</Title>

                <FileUpload
                    name="picture"
                    style={{ marginBottom: theme.spacing.md }}
                    label="Selecciona tu foto de perfil"
                    description="Adjunta tu fotografia, esto es opcional y puedes hacerlo más adelante."
                    accept={[
                        ".pdf",
                        ".png",
                        ".jpg",
                        ".jpeg",
                        "image/png",
                        "image/jpeg",
                    ]}
                    maxSizeMB={5}
                    onFilesChange={(pictures) => setPic(pictures)}
                />

                <View style={styles.bottomContainer}>
                    <Button style={styles.nextButton} onPress={() => ref.current?.prev()} variant="secondary">Atras</Button>
                    <Button style={styles.nextButton} onPress={form.submit}>{pic.length ? "Omitir" : "Continuar"}</Button>
                </View>
            </Form>


        </View>
    )
}

function CreateUser({ setUser, user, ref }) {
    const { theme } = useTheme();
    const { width } = useWindowDimensions();

    const handleSubmit = async (picture) => {
        if (picture.length > 0) {
            setUser({ ...user, ...picture });

        }
        console.log({ ...user, ...picture });

        ref.current?.next();
    };

    const form = useForm({
        initialValues: user,
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
            width: "100%",
            gap: 15,
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-around",
            marginBottom: theme.spacing.xl
        },

        nextButton: {
            width: "45%"
        },

        button: {
            width: "100%",
        }
    });

    return (
        <View style={[styles.basicContainer]}>

            <Form style={styles.basicContainer} form={form}>
                <Title style={{ textAlign: "start" }}>Creando usuario...</Title>


                <View style={styles.bottomContainer}>
                    <Button style={styles.nextButton} onPress={form.submit}>Continuar</Button>
                </View>
            </Form>


        </View>
    )
}