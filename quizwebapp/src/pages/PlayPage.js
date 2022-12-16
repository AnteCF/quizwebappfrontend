import React, { useEffect, useState } from "react";
import "./PlayPage.css";
import QuizAPI from "../apis/QuizAPI";
import { Button, Card, List, Rating } from '@mui/material';
import { Link } from 'react-router-dom';

function PlayPage() {

    const [quizList, setQuizList] = useState([]);
    const [rating, setRating] = useState(2);

    const refreshQuizzes = () => {
        QuizAPI.getAllQuizzes().then(response => {
            setQuizList(response.data.quizzes);
        })
            .catch(err => console.error(err));
    };

    const filterByRating = () => {
        QuizAPI.getQuizzesByRating(rating).then(response => {
            setQuizList(response.data.quizzes);
        })
            .catch(err => console.error(err));
    };

    useEffect(() => {
        refreshQuizzes();
    }, []);

    return (
        <div className="container">
            <h2>Filter quizzes by rating</h2>
            <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, value) => {
                    setRating(value);
                }}
            />
            <p></p>
            <Button variant="contained" onClick={() => filterByRating()} sx={{backgroundColor:"black"}}>Apply</Button>
            <List>
                {quizList.map((quiz, index) => {
                    return <li key={index}> <Card variant="outlined">
                        <h1>{quiz.name}</h1>
                        <p>{quiz.description}</p>
                        <p>rating: {quiz.rating} / 5</p>
                        <Button component={Link} to={"quiz/?title=" + quiz.name} variant="contained">Play</Button>
                    </Card> </li>

                })}
            </List>
        </div>
    )
}

export default PlayPage;