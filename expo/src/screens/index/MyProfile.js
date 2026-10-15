import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'theme/useTheme';

import UserProfileFragment from 'fragments/UserProfile';
import BasicLayout from 'components/layout/Basic';
import Button from 'components/ui/Button';
import Text from 'components/Text/Text';
import MyPublicationsTab from './tabs/profile/MyPublicationsTab';

const MyProfileScreen = () => {
    const { theme } = useTheme();
    const insets = useSafeAreaInsets();

    const [ activeTab, setActiveTab ] = useState("publicaciones")

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

        tabsButtons: {
            width: theme.size.all,
            height: "auto",
            flexDirection: "row",
            marginBottom: insets.bottom + theme.spacing.sm
        },

        tabButton: {
            outlineColor: "transparent",
            width: "33.333%",
            margin: 0,
            padding: 0,
            borderRadius: 0,
            borderBottomWidth: 2,
            borderBottomColor: "transparent",
        },

        tabButtonText: {
            fontSize: theme.text.smallSize
        }
    });

    const renderTabContent = () => {
        switch (activeTab) {
            case "publicaciones":
                return <MyPublicationsTab/>;
            case "experiencia":
                return <View><Text>Experiencia</Text></View>;
            case "formacion":
                return <View><Text>Formacion</Text></View>;
            default:
                return null;
        }
    }


    return (
        <BasicLayout style={{ paddingVertical: 0 }}>
            <ScrollView
                showsVerticalScrollIndicator
                style={{ width: "100%" }}
            >
                <View style={styles.container}>

                    <UserProfileFragment isOwnProfile={true} />

                    <View
                        style={styles.tabsButtons}
                    >
                        <Button 
                            variant="secondary" 
                            textStyle={[styles.tabButtonText, activeTab === "publicaciones" && { fontWeight: 700 }]} 
                            style={[styles.tabButton, activeTab === "publicaciones" && { borderBottomColor: theme.colors.primary }]}
                            onPress={() => setActiveTab("publicaciones")}
                            >Publicaciones</Button>

                        <Button 
                            variant="secondary" 
                            textStyle={[styles.tabButtonText, activeTab === "experiencia" && { fontWeight: 700 }]} 
                            style={[styles.tabButton, activeTab === "experiencia" && { borderBottomColor: theme.colors.primary }]} 
                            onPress={() => setActiveTab("experiencia")}
                            >Experiencia</Button>

                        <Button 
                            variant="secondary" 
                            textStyle={[styles.tabButtonText, activeTab === "formacion" && { fontWeight: 700 }]} 
                            style={[styles.tabButton, activeTab === "formacion" && { borderBottomColor: theme.colors.primary }]} 
                            onPress={() => setActiveTab("formacion")}
                        >Formacion</Button>
                    </View>

                </View>

                {
                    renderTabContent()
                }
            </ScrollView>

        </BasicLayout>
    );
};

export default MyProfileScreen;