import React from 'react';

import ApplicationsTab from './tabs/jobs/ApplicationsTab';
import TabsScreen, { Tab } from 'components/layout/Tabs';
import SuggestionTab from './tabs/jobs/SuggestionTab';
import BasicLayout from 'components/layout/Basic';
import HeaderTitle from 'fragments/HeaderTitle';


const JobsScreen = () => {
    return (
        <BasicLayout>
            <HeaderTitle>Empleos</HeaderTitle>

            <TabsScreen position="top" variant="simple" contentParent="tab">
                <Tab
                    label="Mis postulaciones"
                    component={<ApplicationsTab />}
                />

                <Tab
                    label="Sugerencias"
                    component={<SuggestionTab />}
                />
            </TabsScreen>
        </BasicLayout>
    );
};

export default JobsScreen;