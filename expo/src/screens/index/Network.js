import React from 'react';
import { StyleSheet } from 'react-native';

import { useTheme } from 'theme/useTheme';

import BasicLayout from 'components/layout/Basic';

import TabsScreen, { Tab } from 'components/layout/Tabs';
import ConnectionTab from './tabs/network/ConnectionTab';
import FeaturedTab from './tabs/network/FeaturedTab';
import FollowTab from './tabs/network/FollowTab';
import HeaderTitle from 'fragments/HeaderTitle';

const NetworkScreen = () => {
    return (
        <BasicLayout>
            <HeaderTitle>Mi red</HeaderTitle>

            <TabsScreen position="top" variant="simple" contentParent="tab">
                <Tab
                    label="Siguiendo"
                    component={<FollowTab/>}
                />
                
                <Tab
                    label="Destacadas"
                    component={<FeaturedTab/>}
                />

                <Tab
                    label="Conexiones"
                    component={<ConnectionTab/>}
                />
            </TabsScreen>

        </BasicLayout>
    );
};



export default NetworkScreen;