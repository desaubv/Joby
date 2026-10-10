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

const HomeScreen = () => {
    const { theme, setTheme } = useTheme();

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

            <View style={styles.header}>
                <Text style={styles.logoText}>Joby</Text>

                <View style={styles.headerButtons}>
                    <Button style={styles.iconButton} variant="ghost" icon={Search} iconSize={theme.text.big * 0.9} iconStrokeWidth={2.5} />
                    <Button style={styles.iconButton} variant="ghost" icon={Bell} iconSize={theme.text.big * 0.9} iconStrokeWidth={2.5} />
                    <Button style={styles.iconButton} variant="ghost" icon={User2} iconSize={theme.text.big * 0.9} iconStrokeWidth={2.5} />
                </View>
            </View>

            <ScrollView
                showsVerticalScrollIndicator
                style={{ width: "100%" }}
            >
                <View style={styles.container}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{ width: theme.size.all, maxHeight: 120, height: 120 }}
                    >
                        <View style={styles.histories}>
                            <HistoryBall
                                image={placeholder}
                                text="Crear publicación"
                            />

                            <HistoryBall
                                image={placeholder}
                                text="Crear publicación"
                            />

                            <HistoryBall
                                image={placeholder}
                                text="Crear publicación"
                            />

                            <HistoryBall
                                image={placeholder}
                                text="Crear publicación"
                            />
                            <HistoryBall
                                image={placeholder}
                                text="Crear publicación"
                            />

                            <HistoryBall
                                image={placeholder}
                                text="Crear publicación"
                            />

                            <HistoryBall
                                image={placeholder}
                                text="Crear publicación"
                            />

                            <HistoryBall
                                image={placeholder}
                                text="Crear publicación"
                            />
                        </View>
                    </ScrollView>

                    <NewPublication />
                    <Line
                        thickness={0.5}
                        width={theme.size.all}
                        color={theme.colors.input.border}
                    />

                    <Publication
                        image={placeholder}
                        date={"Hace 2h"}
                        user={{
                            avatar: placeholder,
                            name: "Juan Julian",
                            role: "Desarrollador"
                        }}
                        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    />
                    <Publication
                        date={"Hace 2h"}
                        user={{
                            avatar: placeholder,
                            name: "Juan Julian",
                            role: "Desarrollador"
                        }}
                        content="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    />

                    <Publication
                        image={placeholder}
                        date={"Hace 2h"}
                        user={{
                            avatar: placeholder,
                            name: "Juan Julian",
                            role: "Desarrollador"
                        }}
                    />

                    
                </View>
            </ScrollView>

        </BasicLayout>
    );
};

export default HomeScreen;