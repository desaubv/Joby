import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from 'theme/useTheme';

import BasicLayout from 'components/layout/Basic';

import placeholder from "../../../assets/placeholders/history.avif"
import HeaderTitle from '../../fragments/HeaderTitle';
import Notification from 'fragments/Notification';

const NotificationScreen = () => {
    const { theme } = useTheme();
    const insets = useSafeAreaInsets();

    const styles = StyleSheet.create({
        header: {
            width: theme.size.all,
            flexDirection: "row",
            justifyContent: "space-between",
        },

        logoText: {
            color: theme.colors.primary,
            fontSize: theme.text.big,
            fontWeight: 700
        },

        headerButtons: {
            flexDirection: "row",
            justifyContent: "end",
            gap: 10
        },

        iconButton: {
            paddingRight: 0,
        },

        container: {
            width: "100%",
            alignItems: "center",

            marginBottom: insets.bottom + theme.spacing.sm
        },
    });


    return (
        <BasicLayout>
            <HeaderTitle>Notificaciones</HeaderTitle>

            <ScrollView
                showsVerticalScrollIndicator
                style={{ width: "100%" }}
            >
                <View style={styles.container}>

                    <Notification
                        notification={{
                            title: "Ana Torres",
                            subtitle: "te ha enciado una solicitud de conexion",
                            content: "Quiere formar parte de tu red profesional",
                            catogory: "add", // "mentions", "system", "message", "add"
                            from: {
                                avatar: null,
                                name: "Ana Torres",
                            },
                            time: "15:57"
                        }}
                    />
                    <Notification
                        notification={{
                            title: "Ana Torres",
                            subtitle: "te ha enciado una solicitud de conexion",
                            content: "Quiere formar parte de tu red profesional",
                            catogory: "mentions", // "mentions", "system", "message", "add"
                            from: {
                                avatar: placeholder,
                                name: "Ana Torres",
                            },
                            time: "14:28"
                        }}
                    />
                    
                    <Notification
                        notification={{
                            title: "Ana Torres",
                            subtitle: "te ha enciado una solicitud de conexion",
                            content: "Quiere formar parte de tu red profesional",
                            catogory: "system", // "mentions", "system", "message", "add"
                            from: {
                                avatar: null,
                                name: "Ana Torres",
                            },
                            time: "10:37"
                        }}
                    />

                    <Notification
                        notification={{
                            title: "Ana Torres",
                            subtitle: "te ha enciado una solicitud de conexion",
                            content: "Quiere formar parte de tu red profesional",
                            catogory: "message", // "mentions", "system", "message", "add"
                            from: {
                                avatar: placeholder,
                                name: "Ana Torres",
                            }
                        }}
                    />
                    <Notification />
                    <Notification />
                    <Notification />
                    <Notification />
                    <Notification />
                    <Notification />
                    <Notification />
                    <Notification />

                </View>
            </ScrollView>

        </BasicLayout>
    );
};

export default NotificationScreen;