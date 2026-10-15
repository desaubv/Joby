import React from 'react';
import TabLayout from 'components/layout/Tab';
import Publication from 'fragments/Publication';
import NewPublication from 'fragments/NewPublication';
import Line from 'components/layout/Line';
import { useTheme } from 'theme/useTheme';

const PublicationsTab = () => {
    const { theme } = useTheme();
    return (
        <TabLayout>
            <Publication publication={{}}/>
            <Publication publication={{}}/>
            <Publication publication={{}}/>
            <Publication/>
            <Publication/>
            <Publication/>
            <Publication/>
            <Publication/>
        </TabLayout>
    );
};

export default PublicationsTab;