import React from 'react';
import TabLayout from 'components/layout/Tab';

import { useTheme } from 'theme/useTheme';

import JobApplicationCard from 'fragments/JobApplicationCard';
import Line from 'components/layout/Line';

import jobyLogo from "assets/logos/icon.png"

const ApplicationsTab = () => {
    const { theme } = useTheme();

    return (
        <TabLayout>
            <Line
                top={25}
                text="Activas"
                width={theme.size.all}
            />
            <JobApplicationCard
                job={{
                    company: {
                        name: "Tech Solutions",
                        logo: null,
                    },
                    title: "Desarrollador Backend",
                    status: "closed",
                    date: "25 sep. 2026"
                }}
            />
            <JobApplicationCard
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

            <JobApplicationCard
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

            <JobApplicationCard
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

            <JobApplicationCard
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

            <JobApplicationCard />
            <JobApplicationCard />
            <JobApplicationCard />
            <JobApplicationCard />
            <JobApplicationCard />
            <JobApplicationCard />
            <JobApplicationCard />
        </TabLayout>
    );
};

export default ApplicationsTab;