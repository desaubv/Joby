import { ScrollView, StyleSheet, useWindowDimensions, View } from "react-native";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "expo-router";

import { useTheme } from "theme/useTheme";

import VerificationCodeInput from "components/form/VerificationCodeInput";
import ScreenLayout from "components/layout/Screen";
import Stepper from "components/layout/Stepper";
import Title from "components/Text/Title";
import Input from "components/form/Input";
import Select from "components/form/Select";
import Bold from "components/Text/Bold";
import Text from "components/Text/Text";
import Button from "components/ui/Button";
import Form from "components/form/Form";

import { ChevronLeft } from "lucide-react-native";
import useForm from "components/form/useForm";
import FileUpload from "components/form/FileUpload";
import { selectOptions } from "../../../constants/selectOptions";
import { isEmpty } from "services/utilities";

export default function RegisterCompanyScreen() {

    const router = useRouter();
    const { theme } = useTheme();
    const { width } = useWindowDimensions();
    const [company, setCompany] = useState({});

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.surface,
            flexDirection: "column",

            width: width >= 768
                ? "35%"
                : "100%",

            minHeight: "100%",

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
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Button onPress={() => router.back()} icon={ChevronLeft} iconSize={30} variant="ghost" />

                        <Title style={{ textAlign: "center", marginTop: theme.spacing.sm }}>Crear cuenta de empresa</Title>

                        <Button icon={ChevronLeft} iconSize={30} disabled style={{ opacity: 0 }} variant="ghost" />
                    </View>

                    <View style={styles.basicContainer}>
                        <Stepper
                            ref={stepperRef}
                            showNavigation={false}
                        >
                            <Stepper.Step
                                component={<BasicData company={company} setCompany={setCompany} ref={stepperRef} />}
                            />

                            <Stepper.Step
                                component={<ValidateEmail company={company} setCompany={setCompany} ref={stepperRef} />}
                            />

                            <Stepper.Step
                                component={<InformationData company={company} setCompany={setCompany} ref={stepperRef} />}
                            />

                            <Stepper.Step
                                component={<AdminAccount company={company} setCompany={setCompany} ref={stepperRef} />}
                            />

                            <Stepper.Step
                                component={<ImageData company={company} setCompany={setCompany} ref={stepperRef} />}
                            />

                            <Stepper.Step
                                component={<CreateCompany company={company} setCompany={setCompany} ref={stepperRef} />}
                            />
                        </Stepper>
                    </View>

                </View>
            </ScrollView>
        </ScreenLayout>
    );
}

