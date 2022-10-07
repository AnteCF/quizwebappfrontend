import React from "react";
import "./Header.css";
import { AppBar, Button, Toolbar, Box } from '@mui/material';

function Header(){
    
    return(
        <Box>
            <AppBar
            position="fixed"
            sx={{height: '10%',
            width: '90%'}}
            >
                <Toolbar>
                    <h1 className="title">Quiz Webapp</h1>
                    <Button variant="text" sx={{color: "white"}}>Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header;