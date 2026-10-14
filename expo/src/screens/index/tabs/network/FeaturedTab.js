import React, { useState } from 'react';
import TabLayout from 'components/layout/Tab';
import Publication from 'fragments/Publication';
import NewPublication from 'fragments/NewPublication';
import Line from 'components/layout/Line';
import { useTheme } from 'theme/useTheme';

const FeaturedTab = () => {
    const { theme } = useTheme();

    return (
        <TabLayout>
            <NewPublication />
            
            <Line
                width={theme.size.all}
                bottom={15}
            />
            <Publication/>
            <Publication/>
            <Publication/>
            <Publication/>
            <Publication/>
        </TabLayout>
    );
};

export default FeaturedTab;