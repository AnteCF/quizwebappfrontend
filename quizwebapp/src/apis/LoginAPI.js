import { Alert } from "@mui/material";
import axios from "axios";

const loginUrl = "http://localhost:8080/login";



const LoginAPI = {
    login: (username, password) => {
        axios.post(`${loginUrl}`, {name: username, password: password}).then((response)=>{
            if(response.data.accessToken && response.data.username && response.data.userId){
                localStorage.clear();
                localStorage.setItem("accessToken", JSON.stringify(response.data.accessToken));
                localStorage.setItem("user", JSON.stringify(response.data.username));
                localStorage.setItem("userId", JSON.stringify(response.data.userId));
            }
        })
    },

    logout: () => {
        localStorage.clear();
        window.location.reload();
    },

    isLoggedIn: () =>{
        if(localStorage.getItem('user')){
            return true;
        }
        else return false;
    }
};

export default LoginAPI;