function BasicData({ setCompany, company, ref }) {
    const { theme } = useTheme();
    const { width } = useWindowDimensions();

    const handleSubmit = async (data) => {
        if (data.email !== company.email) {
            delete data.code;
            delete data.isMailVerified;
        }

        setCompany(data);
        ref.current?.next();
    };

    const form = useForm({
        initialValues: company,
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
                <Title style={{ textAlign: "start" }}>Información básica</Title>
                <Text style={{ marginBottom: theme.spacing.md, marginTop: -theme.spacing.sm }} variant="secondary">Comencemos con lo básico. Necesitamos algunos datos de tu empresa.</Text>

                <Input
                    required
                    requiredMessage="Es necesario ingresar el nombre de la empresa."
                    name="name"
                    label="Nombre de la empresa"
                    placeholder="Ej. Tech Solutions S.A. de C.V."
                    style={styles.input}
                />

                <Input
                    required
                    requiredMessage="Es necesario ingresar el RFC de la empresa."
                    name="rfc"
                    label="RFC"
                    placeholder="XAXX01010100"
                    regex={/^[A-ZÑ&]{3}\d{6}[A-Z0-9]{3}$/i}
                    regexMessage="Debes ingresar un RFC válido."
                    transformFunction={(value) => value.toUpperCase().slice(0, 12)}
                    style={styles.input}

                />

                <Input
                    required
                    name="email"
                    requiredMessage="Es necesario ingresar un correo electrónico."
                    placeholder="Ej. empresa@correo.com"
                    label="Correo de contacto"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.input}
                    regex={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
                    regexMessage="Ingresa un correo electrónico válido."
                />

                <View style={styles.bottomContainer}>
                    <Button style={styles.nextButton} onPress={form.submit}>Continuar</Button>
                </View>
            </Form>


        </View>
    )
}

function ValidateEmail({ ref, setCompany, company }) {
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
            setCompany({ ...company, code });

            // Despues de la validación
            ref.current?.next();
        }

        setErrorCode(true);
        setButtonsDisabled(false);

    };

    const form = useForm({
        initialValues: {
            code: company.code,
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
                <Text style={{ marginBottom: theme.spacing.md, marginTop: -theme.spacing.sm }} variant="secondary">Te llegará un código a tu correo a <Bold>{company.email}</Bold>, proporcionalo enseguida por favor.</Text>

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

function InformationData({ setCompany, company, ref }) {
    const { theme } = useTheme();
    const { width } = useWindowDimensions();

    const handleSubmit = async (data) => {
        setCompany({ ...company, ...data });
        ref.current?.next();
    };

    const form = useForm({
        initialValues: company,
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
                <Title style={{ textAlign: "start" }}>Información de la empresa</Title>
                <Text style={{ marginBottom: theme.spacing.md, marginTop: -theme.spacing.sm }} variant="secondary">Cuéntanos un poco más sobre tu empresa.</Text>

                <Select
                    style={styles.input}
                    required
                    name="sector"
                    label="Sector o industria"
                    placeholder="Selecciona un opción"
                    options={selectOptions.sectorAreas}
                    requiredMessage="Selecciona un área de interés."

                    searchable
                    searchPlaceholder="Ingrese el área de interés"
                />

                <Select
                    style={styles.input}
                    required
                    name="companySize"
                    label="Tamaño de la empresa"
                    placeholder="Selecciona un opción"
                    options={selectOptions.companySizes}
                    requiredMessage="Selecciona un área de interés."
                />

                <Input
                    style={styles.input}
                    label="Sitio web (opcional)"
                    name="website"
                    placeholder="https://www.tuempresa.com"
                    keyboardType="url"

                    regex={/^(?:\d{10}|\+52\d{10})$/}
                    regexMessage="Ingresa un número de teléfono válido."
                />

                <View style={styles.bottomContainer}>
                    <Button style={styles.nextButton} onPress={() => ref.current?.prev()} variant="secondary">Atras</Button>
                    <Button style={styles.nextButton} onPress={form.submit}>Continuar</Button>
                </View>
            </Form>


        </View>
    )
}

function AdminAccount({ setCompany, company, ref }) {
    const { theme } = useTheme();
    const { width } = useWindowDimensions();

    const handleSubmit = async (data) => {
        setCompany({ ...company, admin: data });
        ref.current?.next();
    };

    const form = useForm({
        initialValues: company.admin,
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
                <Title style={{ textAlign: "start" }}>Cuenta de administrador</Title>
                <Text style={{ marginBottom: theme.spacing.md, marginTop: -theme.spacing.sm }} variant="secondary">Crea la cuenta de la persona que gestionará la empresa en Joby.</Text>

                <Input
                    required
                    requiredMessage="Es necesario ingresar tu nombre."
                    name="name"
                    label="Nombre completo"
                    placeholder="Ej. Ana garcia"
                    style={styles.input}
                />

                <Input
                    required
                    requiredMessage="Es necesario ingresar tu nombre."
                    name="position"
                    label="Cargo"
                    placeholder="Ej. Gerente de RR. HH."
                    style={styles.input}
                />

                <Input
                    label="Teléfono (opcional)"
                    name="phone"
                    type="email"
                    keyboardType="phone-pad"
                    placeholder="+52 12 3456 7890"
                    style={styles.input}

                    regex={/^(?:\d{10}|\+52\d{10})$/}
                    regexMessage="Ingresa un número de teléfono válido."
                />

                <FileUpload
                    name="adminPicture"
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
                />

                <View style={styles.bottomContainer}>
                    <Button style={styles.nextButton} onPress={() => ref.current?.prev()} variant="secondary">Atras</Button>
                    <Button style={styles.nextButton} onPress={form.submit}>Continuar</Button>
                </View>
            </Form>


        </View>
    )
}

function ImageData({ setCompany, company, ref }) {
    const { theme } = useTheme();
    const { width } = useWindowDimensions();

    const handleSubmit = async (logo) => {
        console.log(logo);
        
        if (logo.length > 0) {
            setCompany({ ...company, ...logo });

        }

        ref.current?.next();
    };

    const form = useForm({
        initialValues: company,
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
                <Title style={{ textAlign: "start" }}>Sube un logotipo de tu empresa</Title>

                <FileUpload
                    name="logo"
                    style={{ marginBottom: theme.spacing.md }}
                    label="Selecciona tu logo"
                    description="Adjunta tu logotipo, esto es opcional y puedes hacerlo más adelante."
                    accept={[
                        ".pdf",
                        ".png",
                        ".jpg",
                        ".jpeg",
                        "image/png",
                        "image/jpeg",
                    ]}
                    maxSizeMB={5}
                />

                <View style={styles.bottomContainer}>
                    <Button style={styles.nextButton} onPress={() => ref.current?.prev()} variant="secondary">Atras</Button>
                    <Button style={styles.nextButton} onPress={form.submit}>{isEmpty(form.values.picture) ? "Omitir" : "Continuar"}</Button>
                </View>
            </Form>


        </View>
    )
}

function CreateCompany({ setCompany, company, ref }) {
    const { theme } = useTheme();
    const { width } = useWindowDimensions();

    const handleSubmit = async (data) => {
        ref.current?.next();
    };

    const form = useForm({
        initialValues: company,
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
                    <Button style={styles.nextButton} onPress={form.submit}>Crear cuenta</Button>
                    <Button style={styles.nextButton} onPress={ref.current?.prev()} variant="ghost">Atras</Button>
                </View>
            </Form>


        </View>
    )
}