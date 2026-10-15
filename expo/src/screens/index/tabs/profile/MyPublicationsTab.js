import React from 'react';
import TabLayout from 'components/layout/Tab';
import Publication from 'fragments/Publication';
import NewPublication from 'fragments/NewPublication';
import Line from 'components/layout/Line';
import { useTheme } from 'theme/useTheme';

const MyPublicationsTab = () => {
    const { theme } = useTheme();
    return (
        <TabLayout>
            <NewPublication user={{}}/>
            <Line
                width={theme.size.all}
                bottom={15}
            />
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

export default MyPublicationsTab;