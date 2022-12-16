import { Alert, Button, Grid, Modal, Paper, TextField, Typography } from "@mui/material";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import LoginAPI from "../apis/LoginAPI";

function LoginPage(){

const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [openSuccessAlert, setOpenSuccessAlert] = React.useState(false);

const navigate = useNavigate();

const login = () =>{
    LoginAPI.login(username, password);
    setOpenSuccessAlert(LoginAPI.isLoggedIn());
    navigate('/profile');
}
    
    const loginFormStyle={height:'70vh', width:500, margin:"140px auto", backgroundColor:'lightBlue'}

    return(
        <div>
            <Grid>
                <Modal 
                    open={openSuccessAlert}>
            <Alert severity="success"
                action={<Button color="inherit" size="small" onClick={() => setOpenSuccessAlert(false)}>
                Close
              </Button>}>
                Successfully logged in.</Alert>
            </Modal>
                <Paper elevation={20} style={loginFormStyle}>
                    <Grid align='center'>
                    <h2>Login</h2>
                    </Grid>
                    <TextField label='username' placeholder="Enter Username" fullWidth required onChange={(newValue)=>setUsername(newValue.target.value)}></TextField>
                    <TextField label='password' placeholder="Enter Password" type='password' fullWidth required onChange={(newValue)=>setPassword(newValue.target.value)}></TextField>
                    <Grid align='center'>
                    <Button type="submit" variant="contained" align='center' onClick={() => {login()}} style={{
                            backgroundColor: 'black'}}>Login</Button>
                            <Typography>Forgot password or want to register?</Typography>
                            <Typography>Good Luck</Typography>
                    </Grid>
                </Paper>
            </Grid>
        </div>
    )
}

export default LoginPage;