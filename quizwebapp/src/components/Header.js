import React from "react";
import "./Header.css";
import { Alert, AppBar, Button, Toolbar, Typography } from '@mui/material';
import { useSearchParams, Link } from "react-router-dom";
import LoginAPI from "../apis/LoginAPI";

function Header() {

    const [searchParams] = useSearchParams();
    const title = searchParams.get('title') || "Quiz Webapp";

    const renderLoginButton = () => {
        const name = localStorage.getItem('user');
        if(name){
            return(<Button variant="text" onClick={() => {LoginAPI.logout()}} sx={{ color: "white"}}>Logout</Button>)
        }
        else return (<Button variant="text" component={Link} to='/login' sx={{ color: "white"}}>Login</Button>)
    }

    const handleLogout = () =>{
        var result = LoginAPI.logout();
        if(result){
            return(
            <Alert severity="success">Successfully logged out.</Alert>
            )
        }
        else return (
            <Alert severity="error">Failed to log out.</Alert>
        )
    }

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
                    {renderLoginButton()}
                </Toolbar>
            </AppBar>
    )
}

export default Header;