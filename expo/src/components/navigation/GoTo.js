import { Redirect } from 'expo-router';
import React from 'react';

const GoTo = ({href}) => {
    return <Redirect href={href} />
};

export default GoTo;