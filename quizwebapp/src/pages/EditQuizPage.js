import React, { useState } from "react";
import { Button, Grid, Paper, TextField, Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@mui/material";
import QuizAPI from "../apis/QuizAPI";

function EditQuizPage(){

    const [questions, setQuestions] = useState(["", ""]);
    const [possibleAnswers, setPossibleAnswers] = useState({1 : "", 2: ""});
    const [correctAnswers, setCorrectAnswers] = useState([1, 1]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    
    const createQuizStyle={ width:'100vh', margin:"140px auto", backgroundColor:'lightBlue'}
    const titleFieldStyle={margin:"10px"}
    const textFieldStyle={margin:"10px", width:'98vh'}

    const renderQuestionInputs = () => {
        var questionNumber = 0;
        return(
            questions.map(() =>{
                questionNumber++;
                var number = questionNumber;
                return(
            <Grid>
                <TextField label={'question' + questionNumber} required style={textFieldStyle} onChange={(newValue)=>addQuestion(number, newValue.target.value)}></TextField>
                    <TextField label={'possible answer one question' + questionNumber} required style={textFieldStyle} onChange={(newValue)=>addPossibleAnswer(number, 0, newValue.target.value)}></TextField>
                    <TextField label={'possible answer two question' + questionNumber} required style={textFieldStyle} onChange={(newValue)=>addPossibleAnswer(number, 1, newValue.target.value)}></TextField>
                    <TextField label={'possible answer three question' + questionNumber} required style={textFieldStyle} onChange={(newValue)=>addPossibleAnswer(number, 2, newValue.target.value)}></TextField>
                    <TextField label={'possible answer four question' + questionNumber} required style={textFieldStyle} onChange={(newValue)=>addPossibleAnswer(number, 3, newValue.target.value)}></TextField>
                    <FormControl >
                        <FormLabel id={"question" + questionNumber + "correct answer"}>Question {questionNumber} correct answer</FormLabel>
                        <RadioGroup defaultValue="one" row>
                        <FormControlLabel value="one" control={<Radio />} label="one" onChange={()=>addCorrectAnswer(number, 1)}/>
                        <FormControlLabel value="two" control={<Radio/>} label="two" onChange={()=>addCorrectAnswer(number, 2)}/>
                        <FormControlLabel value="three" control={<Radio/>} label="three" onChange={()=>addCorrectAnswer(number, 3)}/>
                        <FormControlLabel value="four" control={<Radio/>} label="four" onChange={()=>addCorrectAnswer(number, 4)}/>
                        </RadioGroup>
                    </FormControl>
            </Grid>
            )
            })
            
        )
    }

    const addQuestion = (index, question) => {
        var newQuestions = [];
        for(var i=0;i<questions.length;i++)
        {
            if(i+1 == index)
            {newQuestions.push(question)}
            else
            {newQuestions.push(questions[i])}
        }
        setQuestions(newQuestions)
    }

    const addPossibleAnswer = (questionNumber, answerNumber, answer) => {
        var newAnswers = possibleAnswers;
        var possibleAnswersAtPosition = possibleAnswers[questionNumber];
        var newPossibleAnswers = [];
        for(var i=0;i<4;i++){
            if(i==answerNumber)
            {
                newPossibleAnswers.push(answer)
            }
            else
            {
                newPossibleAnswers.push(possibleAnswersAtPosition[i])
            }
        }
        newAnswers[questionNumber] = newPossibleAnswers;
        setPossibleAnswers(newAnswers)

    }

    const addCorrectAnswer = (index, answer) => {
        var newCorrectAnswers = [];
        for(var i=0;i<correctAnswers.length;i++)
        {
            if(i+1 == index)
            {newCorrectAnswers.push(answer)}
            else
            {newCorrectAnswers.push(correctAnswers[i])}
        }
        setCorrectAnswers(newCorrectAnswers)
    }

    const addQuestionInputFields = () => {
        setQuestions([...questions, ""]);
        var newPossibleAnswers = possibleAnswers;
        newPossibleAnswers[questions.length+1] = "";
        setPossibleAnswers(newPossibleAnswers);
        setCorrectAnswers([...correctAnswers, 1])
    }

    const createQuiz = () => {
        var newQuiz = {
            name: title,
            questions: questions,
            creatorId: parseInt(localStorage.getItem("userId")),
            description: description,
            possibleAnswers: possibleAnswers,
            correctAnswers: correctAnswers
        }
        QuizAPI.createQuiz(newQuiz);
    }

    return(
        <div>
            <Grid align='center'>
                <Paper elevation={20} style={createQuizStyle}>
                    <Grid align='center'>
                    <h2>Create a new quiz</h2>
                    </Grid>
                    <Grid container justifyContent="center" direction="column" >
                    <TextField label='title' required style={titleFieldStyle} onChange={(newValue)=>setTitle(newValue.target.value)}></TextField>
                    <TextField label='description' required style={titleFieldStyle} onChange={(newValue)=>setDescription(newValue.target.value)}></TextField>
                    {renderQuestionInputs()}
                    </Grid>
                    <Grid align='center'>
                    <Button type="submit" variant="contained" align='center' onClick={() => {addQuestionInputFields()}} style={{
                            backgroundColor: 'green'}}>Add Question</Button>
                    <Button variant="contained" align='center' onClick={() => {createQuiz()}} style={{
                            backgroundColor: 'black'}}>Create</Button>
                            <Typography>Input all the required fields (marked with *), use the radio buttons to mark the correct answer and then create the quiz.</Typography>
                            <Typography>Good Luck</Typography>
                    </Grid>
                </Paper>
            </Grid>
        </div>
    )
}

export default EditQuizPage;