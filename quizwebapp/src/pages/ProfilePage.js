import React, { useState, useEffect } from "react"
import "./ProfilePage.css";
import UserAPI from "../apis/UserAPI";

function ProfilePage() {

    const [points, setPoints] = useState([]);

    useEffect(() => {
        UserAPI.getPoints().then(response => {
            setPoints(response.data)
        })
        .catch(err => console.error(err));
    }, []);

    return (
        <div className="container">
            <h1 className="userName">{UserAPI.getCurrentUser()}</h1>
            <p>Your current score is {points}</p>
        </div>
    )
}

export default ProfilePage;