import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import musiciansController from "../../controllers/musiciansController";
import '../../styles/musicians.css';

const MusiciansPage = () => {
  const [musicians, setMusicians] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

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
    navigate(`/musicians/${id}/edit`);
  };

  const handleDetails = (id) => {
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
        if (error.response && error.response.status === 403) {
          alert("No tienes permisos para eliminar este músico.");
        } else {
          alert("Error al eliminar el músico.");
        }
      }
    }
  };


  return (
    <div className="container">
      <h2>Músicos</h2>
      {isAdmin && (
                <>
                  <button onClick={handleCreate} className="btn btn-primary mb-3">Agregar Músico</button>                  
                </>
              )}
      <ul className="musician-list">
        {musicians.length > 0 ? (
          musicians.map((musician) => (
            <li key={musician.id} className="musician-item">
              <span>{musician.name} (Apodo: {musician.nickname}) - {musician.instrument.name}</span>
              <button onClick={() => handleDetails(musician.id)} className="btn btn-info">Detalles</button>
              {isAdmin && (
                <>
                  <button onClick={() => handleEdit(musician.id)} className="btn btn-warning">Editar</button>
                  <button onClick={() => handleDelete(musician.id)} className="btn btn-danger">Eliminar</button>
                </>
              )}
            </li>
          ))
        ) : (
          <p>No hay musicos disponibles</p>
        )}
      </ul>
    </div>
  );
};

export default MusiciansPage;
