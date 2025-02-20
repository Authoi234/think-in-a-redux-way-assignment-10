import React from 'react';
import { Outlet } from 'react-router-dom';

const StudentIdentifyLayout = () => {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default StudentIdentifyLayout;