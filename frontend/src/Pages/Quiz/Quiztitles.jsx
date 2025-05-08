import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import mercure from "../../assets/mercure.jpg";
import mars from "../../assets/mars.jpeg";
import jupiter from "../../assets/jupiter.png";
import saturne from "../../assets/saturne.jpeg";
import Uranus from "../../assets/Uranus.jpg";
import terre from "../../assets/terre.jpg";
import venus from "../../assets/venus.jpeg";
import neptune from "../../assets/neptune.jpeg";
import background from '../../assets/space.png';
import "./Quiztitles.css";

function Quiztitles() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([
    { id: 1, title: "Mercure", image: mercure, score: 0 },
    { id: 2, title: "Vénus", image: venus, score: 0 },
    { id: 3, title: "Jupiter", image: jupiter, score: 0 },
    { id: 4, title: "Saturne", image: saturne, score: 0 },
    { id: 5, title: "Terre", image: terre, score: 0 },
    { id: 6, title: "Uranus", image: Uranus, score: 0 },
    { id: 7, title: "Neptune", image: neptune, score: 0 },
    { id: 8, title: "Mars", image: mars, score: 0 },
  ]);

  // Fonction pour charger les scores depuis le localStorage  
  useEffect(() => {
    const loadScores = () => {
      const updatedQuizzes = quizzes.map(quiz => {
        const savedScore = localStorage.getItem(`quiz_${quiz.id}_score`);
        return {
          ...quiz,
          score: savedScore ? parseInt(savedScore) : 0
        };
      });
      setQuizzes(updatedQuizzes);
    };

    loadScores();
  }, []);

  return (
    <div className="App" style={{ backgroundImage: `url(${background})` }}>
      <h1 style={{ color: 'white', marginBottom: '2rem' }}>Quiz Planètes</h1>
      {quizzes.map((quiz) => (
        <div key={quiz.id} style={{
          width: '60%',
          height: '190px',
          backgroundColor: '#371140',
          borderRadius: '10px',
          padding: '1rem',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          color: 'white',
          boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
        }}>
          <img
            src={quiz.image}
            alt={quiz.title}
            style={{
              width: '180px',
              height: '180px',
              borderRadius: '10px',
              objectFit: 'cover',
              marginRight: '1rem'
            }}
          />
          <div style={{ flex: 1 }}>
            <h2>{quiz.title}</h2>
            <div style={{
              height: '5px',
              backgroundColor: '#ccc',
              borderRadius: '5px',
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${quiz.score}%`,
                height: '100%',
                backgroundColor: '#932dad'
              }}></div>
            </div>
            <p style={{ marginBottom: '0.5rem' }}>{quiz.score}% de bonnes réponses</p>
            <button
              onClick={() => navigate('/quizcontent', { state: { quizId: quiz.id } })}
              style={{
                backgroundColor: '#932dad',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Commencer le quiz
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Quiztitles;