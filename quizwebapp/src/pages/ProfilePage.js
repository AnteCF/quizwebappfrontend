import React, { useState, useEffect } from "react"
import "./ProfilePage.css";
import UserAPI from "../apis/UserAPI";
import QuizAPI from "../apis/QuizAPI";
import LoginAPI from "../apis/LoginAPI";
import { Button, Card, Grid, List, Typography } from '@mui/material';
import {Link} from 'react-router-dom';

function ProfilePage() {

    const [points, setPoints] = useState([]);
    const [quizList, setQuizList] = useState([]);

    const refreshQuizzes = () => {
        QuizAPI.getQuizzesByLoggedUser().then(response => {
            setQuizList(response.data.quizzes);
        })
            .catch(err => console.error(err));
    };

    const deleteQuiz = name => QuizAPI.deleteQuiz(name);

    useEffect(() => {
        UserAPI.getPoints().then(response => {
            setPoints(response.data)
        })
        .catch(err => console.error(err));
        
        refreshQuizzes();
    }, []);
    
if(LoginAPI.isLoggedIn()){
    return (
        <div className="container">
            <h1 className="userName">{UserAPI.getCurrentUser()}</h1>
            <p>Your current score is {points}</p>
            <List>
                {quizList.map((quiz, index) => {
                    return <li key={index}> <Card variant="outlined">
                        <h1>{quiz.name}</h1>
                        <p>{quiz.description}</p>
                        <p>rating: {quiz.rating} / 5</p>
                        <Button component={Link} to={"edit/?title=" + quiz.name}  variant="contained">Edit</Button>
                        <Button onClick={() => {deleteQuiz(quiz.name)}}  variant="contained" color="error">Delete</Button>
                    </Card> </li>

                })}
            </List>
        </div>
    )}

    else
    return (
        <div className="container">
            <Grid
  container
  alignItems="center"
  justifyContent="center"
  style={{ minHeight: '100vh' }}
>
<Card style={{backgroundColor: 'red', display: "flex", alignItems: 'center', justifyContent: 'center'}}>
                        <Typography variant="h1">Please log in to view your profile.</Typography>
                    </Card>
    </Grid>
    </div>
    )
}

export default ProfilePage;