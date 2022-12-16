import axios from "axios"

const apiUrl = "http://localhost:8080/quizzes/";



const QuizAPI = {
    getQuizByName: (currentQuiz) => axios.get(`${apiUrl}${currentQuiz}`),

    getAllQuizzes: () => axios.get(apiUrl),

    createQuiz: newQuiz => axios.post(apiUrl, newQuiz),

    deleteQuiz: title => {
        const creatorId = (parseInt(localStorage.getItem("userId")))
        axios.delete(apiUrl, {
            headers: {},
            data:{name: title,
            creatorId: creatorId}
        }).then(response => {
            console.log(response.data);
        })
    },

    getQuizzesByLoggedUser: () => axios.get(`${apiUrl}creator/${JSON.parse(localStorage.getItem("userId"))}`),

    getQuizzesByRating: rating => {
        if(rating === null)
        return axios.get(`${apiUrl}rating/0`);
        else
        return axios.get(`${apiUrl}rating/${rating}`);
}

    }

export default QuizAPI;