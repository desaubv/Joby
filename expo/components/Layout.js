import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme/useTheme';
import { StatusBar } from 'expo-status-bar';

const Layout = ({ children }) => {
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        scrollView: {
            backgroundColor: theme.colors.background,

            paddingVertical: theme.spacing.md,
            paddingHorizontal: theme.spacing.lg
        }
    })

    return (
        <SafeAreaView style={styles.scrollView}>
            <StatusBar style="auto"/>
            <ScrollView>
                {children}
            </ScrollView>
        </SafeAreaView>
    );
};

export default Layout;