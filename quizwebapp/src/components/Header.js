import React from "react";
import "./Header.css";
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { useSearchParams, Link } from "react-router-dom";

function Header() {

    const [searchParams] = useSearchParams();
    const title = searchParams.get('title') || "Quiz Webapp";

    return (
            <AppBar
                position="fixed"
                display="flex"
                sx={{
                    height: '10%',
                    width: '90%'
                }}
            >
                <Toolbar display="flex">
                    <Typography variant="h2" >{title}</Typography>
                    <Button variant="text" component={Link} to='/login' sx={{ color: "white"}}>Login</Button>
                </Toolbar>
            </AppBar>
    )
}

export default Header;