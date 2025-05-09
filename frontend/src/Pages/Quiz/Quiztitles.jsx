import { useState, useEffect } from "react";
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
import ScoreService from "../../services/ScoreService";
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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // D'abord, charger les scores depuis localStorage  
    const updatedQuizzesFromLocal = quizzes.map(quiz => {
      const savedScore = localStorage.getItem(`quiz_${quiz.title}_score`);
      return {
        ...quiz,
        score: savedScore ? parseInt(savedScore) : 0
      };
    });

    setQuizzes(updatedQuizzesFromLocal);

    // Ensuite, essayer de charger depuis le backend (mais ne pas écraser les scores locaux)  
    ScoreService.getUserScores()
      .then(response => {
        const userScores = response.data;
        setQuizzes(prevQuizzes =>
          prevQuizzes.map(quiz => {
            const matchingScore = userScores.find(s => s.nomQuiz === quiz.title);
            const localScore = localStorage.getItem(`quiz_${quiz.title}_score`);

            // Utiliser le score local s'il existe, sinon utiliser le score du backend  
            const finalScore = localScore ? parseInt(localScore) : (matchingScore ? matchingScore.score : 0);

            return {
              ...quiz,
              score: finalScore
            };
          })
        );
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur lors du chargement des scores:', error);
        // Déjà chargé depuis localStorage, donc pas besoin de faire quoi que ce soit  
        setLoading(false);
      });
  }, []);

  return (
    <div className="App" style={{ backgroundImage: `url(${background})` }}>
      <h1 style={{ color: 'white', marginBottom: '2rem' }}>Quiz Planètes</h1>

      {loading ? (
        <div style={{ color: 'white' }}>Chargement des scores...</div>
      ) : (
        quizzes.map((quiz) => (
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
                width: '100%',
                height: '12px',
                backgroundColor: '#ccc',
                borderRadius: '6px',
                overflow: 'hidden',
                marginTop: '0.5rem',
              }}>
                <div style={{
                  width: `${quiz.score}%`,
                  height: '100%',
                  backgroundColor: '#932dad',
                  transition: 'width 0.5s ease-in-out'
                }}></div>
              </div>

              {/* Pourcentage sous la barre */}
              <p style={{ marginTop: '0.3rem', fontWeight: 'bold' }}>
                {quiz.score}% de bonnes réponses
              </p>

              <button
                onClick={() => navigate(`/quizcontent?planet=${quiz.title}`)}
                style={{
                  backgroundColor: '#932dad',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  marginTop: '0.5rem'
                }}
              >
                Commencer le quiz
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Quiztitles;