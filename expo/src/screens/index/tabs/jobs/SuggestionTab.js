import React from 'react';
import TabLayout from 'components/layout/Tab';

import { useTheme } from 'theme/useTheme';
import JobPublication from 'fragments/JobPublication';

import jobyLogo from "assets/logos/icon.png"
import SearchAndFilter from 'fragments/SearchAndFilter';

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
            <JobPublication
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

            <JobPublication
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
            <JobPublication />
            <JobPublication />
            <JobPublication />
            <JobPublication />
            <JobPublication />
            <JobPublication />
            <JobPublication />
            <JobPublication />
            <JobPublication />
            <JobPublication />
            <JobPublication />
            <JobPublication />
            <JobPublication />
            <JobPublication />
            <JobPublication />
            <JobPublication />
            <JobPublication />
            <JobPublication />
            <JobPublication />
            <JobPublication />
            <JobPublication />
            <JobPublication />
            <JobPublication />
            <JobPublication />
            <JobPublication />
            <JobPublication />
            <JobPublication />
            <JobPublication />
            <JobPublication />
            <JobPublication />
            <JobPublication />
            <JobPublication />
        </TabLayout>
    );
};

export default SuggestionTab;