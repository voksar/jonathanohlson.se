import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DashboardIcon from '@material-ui/icons/Dashboard';

type Item = {
    text: string,
    path: string,
    icon: any,
    roles?: string,
    loggedin?: boolean,
    onClick?: any,
}

export const SideBarLogin : Item = {
    text: 'Login',
    path: '/login',
    icon: <ArrowForwardIcon />,
    loggedin: false
}
export const SideBarLogout : Item = {
    text: 'Logout',
    path: '/login',
    icon: <ArrowBackIcon />,
    loggedin: true,
}


export const SideBarNonLoggedInList: Item[] = [
    
]


export const SideBarLoggedInList: Item[] = [
    {
        text: 'Profile',
        path: '/profile',
        icon: <PersonIcon />
    },
    {
        text: 'Tasks',
        path: '/tasks',
        icon: <AssignmentIcon />,
    }
]

export const SideBarAdminTools: Item[] = [
    {
        text: 'Create User',
        path: '/admin/create',
        icon: <PersonAddIcon />,
        roles: 'admin'
    },
    {
        text: 'Dashboard',
        path: '/admin/Dashboard',
        icon: <DashboardIcon />,
        roles: 'admin'
    }
]