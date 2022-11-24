import { Button, Grid, Typography, Card, Paper  } from "@mui/material";
import { Box } from "@mui/system";
import React, { useLayoutEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import QuizAPI from "../apis/QuizAPI";

function QuizPage() {

    const [quiz, setQuiz] = useState([]);
    const [questionNumber, setQuestionNumber] = useState(1);
    const [color, setColor] = useState("black");
    const [disableButton, setDisableButton] = useState(false);
    const [points, setPoints] = useState(0);
    const [endOfQuiz, setEndOfQuiz] = useState(false);

    const [searchParams] = useSearchParams();
    const title = searchParams.get('title') || "";

    const renderQuestion = () => {
        if(quiz != null)
            if(quiz.hasOwnProperty('questions'))
                return(<Typography variant="h2"> {questionNumber + '.'+ quiz.questions[questionNumber]}</Typography>)
        else return(<Typography variant="h2">not rendered yet</Typography>);
    }

    const renderAnswers = () => {
        if (quiz != null)
            if (quiz.hasOwnProperty('possibleAnswers'))
                if (quiz.possibleAnswers != null)
                return(
                    quiz.possibleAnswers[questionNumber].map((answer, index) => {
                        return(
                            <Grid>
                        <Button variant="outlined" disabled = {disableButton} onClick={() => { checkAnswer(index)}} style={{
                            borderRadius: 35,
                            backgroundColor: color,
                            padding: "18px 36px",
                            fontSize: "18px",
                            justifyContent: "center",
                            margin: "20px",
                        }}>
                             {answer}
                            </Button>
                            </Grid>)
                    })
                    )
                else
                    return ("The quiz has not been setup correctly");
    }

    const checkAnswer = (answerNumber) => {
        if(quiz.correctAnswers[questionNumber-1] === (answerNumber+1))
        {
            setColor("green");
            setPoints(points+1);
        }

        else 
            {
                setColor("darkred");
            }

            setDisableButton(true);
        
    }

    const incrementQuestionNumber = () => {
        if(questionNumber < (quiz.correctAnswers).length)
            {
                setQuestionNumber(questionNumber+1);
                setColor("black");
                setDisableButton(false);
            }
        else{
           setEndOfQuiz(true);
        }
        console.log(questionNumber);
    }

    const refreshQuiz = () => {
        QuizAPI.getQuizByName(title).then(response => {
            setQuiz(response.data);
        })
            .catch(err => console.error(err));
    };    

    useLayoutEffect(() => {
        refreshQuiz();
    },[]);

    const questionsPaperStyle={height:'60vh', width:500, margin:"50px 50vh", backgroundColor:'lightBlue'}
    const endOfQuizCardStyle={padding:'30px', width:700, margin:"50px 50vh", backgroundColor:'lightGreen'}

    return (
        <Box className="container">
            {console.log(quiz)}
            <Grid align='center'>
                <Paper elevation={20} style={questionsPaperStyle}>
                {renderQuestion()}
            {renderAnswers()}
            <Button variant = "contained" onClick={() => {incrementQuestionNumber()}}>Next Question</Button>
                </Paper>
                <Card variant="outlined" hidden = {!endOfQuiz} style={endOfQuizCardStyle}>Congratulations, you scored {points} points. You can see your total score at your profile page :)</Card>
            </Grid>
        </Box>

    );
}

export default QuizPage;