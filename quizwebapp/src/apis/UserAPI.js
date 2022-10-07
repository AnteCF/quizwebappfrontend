import axios from "axios"

const currentUserId = 1;
const currentUserName = "Ante";
const apiUrl = "http://localhost:8080/users/"



const UserService = {
    getPoints: () => axios.get(apiUrl + "?id=" +currentUserId),
    getCurrentUser: () => currentUserName
};

export default UserService;