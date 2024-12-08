import React, { useEffect, useState } from 'react';
import { fetchScores } from '../../controllers/scoresController';
import '../../styles/scores.css';

const Scores = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadScores = async () => {
      const data = await fetchScores();
      setScores(data);
      setLoading(false);
    };

    loadScores();
  }, []);

  return (
    <div className="scores-page">
      <h2>Listado de Partituras</h2>
      {loading ? (
        <p>Cargando Partituras...</p>
      ) : (
        <ul className="scores-list">
          {scores.map((score) => (
            <li key={score.id} className="score-item">
              <span>{score.name}</span>
              <a href={score.pdfUrl} download className="download-link">
                Descarga PDF
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Scores;
