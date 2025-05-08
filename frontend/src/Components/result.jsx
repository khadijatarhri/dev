import { useState, useEffect } from "react";
import mercure from "../assets/mercure.jpg"; // (à remplacer par une props ou autre selon le quiz)  
import { useLocation } from "react-router-dom";

const Result = ({ userAnswers, questions, resetQuiz = () => { } }) => {
  const [showDetails, setShowDetails] = useState(false);
  const correctAnswers = userAnswers.filter((answer) => answer).length;
  const score = Math.round((correctAnswers / questions.length) * 100);
  const location = useLocation();
  const quizId = location.state?.quizId || 1; // Utiliser l'ID du quiz passé via state ou par défaut 1  

  // Sauvegarder le score dans localStorage  
  useEffect(() => {
    localStorage.setItem(`quiz_${quizId}_score`, score.toString());
  }, [score, quizId]);

  return (
    <div style={{
      width: '60%',
      backgroundColor: '#371140',
      borderRadius: '10px',
      padding: '1rem',
      color: 'white',
      boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
      display: 'flex',
      margin: 'auto',
      marginTop: '50px',
      alignItems: 'center'
    }}>
      {/* Image de la planète associée au quiz */}
      <img
        src={mercure}
        alt="Quiz"
        style={{
          width: '180px',
          height: '180px',
          borderRadius: '10px',
          objectFit: 'cover',
          marginRight: '1rem'
        }}
      />

      <div style={{ flex: 1 }}>
        <h2>Résultat du Quiz</h2>

        {/* Barre de progression */}
        <div style={{
          height: '5px',
          backgroundColor: '#ccc',
          borderRadius: '5px',
          marginTop: '0.5rem',
          marginBottom: '0.5rem',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${score}%`,
            height: '100%',
            backgroundColor: '#932dad'
          }}></div>
        </div>

        <p style={{ marginBottom: '0.5rem' }}>{score}% de bonnes réponses</p>

        {/* Bouton Voir détails */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          style={{
            backgroundColor: '#932dad',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            marginBottom: '1rem'
          }}
        >
          {showDetails ? 'Masquer les détails' : 'Voir les détails'}
        </button>

        {/* Affichage des détails si activé */}
        {showDetails && (
          <ul style={{ textAlign: 'left', paddingLeft: '20px' }}>
            {questions.map((question, index) => {
              const correctText = question.answerOptions.find((ans) => ans.isCorrect).text;
              return (
                <li key={index} style={{ color: userAnswers[index] ? 'lightgreen' : 'red', marginBottom: '10px' }}>
                  <strong>Q{index + 1}:</strong> {question.question}
                  {!userAnswers[index] && (
                    <div>Bonne réponse: <b>{correctText}</b></div>
                  )}
                </li>
              );
            })}
          </ul>
        )}

        {/* Lien pour recommencer */}
        <div>
          <span
            onClick={resetQuiz}
            style={{
              color: 'red',
              textDecoration: 'underline',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Rejouer le quiz
          </span>
        </div>
      </div>
    </div>
  );
};

export default Result;