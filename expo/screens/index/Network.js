import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { useTheme } from '../../theme/useTheme';

import NewPublication from '../../fragments/NewPublication';

import BasicLayout from '../../components/layout/Basic';
import HistoryBall from '../../fragments/HistoryBall';
import Line from '../../components/layout/Line';
import Text from '../../components/Text/Text';
import Button from '../../components/Button';

import { Bell, Search, User2 } from 'lucide-react-native';
import placeholder from "../../assets/placeholders/history.avif"
import Publication from '../../fragments/Publication';
import HeaderTitle from '../../fragments/HeaderTitle';
import TabsScreen, { Tab } from '../../components/layout/Tabs';
import ConnectionTab from '../../tabs/network/ConnectionTab';

const NetworkScreen = () => {
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        header: {
            width: theme.size.all,
            flexDirection: "row",
            justifyContent: "space-between"
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

        },

        histories: {
            width: "100%",
            height: "auto",
            flexDirection: "row",
            gap: 15,
            marginTop: theme.spacing.md
        }
    });


    return (
        <BasicLayout>
            <HeaderTitle>Mi red</HeaderTitle>

            <TabsScreen initialTab={0} position="top" type="simple">
                <Tab
                    label="Conexiones"
                    component={<ConnectionTab />}
                />

                <Tab
                    label="Solicitudes"
                />
            </TabsScreen>

        </BasicLayout>
    );
};

export default NetworkScreen;