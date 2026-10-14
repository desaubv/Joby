import React, { useState } from 'react';

import { useTheme } from 'theme/useTheme';

import NetworkMemberCard from 'fragments/NetworkMemberCard';
import SearchAndFilter from 'fragments/SearchAndFilter';
import TabLayout from 'components/layout/Tab';
import Bold from 'components/Text/Bold';

import placeholder from "assets/placeholders/history.avif"

const ConnectionTab = () => {
    const { theme } = useTheme();
    
    const [connections, setConnections] = useState([]);

    return (
        <TabLayout>
            <SearchAndFilter />
            <Bold style={{width: theme.size.all, marginTop: theme.spacing.sm}}>Tus conexiones ({connections.length})</Bold>

            <NetworkMemberCard user={{
                name: "Julian",
                lastname: "Dominguez",
                avatar: placeholder,
                role: "Desarrollador fullstack"
            }}/>
            
            <NetworkMemberCard user={{
                name: "Julian",
                lastname: "Dominguez",
                avatar: null,
                role: "Desarrollador fullstack"
            }}/>

            <NetworkMemberCard user={{
                name: "Diego Esau",
                lastname: "Barajas",
                role: "Desarrollador fullstack"
            }}/>

            <NetworkMemberCard user={{
                name: "Julian",
                lastname: "Dominguez",
                avatar: placeholder,
                role: "Desarrollador fullstack"
            }}/>

            <NetworkMemberCard user={{
                name: "Julian",
                lastname: "Dominguez",
                avatar: placeholder,
                role: "Desarrollador fullstack"
            }}/>

            <NetworkMemberCard user={{
                name: "Julian",
                lastname: "Dominguez",
                avatar: placeholder,
                role: "Desarrollador fullstack"
            }}/>

            <NetworkMemberCard user={{
                name: "Julian",
                lastname: "Dominguez",
                avatar: placeholder,
                role: "Desarrollador fullstack"
            }}/>

            <NetworkMemberCard user={{
                name: "Julian",
                lastname: "Dominguez",
                avatar: placeholder,
                role: "Desarrollador fullstack"
            }}/>
            <NetworkMemberCard />
            <NetworkMemberCard />
            <NetworkMemberCard />
        </TabLayout>
    );
};

export default ConnectionTab;