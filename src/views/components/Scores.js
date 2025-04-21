import React, { useEffect, useState } from 'react';
import { fetchScores, handleUploadScore, handleDeleteScore } from '../../controllers/scoresController';
import '../../styles/scores.css';

const Scores = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');
  const [title, setTitle] = useState('');


  useEffect(() => {
    const loadScores = async () => {
      const data = await fetchScores();
      setScores(data);
      setLoading(false);
    };

    loadScores();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file || !title.trim()) {
      setUploadMessage('Por favor completa todos los campos.');
      return;
    }

    try {
      const uploadedScore = await handleUploadScore(file, title);
      setUploadMessage('Partitura subida con éxito');
      setScores((prevScores) => [...prevScores, uploadedScore]);
      setFile(null);
      setTitle('');
    } catch (error) {
      setUploadMessage('Error al subir la partitura.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar esta partitura?')) return;

    try {
      await handleDeleteScore(id);
      setScores((prevScores) => prevScores.filter((score) => score.id !== id));
      setUploadMessage('Partitura eliminada correctamente');
    } catch {
      setUploadMessage('Error al eliminar la partitura.');
    }
  };

  return (
    <div className="scores-page">
      <h2>Listado de Partituras</h2>

      <div className="upload-form">
        <h3>Subir Partitura</h3>
        <form onSubmit={handleUpload}>
          <input
            type="text"
            placeholder="Título de la partitura"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input type="file" accept=".pdf" onChange={handleFileChange} required />
          <button type="submit">Subir</button>
        </form>
        {uploadMessage && <p>{uploadMessage}</p>}
      </div>

      {loading ? (
        <p>Cargando Partituras...</p>
      ) : (
        <ul className="scores-list">
          {scores.map((score) => (
            <li key={score.id} className="score-item">
              <span>{score.title}</span>
              <a href={score.public_url} download className="download-link">
                Descarga PDF
              </a>
              <button onClick={() => handleDelete(score.id)} className="delete-button">
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Scores;

// import React, { useEffect, useState } from 'react';
// import { fetchScores } from '../../controllers/scoresController';
// import '../../styles/scores.css';

// const Scores = () => {
//   const [scores, setScores] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadScores = async () => {
//       const data = await fetchScores();
//       setScores(data);
//       setLoading(false);
//     };

//     loadScores();
//   }, []);

//   return (
//     <div className="scores-page">
//       <h2>Listado de Partituras</h2>
//       {loading ? (
//         <p>Cargando Partituras...</p>
//       ) : (
//         <ul className="scores-list">
//           {scores.map((score) => (
//             <li key={score.id} className="score-item">
//               <span>{score.name}</span>
//               <a href={score.pdfUrl} download className="download-link">
//                 Descarga PDF
//               </a>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Scores;
