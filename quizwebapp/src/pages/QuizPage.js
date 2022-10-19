import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import QuizAPI from "../apis/QuizAPI";

function QuizPage() {

    const [quiz, setQuiz] = useState([]);

    const [searchParams] = useSearchParams();
    const title = searchParams.get('title') || "";

    var questionNumber = 1;

    const renderAnswers = () => {
        if (quiz != null)
            if (quiz.hasOwnProperty('possibleAnswers'))
                if (quiz.possibleAnswers != null)
                return(
                    quiz.possibleAnswers[questionNumber].map((answer, index) => {
                        return(<Button variant="outlined">{answer}</Button>)
                    }))
                else
                    return ("The quiz has not been setup correctly");
    }

    useEffect(() => {
        const refreshQuiz = () => {
            QuizAPI.getQuizByName(title).then(response => {
                setQuiz(response.data);
            })
                .catch(err => console.error(err));
        };
        refreshQuiz();
        renderAnswers();
        console.log("refreshed");
    }, [title]);

    return (
        <Box className="container">
            <Typography>{questionNumber}</Typography>
            {console.log(quiz)}
            <Grid
            direction="column"
            justifyContent="center"
            alignItems="center"
            container spacing={3}>
            {renderAnswers()}
            </Grid>
        </Box>

    );
}

export default QuizPage;