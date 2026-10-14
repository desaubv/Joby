import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useTheme } from 'theme/useTheme';

import Title from "components/Text/Title"

const HeaderTitle = ({ children }) => {
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        header: {
            width: theme.size.all,
            marginTop: theme.spacing.sm,
            flexDirection: "row",
            justifyContent: "flex-start",
        },

    })

    return (
        <View style={styles.header}>
            <Title >{children}</Title>
        </View>
    );
};

export default HeaderTitle;