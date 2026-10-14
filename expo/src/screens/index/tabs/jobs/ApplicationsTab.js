import React from 'react';
import TabLayout from 'components/layout/Tab';

import { useTheme } from 'theme/useTheme';
import JobPublication from 'fragments/JobPublication';

import jobyLogo from "assets/logos/icon.png"
import SearchAndFilter from 'fragments/SearchAndFilter';
import JobApplication from 'fragments/JobApplication';
import Line from 'components/layout/Line';

const ApplicationsTab = () => {
    const { theme } = useTheme();

    return (
        <TabLayout>
            <Line
                top={25}
                text="Activas"
                width={theme.size.all}
            />
            <JobApplication
                job={{
                    company: {
                        name: "Tech Solutions",
                        logo: null,
                    },
                    title: "Desarrollador Backend",
                    status: "rejected",
                    date: "25 sep. 2026"
                }}
            />

            <JobApplication
                job={{
                    company: {
                        name: "Joby",
                        logo: jobyLogo,
                    },
                    title: "Analista de datos",
                    status: "review",
                    date: "14 oct. 2026"
                }}
            />
            
            <JobApplication
                job={{
                    company: {
                        name: "Tech Solutions",
                        logo: null,
                    },
                    title: "Desarrollador Backend",
                    status: "interview",
                    date: "25 sep. 2026"
                }}
            />

            <JobApplication
                job={{
                    company: {
                        name: "Joby",
                        logo: jobyLogo,
                    },
                    title: "Analista de datos",
                    status: "accepted",
                    date: "14 oct. 2026"
                }}
            />

            
            <Line
                top={25}
                text="Archivadas."
                width={theme.size.all}
            />

            <JobApplication />
            <JobApplication />
            <JobApplication />
            <JobApplication />
            <JobApplication />
            <JobApplication />
            <JobApplication />
        </TabLayout>
    );
};

export default ApplicationsTab;