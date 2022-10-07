import React, { useEffect, useState } from "react";
import "./PlayPage.css";
import QuizAPI from "../apis/QuizAPI";
import { Card, List } from '@mui/material';

function PlayPage() {

    const [quizList, setQuizList] = useState([]);

    const refreshQuizzes = () => {
        QuizAPI.getAllQuizzes().then(response => {
            setQuizList(response.data.quizzes);
        })
            .catch(err => console.error(err));
    };

    useEffect(() => {
        refreshQuizzes();
    }, []);

    return (
        <div className="content">
            <List>
                {quizList.map((quiz, index) => {
                    return <li key={index}> <Card variant="outlined">
                        <h1>{quiz.name}</h1>
                        <p>{quiz.description}</p>
                        <p>rating: {quiz.rating} / 5</p>
                    </Card> </li>
                })}
            </List>
        </div>
    )
}

export default PlayPage;