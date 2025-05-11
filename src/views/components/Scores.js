import React, { useEffect, useState, useCallback } from 'react';
import {
  fetchScores,
  handleUploadScore,
  handleDeleteScore,
  getInstruments
} from '../../controllers/scoresController';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/main.scss';

const Scores = () => {
  const { isAuthenticated } = useAuth();
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [instrumentId, setInstrumentId] = useState('');
  const [uploadMessage, setUploadMessage] = useState('');
  const [instruments, setInstruments] = useState([]);
  const [filterInstrumentId, setFilterInstrumentId] = useState('');

  const loadScores = useCallback(async (instrumentId = '') => {
    if (!isAuthenticated) return;
    const data = await fetchScores(instrumentId);
    setScores(data);
    setLoading(false);
  }, [isAuthenticated]);

  useEffect(() => {
    const loadInitialData = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }
      try {
        const instrumentList = await getInstruments();
        setInstruments(instrumentList);
        await loadScores();
      } catch (error) {
        console.error('Error cargando datos iniciales:', error);
      }
    };
    loadInitialData();
  }, [isAuthenticated, loadScores]);

  const handleFilterChange = async (e) => {
    const selectedId = e.target.value;
    setFilterInstrumentId(selectedId);
    setUploadMessage('');
    await loadScores(selectedId);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title.trim() || !instrumentId) {
      setUploadMessage('Por favor completa todos los campos.');
      return;
    }

    try {
      const uploadedScore = await handleUploadScore(file, title, instrumentId);
      setUploadMessage('Partitura subida con éxito');
      setScores((prevScores) => [...prevScores, uploadedScore]);
      setFile(null);
      setTitle('');
      setInstrumentId('');
    } catch {
      setUploadMessage('Error al subir la partitura.');
    }
  };

  return (
    <div className="scores-page">
      <h2 className="page-title">Listado de Partituras</h2>

      {!isAuthenticated ? (
        <p>Debes iniciar sesión para ver y subir partituras.</p>
      ) : (
        <>
          <div className="filter-section">
            <label>Filtrar por instrumento: </label>
            <select
              className="filter-select"
              value={filterInstrumentId}
              onChange={handleFilterChange}
            >
              <option value="">Todos</option>
              {instruments.map((instr) => (
                <option key={instr.id} value={instr.id}>
                  {instr.name}
                </option>
              ))}
            </select>
          </div>

          <div className="upload-form">
            <h3>Subir Partitura</h3>
            <form onSubmit={handleUpload} className="upload-form-container">
              <input
                type="text"
                placeholder="Título de la partitura"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setUploadMessage('');
                }}
                className="upload-input"
                required
              />
              <select
                value={instrumentId}
                onChange={(e) => setInstrumentId(e.target.value)}
                className="upload-select"
                required
              >
                <option value="">Selecciona un instrumento</option>
                {instruments.map((instr) => (
                  <option key={instr.id} value={instr.id}>
                    {instr.name}
                  </option>
                ))}
              </select>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="upload-file"
                required
              />
              <button type="submit" className="upload-button">Subir</button>
            </form>
            {uploadMessage && <p className="upload-message">{uploadMessage}</p>}
          </div>

          {loading ? (
            <p className="loading-text">Cargando Partituras...</p>
          ) : (
            <ul className="scores-list">
              {scores.map((score) => (
                <li key={score.id} className="score-item">
                  <div className="score-info">
                    <span className="score-title">
                      {score.title} ({score.instrument_name || 'Sin instrumento'})
                    </span>
                    <a href={score.public_url} download className="download-link">
                      Descargar PDF
                    </a>
                  </div>
                  <button
                    onClick={async () => {
                      await handleDeleteScore(score.id);
                      await loadScores(filterInstrumentId);
                    }}
                    className="delete-button"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default Scores;
