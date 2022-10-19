import axios from "axios"

const apiUrl = "http://localhost:8080/quizzes/";



const QuizAPI = {
    getQuizByName: (currentQuiz) => axios.get(`${apiUrl}?name=${currentQuiz}`),
    getAllQuizzes: () => axios.get(apiUrl + "all"),
    createQuiz: newQuiz => axios.post(apiUrl, newQuiz),
    deleteQuiz: (quizName, creatorId) => axios.delete(apiUrl, quizName, creatorId)
};

export default QuizAPI;