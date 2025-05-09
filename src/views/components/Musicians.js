import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import musiciansController from "../../controllers/musiciansController";
import '../../styles/main.scss';

const MusiciansPage = () => {
  const [musicians, setMusicians] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

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
    <div className="musicians-page">
      <div className="musicians-card">
        <h2>Músicos</h2>

        {isAdmin && (
          <div className="text-end mb-3">
            <button onClick={handleCreate} className="btn btn-primary button-fade">Agregar Músico</button>
          </div>
        )}

        {musicians.length > 0 ? (
          <ul className="list-group">
            {musicians.map((musician) => (
              <li key={musician.id} className="list-group-item musician-fade">
                <div className="musician-info">
                  <div className="musician-name">{musician.name}</div>
                  {musician.nickname && (
                    <div className="musician-nickname text-muted">Apodo: {musician.nickname}</div>
                  )}
                  <div className="musician-instrument">{musician.instrument.name}</div>
                </div>
                <div className="btn-group">
                  <button onClick={() => handleDetails(musician.id)} className="btn btn-info btn-sm">Detalles</button>
                  {isAdmin && (
                    <>
                      <button onClick={() => handleEdit(musician.id)} className="btn btn-warning btn-sm">Editar</button>
                      <button onClick={() => handleDelete(musician.id)} className="btn btn-danger btn-sm">Eliminar</button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">No hay músicos disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default MusiciansPage;
