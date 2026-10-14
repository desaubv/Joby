import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'theme/useTheme';

import UserProfileFragment from 'fragments/UserProfile';
import BasicLayout from 'components/layout/Basic';

const ProfileScreen = () => {
    const { theme } = useTheme();
    const insets = useSafeAreaInsets();

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
            marginTop: theme.spacing.md,
            marginBottom: insets.bottom + theme.spacing.sm
        }
    });


    return (
        <BasicLayout style={{paddingVertical: 0}}>
            <ScrollView
                showsVerticalScrollIndicator
                style={{ width: "100%" }}
            >
                <View style={styles.container}>
                    
                <UserProfileFragment/>
                    
                </View>
            </ScrollView>

        </BasicLayout>
    );
};

export default ProfileScreen;