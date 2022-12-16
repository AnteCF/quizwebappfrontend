import axios from "axios"

const apiUrl = "http://localhost:8080/users/";



const UserAPI = {
    getPoints: () => axios.get(`${apiUrl}?id=${localStorage.getItem("userId")}`),
    getCurrentUser: () => localStorage.getItem('user'),
};

export default UserAPI;