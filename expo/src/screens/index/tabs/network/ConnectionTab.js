import React, { useState } from 'react';
import TabLayout from 'components/layout/Tab';
import { useTheme } from 'theme/useTheme';
import SearchAndFilter from 'fragments/SearchAndFilter';
import Line from 'components/layout/Line';
import ConnectionUser from 'fragments/ConnectionUser';
import Bold from 'components/Text/Bold';

import placeholder from "assets/placeholders/history.avif"

const ConnectionTab = () => {
    const { theme } = useTheme();
    
    const [connections, setConnections] = useState([]);

    return (
        <TabLayout>
            <SearchAndFilter />
            <Bold style={{width: theme.size.all, marginTop: theme.spacing.sm}}>Tus conexiones ({connections.length})</Bold>

            <ConnectionUser user={{
                name: "Julian",
                lastname: "Dominguez",
                avatar: placeholder,
                role: "Desarrollador fullstack"
            }}/>
            
            <ConnectionUser user={{
                name: "Julian",
                lastname: "Dominguez",
                avatar: null,
                role: "Desarrollador fullstack"
            }}/>

            <ConnectionUser user={{
                name: "Diego Esau",
                lastname: "Barajas",
                role: "Desarrollador fullstack"
            }}/>

            <ConnectionUser user={{
                name: "Julian",
                lastname: "Dominguez",
                avatar: placeholder,
                role: "Desarrollador fullstack"
            }}/>

            <ConnectionUser user={{
                name: "Julian",
                lastname: "Dominguez",
                avatar: placeholder,
                role: "Desarrollador fullstack"
            }}/>

            <ConnectionUser user={{
                name: "Julian",
                lastname: "Dominguez",
                avatar: placeholder,
                role: "Desarrollador fullstack"
            }}/>

            <ConnectionUser user={{
                name: "Julian",
                lastname: "Dominguez",
                avatar: placeholder,
                role: "Desarrollador fullstack"
            }}/>

            <ConnectionUser user={{
                name: "Julian",
                lastname: "Dominguez",
                avatar: placeholder,
                role: "Desarrollador fullstack"
            }}/>
            <ConnectionUser />
            <ConnectionUser />
            <ConnectionUser />
        </TabLayout>
    );
};

export default ConnectionTab;