//import './App.css';
import Navbar from './components/Navbar'
import Header from './components/Header'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import PlayPage from './pages/PlayPage';
import ProfilePage from './pages/ProfilePage';
import CreateQuizPage from './pages/CreateQuizPage';
import FindFriendsPage from './pages/FindFriendsPage';
import MessagesPage from './pages/MessagesPage';
import QuizPage from './pages/QuizPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div className="App">
       <Router>
        <Header />
        <Navbar />
        <Routes>
          <Route path="/play" element={<PlayPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/create" element={<CreateQuizPage />} />
          <Route path="/friends" element={<FindFriendsPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="play/quiz/*" element={<QuizPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
       </Router>
    </div>
  );
}

export default App;
