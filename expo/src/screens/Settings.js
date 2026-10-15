import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from 'theme/useTheme';
import { useRouter } from 'expo-router';

import BasicLayout from 'components/layout/Basic';
import ActionRow from 'components/ui/ActionRow';
import Line from 'components/layout/Line';
import Title from 'components/Text/Title';
import Button from 'components/ui/Button';
import Text from 'components/Text/Text';

import { AArrowDown, AArrowUp, BellIcon, ChevronLeft, Contrast, HelpCircle, Letters, LockKeyhole, LogOut, Maximize, Moon, Scaling, ShieldCheck, Sun, Type, User2 } from 'lucide-react-native';
import SegmentedToggle from 'components/ui/SegmentedToggle';
import LocalStorage from 'services/storage/LocalStorage';

const Row = ({ children, label }) => {
    const { theme } = useTheme();
    const insets = useSafeAreaInsets();

    const styles = StyleSheet.create({
        button: {
            width: "100%",
            paddingVertical: theme.spacing.sm,

            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",

            backgroundColor: "transparent",

            outlineWidth: theme.thicknesses.none,
        },

        icon: {
            alignItems: "center",
            justifyContent: "center"
        },

        iconLeft: {
            marginRight: theme.spacing.sm,
        },

        iconRight: {
            marginLeft: theme.spacing.sm,
        },

        text: {
            color: theme.colors.primary,
            fontSize: theme.text.baseSize,
            fontWeight: "600"
        }
    });

    return (
        <View

            activeOpacity={0.7}
            style={[styles.button]}
        >
            <Text style={[styles.text]}>
                {label}
            </Text>
            {
                children
            }
        </View>
    );
}

const SettingsScreen = () => {
    const {
        theme,
        fontSize,
        setFontSize,
        themeName,
        setTheme,
        isConfigLoaded,
    } = useTheme();

    const insets = useSafeAreaInsets();
    const router = useRouter();

    const handleBack = () => {
        router.back();
    }

    const fontOptions = [
        { value: "small", label: "Pequeña", icon: AArrowDown },
        { value: "normal", label: "Normal", icon: Letters },
        { value: "large", label: "Grande", icon: AArrowUp }
    ];

    const themeOptions = [
        { value: "light", label: "Claro", icon: Sun },
        { value: "dark", label: "Oscuro", icon: Moon },
        { value: "highContrast", label: "Alto contraste", icon: Contrast }
    ];


    const styles = StyleSheet.create({
        header: {
            width: theme.size.all,
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
            gap: 10
        },

        iconButton: {
            paddingVertical: 0,
            paddingHorizontal: 0,
            alignItems: "center",
        },

        container: {
            width: "100%",
            alignItems: "center",

            marginBottom: insets.bottom + theme.spacing.sm
        },

        content: {
            width: theme.size.all,
            alignItems: "flex-start",
        },

        subtitle: {
            color: theme.colors.primary,
            fontSize: theme.text.subheadingSize,
            fontWeight: "600"
        }
    });


    return (
        <BasicLayout>
            <View style={styles.header}>
                <Button
                    iconSize={30}
                    icon={ChevronLeft}
                    style={styles.iconButton}
                    variant="ghost"
                    onPress={handleBack}
                >
                </Button>
                <Title >Configuración</Title>
            </View>

            <ScrollView
                showsVerticalScrollIndicator
                style={{ width: "100%" }}
            >
                <View style={styles.container}>
                    <View style={styles.content}>

                        <Text style={styles.subtitle}>Cuenta</Text>
                        <ActionRow
                            iconLeft={User2}
                            href="/settings/profile"
                        >Editar perfil</ActionRow>

                        <ActionRow
                            iconLeft={LockKeyhole}
                            href="/settings/password"
                        >Cambiar contraseña</ActionRow>

                        <ActionRow
                            iconLeft={ShieldCheck}
                            href="/settings/privacy"
                        >Privacidad</ActionRow>

                        <ActionRow
                            iconLeft={BellIcon}
                            href="/settings/notifications"
                        >Notificaciones</ActionRow>

                        <Line
                            top={theme.spacing.xl}
                            bottom={theme.spacing.xl}
                        />

                        <Text style={styles.subtitle}>Acecesibilidad</Text>
                        <Row label="Tamaño de texto">
                            <SegmentedToggle
                                options={fontOptions}
                                selectedValue={fontSize}
                                onValueChange={setFontSize}
                                disabled={!isConfigLoaded}
                            />
                        </Row>

                        <Row label="Tema">
                            <SegmentedToggle
                                options={themeOptions}
                                selectedValue={themeName}
                                onValueChange={setTheme}
                                disabled={!isConfigLoaded}
                            />
                        </Row>

                        <Line
                            top={theme.spacing.xl}
                            bottom={theme.spacing.xl}
                        />

                        <Text style={styles.subtitle}>Ayuda</Text>
                        <ActionRow
                            iconLeft={HelpCircle}
                            href="/help"
                        >Centro de ayuda</ActionRow>

                        <Line
                            top={theme.spacing.xl}
                            bottom={theme.spacing.xl}
                        />

                        <Text style={styles.subtitle}>Sesión</Text>
                        <ActionRow
                            iconLeft={LogOut}
                            href="/logout"
                        >Cerrar sesión</ActionRow>

                    </View>
                </View>
            </ScrollView>

        </BasicLayout>
    );
};

export default SettingsScreen;