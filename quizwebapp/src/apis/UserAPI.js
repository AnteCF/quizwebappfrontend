import axios from "axios"

const currentUserId = 1;
const[currentUser, setCurrentUser]="Ante";
const apiUrl = "http://localhost:8080/users/";
const loginUrl = "http://localhost:8080/login";
const JWT = "";



const UserAPI = {
    getPoints: () => axios.get(`${apiUrl}?id=${currentUserId}`),
    getCurrentUser: () => currentUser,
    setActiveUser:(user) => setCurrentUser(user),
    login: (username, password) => {
        axios.post(`${loginUrl}`, {name: username, password: password}).then((response)=>{
            console.log(response.data)
        })
    }
};

export default UserAPI;