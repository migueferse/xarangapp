import React, { useEffect, useState } from 'react';
import { fetchScores, handleUploadScore, handleDeleteScore, getInstruments } from '../../controllers/scoresController';
import '../../styles/scores.css';

const Scores = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [instrumentId, setInstrumentId] = useState(''); // NUEVO: Estado para el instrumento al subir
  const [uploadMessage, setUploadMessage] = useState('');
  const [instruments, setInstruments] = useState([]); // NUEVO: Estado para los instrumentos
  const [filterInstrumentId, setFilterInstrumentId] = useState(''); // NUEVO: Estado para el filtro

  // Función para cargar las partituras
  const loadScores = async (instrumentId = '') => {
    const data = await fetchScores(instrumentId); // MODIFICADO
    setScores(data);
    setLoading(false);
  };

  // Cargar instrumentos e inicializar las partituras
  useEffect(() => {
    const loadInitialData = async () => {
      const instrumentList = await getInstruments();
      setInstruments(instrumentList);
      await loadScores(); // Cargar las partituras sin filtro inicial
    };
    loadInitialData();
  }, []);

  // Función para manejar el filtro por instrumento
  const handleFilterChange = async (e) => {
    const selectedId = e.target.value;
    setFilterInstrumentId(selectedId);
    setUploadMessage('');
    await loadScores(selectedId); // Cargar partituras filtradas
  };

  // Función para manejar la subida de partituras
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title.trim() || !instrumentId) {
      setUploadMessage('Por favor completa todos los campos.');
      return;
    }

    try {
      const uploadedScore = await handleUploadScore(file, title, instrumentId); // MODIFICADO
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
      <h2>Listado de Partituras</h2>

      {/* FILTRO POR INSTRUMENTO */}
      <div className="filter-section">
        <label>Filtrar por instrumento: </label>
        <select value={filterInstrumentId} onChange={handleFilterChange}>
          <option value="">Todos</option>
          {instruments.map((instr) => (
            <option key={instr.id} value={instr.id}>
              {instr.name}
            </option>
          ))}
        </select>
      </div>

      {/* FORMULARIO PARA SUBIR PARTITURA */}
      <div className="upload-form">
        <h3>Subir Partitura</h3>
        <form onSubmit={handleUpload}>
          <input
            type="text"
            placeholder="Título de la partitura"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setUploadMessage(''); // limpiar mensaje
            }}
            required
          />
          <select
            value={instrumentId}
            onChange={(e) => setInstrumentId(e.target.value)}
            required
          >
            <option value="">Selecciona un instrumento</option>
            {instruments.map((instr) => (
              <option key={instr.id} value={instr.id}>
                {instr.name}
              </option>
            ))}
          </select>
          <input type="file" accept=".pdf" onChange={(e) => setFile(e.target.files[0])} required />
          <button type="submit">Subir</button>
        </form>
        {uploadMessage && <p>{uploadMessage}</p>}
      </div>

      {/* LISTADO DE PARTITURAS */}
      {loading ? (
        <p>Cargando Partituras...</p>
      ) : (
        <ul className="scores-list">
          {scores.map((score) => (
            <li key={score.id} className="score-item">
              <span>{score.title} ({score.instrument_name || 'Sin instrumento'})</span>
              <a href={score.public_url} download className="download-link">
                Descarga PDF
              </a>
              <button
                onClick={async () => {
                  await handleDeleteScore(score.id);
                  await loadScores(filterInstrumentId); // Recarga el listado después de eliminar
                }}
                className="delete-button"
              >
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
