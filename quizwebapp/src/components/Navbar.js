import { Drawer, Button, Divider, List } from "@mui/material";
import React from "react";
import {Link} from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import GroupIcon from '@mui/icons-material/Group';
import ForumIcon from '@mui/icons-material/Forum';
import CreateIcon from '@mui/icons-material/Create';


const links = [
    {
        title: 'Profile',
        path: '/profile',
        icon: <AccountCircleIcon />
    },
    {
        title: 'Play',
        path: '/play',
        icon: <PlayCircleIcon />
    },
    {
        title: 'CreateQuiz',
        path: 'create',
        icon: <CreateIcon />
    },
    {
        title: 'Friends',
        path: '/friends',
        icon: <GroupIcon />
    },
    {
        title: 'Messages',
        path: '/messages',
        icon: <ForumIcon />
    },

]

export default function Navbar(){
return (
    <Drawer
    variant="permanent"
    anchor="left"
    PaperProps={{
        sx: {width: '10%'}
    }}
    >
       <List>
        {links.map((link, index) =>{
            return (<li key={index}><Button component={Link} to={link.path}>{link.icon}{link.title}</Button><Divider /></li>)
        })}
       </List>
    </Drawer>
);

}
