import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import musiciansController from "../../controllers/musiciansController";
import '../../styles/musicians.css';

const MusiciansPage = () => {
  const [musicians, setMusicians] = useState([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   setMusicians(musiciansController.getAllMusicians());
  // }, []);

  useEffect(() => {
    const fetchMusicians = async () => {
      try {
        const musiciansData = await musiciansController.getAllMusicians();
        setMusicians(musiciansData);
      } catch (error) {
        console.error("Error fetching musicians:", error);
      }
    };

    fetchMusicians();
  }, []);

  const handleCreate = () => {
    navigate("/musicians/new");
  };

  const handleEdit = (id) => {
    navigate(`/musicians/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este músico?")) {
      try {
        await musiciansController.removeMusician(id);
        const updatedMusicians = await musiciansController.getAllMusicians();
        setMusicians(updatedMusicians);
      } catch (error) {
        console.error("Error deleting musician:", error);
      }
    }
  };
  

  return (
    <div className="container">
      <h2>Músicos</h2>
      <button onClick={handleCreate} className="btn btn-primary mb-3">Agregar Músico</button>
      <ul className="musician-list">
        {musicians.map((musician) => (
          <li key={musician.id} className="musician-item">
            <span>{musician.name} (Apodo: {musician.nickname}) - {musician.instrumentName}</span>
            <button onClick={() => handleEdit(musician.id)} className="btn btn-warning">Editar</button>
            <button onClick={() => handleDelete(musician.id)} className="btn btn-danger">Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MusiciansPage;
