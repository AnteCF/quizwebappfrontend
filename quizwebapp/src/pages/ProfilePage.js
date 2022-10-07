import React, { useState, useEffect } from "react"
import "./ProfilePage.css";
import UserService from "../apis/UserAPI";

function ProfilePage() {

    const [points, setPoints] = useState([]);

    useEffect(() => {
        UserService.getPoints().then(response => {
            setPoints(response.data)
        })
        .catch(err => console.error(err));
    }, []);

    return (
        <div className="content">
            <h1 className="userName">{UserService.getCurrentUser()}</h1>
            <p>Your current score is {points}</p>
        </div>
    )
}

export default ProfilePage;