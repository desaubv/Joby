import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { useTheme } from '../../theme/useTheme';

const BasicLayout = ({ children }) => {
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
            paddingVertical: theme.spacing.md,
            
            borderRadius: theme.radius.lg
        }
    })

    return (
        <View style={styles.container}>
            {children}
        </View>
    );
};

export default BasicLayout;