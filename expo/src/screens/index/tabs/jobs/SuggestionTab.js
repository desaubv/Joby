import React from 'react';
import TabLayout from 'components/layout/Tab';

import { useTheme } from 'theme/useTheme';

import SearchAndFilter from 'fragments/SearchAndFilter';
import JobListingCard from 'fragments/JobListingCard';

import jobyLogo from "assets/logos/icon.png"

const SuggestionTab = () => {
    const { theme } = useTheme();

    return (
        <TabLayout>
            <SearchAndFilter
                placeholder="Buscar empleos..."
                filters={[
                    {
                        key: "location",
                        label: "Ubicacion",
                        options: [
                            { label: "Programación", value: "programming" },
                            { label: "Diseño", value: "design" },
                            { label: "Inteligencia artificial", value: "ai" },
                        ],
                    }, {
                        key: "modality",
                        label: "Modalidad",
                        options: [
                            { label: "Programación", value: "programming" },
                            { label: "Diseño", value: "design" },
                            { label: "Inteligencia artificial", value: "ai" },
                        ],
                    }, {
                        key: "role",
                        label: "Area",
                        options: [
                            { label: "Programación", value: "programming" },
                            { label: "Diseño", value: "design" },
                            { label: "Inteligencia artificial", value: "ai" },
                        ],
                    },
                ]}
            />
            <JobListingCard
                job={{
                    company: {
                        name: "Tech Solutions",
                        logo: null,
                    },
                    title: "Desarrollador Backend",
                    requiredSkills: ["NodeJS", "PostgreSQL", "API REST", "Lorem", "Ipsum"],
                    experience: "Nula",
                    kind: "hibrid", // "remote", "presencial", "special"
                }}
            />

            <JobListingCard
                job={{
                    company: {
                        name: "Joby",
                        logo: jobyLogo,
                    },
                    title: "Analista de datos",
                    requiredSkills: [],
                    experience: "Nula",
                    modality: "hibrid", // "remote", "presencial", "special"
                }}
            />
            <JobListingCard />
            <JobListingCard />
            <JobListingCard />
            <JobListingCard />
            <JobListingCard />
            <JobListingCard />
            <JobListingCard />
            <JobListingCard />
            <JobListingCard />
            <JobListingCard />
            <JobListingCard />
            <JobListingCard />
            <JobListingCard />
            <JobListingCard />
            <JobListingCard />
            <JobListingCard />
            <JobListingCard />
            <JobListingCard />
            <JobListingCard />
            <JobListingCard />
            <JobListingCard />
            <JobListingCard />
            <JobListingCard />
            <JobListingCard />
            <JobListingCard />
            <JobListingCard />
            <JobListingCard />
            <JobListingCard />
            <JobListingCard />
            <JobListingCard />
            <JobListingCard />
            <JobListingCard />
        </TabLayout>
    );
};

export default SuggestionTab;