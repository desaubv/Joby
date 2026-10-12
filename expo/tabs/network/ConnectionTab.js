import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
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

const ConnectionTab = () => {
    const { theme, setTheme } = useTheme();
    const insets = useSafeAreaInsets();

    const styles = StyleSheet.create({
        container: {
            width: "100%"
        }
    });

    return (
        <View style={styles.container}>
            <NewPublication/>
        </View>
    );
}

export default ConnectionTab;